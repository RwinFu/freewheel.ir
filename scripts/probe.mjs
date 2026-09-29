/**
 * Overflow probe.
 *
 * `shoot.mjs` reports a page-level scrollWidth and the first few selector
 * strings, but a long selector tells you nothing about *why*. This walks
 * the live box tree at a given viewport and names the elements whose
 * right edge escapes the viewport, with their geometry, so the culprit is
 * identifiable at a glance.
 *
 *   node scripts/probe.mjs /articles/sprag-vs-roller 390
 *   node scripts/probe.mjs / 1440
 */
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const chromium = require('@sparticuz/chromium').default
const puppeteer = require('puppeteer-core')

const route = process.argv[2] ?? '/'
const width = Number(process.argv[3] ?? 390)
const height = width < 700 ? 844 : 900
const base = process.env.BASE_URL ?? 'http://localhost:3000'

const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: 'shell',
})
const page = await browser.newPage()
await page.setViewport({ width, height, deviceScaleFactor: 1 })
await page.goto(base + route, { waitUntil: 'networkidle0' })

// Walk the page so lazy reveals and ScrollTriggers have all settled.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 60))
  }
  window.scrollTo(0, 0)
})
await new Promise((r) => setTimeout(r, 400))

const result = await page.evaluate(() => {
  const limit = document.documentElement.clientWidth
  const offenders = []

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue

    const cs = getComputedStyle(el)
    // Fixed chrome is pinned to the viewport by definition; sr-only and
    // hidden nodes are not real overflow.
    if (cs.position === 'fixed' || cs.visibility === 'hidden') continue
    if (r.right <= limit + 2 && r.left >= -2) continue

    offenders.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className?.toString() ?? '').slice(0, 90),
      text: (el.textContent ?? '').trim().slice(0, 40),
      left: Math.round(r.left),
      right: Math.round(r.right),
      width: Math.round(r.width),
      overflowX: cs.overflowX,
    })
  }

  // Deepest offenders are the real cause; ancestors are just containing them.
  return {
    viewport: limit,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth - limit,
    offenders: offenders.slice(0, 20),
  }
})

console.log(JSON.stringify({ route, width, ...result }, null, 1))
await browser.close()
