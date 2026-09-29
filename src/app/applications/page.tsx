import type { Metadata } from 'next'
import Image from 'next/image'

import { APPLICATIONS } from '@/data/applications'
import { PageHeader } from '@/components/ui/PageHeader'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { buildMetadata } from '@/lib/seo'
import { SHOPS } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'کاربردهای فری‌ویل در صنعت',
  description:
    'نساجی، صنایع غذایی، بسته‌بندی، چاپ، معدن و سیستم‌های نوار نقاله — برای هر کاربرد، مسئلهٔ واقعی، نوع فری‌ویل مناسب و اعداد مرجع.',
  path: '/applications',
})

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="کاربردها"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'کاربردها' }]}
        title="کاربردها"
        subtitle="Where freewheels actually get used"
        lead="شش صنعتی که بیشترین تعداد فری‌ویل در ایران را دارند. برای هرکدام نوشته‌ایم که مسئلهٔ واقعی روی زمین چیست، کدام نوع قطعه جواب می‌دهد و کجا باید سراغ تیپ دیگری رفت."
      />

      {APPLICATIONS.map((app, i) => (
        <article
          key={app.slug}
          id={app.slug}
          className="scroll-mt-24 border-b border-line"
        >
          <div className="shell grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
            <Reveal className={i % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface-2">
                <Image
                  src={app.image}
                  alt={app.lead}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal
              className={`flex flex-col justify-center ${
                i % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'
              }`}
            >
              <p className="eyebrow">
                <span className="tnum text-fg-dim">{String(i + 1).padStart(2, '0')}</span>
                {app.title}
              </p>
              <h2 className="mt-4 text-2xl leading-snug sm:text-3xl">{app.lead}</h2>

              <div className="mt-7 space-y-5">
                <Block label="مسئله" text={app.problem} />
                <Block label="راه‌حل" text={app.solution} accent />
                <Block label="نکتهٔ انتخاب" text={app.tradeOff} />
              </div>

              <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
                {app.figures.map((f) => (
                  <div key={f.label} className="bg-surface px-4 py-3.5">
                    <dt className="text-[0.7rem] leading-5 text-fg-dim">{f.label}</dt>
                    <dd className="tnum mt-1 text-sm text-fg">{f.value}</dd>
                    {f.note && <dd className="mt-0.5 text-[0.68rem] text-fg-dim">{f.note}</dd>}
                  </div>
                ))}
              </dl>

              <div className="mt-7">
                <ShopRoute to={app.route} />
              </div>
            </Reveal>
          </div>
        </article>
      ))}

      <section className="shell py-20">
        <Reveal className="grid gap-8 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold sm:text-3xl">
              اگر کاربرد شما در این فهرست نیست
            </h2>
            <div className="prose-ir mt-4 max-w-none">
              <p>
                شش مورد بالا، پرتکرارترین‌ها هستند، نه تنها موردها. منابع زمینی، پرس، میکسر، چیلر
                و آسانسور هم همین قطعه را می‌خواهند و منطق انتخاب تقریباً یکسان است.
              </p>
              <p>
                اگر مطمئن نیستید کلاچ شما باید در کدام سمت خط بنشیند، یک تست ساده جواب می‌دهد:
                موتور را در حالت کار بررسی کنید. اگر هر وقت بار برمی‌گردد، بک‌استاپ لازم دارید. اگر
                چند موتور روی یک محور هستند و هر وقتی باید یکی قطع و دیگری وصل شود، کلاچ یک‌طرفه
                می‌خواهید. اگر محور باید هر بار یک پله جلو برود، ایندکسینگ.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticLink href="/contact" className="bg-accent text-ink hover:bg-accent-hot">
                توضیح کاربرد شما
              </MagneticLink>
              <MagneticLink
                href="/articles/sizing-what-we-need"
                className="border border-line-strong text-fg hover:border-accent hover:text-accent"
              >
                چه اطلاعاتی لازم داریم
              </MagneticLink>
            </div>
          </div>

          <RevealItem className="lg:col-span-5">
            <div className="border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-fg">مرز کار ما</h2>
              <p className="mt-3 text-sm leading-7 text-fg-muted">
                ما قطعهٔ انتقال قدرت را انتخاب و تأمین می‌کنیم. طراحی و ساخت خود خط، سیستم نوار
                نقاله و اتوماسیون، کار شرکت اتوماسیون است.
              </p>
              <a
                href={SHOPS.automation.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-5 flex items-center justify-between gap-3 border border-line bg-surface-2 px-4 py-3.5 transition-colors hover:border-accent"
              >
                <span>
                  <span className="block text-[0.7rem] text-fg-dim">طراحی و ساخت خط</span>
                  <span dir="ltr" className="mt-0.5 block text-start text-sm font-semibold text-fg">
                    {SHOPS.automation.host}
                  </span>
                </span>
                <svg viewBox="0 0 20 20" className="size-4 flex-none text-fg-dim" fill="none" aria-hidden>
                  <path d="M7 4H4.5A1.5 1.5 0 003 5.5v10A1.5 1.5 0 004.5 17h10a1.5 1.5 0 001.5-1.5V13" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M11 3h6v6M17 3l-8 8" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </a>
            </div>
          </RevealItem>
        </Reveal>
      </section>
    </>
  )
}

function Block({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className={accent ? 'border-s-2 border-accent bg-surface px-4 py-3.5' : ''}>
      <p className={`text-[0.7rem] tracking-wide ${accent ? 'text-accent' : 'text-fg-dim'}`}>
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-8 text-fg-muted">{text}</p>
    </div>
  )
}
