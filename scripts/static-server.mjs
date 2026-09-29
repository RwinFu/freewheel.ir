// Minimal static file server for the `output: 'export'` build in `out/`.
// No dependencies; mirrors what GitHub Pages does: /x/ → x/index.html,
// /x → x/index.html or x.html, and a 404.html fallback.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.join(process.cwd(), 'out')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.map': 'application/json',
  '.webmanifest': 'application/manifest+json',
}

async function tryFile(p) {
  try {
    const s = await stat(p)
    if (s.isFile()) return readFile(p)
  } catch {
    /* not found */
  }
  return null
}

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let file = path.join(root, safe)
  if (!file.startsWith(root)) {
    res.writeHead(403).end()
    return
  }

  let body = null
  if (safe.endsWith('/')) {
    body = await tryFile(path.join(file, 'index.html'))
  } else {
    body =
      (await tryFile(path.join(file, 'index.html'))) ??
      (await tryFile(file)) ??
      (await tryFile(`${file}.html`))
  }

  if (!body) {
    const notFound = await tryFile(path.join(root, '404.html'))
    res.writeHead(notFound ? 404 : 404, { 'content-type': 'text/html; charset=utf-8' })
    res.end(notFound ?? '404')
    return
  }

  const ext = path.extname(file).toLowerCase()
  res.writeHead(200, { 'content-type': MIME[ext] ?? 'application/octet-stream' })
  res.end(body)
})

server.listen(port, host, () => {
  console.log(`static server → http://localhost:${port}/ (serving ${root})`)
})
