/**
 * Vazirmatn subset builder.
 *
 * We ship two self-hosted cuts instead of the full 9-weight family:
 *   - Vazirmatn-Text.woff2   → body copy, data tables, UI chrome
 *   - Vazirmatn-Display.woff2 → headings (adds the heavier optical range)
 *
 * The character set is the union of every Persian glyph the site actually
 * renders plus ASCII, Latin-1 punctuation and the typographic marks the
 * spec tables need (×, ·, –, —, °, ±, ≤, ≥). Adding a character later means
 * adding it to TARGET below and re-running `npm run fonts`.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import subsetFont from 'subset-font'

const SRC = process.env.VAZIRMATN_SRC ?? '/tmp/vazirmatn/fonts/variable/Vazirmatn[wght].ttf'
const OUT = path.resolve('public/fonts')

// Persian letters, Persian digits, Arabic-Indic digits, punctuation, symbols.
const TARGET = [
  '۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩',
  'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیءآأإئةؤى',
  ' ،؛؟«»ـ٬٫٪',
  '0123456789',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  ' .,;:!?\'"()[]{}/\\|-_=+*&%#@$^~`',
  '×÷·•–—…°±≤≥≈µΩ≈∅√∞',
  '№™©®€$¢£¥',
].join('')

const CUTS = [
  { name: 'Vazirmatn-Text.woff2', weights: [400, 500, 600, 700] },
  { name: 'Vazirmatn-Display.woff2', weights: [700, 800, 900] },
]

if (!existsSync(SRC)) {
  console.error(`Source font not found at ${SRC}`)
  console.error('Clone https://github.com/rastikerdar/vazirmatn and set VAZIRMATN_SRC.')
  process.exit(1)
}

const src = await readFile(SRC)
await mkdir(OUT, { recursive: true })

for (const cut of CUTS) {
  const buf = await subsetFont(src, TARGET, {
    targetFormat: 'woff2',
    variationAxes: { wght: { min: cut.weights[0], max: cut.weights.at(-1) } },
  })
  const dest = path.join(OUT, cut.name)
  await writeFile(dest, buf)
  console.log(`${cut.name.padEnd(26)} ${(buf.length / 1024).toFixed(1)} KB  weights=${cut.weights.join(',')}`)
}

/**
 * Satori (next/og) cannot read woff2 and handles variable axes poorly, so
 * the OG card is rendered from a static TTF cut instead. These never
 * reach a browser — they are read once at build time.
 */
const TTF_DIR = path.resolve('src/assets/fonts')
await mkdir(TTF_DIR, { recursive: true })

for (const [weight, file] of [
  [400, 'Vazirmatn-Regular.ttf'],
  [700, 'Vazirmatn-Bold.ttf'],
]) {
  const ttfSrc = path.join(path.dirname(SRC), '..', 'ttf', file)
  if (!existsSync(ttfSrc)) continue
  const buf = await subsetFont(await readFile(ttfSrc), TARGET, { targetFormat: 'truetype' })
  const dest = path.join(TTF_DIR, `Vazirmatn-OG-${weight}.ttf`)
  await writeFile(dest, buf)
  console.log(`${path.basename(dest).padEnd(26)} ${(buf.length / 1024).toFixed(1)} KB  build-time only`)
}

