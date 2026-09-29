'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV } from '@/data/site'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/visual/Wordmark'

export function Header() {
  const pathname = usePathname()
  // The drawer is keyed by path: a new route mounts a fresh, closed drawer
  // without needing an effect to close the old one.
  const [drawer, setDrawer] = useState({ path: pathname, open: false })
  const open = drawer.path === pathname && drawer.open
  const setOpen = (next: boolean) => setDrawer({ path: pathname, open: next })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer((d) => ({ ...d, open: false }))
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-ink/92 backdrop-blur-md' : 'border-transparent bg-ink',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="freewheel.ir — صفحهٔ اصلی"
        >
          <Wordmark className="h-7 w-auto" />
        </Link>

        <nav aria-label="ناوبری اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative block px-3 py-2 text-[0.85rem] transition-colors',
                    isActive(item.href) ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-accent" aria-hidden />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden border border-line-strong px-4 py-2 text-[0.8rem] font-medium text-fg transition-colors hover:border-accent hover:text-accent sm:block"
          >
            استعلام قیمت
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            className="flex size-11 items-center justify-center border border-line text-fg transition-colors hover:border-accent lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2.5 6h15M2.5 10h15M2.5 14h15" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="ناوبری موبایل" className="shell py-4">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between border-b border-line py-3.5 text-[0.95rem]',
                    isActive(item.href) ? 'text-accent' : 'text-fg-muted',
                  )}
                >
                  {item.label}
                  <svg viewBox="0 0 16 16" className="size-3.5 opacity-45" aria-hidden>
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-5 block bg-accent px-4 py-3.5 text-center text-sm font-semibold text-ink"
          >
            درخواست قیمت و مشاورهٔ سایزبندی
          </Link>
        </nav>
      </div>
    </header>
  )
}
