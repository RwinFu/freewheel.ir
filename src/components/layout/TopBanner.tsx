import Link from 'next/link'
import { SHOPS } from '@/data/site'

/**
 * One slim strip above everything, pointing at the shop that actually
 * takes the order. On a phone it shows the one link that matters — the
 * shop — and the second destination moves into the nav. Two long latin
 * hostnames on one 390px line is not a banner, it's a mess.
 */
export function TopBanner() {
  return (
    <div className="relative z-50 border-b border-line bg-surface-2">
      <div className="shell flex h-9 items-center gap-4">
        <p className="flex min-w-0 flex-1 items-center gap-2 text-[0.7rem] leading-none text-fg-muted sm:text-xs">
          <span className="hidden size-1.5 flex-none rounded-full bg-accent sm:block" aria-hidden />
          <span className="min-w-0 truncate">
            <span className="sm:hidden">قیمت و خرید: </span>
            <span className="hidden sm:inline">ثبت سفارش و استعلام قیمت: </span>
            <Link
              href={SHOPS.bearing.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-semibold text-fg underline decoration-accent decoration-1 underline-offset-[3px] transition-colors hover:text-accent"
            >
              {SHOPS.bearing.host}
            </Link>
            <span className="mx-1.5 hidden text-fg-dim sm:inline">·</span>
            <Link
              href={SHOPS.automation.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-semibold text-fg underline decoration-accent decoration-1 underline-offset-[3px] transition-colors hover:text-accent max-sm:hidden"
            >
              {SHOPS.automation.host}
            </Link>
          </span>
        </p>
        <span className="hidden flex-none items-center gap-1.5 text-[0.65rem] tracking-widest text-fg-dim lg:flex">
          <span className="h-3 w-px bg-line" aria-hidden />
          استاندارد ISO — DIN
        </span>
      </div>
    </div>
  )
}
