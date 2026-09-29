/**
 * Visual + performance harness.
 *
 * There is no Chrome download available in this sandbox, so we use the
 * Chromium that ships inside the `@sparticuz/chromium` package. Same
 * engine, same DevTools protocol — good enough for screenshots, layout
 * metrics and a Lighthouse-style audit.
 *
 *   node scripts/shoot.mjs                    # every page, desktop + mobile
 *   node scripts/shoot.mjs /ringspann/r60     # one page
 */
import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const require = createRequire(import.meta.url)
const Chromium = require('@sparticuz/chromium').default
const puppeteer = require('puppeteer-core')

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = path.resolve('screens')

const PAGES = [
  ['/', 'home'],
  ['/ringspann', 'ringspann'],
  ['/ringspann/r60', 'r60'],
  ['/ringspann/r150', 'r150'],
  ['/brands', 'brands'],
  ['/brands/ringspann', 'brand-ringspann'],
  ['/applications', 'applications'],
  ['/articles', 'articles'],
  ['/articles/sprag-vs-roller', 'article'],
  ['/about', 'about'],
  ['/contact', 'contact'],
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, dsf: 1 },
  { name: 'mobile', width: 390, height: 844, dsf: 2 },
]

const only = process.argv.slice(2)
const targets = only.length ? PAGES.filter(([p]) => only.includes(p)) : PAGES

await mkdir(OUT, { recursive: true })

const exe = await Chromium.executablePath()

// Outside Lambda the NSS/NSPR shared objects are not unpacked for us;
// they ride along in the same package under bin/al2023.tar.br.
const libDir = path.join(path.dirname(exe), 'al2023', 'lib')
const env = { ...process.env, LD_LIBRARY_PATH: [libDir, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') }

const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...Chromium.args, '--font-render-hinting=none', `--disable-dev-shm-usage`],
  headless: 'shell',
  env,
})

const report = []

for (const [route, slug] of targets) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      isMobile: vp.name === 'mobile',
      hasTouch: vp.name === 'mobile',
    })

    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))

    const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
    await new Promise((r) => setTimeout(r, 900))

    // Let ScrollTrigger lay out its pins before measuring.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8)
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      }
      window.scrollTo(0, 0)
    })
    await new Promise((r) => setTimeout(r, 600))

    const metrics = await page.evaluate(() => {
      const de = document.documentElement
      const overflow = de.scrollWidth - de.clientWidth
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => {
          const r = el.getBoundingClientRect()
          if (r.width <= 2 || r.height <= 2) return false
          const cs = getComputedStyle(el)
          if (cs.position === 'fixed' || cs.visibility === 'hidden') return false
          return r.right > de.clientWidth + 2
        })
        .slice(0, 8)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')}`)
      return {
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        overflow,
        title: document.title,
        h1: document.querySelectorAll('h1').length,
        height: document.body.scrollHeight,
        offenders: wide,
        imgsNoAlt: [...document.images].filter((i) => !i.alt).length,
        rawImgs: document.querySelectorAll('img:not([src*="_next/image"])').length,
        fontFaces: document.fonts.size,
      }
    })

    await page.screenshot({
      path: path.join(OUT, `${slug}-${vp.name}.png`),
      fullPage: true,
    })

    report.push({ route, vp: vp.name, status: res.status(), ...metrics, errors: errors.slice(0, 5) })
    await page.close()
  }
}

await browser.close()

console.log(JSON.stringify(report, null, 1))
await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))
