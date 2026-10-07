/**
 * Runtime check for the category filter, without a browser.
 *
 * The sandbox has no Chromium (three NSS shared libraries are missing and the
 * Debian mirror is unreachable), so the filter is exercised in jsdom instead.
 * The components are bundled with esbuild and `react` is aliased to
 * `next/dist/compiled/react` — the same module the App Router ships — so
 * `ViewTransition` resolves the way it does in the real app rather than being
 * stubbed out.
 *
 *   node scripts/verify-filter.mjs
 *
 * Exits non-zero if any expectation fails.
 */
import { createRequire } from 'node:module'
import { JSDOM } from 'jsdom'
import esbuild from 'esbuild'
import path from 'node:path'
import { fileURLToPath } from 'node:url'


const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// --- DOM must exist before react-dom is loaded ------------------------------
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
})
globalThis.window = dom.window
globalThis.document = dom.window.document
// Node 22 exposes `navigator` as a getter-only global; defineProperty is required.
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
})
globalThis.MouseEvent = dom.window.MouseEvent
globalThis.Node = dom.window.Node
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.getComputedStyle = dom.window.getComputedStyle
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window)
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window)
// React's ViewTransition commit path calls CSS.escape for view-transition-name.
// jsdom has no CSS global, so provide the identifier-escaping React needs.
globalThis.CSS = {
  escape: (value) =>
    String(value).replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`),
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

const compiled = (p) => require.resolve(path.join('next/dist/compiled', p))

// --- bundle the components under test --------------------------------------
const imageStub = {
  name: 'image-stub',
  setup(build) {
    build.onLoad({ filter: /\.(jpe?g|png|webp|avif)$/ }, () => ({
      contents: 'export default { src: "/stub.jpg", width: 1, height: 1 }',
      loader: 'js',
    }))
  },
}

const outfile = path.join(root, '.next', 'filter-check.mjs')
await esbuild.build({
  entryPoints: [path.join(root, 'scripts/filter-check.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  outfile,
  tsconfig: path.join(root, 'tsconfig.json'),
  absWorkingDir: root,
  plugins: [imageStub],
  alias: {
    react: compiled('react/index.js'),
    'react/jsx-runtime': compiled('react/jsx-runtime.js'),
    'react-dom': compiled('react-dom/index.js'),
    'react-dom/client': compiled('react-dom/client.js'),
  },
  logLevel: 'warning',
})

const { main } = await import(`${outfile}?t=${Date.now()}`)
const results = await main()

let failures = 0
for (const { label, actual, expected } of results) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failures += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`)
}

console.log(`\n${results.length - failures}/${results.length} checks passed`)
process.exit(failures > 0 ? 1 : 0)
