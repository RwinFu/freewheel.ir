import type { Metadata } from 'next'
import Link from 'next/link'

import { site, SHOPS } from '@/data/site'
import { R_SERIES } from '@/data/ringspann'
import { BRANDS } from '@/data/brands'
import { PageHeader } from '@/components/ui/PageHeader'
import { Counter } from '@/components/motion/Counter'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'دربارهٔ ما',
  description:
    'freewheel.ir چه کاری انجام می‌دهد و چه کاری نمی‌دهد: راهنمای فنی و سایزبندی فری‌ویل، با تمرکز بر سری R رینگسپان. خرید از فروشگاه آنلاین بلبرینگ و طراحی نوار نقاله از شرکت اتوماسیون.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="دربارهٔ ما"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'دربارهٔ ما' }]}
        title="دربارهٔ ما"
        subtitle="What this site is, and what it is not"
        lead="این سایت یک ویترین فروش نیست. کار ما این است که قبل از خرید، بدانید چه می‌خرید — و اگر می‌شود، دقیقاً همان چیزی را بخرید که لازم دارید."
      />

      <section className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <Reveal className="lg:col-span-7">
            <h2 className="text-2xl font-bold">چه کاری انجام می‌دهیم</h2>
            <div className="prose-ir mt-4 max-w-none">
              <p>
                ما روی قطعهٔ انتقال قدرت کار می‌کنیم — مشخصاً فری‌ویل و کلاچ یک‌طرفه. کاری که
                انجام می‌دهیم سه تکه است: انتخاب سایز درست بر اساس شرایط واقعی کار، اعلام موجودی
                و قیمت، و تحویل قطعه.
              </p>
              <p>
                بخش سنگین کار، سایزبندی است. هر مدلی که می‌بینید در این سایت با دیتاشیت سازنده
                تطبیق داده شده و اعداد جدول، همان چیزی است که در کاتالوگ چاپ شده — نه گرد شده، نه
                با اعداد مدل‌های مشابه پر شده. اگر جایی چیزی نداشته باشیم، می‌نویسیم که نداریم.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">چه کاری انجام نمی‌دهیم</h2>
            <div className="prose-ir mt-4 max-w-none">
              <p>
                طراحی و ساخت نوار نقاله و خطوط اتوماسیون، کار ما نیست. اگر برای این نیاز دارید،
                شرکت اتوماسیون{' '}
                <a href={SHOPS.automation.href} target="_blank" rel="noopener noreferrer nofollow" dir="ltr" className="text-fg">
                  {SHOPS.automation.host}
                </a>{' '}
                همان کار را انجام می‌دهد و تجربهٔ پروژه‌های مشابه را دارد. ما فقط قطعهٔ داخل آن
                سیستم را انتخاب و تأمین می‌کنیم.
              </p>
              <p>
                کار با برندهای خارج از فهرست هم نداریم. اگر قطعه‌ای می‌خواهید که این‌جا نیست،
                شماره‌اش را بفرستید؛ می‌گوییم قابل تأمین است یا نه، به‌جای اینکه بگوییم ببینیم.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">چه چیزی برایتان آماده داریم</h2>
            <div className="prose-ir mt-4 max-w-none">
              <p>
                دیتاشیت روزِ هر مدل، راهنمای نصب، و در صورت نیاز بررسی نقشهٔ ساخت شما برای
                تطبیق ابعاد. این‌ها رایگان است و تعهدی برای خرید ایجاد نمی‌کند.
              </p>
              <p>
                یک توصیهٔ عملی: قبل از اینکه با ما تماس بگیرید، اگر می‌توانید سه چیز را بنویسید،
                بنویسید — قطر شفت، توان موتور و اینکه کلاچ کجای خط نشسته. در خیلی از موارد،
                با همین سه مورد مکالمهٔ ما در یک پیام تمام می‌شود.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticLink href="/contact" className="bg-accent text-ink hover:bg-accent-hot">
                تماس با ما
              </MagneticLink>
              <MagneticLink
                href="/ringspann"
                className="border border-line-strong text-fg hover:border-accent hover:text-accent"
              >
                جدول سری R
              </MagneticLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-fg">پوشش سایت در یک نگاه</h2>
              <dl className="mt-5 space-y-5">
                {[
                  { l: 'سایز سری R', v: R_SERIES.length, u: '' },
                  { l: 'بیشترین گشتاور ثبت‌شده', v: 68000, u: 'N·m' },
                  { l: 'برندهای تحت پوشش', v: BRANDS.length, u: '' },
                  { l: 'مقالهٔ فنی', v: 5, u: '' },
                ].map((x) => (
                  <div key={x.l} className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <dt className="text-sm text-fg-dim">{x.l}</dt>
                    <dd className="tnum text-2xl font-bold text-fg">
                      <Counter value={x.v} />
                      {x.u && <span className="ms-1 text-xs font-normal text-fg-dim">{x.u}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 border border-line bg-surface-2 p-6">
              <h2 className="text-sm font-semibold text-fg">دو سایت دیگر</h2>
              <p className="mt-2 text-sm leading-7 text-fg-muted">
                این سایت برای فهمیدن است. خرید و ساخت، جای دیگری انجام می‌شود:
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { h: SHOPS.bearing.host, k: 'فروش و استعلام قیمت', d: SHOPS.bearing.blurb },
                  { h: SHOPS.automation.host, k: 'طراحی و ساخت خط', d: SHOPS.automation.blurb },
                ].map((s) => (
                  <a
                    key={s.h}
                    href={s.h === SHOPS.bearing.host ? SHOPS.bearing.href : SHOPS.automation.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent"
                  >
                    <span className="text-[0.7rem] text-fg-dim">{s.k}</span>
                    <span dir="ltr" className="mt-0.5 block text-start text-sm font-semibold text-fg">
                      {s.h}
                    </span>
                    <span className="mt-1 block text-xs leading-6 text-fg-dim">{s.d}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-fg">تماس</h2>
              <address className="mt-3 space-y-2 not-italic text-sm leading-7 text-fg-muted">
                <p className="tnum">{site.contact.phone}</p>
                <p dir="ltr" className="text-start">
                  {site.contact.email}
                </p>
                <p>{site.contact.address}</p>
                <p className="text-fg-dim">{site.contact.hours}</p>
              </address>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hot"
              >
                فرم تماس
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="shell py-16">
          <Reveal>
            <h2 className="text-xl font-bold">اصلی که با آن کار می‌کنیم</h2>
            <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
              {[
                {
                  t: 'عدد درست یا هیچ',
                  b: 'اگر داده‌ای را نداریم، حدس نمی‌زنیم و در جدول هم نمی‌نویسیم. جدول‌ها همین کار را می‌کنند: هرجا کاتالوگ عددی ندارد، خط تیره گذاشته‌ایم.',
                },
                {
                  t: 'بگو کجا نیست',
                  b: 'اگر رینگسپان برای پروژه‌ات انتخاب درستی نیست، همان را می‌گوییم. فروش یک سایز اشتباه، هزینه‌اش از هیچ فروشی بیشتر است.',
                },
                {
                  t: 'نوشته، نه تزئین',
                  b: 'متن‌های این سایت از سؤال‌های واقعی آمده. اگر جمله‌ای فقط برای پر کردن صفحه نوشته شده باشد، همان‌جا حذف شده است.',
                },
              ].map((x) => (
                <RevealItem key={x.t} className="bg-surface p-6">
                  <h3 className="text-sm font-semibold text-fg">{x.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-fg-muted">{x.b}</p>
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
