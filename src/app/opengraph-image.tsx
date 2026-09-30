import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'freewheel.ir — فری‌ویل صنعتی به زبان ساده'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Static export: render the card once at build time into `out/`. */
export const dynamic = 'force-static'

/**
 * The social card is a drawing, not a poster: the same face view of a
 * roller freewheel that runs through the site, with the wordmark and a
 * few catalogue figures. Rendered once at build time and served as a
 * static asset — it never appears in the page bundle.
 *
 * Satori constraints, learned the hard way: no z-index (use document
 * order), no zero-sized nodes, and any glyph missing from the supplied
 * font triggers a network fetch that fails offline. The text below is
 * therefore limited to characters present in the Vazirmatn cut.
 */
export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([
    readFile(path.join(process.cwd(), 'src/assets/fonts/Vazirmatn-OG-400.ttf')),
    readFile(path.join(process.cwd(), 'src/assets/fonts/Vazirmatn-OG-700.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0f2a31',
          color: '#f6f8f8',
          padding: '52px 60px',
          fontFamily: 'Vazirmatn',
        }}
      >
        {/* ---- masthead ---- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="50" height="50" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#eaeff0" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="5.4" stroke="#eaeff0" strokeWidth="1.5" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" transform="rotate(60 14 14)" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" transform="rotate(120 14 14)" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" transform="rotate(180 14 14)" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" transform="rotate(240 14 14)" />
            <rect x="12.8" y="1.6" width="2.4" height="3.2" rx="0.4" fill="#5fd8c6" transform="rotate(300 14 14)" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
              freewheel
              <span style={{ color: '#5fd8c6' }}>.ir</span>
            </span>
            <span style={{ fontSize: 16, color: '#a9c0c3', direction: 'ltr' }}>
              Freewheel and one-way clutch reference tables
            </span>
          </div>
        </div>

        {/* ---- headline + drawing ---- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontSize: 19, color: '#5fd8c6', direction: 'ltr', letterSpacing: '0.14em' }}>
              RINGSPANN — SERIE R
            </span>
            <span style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.3, marginTop: 16 }}>
              جدول کامل ابعاد و گشتاور
            </span>
            <span style={{ fontSize: 22, color: '#b8cfd1', marginTop: 12 }}>
              از R12 تا R150 — اعداد مستقیم از کاتالوگ سازنده
            </span>
          </div>

          <svg width="330" height="330" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="93" stroke="#31535b" strokeWidth="1.3" />
            <circle cx="100" cy="100" r="84" stroke="#23434c" strokeWidth="1" />
            <circle cx="100" cy="100" r="66" stroke="#8da4a7" strokeWidth="1.6" />
            <circle cx="100" cy="100" r="23" fill="#0f2a31" stroke="#5fd8c6" strokeWidth="1.8" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI) / 6
              return (
                <circle
                  key={i}
                  cx={100 + Math.cos(a) * 45}
                  cy={100 + Math.sin(a) * 45}
                  r="5.5"
                  fill="#dce9e8"
                  stroke="#94aaad"
                  strokeWidth="0.8"
                />
              )
            })}
            {Array.from({ length: 4 }, (_, i) => {
              const a = (i * Math.PI) / 2 + Math.PI / 4
              return (
                <circle
                  key={`b${i}`}
                  cx={100 + Math.cos(a) * 77}
                  cy={100 + Math.sin(a) * 77}
                  r="4.5"
                  fill="#0f2a31"
                  stroke="#94aaad"
                  strokeWidth="1"
                />
              )
            })}
            <line x1="2" y1="100" x2="198" y2="100" stroke="#31535b" strokeWidth="0.9" strokeDasharray="9 3 2 3" />
            <line x1="100" y1="2" x2="100" y2="198" stroke="#31535b" strokeWidth="0.9" strokeDasharray="9 3 2 3" />
          </svg>
        </div>

        {/* ---- figure strip ---- */}
        <div style={{ display: 'flex', gap: 48, borderTop: '1px solid #23434c', paddingTop: 24 }}>
          {[
            ['68,000 N·m', 'بیشترین گشتاور اسمی'],
            ['150 mm', 'بیشترین قطر شفت'],
            ['5,400 rpm', 'بیشترین دور آزاد'],
            ['17 سایز', 'از R12 تا R150'],
          ].map(([v, l]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, direction: 'ltr' }}>{v}</span>
              <span style={{ fontSize: 15, color: '#a9c0c3', marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Vazirmatn', data: regular, style: 'normal', weight: 400 },
        { name: 'Vazirmatn', data: bold, style: 'normal', weight: 700 },
      ],
    },
  )
}
