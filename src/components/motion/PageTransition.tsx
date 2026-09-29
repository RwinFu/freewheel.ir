'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Route-change signal. A 2px safety-orange line under the header runs
 * out and retracts — 240ms out, 200ms back. Asymmetric so the app never
 * feels like it's being held; there is no full-screen cover to wait on.
 * Skipped under reduced motion.
 */
export function PageTransition() {
  const pathname = usePathname()
  const [shownPath, setShownPath] = useState<string | null>(null)
  const [seen, setSeen] = useState(pathname)
  // Read once per mount; the bar is decorative, so reacting to a live
  // change mid-route is not worth another subscription.
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // The bar is a response to navigation, so it is derived from the path
  // during render and torn down on a timer. Adjusting state while
  // rendering (rather than in an effect) is what React recommends here —
  // an effect would cascade a second render on every route change.
  // `seen` starts at the current path, so the initial load never counts
  // as a navigation and no bar flashes on first paint.
  if (pathname !== seen) {
    setSeen(pathname)
    setShownPath(pathname)
  }

  useEffect(() => {
    if (shownPath === null) return
    const t = setTimeout(() => setShownPath(null), 440)
    return () => clearTimeout(t)
  }, [shownPath])

  if (shownPath === null || reduced) return null

  return (
    <div
      key={shownPath}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-0.5 origin-right bg-accent"
      style={{
        animation:
          'route-out 240ms cubic-bezier(0.22,1,0.36,1) forwards, route-back 240ms 200ms cubic-bezier(0.22,1,0.36,1) forwards',
      }}
    />
  )
}
