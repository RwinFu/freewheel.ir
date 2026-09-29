'use client'

import Link from 'next/link'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * Magnetic button. The label leans a few pixels toward the cursor inside
 * a 40px field; the shift is capped at 4px so it reads as a physical
 * response rather than a toy. Pointer-fine only, and inert under
 * reduced motion.
 */
export function MagneticLink({
  href,
  children,
  className,
  external = false,
  strength = 0.22,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  strength?: number
}) {
  const ref = useRef<HTMLElement>(null)

  const move = (e: MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate3d(${Math.max(-4, Math.min(4, dx))}px, ${Math.max(-3, Math.min(3, dy))}px, 0)`
  }

  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  const cls = cn(
    'group relative inline-flex min-h-11 items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold transition-colors duration-200 will-change-transform',
    className,
  )

  if (external) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={cls}
        onMouseMove={move}
        onMouseLeave={reset}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={cls}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </Link>
  )
}
