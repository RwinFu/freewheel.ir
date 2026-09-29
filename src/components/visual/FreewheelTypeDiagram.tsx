'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

export type FreewheelType = 'sprag' | 'roller' | 'magnetic'

const GEOM = {
  x0: 56,
  x1: 244,
  /** Outer ring band */
  outTop: 44,
  outMid: 78,
  outBot: 226,
  outEnd: 260,
  /** Clamping-element lane */
  elTop: 78,
  elBot: 226,
  /** Bore */
  boreTop: 112,
  boreBot: 192,
  cy: 150,
}

const N = 6
const SPAN = (GEOM.x1 - GEOM.x0 - 16) / (N - 1)
const at = (i: number) => GEOM.x0 + 8 + i * SPAN

/**
 * Cross-section of one clamping-element family, cycling between
 * freewheeling and driving. The elements visibly disengage and
 * re-engage — that contact/no-contact difference is the whole argument
 * of the section, so it is animated rather than described.
 */
export function FreewheelTypeDiagram({ type, className }: { type: FreewheelType; className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, defaults: { ease: 'power2.inOut' } })
      const lock = { on: 0.55, off: 0.45 }

      if (type === 'sprag') {
        tl.to('[data-el="sprag"]', { skewX: -13, x: 5, duration: lock.on })
          .to('[data-el="wedge"]', { opacity: 1, duration: 0.3 }, '<')
          .to('[data-el="ring-out"]', { x: -10, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 1, duration: 0.25 }, '<')
          .to({}, { duration: 1.6 })
          .to('[data-el="sprag"]', { skewX: 0, x: 0, duration: lock.off })
          .to('[data-el="wedge"]', { opacity: 0, duration: 0.3 }, '<')
          .to('[data-el="ring-out"]', { x: 0, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 0, duration: 0.25 }, '<')
      }

      if (type === 'roller') {
        tl.to('[data-el="roller"]', { y: 12, duration: lock.on })
          .to('[data-el="wedge"]', { opacity: 1, duration: 0.3 }, '<')
          .to('[data-el="ring-out"]', { x: -10, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 1, duration: 0.25 }, '<')
          .to({}, { duration: 1.6 })
          .to('[data-el="roller"]', { y: 0, duration: lock.off })
          .to('[data-el="wedge"]', { opacity: 0, duration: 0.3 }, '<')
          .to('[data-el="ring-out"]', { x: 0, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 0, duration: 0.25 }, '<')
      }

      if (type === 'magnetic') {
        tl.to('[data-el="pole"]', { y: 0, opacity: 1, duration: lock.on })
          .to('[data-el="flux"]', { opacity: 0.9, duration: 0.35 }, '<')
          .to('[data-el="ring-out"]', { x: -10, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 1, duration: 0.25 }, '<')
          .to({}, { duration: 1.6 })
          .to('[data-el="pole"]', { y: -30, opacity: 0.25, duration: lock.off })
          .to('[data-el="flux"]', { opacity: 0, duration: 0.35 }, '<')
          .to('[data-el="ring-out"]', { x: 0, duration: 0.7 }, '<')
          .to('[data-el="drive"]', { opacity: 0, duration: 0.25 }, '<')
      }

      return () => tl.kill()
    },
    { scope: root, dependencies: [type] },
  )

  return (
    <svg
      ref={root}
      viewBox="8 26 276 250"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label={LABELS[type]}
      fill="none"
    >
      <defs>
        <pattern id={`hatch-${type}`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#49525a" strokeWidth="1.2" />
        </pattern>
      </defs>

      {/* ---------------- outer ring — the part that overruns ---------------- */}
      <g data-el="ring-out">
        <rect x={GEOM.x0} y={GEOM.outTop} width={GEOM.x1 - GEOM.x0} height={GEOM.outMid - GEOM.outTop} fill="#1b2026" stroke="#5f6a73" strokeWidth="1.3" />
        <rect x={GEOM.x0} y={GEOM.outBot} width={GEOM.x1 - GEOM.x0} height={GEOM.outEnd - GEOM.outBot} fill="#1b2026" stroke="#5f6a73" strokeWidth="1.3" />
        <rect x={GEOM.x0} y={GEOM.outTop} width={GEOM.x1 - GEOM.x0} height={GEOM.outMid - GEOM.outTop} fill={`url(#hatch-${type})`} opacity="0.12" />
        <rect x={GEOM.x0} y={GEOM.outBot} width={GEOM.x1 - GEOM.x0} height={GEOM.outEnd - GEOM.outBot} fill={`url(#hatch-${type})`} opacity="0.12" />

        {type === 'roller' &&
          Array.from({ length: N }, (_, i) => (
            <g key={i}>
              {/* ramps cut into the bore, top and bottom */}
              <path d={`M${at(i) - 11} ${GEOM.outMid} h22 l-11 14 z`} fill="#0e1012" stroke="#7b868f" strokeWidth="0.9" />
              <path d={`M${at(i) - 11} ${GEOM.outBot} h22 l-11 -14 z`} fill="#0e1012" stroke="#7b868f" strokeWidth="0.9" />
            </g>
          ))}

        {type === 'magnetic' &&
          Array.from({ length: 4 }, (_, i) => (
            <g key={i}>
              <rect
                x={GEOM.x0 + 6 + i * 52}
                y={GEOM.outMid - 26}
                width="30"
                height="26"
                fill={i % 2 === 0 ? '#4b2c2c' : '#2a3c49'}
                stroke="#77828b"
                strokeWidth="1"
              />
              <rect
                x={GEOM.x0 + 6 + i * 52}
                y={GEOM.outBot}
                width="30"
                height="26"
                fill={i % 2 === 0 ? '#2a3c49' : '#4b2c2c'}
                stroke="#77828b"
                strokeWidth="1"
              />
            </g>
          ))}

        <path d={`M${GEOM.x1 + 6} ${GEOM.cy} a34 34 0 0 1 12 0`} stroke="#6e7a83" strokeWidth="1.1" strokeDasharray="4 3" />
        <path d={`M${GEOM.x1 + 18} ${GEOM.cy} l-7 -4 v8 z`} fill="#6e7a83" />
      </g>

      {/* ---------------- clamping elements ---------------- */}
      {type === 'sprag' &&
        Array.from({ length: N }, (_, i) => (
          <g key={i}>
            <rect
              data-el="sprag"
              x={at(i) - 2}
              y={GEOM.elTop + 3}
              width="4"
              height={GEOM.cy - GEOM.elTop - 3}
              rx="1"
              fill="#b6c0c8"
              stroke="#7b868f"
              strokeWidth="0.9"
              style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
            />
            <rect
              data-el="sprag"
              x={at(i) - 2}
              y={GEOM.cy}
              width="4"
              height={GEOM.elBot - GEOM.cy - 3}
              rx="1"
              fill="#b6c0c8"
              stroke="#7b868f"
              strokeWidth="0.9"
              style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
            />
          </g>
        ))}

      {type === 'roller' &&
        Array.from({ length: N }, (_, i) => (
          <g key={i}>
            <circle data-el="roller" cx={at(i)} cy={GEOM.elTop + 14} r="9" fill="#c3ccd4" stroke="#7b868f" strokeWidth="1" />
            <circle data-el="roller" cx={at(i)} cy={GEOM.elBot - 14} r="9" fill="#c3ccd4" stroke="#7b868f" strokeWidth="1" />
            <path data-el="roller" d={`M${at(i)} ${GEOM.elTop + 5} v-4`} stroke="#7b868f" strokeWidth="0.9" />
            <path data-el="roller" d={`M${at(i)} ${GEOM.elBot - 5} v4`} stroke="#7b868f" strokeWidth="0.9" />
          </g>
        ))}

      {type === 'magnetic' &&
        Array.from({ length: 4 }, (_, i) => (
          <g key={i}>
            <rect
              data-el="pole"
              x={GEOM.x0 + 6 + i * 52}
              y={GEOM.boreTop - 6}
              width="30"
              height="12"
              fill="#8d3b3b"
              stroke="#b06464"
              strokeWidth="0.9"
              opacity="0.25"
            />
            <line data-el="flux" x1={GEOM.x0 + 21 + i * 52} y1={GEOM.outMid} x2={GEOM.x0 + 21 + i * 52} y2={GEOM.boreTop - 6} stroke="var(--color-accent)" strokeWidth="1.3" strokeDasharray="3 3" opacity="0" />
            <line data-el="flux" x1={GEOM.x0 + 21 + i * 52} y1={GEOM.boreBot - 6} x2={GEOM.x0 + 21 + i * 52} y2={GEOM.outBot} stroke="var(--color-accent)" strokeWidth="1.3" strokeDasharray="3 3" opacity="0" />
          </g>
        ))}

      {/* ---------------- the wedge that carries torque ---------------- */}
      <g data-el="wedge" opacity="0">
        {Array.from({ length: N }, (_, i) => (
          <g key={i}>
            <line x1={at(i)} y1={GEOM.outMid} x2={at(i)} y2={GEOM.elBot} stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.55" />
          </g>
        ))}
      </g>

      {/* ---------------- inner ring + shaft — the driven part ---------------- */}
      <rect x={GEOM.x0} y={GEOM.boreTop} width={GEOM.x1 - GEOM.x0} height={GEOM.cy - GEOM.boreTop} fill="#2d353c" stroke="#8a949c" strokeWidth="1.3" />
      <rect x={GEOM.x0} y={GEOM.cy} width={GEOM.x1 - GEOM.x0} height={GEOM.boreBot - GEOM.cy} fill="#2d353c" stroke="#8a949c" strokeWidth="1.3" />
      <line x1={GEOM.x0} y1={GEOM.cy} x2={GEOM.x1 + 30} y2={GEOM.cy} stroke="#6e7a83" strokeWidth="0.9" strokeDasharray="9 3 2 3" />
      <rect x={GEOM.x1} y={GEOM.boreTop} width="30" height={GEOM.boreBot - GEOM.boreTop} fill="#242b31" stroke="#8a949c" strokeWidth="1.2" />

      <g data-el="drive" opacity="0">
        <line x1={GEOM.x1 + 38} y1={GEOM.cy} x2={GEOM.x1 + 50} y2={GEOM.cy} stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        <path d={`M${GEOM.x1 + 56} ${GEOM.cy} l-8 -5 v10 z`} fill="var(--color-accent)" />
      </g>
    </svg>
  )
}

const LABELS: Record<FreewheelType, string> = {
  sprag: 'مقطع سپراگ: واشرها در حالت آزادچرخش کنار رینگ بیرونی می‌مانند و در حالت درایو بین دو رینگ گیر می‌کنند.',
  roller: 'مقطع رولری: رولرها در شیب رینگ بیرونی می‌افتند و در حالت آزادچرخش اصلاً به رینگ مقابل نمی‌رسند.',
  magnetic: 'مقطع مغناطیسی: قطب‌های آهنربا در یک جهت به آهن مقابل می‌چسبند و گشتاور می‌دهند، در جهت مخالف آزادند.',
}
