import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import yarnProduction from '@/assets/images/yarn-production.jpg'

import { site, SHOPS } from '@/data/site'
import { FreewheelHero } from '@/components/visual/FreewheelHero'
import { FreewheelTypeDiagram, type FreewheelType } from '@/components/visual/FreewheelTypeDiagram'
import { WorkingSection } from '@/components/visual/WorkingSection'
import { RingspannSection } from '@/components/sections/RingspannSection'
import { BrandsSection } from '@/components/sections/BrandsSection'
import { ApplicationsSection } from '@/components/sections/ApplicationsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { Counter } from '@/components/motion/Counter'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: site.title,
  description: site.description,
  path: '/',
})

const TYPES: { id: FreewheelType; title: string; body: string; rpm: string }[] = [
  {
    id: 'sprag',
    title: 'سپراگ',
    body: 'واشرهای کوچک بین دو رینگ. در حالت آزادچرخش هم با رینگ تماس دارند، پس سایش دارند — ولی قفل شدنشان بدون لقی است و برای موقعیت‌دهی دقیق بهترین گزینه‌اند.',
    rpm: 'مناسب تا حدود ۱۷۰۰ min⁻¹',
  },
  {
    id: 'roller',
    title: 'رولری',
    body: 'رولری‌ها روی شیب رینگ بیرونی می‌افتند و در حالت آزاد اصلاً تماس نمی‌گیرند. همین است که تا دورهای چند هزار در دقیقه دوام می‌آورد.',
    rpm: 'مناسب تا ۵۴۰۰ min⁻¹',
  },
  {
    id: 'magnetic',
    title: 'مغناطیسی',
    body: 'بدون تماس مکانیکی؛ آهنربا در یک جهت به آهن مقابل می‌چسبد و گشتاور می‌دهد. سایش صفر، ولی فقط در گشتاورهای محدود.',
    rpm: 'محدودهٔ گشتاور پایین',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-etch pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow">کلاچ یک‌طرفه — Freewheel</p>

            <h1 className="mt-6 text-4xl leading-[1.25] sm:text-5xl lg:text-[3.4rem]">
              فری‌ویل، قطعه‌ای که در یک جهت گشتاور می‌دهد و در جهت دیگر ساکت می‌ماند
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-9 text-fg-muted">
              هر نوار نقالهٔ شیب‌دار، هر ریل نساجی و هر موتور چندگانهٔ صنعتی، یک لحظه‌ای هست که بار
              برمی‌گردد و همه‌چیز به عقب می‌رود. فری‌ویل دقیقاً همان‌جا کار می‌کند.
            </p>

            <p className="mt-5 max-w-xl leading-8 text-fg-muted">
              اینجا سری R رینگسپان را با اعداد خود کاتالوگ باز کرده‌ایم — گشتاور، دور، ابعاد نصب و
              وزن، برای هر سایز جدا. اگر تا امروز فقط می‌دانستید «یک کلاچ یک‌طرفه می‌خواهم»، بعد از
              این صفحه دقیقاً می‌دانید کدام را می‌خواهید.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticLink
                href="/ringspann"
                className="bg-accent text-ink hover:bg-accent-hot"
              >
                دیدن جدول سری R
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </MagneticLink>
              <MagneticLink
                href="/contact"
                className="border border-line-strong text-fg hover:border-accent hover:text-accent"
              >
                سایزبندی با کمک ما
              </MagneticLink>
            </div>

            <p className="mt-5 text-sm text-fg-dim">
              خرید و استعلام قیمت از{' '}
              <a
                href={SHOPS.bearing.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                dir="ltr"
                className="font-medium text-fg-muted underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-accent"
              >
                {SHOPS.bearing.host}
              </a>
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="text-[0.68rem] tracking-widest text-fg-dim">FGR … R A1A2</span>
                <span className="text-[0.68rem] text-fg-dim">نمای انفجاری</span>
              </div>
              <div className="p-3 sm:p-5">
                <FreewheelHero />
              </div>
            </div>
          </div>
        </div>

        {/* Numbers strip */}
        <div className="border-t border-line bg-surface">
          <div className="shell grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {[
              { l: 'بیشترین گشتاور در سری R', v: 68000, u: 'N·m' },
              { l: 'بیشترین دور آزادچرخش', v: 5400, u: 'min⁻¹' },
              { l: 'بیشترین قطر شفت', v: 150, u: 'mm' },
              { l: 'برندهای زیر پوشش', v: 6, u: '' },
            ].map((f) => (
              <div key={f.l} className="bg-surface px-5 py-5">
                <p className="tnum text-2xl font-bold text-fg">
                  <Counter value={f.v} />
                  {f.u && <span className="ms-1 text-sm font-normal text-fg-dim">{f.u}</span>}
                </p>
                <p className="mt-1 text-xs leading-6 text-fg-dim">{f.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW A FREEWHEEL WORKS ==================== */}
      <section id="how" className="shell py-20 sm:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="tnum text-fg-dim">۰۱</span> نحوهٔ کار
            </p>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              سه خانواده، یک منطق
            </h2>
            <p className="mt-5 leading-8 text-fg-muted">
              تفاوت سه نوع زیر در یک جمله خلاصه می‌شود: در حالت آزادچرخش، قطعهٔ گیرکننده به رینگ
              مقابل می‌خورد یا نمی‌خورد. همین یک جمله، دور مجاز، عمر واقعی و انتخاب سایز را تعیین
              می‌کند.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {TYPES.map((t) => (
            <RevealItem key={t.id} className="flex flex-col bg-surface p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold text-fg">{t.title}</h3>
                <span className="tnum text-xs text-accent">{t.rpm}</span>
              </div>
              <div className="my-6 border border-line bg-ink p-3">
                <FreewheelTypeDiagram type={t.id} />
              </div>
              <p className="text-sm leading-7 text-fg-muted">{t.body}</p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-6 border border-line bg-surface-2 p-6 sm:grid-cols-3 sm:p-8">
            {[
              { k: 'بک‌استاپ', v: 'گرفتن گشتاور برگشتی. در حالت کار عادی کاملاً بی‌اثر است.' },
              { k: 'کلاچ یک‌طرفه', v: 'عبور گشتاور فقط در یک جهت؛ بقیهٔ موتورها آزاد می‌شوند.' },
              { k: 'فری‌ویل ایندکسینگ', v: 'هر حرکت، یک پلهٔ دقیق. ساخته‌شده برای توقف‌های پرتعداد.' },
            ].map((x) => (
              <div key={x.k}>
                <p className="text-sm font-semibold text-fg">{x.k}</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{x.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ======================= PINNED WORKING CYCLE ======================= */}
      <WorkingSection />

      {/* ========================== RINGSPANN ========================== */}
      <RingspannSection />

      {/* =========================== BRANDS =========================== */}
      <BrandsSection />

      {/* ========================= APPLICATIONS ========================= */}
      <ApplicationsSection />

      {/* ======================= TECHNICAL READING ======================= */}
      <section className="border-y border-line bg-surface">
        <div className="shell py-20 sm:py-24">
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">
                <span className="tnum text-fg-dim">۰۶</span> نگاه نزدیک
              </p>
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
                همان چیزی که توی نقشهٔ خط شما عوض می‌شود
              </h2>
              <p className="mt-5 leading-8 text-fg-muted">
                یک خط نساجی با ۳۲ ریل. هر ریل یک کلاچ یک‌طرفه روی محورش. کاری که در مقالهٔ خرابی
                توضیح دادیم، از همین‌جا شروع می‌شود: وقتی یک ریل از بقیه جلو می‌افتد، کلاچ خودش
                آزاد می‌چرخد و گیر نمی‌کند.
              </p>
              <Link
                href="/articles/textile-conveyor-failure"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                مقاله: چرا کلاچ نوار نقالهٔ نساجی می‌سوزد
                <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:-translate-x-1" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>

            <RevealItem className="relative lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden border border-line">
                <Image
                  src={yarnProduction}
                  alt="خط تولید نخ در کارخانهٔ نساجی؛ ریل‌ها و ماشین‌آلات در حال کار"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/70" />
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-px border border-line bg-line">
                {[
                  { l: 'سرعت هر ریل', v: '۱۳۰۰' },
                  { l: 'گشتاور هر کلاچ', v: '۱۰۰۰ N·m' },
                  { l: 'سایز پیشنهادی', v: 'R40' },
                ].map((x) => (
                  <div key={x.l} className="bg-surface px-4 py-3">
                    <dt className="text-[0.7rem] text-fg-dim">{x.l}</dt>
                    <dd className="tnum mt-1 text-sm text-fg">{x.v}</dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <FaqSection index="۰۷" />

      {/* ============================ CLOSING ============================ */}
      <section className="border-t border-line bg-surface-2">
        <div className="shell py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">قدم بعدی</p>
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
                سایزبندی رایگان است
              </h2>
              <p className="mt-5 max-w-lg leading-8 text-fg-muted">
                قطر شفت و توان موتور را بفرستید؛ بقیه را خودمان می‌پرسیم. اگر داده‌های بیشتری
                ندارید هم اشکالی ندارد — سایز تقریبی می‌دهیم و بعد با هم دقیقش می‌کنیم. خیلی وقت‌ها
                مشتری فقط قطر شفت و توان موتور را می‌فرستد و کار همان‌جا تمام می‌شود.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticLink href="/contact" className="bg-accent text-ink hover:bg-accent-hot">
                  درخواست سایزبندی
                </MagneticLink>
                <MagneticLink
                  href="/ringspann"
                  className="border border-line-strong text-fg hover:border-accent hover:text-accent"
                >
                  مقایسهٔ سایزها
                </MagneticLink>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <RouteCard
                href={SHOPS.bearing.href}
                kicker="فروش و استعلام قیمت قطعه"
                title={SHOPS.bearing.host}
                body="خرید انواع بلبرینگ، یاتاقان و قطعات انتقال قدرت. برای قیمت و موجودی همین‌جاست."
              />
              <RouteCard
                href={SHOPS.automation.href}
                kicker="طراحی و ساخت خط"
                title={SHOPS.automation.host}
                body="سیستم‌های نوار نقاله، انتقال‌دهنده و اتوماسیون صنعتی؛ از طراحی تا راه‌اندازی."
              />
              <p className="text-xs leading-6 text-fg-dim">
                مشخصات فنی این سایت از کاتالوگ سازنده نقل شده و برای انتخاب اولیه است. قبل از
                خرید، دیتاشیت روزِ همان مدل را از ما بگیرید و با نقشهٔ خودتان تطبیق دهید.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function RouteCard({
  href,
  kicker,
  title,
  body,
}: {
  href: string
  kicker: string
  title: string
  body: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group flex items-start justify-between gap-4 border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <span>
        <span className="block text-[0.7rem] text-fg-dim">{kicker}</span>
        <span dir="ltr" className="mt-1.5 block text-start text-lg font-bold text-fg">
          {title}
        </span>
        <span className="mt-2 block text-sm leading-7 text-fg-muted">{body}</span>
      </span>
      <svg
        viewBox="0 0 20 20"
        className="mt-1 size-4 flex-none text-fg-dim transition-colors group-hover:text-accent"
        fill="none"
        aria-hidden
      >
        <path d="M7 4H4.5A1.5 1.5 0 003 5.5v10A1.5 1.5 0 004.5 17h10a1.5 1.5 0 001.5-1.5V13" stroke="currentColor" strokeWidth="1.3" />
        <path d="M11 3h6v6M17 3l-8 8" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </a>
  )
}
