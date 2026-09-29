import Link from 'next/link'
import { NAV } from '@/data/site'
import { Wordmark } from '@/components/visual/Wordmark'

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="tnum text-sm tracking-widest text-accent">۴۰۴</p>
      <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">این صفحه پیدا نشد</h1>
      <p className="mt-5 max-w-xl leading-8 text-fg-muted">
        ممکن است نشانی را اشتباه وارد کرده باشید، یا صفحه جابه‌جا شده باشد. اگر دنبال یک مدل
        مشخص بودید، فهرست کامل سری R از اینجا باز می‌شود.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/ringspann" className="inline-flex min-h-11 items-center bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hot">
          جدول کامل سری R
        </Link>
        <Link href="/" className="inline-flex min-h-11 items-center border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent">
          صفحهٔ اصلی
        </Link>
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <Wordmark className="h-7 w-auto" />
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {NAV.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
