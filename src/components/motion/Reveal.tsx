'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Scroll reveal. Elements start at their final position when JS is off
 * or motion is reduced — the animation is additive, never a gate on
 * content being visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: React.ElementType
}) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const root = scope.current
      if (!root) return
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger: root, start: 'top 88%', once: true },
        },
      )
    },
    { scope },
  )

  return (
    <Tag ref={scope} className={className} data-reveal-root>
      {children}
    </Tag>
  )
}

/** Same idea, applied per-element for lists and grids. */
export function RevealItem({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return (
    <Tag data-reveal className={className}>
      {children}
    </Tag>
  )
}
