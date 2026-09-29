'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

/* Section geometry. The body is drawn as two real rings with a lane
   between them for the rollers, the way a catalogue cut-away shows it. */
const G = {
  coverX: 34,
  coverW: 24,
  flangeX: 68,
  flangeW: 20,
  bodyX: 100,
  bodyW: 250,
  /* outer ring carries the bearing race; the element lane is deliberately
     deep so the rollers read as the dominant feature */
  outTop: 58,
  raceBot: 106,
  elTop: 106,
  elBot: 234,
  outBot: 234,
  outEnd: 282,
  boreTop: 158,
  boreBot: 182,
  cy: 170,
  shaftX: 350,
  shaftW: 178,
}

const ROLLERS = [122, 160, 198, 236, 274, 312]
const BALLS = [116, 152, 188, 224, 260, 296, 332]

/**
 * Hero drawing: an exploded view of a roller freewheel that assembles,
 * runs, and pulls apart again. Pure SVG on a GSAP timeline so it can be
 * scrubbed or looped. Under `prefers-reduced-motion` the timeline is
 * skipped and the assembled state is rendered statically.
 */
export function FreewheelHero({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.9, defaults: { ease: 'power2.inOut' } })

      // 1 — pull apart along the shaft axis
      tl.fromTo('[data-part="cover"]', { x: 0 }, { x: 118, duration: 0.9 }, 0)
        .fromTo('[data-part="flange"]', { x: 0 }, { x: 66, duration: 0.9 }, 0.05)
        .fromTo('[data-part="rings"]', { x: 0 }, { x: 0, duration: 0.9 }, 0)
        .fromTo('[data-part="rollers"]', { x: 0, opacity: 1 }, { x: -14, opacity: 0.35, duration: 0.75 }, 0)
        .fromTo('[data-part="shaft"]', { x: 0 }, { x: -58, duration: 0.9 }, 0.1)
        .fromTo('[data-part="dim"]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4)

      // 2 — reassemble
      tl.to('[data-part="rollers"]', { x: 0, opacity: 1, duration: 0.75 }, 1.5)
        .to('[data-part="shaft"]', { x: 0, duration: 0.85 }, 1.56)
        .to('[data-part="flange"]', { x: 0, duration: 0.85 }, 1.6)
        .to('[data-part="cover"]', { x: 0, duration: 0.85 }, 1.64)
        .to('[data-part="dim"]', { opacity: 0, duration: 0.35 }, 1.6)

      // 3 — run: the freewheeling side turns, torque arrow comes in
      const spin = gsap.to('[data-spin="ring"]', {
        rotate: 360,
        duration: 2.6,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
      tl.add(spin, 2.5)
        .fromTo('[data-part="contact"]', { opacity: 0.12 }, { opacity: 1, duration: 0.4 }, 3.2)
        .to('[data-part="contact"]', { opacity: 0.12, duration: 0.4 }, 3.6)
        .add(() => spin.kill(), 5.2)

      // 4 — apart again, then home
      tl.to('[data-part="cover"]', { x: 92, duration: 0.8 }, 5.4)
        .to('[data-part="flange"]', { x: 50, duration: 0.8 }, 5.44)
        .to('[data-part="shaft"]', { x: -36, duration: 0.8 }, 5.48)
        .to('[data-part="rollers"]', { x: -10, opacity: 0.4, duration: 0.7 }, 5.5)
        .to('[data-part="dim"]', { opacity: 1, duration: 0.45 }, 5.9)
        .to('[data-part="rollers"]', { x: 0, opacity: 1, duration: 0.7 }, 6.9)
        .to('[data-part="flange"]', { x: 0, duration: 0.8 }, 7)
        .to('[data-part="cover"]', { x: 0, duration: 0.8 }, 7.02)
        .to('[data-part="shaft"]', { x: 0, duration: 0.8 }, 7.06)
        .to('[data-part="dim"]', { opacity: 0, duration: 0.4 }, 7.1)

      return () => {
        tl.kill()
        spin.kill()
        if (root.current) gsap.set(root.current.querySelectorAll('[data-part]'), { clearProps: 'all' })
      }
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      viewBox="14 30 532 314"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="نمای انفجاری فری‌ویل رولری: کاور، فلنج نصب، رینگ بیرونی با شیب رولری، رولرها، رینگ داخلی و شفت"
      fill="none"
    >
      <defs>
        <linearGradient id="hero-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#39424a" />
          <stop offset="60%" stopColor="#232a30" />
          <stop offset="100%" stopColor="#171c21" />
        </linearGradient>
        <pattern id="hero-hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#49525a" strokeWidth="1.2" />
        </pattern>
      </defs>

      {/* ---- cover plate ---- */}
      <g data-part="cover">
        <rect x={G.coverX} y={G.outTop - 14} width={G.coverW} height={G.outEnd - G.outTop + 28} rx="3" fill="url(#hero-metal)" stroke="#6b767f" strokeWidth="1.4" />
        <rect x={G.coverX} y={G.outTop - 14} width={G.coverW} height={G.outEnd - G.outTop + 28} rx="3" fill="url(#hero-hatch)" opacity="0.2" />
        <circle cx={G.coverX + G.coverW / 2} cy={G.cy} r="5" fill="#0e1012" stroke="#8a949c" strokeWidth="1.2" />
      </g>

      {/* ---- mounting flange A7 ---- */}
      <g data-part="flange">
        <rect x={G.flangeX} y={G.outTop - 20} width={G.flangeW} height={G.outEnd - G.outTop + 40} rx="2" fill="url(#hero-metal)" stroke="#6b767f" strokeWidth="1.4" />
        {[G.outTop - 6, G.cy, G.outEnd + 6].map((cy) => (
          <circle key={cy} cx={G.flangeX + G.flangeW / 2} cy={cy} r="3.6" fill="#0e1012" stroke="#8a949c" strokeWidth="1.1" />
        ))}
      </g>

      {/* ---- outer ring, bearings, ramps ---- */}
      <g data-spin="ring" data-part="rings">
        <rect x={G.bodyX} y={G.outTop} width={G.bodyW} height={G.raceBot - G.outTop} fill="url(#hero-metal)" stroke="#6b767f" strokeWidth="1.5" />
        <rect x={G.bodyX} y={G.outTop} width={G.bodyW} height={G.raceBot - G.outTop} fill="url(#hero-hatch)" opacity="0.13" />
        <rect x={G.bodyX} y={G.outBot} width={G.bodyW} height={G.outEnd - G.outBot} fill="url(#hero-metal)" stroke="#6b767f" strokeWidth="1.5" />
        <rect x={G.bodyX} y={G.outBot} width={G.bodyW} height={G.outEnd - G.outBot} fill="url(#hero-hatch)" opacity="0.13" />

        {/* roller ramps cut into the bore, facing the lane */}
        {ROLLERS.map((x) => (
          <g key={x}>
            <path d={`M${x - 15} ${G.raceBot} h30 l-15 20 z`} fill="#0e1012" stroke="#8a949c" strokeWidth="0.9" />
            <path d={`M${x - 15} ${G.outBot} h30 l-15 -20 z`} fill="#0e1012" stroke="#8a949c" strokeWidth="0.9" />
          </g>
        ))}

        {/* ball bearing race, inset into the outer ring */}
        <rect x={G.bodyX + 8} y={G.outTop + 7} width={G.bodyW - 16} height={G.raceBot - G.outTop - 14} rx={10} fill="#12161a" stroke="#59636b" strokeWidth="1" />
        {BALLS.map((x) => (
          <circle key={x} cx={x} cy={(G.outTop + G.raceBot) / 2} r="6" fill="#9ea9b1" stroke="#6b767f" strokeWidth="0.8" />
        ))}
        <rect x={G.bodyX + 8} y={G.outBot + 7} width={G.bodyW - 16} height={G.outEnd - G.outBot - 14} rx={10} fill="#12161a" stroke="#59636b" strokeWidth="1" />
        {BALLS.map((x) => (
          <circle key={`b${x}`} cx={x} cy={(G.outBot + G.outEnd) / 2} r="6" fill="#9ea9b1" stroke="#6b767f" strokeWidth="0.8" />
        ))}
      </g>

      {/* ---- rollers in the element lane ---- */}
      <g data-part="rollers">
        {ROLLERS.map((x) => (
          <g key={x}>
            <circle cx={x} cy={G.elTop + 19} r="12" fill="#ccd5dc" stroke="#7b868f" strokeWidth="1.1" />
            <circle cx={x} cy={G.elBot - 19} r="12" fill="#ccd5dc" stroke="#7b868f" strokeWidth="1.1" />
          </g>
        ))}
      </g>

      {/* ---- line of action ---- */}
      <g data-part="contact" opacity="0.12">
        {ROLLERS.map((x) => (
          <line key={x} x1={x} y1={G.raceBot} x2={x} y2={G.outBot} stroke="var(--color-accent)" strokeWidth="1.4" />
        ))}
      </g>

      {/* ---- inner ring + shaft ---- */}
      <g data-part="shaft">
        <rect x={G.bodyX} y={G.boreTop} width={G.bodyW} height={G.cy - G.boreTop} fill="#2d353c" stroke="#8a949c" strokeWidth="1.4" />
        <rect x={G.bodyX} y={G.cy} width={G.bodyW} height={G.boreBot - G.cy} fill="#2d353c" stroke="#8a949c" strokeWidth="1.4" />
        <rect x={G.shaftX} y={G.boreTop} width={G.shaftW} height={G.boreBot - G.boreTop} fill="url(#hero-metal)" stroke="#8a949c" strokeWidth="1.4" />
        <rect x={G.shaftX} y={G.boreTop} width={G.shaftW} height={G.boreBot - G.boreTop} fill="url(#hero-hatch)" opacity="0.18" />
        <line x1={G.bodyX} y1={G.cy} x2={G.shaftX + G.shaftW} y2={G.cy} stroke="#8a949c" strokeWidth="0.9" strokeDasharray="14 4 3 4" />
        <rect x={G.bodyX + 54} y={G.boreTop + 4} width="46" height={G.boreBot - G.boreTop - 8} fill="#0e1012" stroke="#98a2aa" strokeWidth="1" />
      </g>

      {/* ---- dimension callout, visible while exploded ---- */}
      <g data-part="dim" opacity="0" stroke="var(--color-accent)" strokeWidth="0.9" fill="var(--color-accent)">
        <line x1={G.coverX} y1={G.outEnd + 34} x2={G.flangeX + G.flangeW} y2={G.outEnd + 34} />
        <line x1={G.coverX} y1={G.outEnd + 28} x2={G.coverX} y2={G.outEnd + 40} />
        <line x1={G.flangeX + G.flangeW} y1={G.outEnd + 28} x2={G.flangeX + G.flangeW} y2={G.outEnd + 40} />
        <text
          x={(G.coverX + G.flangeX + G.flangeW) / 2}
          y={G.outEnd + 57}
          textAnchor="middle"
          stroke="none"
          fontSize="11"
          fill="var(--color-accent)"
        >
          فاصلهٔ کاور تا فلنج
        </text>
      </g>

      {/* ---- torque path label ---- */}
      <g>
        <text x={G.shaftX + G.shaftW} y={G.cy - 13} textAnchor="end" fill="#7c8790" fontSize="11">
          شفت
        </text>
        <text x={G.bodyX} y={G.outTop - 10} fill="#7c8790" fontSize="11">
          رینگ بیرونی
        </text>
        <text x={G.bodyX} y={G.elTop + 52} fill="#7c8790" fontSize="11">
          رولری
        </text>
        <text x={G.bodyX + 4} y={G.boreTop - 8} fill="#7c8790" fontSize="11">
          رینگ داخلی
        </text>
      </g>
    </svg>
  )
}
