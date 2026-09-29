'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { RSize } from '@/data/ringspann'
import { spec } from '@/lib/utils'

const VIEW_W = 740
const VIEW_H = 400
const GAP = 62
const COVER = 13
const FLANGE = 15
const SHAFT = 34
const PAD_TOP = 40
const PAD_BOTTOM = 58

/**
 * A dimensioned outline of one catalogue size, drawn to scale. The
 * geometry is not decorative: face view and section are both projected
 * from the real A, D, L and T values of the model, so a reader holding
 * an old drawing or a caliper is looking at the same proportions the
 * catalogue prints. The section is scrubbed in as the page scrolls.
 */
export function SizeDrawing({ size, className }: { size: RSize; className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const tween = gsap.fromTo(
        '[data-draw="section"]',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: 'none',
          transformOrigin: '0% 50%',
          scrollTrigger: { trigger: root.current, start: 'top 88%', end: 'bottom 45%', scrub: 0.5 },
        },
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: root },
  )

  // One scale for both views, fitted to the box.
  const rawW = size.A + GAP + COVER + FLANGE + size.L + SHAFT
  const rawH = size.A
  const k = Math.min((VIEW_W - 28) / rawW, (VIEW_H - PAD_TOP - PAD_BOTTOM) / rawH)

  const cy = PAD_TOP + (size.A * k) / 2
  const rFlange = (size.A / 2) * k
  const rOut = (size.D / 2) * k
  const rBore = (size.bore / 2) * k
  const faceCx = rFlange + 18

  const secX = faceCx + rFlange + GAP
  const bodyX = secX + COVER + FLANGE
  const bodyW = size.L * k
  const pitchR = (size.T / 2) * k

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      role="img"
      aria-label={`نمای فنی مقیاس‌دار ${size.order} — قطر خارجی D برابر ${spec(size.D, 'mm')}، قطر فلنج A برابر ${spec(size.A, 'mm')} و طول L برابر ${spec(size.L, 'mm')}`}
      fill="none"
    >
      <defs>
        <pattern id="size-hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#4b545c" strokeWidth="1" />
        </pattern>
      </defs>

      {/* ================= face view ================= */}
      <g>
        <circle cx={faceCx} cy={cy} r={rFlange} fill="#191e23" stroke="#6b767f" strokeWidth="1.3" />
        <circle cx={faceCx} cy={cy} r={rFlange} fill="url(#size-hatch)" opacity="0.15" />
        {BOLT_ANGLES.map((a) => (
          <circle
            key={a}
            cx={faceCx + Math.cos((a * Math.PI) / 180) * pitchR}
            cy={cy + Math.sin((a * Math.PI) / 180) * pitchR}
            r={Math.max(2.6, 3.4 * k)}
            fill="#0e1012"
            stroke="#79848d"
            strokeWidth="0.9"
          />
        ))}
        <circle cx={faceCx} cy={cy} r={rOut} fill="#14181c" stroke="#7b868f" strokeWidth="1.4" />
        {ROLLERS.map((a) => (
          <circle
            key={a}
            cx={faceCx + Math.cos((a * Math.PI) / 180) * (rOut + rBore) / 2}
            cy={cy + Math.sin((a * Math.PI) / 180) * (rOut + rBore) / 2}
            r={Math.max(1.8, 2.8 * k)}
            fill="#aab4bc"
            stroke="#79848d"
            strokeWidth="0.6"
          />
        ))}
        <circle cx={faceCx} cy={cy} r={rBore} fill="#0e1012" stroke="#8a949c" strokeWidth="1.4" />
        <line
          x1={faceCx - rFlange - 14}
          y1={cy}
          x2={faceCx + rFlange + 14}
          y2={cy}
          stroke="#5f6a73"
          strokeWidth="0.7"
          strokeDasharray="9 3 2 3"
        />
        <line
          x1={faceCx}
          y1={cy - rFlange - 14}
          x2={faceCx}
          y2={cy + rFlange + 14}
          stroke="#5f6a73"
          strokeWidth="0.7"
          strokeDasharray="9 3 2 3"
        />
        <text x={faceCx} y={cy + rFlange + 34} textAnchor="middle" fill="#79848d" fontSize="9" className="tnum">
          نمای از رو
        </text>
      </g>

      {/* ================= section view ================= */}
      <g data-draw="section">
        <rect x={secX} y={cy - rFlange} width={COVER} height={rFlange * 2} fill="#1c2228" stroke="#6b767f" strokeWidth="1.1" />
        <rect x={secX + COVER} y={cy - rFlange} width={FLANGE} height={rFlange * 2} fill="#232a30" stroke="#6b767f" strokeWidth="1.2" />

        <rect x={bodyX} y={cy - rOut} width={bodyW} height={rOut - rBore} fill="#1a1f24" stroke="#7b868f" strokeWidth="1.3" />
        <rect x={bodyX} y={cy - rOut} width={bodyW} height={rOut - rBore} fill="url(#size-hatch)" opacity="0.12" />
        <rect x={bodyX} y={cy + rBore} width={bodyW} height={rOut - rBore} fill="#1a1f24" stroke="#7b868f" strokeWidth="1.3" />
        <rect x={bodyX} y={cy + rBore} width={bodyW} height={rOut - rBore} fill="url(#size-hatch)" opacity="0.12" />

        <rect x={bodyX} y={cy - rBore} width={bodyW} height={rBore * 2} fill="#2b333a" stroke="#8a949c" strokeWidth="1.3" />
        <rect x={bodyX + bodyW} y={cy - rBore} width={SHAFT} height={rBore * 2} fill="#20262b" stroke="#7b868f" strokeWidth="1.1" />
        <line
          x1={bodyX}
          y1={cy}
          x2={bodyX + bodyW + SHAFT}
          y2={cy}
          stroke="#5f6a73"
          strokeWidth="0.8"
          strokeDasharray="9 3 2 3"
        />
        <text x={secX + (bodyX + bodyW + SHAFT - secX) / 2} y={cy + rFlange + 34} textAnchor="middle" fill="#79848d" fontSize="9" className="tnum">
          مقطع طولی
        </text>
      </g>

      {/* ================= dimensions ================= */}
      <g stroke="var(--color-accent)" strokeWidth="0.8" fill="var(--color-accent)" fontSize="10">
        {/* D — outside diameter, on the face view */}
        <line x1={faceCx - rOut} y1={cy - rFlange - 22} x2={faceCx + rOut} y2={cy - rFlange - 22} />
        <line x1={faceCx - rOut} y1={cy - rFlange - 27} x2={faceCx - rOut} y2={cy - rFlange - 10} />
        <line x1={faceCx + rOut} y1={cy - rFlange - 27} x2={faceCx + rOut} y2={cy - rFlange - 10} />
        <text x={faceCx} y={cy - rFlange - 31} textAnchor="middle" stroke="none" className="tnum">
          ⌀{spec(size.D, 'mm')}
        </text>

        {/* A — flange diameter, outside the face view */}
        <line x1={faceCx + rFlange} y1={cy + rOut + 16} x2={faceCx + rFlange} y2={cy + rFlange + 8} />
        <line x1={faceCx - rFlange} y1={cy + rOut + 16} x2={faceCx - rFlange} y2={cy + rFlange + 8} />
        <line x1={faceCx - rFlange} y1={cy + rFlange + 8} x2={faceCx + rFlange} y2={cy + rFlange + 8} />
        <text x={faceCx} y={cy + rFlange + 24} textAnchor="middle" stroke="none" className="tnum">
          A ⌀{spec(size.A, 'mm')}
        </text>

        {/* d — bore */}
        <line x1={faceCx + rBore} y1={cy + rFlange + 30} x2={faceCx + rBore} y2={cy + rFlange + 40} />
        <line x1={faceCx - rBore} y1={cy + rFlange + 30} x2={faceCx - rBore} y2={cy + rFlange + 40} />
        <line x1={faceCx - rBore} y1={cy + rFlange + 40} x2={faceCx + rBore} y2={cy + rFlange + 40} />
        <text x={faceCx} y={cy + rFlange + 53} textAnchor="middle" stroke="none" className="tnum">
          d ⌀{spec(size.bore, 'mm')}
        </text>

        {/* L — overall length, under the section */}
        <line x1={secX} y1={cy + rFlange + 24} x2={bodyX + bodyW} y2={cy + rFlange + 24} />
        <line x1={secX} y1={cy + rFlange + 18} x2={secX} y2={cy + rFlange + 30} />
        <line x1={bodyX + bodyW} y1={cy + rFlange + 18} x2={bodyX + bodyW} y2={cy + rFlange + 30} />
        <text
          x={secX + (bodyX + bodyW - secX) / 2}
          y={cy + rFlange + 42}
          textAnchor="middle"
          stroke="none"
          className="tnum"
        >
          L {spec(size.L, 'mm')}
        </text>
      </g>
    </svg>
  )
}

const BOLT_ANGLES = [45, 135, 225, 315]
const ROLLERS = Array.from({ length: 10 }, (_, i) => i * 36)
