import type { Metadata } from 'next'
import Link from 'next/link'

import { site, SHOPS } from '@/data/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { Reveal } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'تماس و درخواست سایزبندی',
  description:
    'قطر شفت و توان موتور را بفرستید تا سایز فری‌ویل مناسب را پیشنهاد دهیم. سایزبندی رایگان است و تعهدی برای خرید ندارد. قیمت و موجودی از فروشگاه آنلاین بلبرینگ.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تماس"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'تماس' }]}
        title="درخواست سایزبندی"
        subtitle="Send us a shaft diameter and a motor power"
        lead="حداقل چیزی که لازم داریم، قطر شفت و توان موتور است. هرچه بیشتر بنویسید، پیشنهاد ما دقیق‌تر. سایزبندی رایگان است."
      />

      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <Reveal className="lg:col-span-7">
            <h2 className="text-xl font-bold">فرم درخواست</h2>
            <p className="mt-3 max-w-xl leading-8 text-fg-muted">
              دو ستون اول کافی است تا شروع کنیم. بقیه هرچه در دست دارید بنویسید.
            </p>
            <EnquiryForm />
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-fg">تماس مستقیم</h2>
              <address className="mt-4 space-y-3 not-italic text-sm leading-7 text-fg-muted">
                <div>
                  <p className="text-xs text-fg-dim">تلفن</p>
                  <p className="tnum mt-0.5 text-fg">{site.contact.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-fg-dim">ایمیل</p>
                  <p dir="ltr" className="mt-0.5 text-start text-fg">
                    {site.contact.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-fg-dim">نشانی</p>
                  <p className="mt-0.5">{site.contact.address}</p>
                </div>
                <div>
                  <p className="text-xs text-fg-dim">ساعات کاری</p>
                  <p className="mt-0.5">{site.contact.hours}</p>
                </div>
              </address>
            </div>

            <div className="mt-4 border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-fg">قبل از اینکه بنویسید</h2>
              <p className="mt-3 text-sm leading-7 text-fg-muted">
                اگر مطمئن نیستید کدام کاربرد است، دو سؤال را از خودتان بپرسید:
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-fg-muted">
                <li className="flex gap-3">
                  <span className="text-accent">۱.</span>
                  <span>
                    هر وقت بار یا محور برمی‌گردد، <strong className="text-fg">بک‌استاپ</strong> می‌خواهید.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">۲.</span>
                  <span>
                    چند موتور روی یک محور هستند و باید یکی قطع و دیگری وصل شود،{' '}
                    <strong className="text-fg">کلاچ یک‌طرفه</strong> می‌خواهید.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">۳.</span>
                  <span>
                    محور باید هر بار دقیقاً یک پله جلو برود،{' '}
                    <strong className="text-fg">فری‌ویل ایندکسینگ</strong> می‌خواهید.
                  </span>
                </li>
              </ul>
              <Link
                href="/articles/sizing-what-we-need"
                className="mt-5 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hot"
              >
                راهنمای کامل سایزبندی
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>

            <div className="mt-4 border border-line bg-surface-2 p-6">
              <h2 className="text-sm font-semibold text-fg">اگر عجله دارید</h2>
              <p className="mt-3 text-sm leading-7 text-fg-muted">
                قیمت و موجودی را از فروشگاه آنلاین بلبرینگ بگیرید؛ برای سیستم نوار نقاله هم شرکت
                اتوماسیون پاسخگوست.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { h: SHOPS.bearing.href, t: SHOPS.bearing.host, k: 'قیمت و خرید' },
                  { h: SHOPS.automation.href, t: SHOPS.automation.host, k: 'طراحی خط' },
                ].map((s) => (
                  <a
                    key={s.t}
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-between gap-3 border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
                  >
                    <span>
                      <span className="block text-[0.68rem] text-fg-dim">{s.k}</span>
                      <span dir="ltr" className="mt-0.5 block text-start text-sm text-fg">
                        {s.t}
                      </span>
                    </span>
                    <svg viewBox="0 0 20 20" className="size-3.5 flex-none text-fg-dim" fill="none" aria-hidden>
                      <path d="M7 4H4.5A1.5 1.5 0 003 5.5v10A1.5 1.5 0 004.5 17h10a1.5 1.5 0 001.5-1.5V13" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M11 3h6v6M17 3l-8 8" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
