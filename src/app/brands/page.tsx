import type { Metadata } from 'next'
import Link from 'next/link'

import { BRANDS } from '@/data/brands'
import { PageHeader } from '@/components/ui/PageHeader'
import { BrandMark } from '@/components/visual/BrandMark'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'برندهای فری‌ویل و کلاچ یک‌طرفه',
  description:
    'Ringspann، SKF، INA، LUK، NIKO و Koyo — نگاهی به برندهایی که کلاچ یک‌طرفه و فری‌ویل تولید می‌کنند، تفاوت واقعی‌شان و اینکه هرکدام برای چه کاری مناسب‌اند.',
  path: '/brands',
})

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="برندها"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'برندها' }]}
        title="برندها"
        subtitle="Freewheel & one-way clutch manufacturers"
        lead="شش برند. یکی از آن‌ها را در عمل می‌شناسیم و بقیه را در جای خودشان. این صفحه فهرست خرید نیست — توضیح می‌دهد هر برند چه چیزی را بهتر انجام می‌دهد و کجا نباید سراغش رفت."
      />

      <section className="shell py-16">
        <Reveal className="grid gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} aria-label={`برند ${b.name}`}>
              <BrandMark name={b.name} mark={b.mark} className="w-full border-0" />
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="shell pb-20">
        <div className="space-y-px border border-line bg-line">
          {BRANDS.map((b, i) => (
            <Reveal key={b.slug} className="bg-surface">
              <article className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 [&>*]:min-w-0">
                <div className="lg:col-span-4">
                  <p className="tnum text-xs text-fg-dim">
                    {String(i + 1).padStart(2, '0')} — {b.since}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    <Link href={`/brands/${b.slug}`} className="transition-colors hover:text-accent">
                      {b.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-fg-dim">
                    {b.country} — {b.tagline}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {b.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2.5 py-1 text-[0.7rem] text-fg-muted"
                      >
                        {t === 'sprag' ? 'سپراگ' : t === 'roller' ? 'رولری' : 'مغناطیسی'}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/brands/${b.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hot"
                  >
                    صفحهٔ کامل {b.name}
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </div>

                <div className="lg:col-span-8">
                  <div className="prose-ir max-w-none">
                    {b.body.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
                    <div className="bg-surface-2 p-4">
                      <p className="text-[0.7rem] tracking-wide text-fg-dim">مناسب</p>
                      <p className="mt-1.5 text-sm leading-7 text-fg-muted">{b.fit}</p>
                    </div>
                    <div className="bg-surface-2 p-4">
                      <p className="text-[0.7rem] tracking-wide text-fg-dim">مناسب نیست</p>
                      <p className="mt-1.5 text-sm leading-7 text-fg-muted">{b.notFit}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <Reveal>
          <SectionHeader
            eyebrow="چطور انتخاب کنیم"
            title="اگر بین دو برند مانده‌اید"
            lead="در عمل، سه چیز تصمیم را عوض می‌کند: چه چیزی روی شفت شما سوار است، چه چیزی در تعمیرات بعدی در دسترس خواهد بود، و چقدر حاضرید بابت عمر قطعه پول بدهید. بقیهٔ اختلاف‌ها در دیتاشیت گم می‌شود."
          />
          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              {
                t: '۱. محدودیت مکانیکی',
                b: 'قطر شفت، طول موجود و شکل قطعهٔ مقابل. این سه‌تا قبل از هر برندی تصمیم را محدود می‌کنند.',
              },
              {
                t: '۲. دسترسی تعمیرات',
                b: 'اگر خط شما پنج سال دیگر هم با همین برند کار می‌کند، همان را نگه دارید. جابه‌جایی برند در تعمیرات بیشتر از قیمت اولیه هزینه دارد.',
              },
              {
                t: '۳. عمر در سرویس',
                b: 'در بک‌استاپ و کلاچ پرکاروبال، تیپ ویژه (لیفت‌آف، RIDUVIT) بیشتر از تعویض برند اثر دارد.',
              },
            ].map((x) => (
              <RevealItem key={x.t} className="bg-surface p-6">
                <h3 className="text-sm font-semibold text-fg">{x.t}</h3>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{x.b}</p>
              </RevealItem>
            ))}
          </div>
        </Reveal>
        <ShopRoute to="bearing" variant="band" className="mt-10" />
      </section>
    </>
  )
}
