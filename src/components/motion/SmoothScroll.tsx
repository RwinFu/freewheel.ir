'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scroll. Lenis drives the frame loop and GSAP's ticker, so
 * ScrollTrigger and Lenis stay in lockstep instead of fighting over the
 * scroll position. One rAF for the whole page.
 *
 * Disabled outright under `prefers-reduced-motion` — an eased scroll is
 * exactly the kind of thing that setting exists to turn off.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Coarse pointers get native momentum; hijacking it on touch feels broken.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1 })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
