import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BRANDS, getBrand } from '@/data/brands'
import { R_SERIES_MAIN } from '@/data/ringspann'
import { PageHeader } from '@/components/ui/PageHeader'
import { SpecTable } from '@/components/ui/SpecTable'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { buildMetadata, toEnDigits, BASE_URL } from '@/lib/seo'
import { spec } from '@/lib/utils'

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) return {}
  return buildMetadata({
    title: `${brand.name} — فری‌ویل و کلاچ یک‌طرفه`,
    description: `${brand.tagline}. ${toEnDigits(brand.body[0].slice(0, 150))}…`,
    path: `/brands/${brand.slug}`,
  })
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  const others = BRANDS.filter((b) => b.slug !== brand.slug)

  return (
    <>
      <PageHeader
        eyebrow={`برند — ${brand.country}`}
        breadcrumb={[
          { href: '/', label: 'خانه' },
          { href: '/brands', label: 'برندها' },
          { label: brand.name },
        ]}
        title={brand.name}
        subtitle={brand.tagline}
        lead={brand.body[0]}
      />

      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <Reveal className="lg:col-span-7">
            <h2 className="text-2xl font-bold">در عمل چطور است</h2>
            <div className="prose-ir mt-4 max-w-none">
              {brand.body.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {brand.note && (
              <div className="mt-8 border-s-2 border-accent bg-surface p-5">
                <p className="text-xs tracking-wide text-fg-dim">نکتهٔ فنی</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{brand.note}</p>
              </div>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold text-fg">پوشش کاتالوگ</h2>
              <dl className="mt-4 divide-y divide-line">
                {brand.envelope.map((e) => (
                  <div key={e.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-fg-dim">{e.label}</dt>
                    <dd className="tnum text-end text-fg-muted">{e.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="border border-line bg-surface p-5">
                <p className="text-[0.7rem] tracking-wide text-ok">مناسب</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{brand.fit}</p>
              </div>
              <div className="border border-line bg-surface p-5">
                <p className="text-[0.7rem] tracking-wide text-warn">مناسب نیست</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{brand.notFit}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Ringspann gets the size table; the others get a route. */}
        {brand.slug === 'ringspann' ? (
          <section className="mt-20">
            <h2 className="text-2xl font-bold">سایزهای پرکاربرد سری R</h2>
            <p className="mt-3 max-w-3xl leading-8 text-fg-muted">
              جدول کامل همهٔ سایزها در صفحهٔ <Link href="/ringspann" className="text-accent underline underline-offset-4">Ringspann</Link> هست.
              اینجا دوازده سایز اصلی را می‌آوریم:
            </p>
            <SpecTable
              className="mt-6 border border-line"
              dense
              columns={[
                { key: 'code', label: 'سایز' },
                { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
                { key: 'bore', label: 'قطر شفت', unit: 'mm' },
                { key: 'nOuter', label: 'دور آزاد — بیرونی', unit: 'min⁻¹' },
                { key: 'weight', label: 'وزن', unit: 'kg' },
              ]}
              rows={R_SERIES_MAIN.map((s) => ({
                code: s.code,
                torque: spec(s.torqueNm),
                bore: spec(s.bore),
                nOuter: spec(s.nOuter),
                weight: spec(s.weight),
              }))}
              hrefFor={(r) => `/ringspann/${String(r.code).toLowerCase()}`}
            />
          </section>
        ) : (
          <section className="mt-20">
            <h2 className="text-2xl font-bold">اگر {brand.name} را می‌خواهید</h2>
            <div className="prose-ir mt-4 max-w-3xl">
              <p>
                اگر شمارهٔ قطعه‌ای از این برند دارید، همان را برای ما بفرستید. اگر شماره ندارید و
                فقط می‌دانید قطر شفت و توان موتور چقدر است، باز هم بفرستید؛ معمولاً سه چهار مدل به
                شما پیشنهاد می‌دهیم و دلیل هرکدام را می‌نویسیم.
              </p>
              <p>
                اگر هنوز بین این برند و رینگسپان مردد هستید، راه درست این است که ببینید روی
                شفت شما چه چیزی سوار است و در تعمیرات بعدی کدام قطعات در دسترس خواهند بود. عوض
                کردن برند در تعمیر، معمولاً گران‌تر از همان انتخاب اولیهٔ درست است.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticLink href="/contact" className="bg-accent text-ink hover:bg-accent-hot">
                ارسال شمارهٔ قطعه
              </MagneticLink>
              <MagneticLink
                href="/ringspann"
                className="border border-line-strong text-fg hover:border-accent hover:text-accent"
              >
                دیدن سری R رینگسپان
              </MagneticLink>
            </div>
          </section>
        )}

        <ShopRoute to="bearing" variant="band" className="mt-12" />

        {/* Other brands */}
        <section className="mt-20">
          <h2 className="text-lg font-bold text-fg">برندهای دیگر</h2>
          <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {others.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="group bg-surface p-5 transition-colors hover:bg-surface-2"
              >
                <p className="tnum text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {b.name}
                </p>
                <p className="mt-1 text-xs text-fg-dim">{b.country}</p>
                <p className="mt-3 line-clamp-3 text-xs leading-6 text-fg-muted">{b.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <JsonLd
        data={{
          '@type': 'Brand',
          '@id': `${BASE_URL}/brands/${brand.slug}#brand`,
          name: brand.name,
          description: toEnDigits(brand.tagline),
          url: `${BASE_URL}/brands/${brand.slug}`,
          country: brand.country,
        }}
      />
    </>
  )
}
