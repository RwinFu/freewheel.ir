/**
 * Storyboard mode: capture a page as viewport-sized slices so each frame
 * is legible instead of a 12,000px strip. This is how the layout is
 * actually reviewed.
 *
 *   node scripts/slices.mjs / desktop 0 900 1800
 */
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const require = createRequire(import.meta.url)
const Chromium = require('@sparticuz/chromium').default
const puppeteer = require('puppeteer-core')

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const route = process.argv[2] ?? '/'
const vpName = process.argv[3] ?? 'desktop'
const name = process.argv[4] ?? 'slice'
const offsets = process.argv.slice(5).map(Number)

const VP =
  vpName === 'mobile'
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 }

await mkdir('screens', { recursive: true })

const exe = await Chromium.executablePath()
const env = {
  ...process.env,
  LD_LIBRARY_PATH: [path.join(path.dirname(exe), 'al2023', 'lib'), process.env.LD_LIBRARY_PATH]
    .filter(Boolean)
    .join(':'),
}

const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...Chromium.args, '--disable-dev-shm-usage', '--no-sandbox'],
  headless: 'shell',
  env,
})

const page = await browser.newPage()
await page.setViewport(VP)
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e).slice(0, 200)))

await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
await new Promise((r) => setTimeout(r, 1200))

// Settle ScrollTrigger: walk the page, then return to the slice offsets.
const total = await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.7)
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  }
  return document.body.scrollHeight
})

const ys = offsets.length ? offsets : [0, VP.height]

for (const y of ys) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 700))
  const file = `screens/${name}-${vpName}-${y}.png`
  await page.screenshot({ path: file })
  console.log(file)
}

console.log('total height', total)
await browser.close()
