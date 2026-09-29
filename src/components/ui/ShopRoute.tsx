import Link from 'next/link'
import { SHOPS } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * The buy-path. Appears at the end of every spec table and inside the
 * application sections, and it always names which of the two sister
 * sites owns the next step — quoting a price and redesigning a conveyor
 * are different conversations with different people.
 */
export function ShopRoute({
  to,
  variant = 'inline',
  className,
}: {
  to: 'bearing' | 'automation'
  variant?: 'inline' | 'band'
  className?: string
}) {
  const shop = SHOPS[to]
  const lead =
    to === 'bearing'
      ? 'برای استعلام قیمت و خرید، به فروشگاه آنلاین بلبرینگ مراجعه کنید'
      : 'برای طراحی و ارتقای سیستم نوار نقاله، شرکت اتوماسیون تجربهٔ پروژه‌های مشابه را دارد'

  if (variant === 'band') {
    return (
      <div className={cn('border border-line bg-surface-2', className)}>
        <div className="hatch h-1.5 w-full" aria-hidden />
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-2xl text-sm leading-7 text-fg-muted">
            {lead}{' '}
            <a
              href={shop.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-semibold text-fg underline decoration-accent decoration-1 underline-offset-[5px] transition-colors hover:text-accent"
              dir="ltr"
            >
              {shop.host}
            </a>
            .
          </p>
          <a
            href={shop.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex min-h-11 flex-none items-center justify-center gap-2 bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hot"
          >
            {to === 'bearing' ? 'رفتن به فروشگاه' : 'درخواست مشاورهٔ خط'}
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <aside className={cn('flex items-start gap-3 border-s-2 border-accent bg-surface px-4 py-3.5', className)}>
      <svg viewBox="0 0 20 20" className="mt-1 size-4 flex-none text-accent" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 6v4.5M10 13.4v.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="text-sm leading-7 text-fg-muted">
        {lead} —{' '}
        <a
          href={shop.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          dir="ltr"
          className="font-semibold text-fg underline decoration-accent decoration-1 underline-offset-[5px] transition-colors hover:text-accent"
        >
          {shop.host}
        </a>
      </p>
    </aside>
  )
}

/** Compact cross-link used at the foot of application pages. */
export function RouteTo({ to, children }: { to: 'bearing' | 'automation'; children: React.ReactNode }) {
  const shop = SHOPS[to]
  return (
    <Link
      href={to === 'bearing' ? '/brands' : '/applications'}
      className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
    >
      {children}
      <span className="text-fg-dim" dir="ltr">
        {shop.host} ↗
      </span>
    </Link>
  )
}
