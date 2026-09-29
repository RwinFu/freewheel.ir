import Link from 'next/link'
import { NAV, SHOPS, site } from '@/data/site'
import { Wordmark } from '@/components/visual/Wordmark'

const RESOURCES = [
  { href: '/ringspann', label: 'سری R — جدول کامل' },
  { href: '/articles', label: 'مقالات فنی' },
  { href: '/applications', label: 'کاربردهای صنعتی' },
  { href: '/brands', label: 'برندهای موجود' },
]

export function Footer() {
  const year = 1404

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-7 text-fg-muted">
              راهنمای فنی فری‌ویل و کلاچ یک‌طرفه. مشخصات اینجا می‌آید تا قبل از خرید بدانید دنبال چه
              قطعه‌ای هستید.
            </p>
          </div>

          <nav aria-label="صفحات" className="lg:col-span-2">
            <h2 className="text-xs font-semibold tracking-widest text-fg-dim">سایت</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="منابع" className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-widest text-fg-dim">منابع</h2>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-widest text-fg-dim">تماس</h2>
            <address className="mt-4 space-y-2 not-italic text-sm text-fg-muted">
              <p className="tnum">{site.contact.phone}</p>
              <p dir="ltr" className="text-start">
                {site.contact.email}
              </p>
              <p className="leading-7">{site.contact.address}</p>
              <p className="leading-7">{site.contact.hours}</p>
            </address>
          </div>
        </div>

        {/* The buy-path. Both sister sites, permanently visible. */}
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          <a
            href={SHOPS.bearing.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center justify-between gap-4 bg-surface-2 px-5 py-4 transition-colors hover:bg-surface-3"
          >
            <span>
              <span className="block text-[0.7rem] text-fg-dim">فروش و استعلام قیمت قطعه</span>
              <span dir="ltr" className="mt-1 block text-start text-base font-semibold text-fg">
                {SHOPS.bearing.host}
              </span>
              <span className="mt-1 block text-xs text-fg-dim">{SHOPS.bearing.blurb}</span>
            </span>
            <ExternalGlyph />
          </a>
          <a
            href={SHOPS.automation.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center justify-between gap-4 bg-surface-2 px-5 py-4 transition-colors hover:bg-surface-3"
          >
            <span>
              <span className="block text-[0.7rem] text-fg-dim">طراحی و ساخت نوار نقاله</span>
              <span dir="ltr" className="mt-1 block text-start text-base font-semibold text-fg">
                {SHOPS.automation.host}
              </span>
              <span className="mt-1 block text-xs text-fg-dim">{SHOPS.automation.blurb}</span>
            </span>
            <ExternalGlyph />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} — {site.name}. مشخصات نقل‌شده از کاتالوگ سازنده است.</p>
          <p>برای سایزبندی نهایی، دیتاشیت روز را از ما بگیرید.</p>
        </div>
      </div>
    </footer>
  )
}

function ExternalGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4 flex-none text-fg-dim transition-colors group-hover:text-accent"
      fill="none"
      aria-hidden
    >
      <path d="M7 4H4.5A1.5 1.5 0 003 5.5v10A1.5 1.5 0 004.5 17h10a1.5 1.5 0 001.5-1.5V13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 3h6v6M17 3l-8 8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
