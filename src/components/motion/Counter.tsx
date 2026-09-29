'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Counts up to `value` the first time it scrolls into view. Uses a
 * monotonic tween on an object rather than animating textContent, so
 * the browser never has to re-layout mid-frame.
 */
export function Counter({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  separator = true,
  duration = 1.5,
  className,
}: {
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  separator?: boolean
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return

      const render = (n: number) => {
        const fixed = n.toFixed(decimals)
        const text = separator && decimals === 0 ? Number(fixed).toLocaleString('en-US') : fixed
        node.textContent = `${prefix}${text}${suffix}`
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        render(value)
        return
      }

      const state = { n: 0 }
      gsap.to(state, {
        n: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => render(state.n),
        scrollTrigger: { trigger: node, start: 'top 92%', once: true },
      })
      render(0)
    },
    { scope: ref, dependencies: [value, decimals, duration] },
  )

  return (
    <span ref={ref} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  )
}
