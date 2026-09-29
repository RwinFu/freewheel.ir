import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { R_SERIES, R_SERIES_MAIN, R_NOTES, getRSize } from '@/data/ringspann'
import { SHOPS } from '@/data/site'
import { SizeDrawing } from '@/components/visual/SizeDrawing'
import { SpecTable } from '@/components/ui/SpecTable'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { JsonLd } from '@/components/seo/JsonLd'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { BASE_URL, buildMetadata, toEnDigits } from '@/lib/seo'
import { spec } from '@/lib/utils'

export function generateStaticParams() {
  return R_SERIES.map((s) => ({ model: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>
}): Promise<Metadata> {
  const { model } = await params
  const size = getRSize(model)
  if (!size) return {}

  return buildMetadata({
    title: `${size.code} — فری‌ویل رولری Ringspann، گشتاور ${spec(size.torqueNm, 'N·m')}`,
    description: `مشخصات کامل ${size.order}: گشتاور اسمی ${spec(size.torqueNm, 'N·m')}، قطر شفت ${spec(size.bore, 'mm')}، حداکثر دور آزادچرخش ${spec(size.nInner, 'min⁻¹')}، ابعاد نصب و وزن ${spec(size.weight, 'kg')} — به همراه نقشهٔ فنی مقیاس‌دار.`,
    path: `/ringspann/${size.slug}`,
  })
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const size = getRSize(model)
  if (!size) notFound()

  const idx = R_SERIES.findIndex((s) => s.slug === size.slug)
  const prev = R_SERIES[idx - 1]
  const next = R_SERIES[idx + 1]

  const DIMS = [
    { k: 'قطر بیرونی D', v: spec(size.D, 'mm') },
    { k: 'قطر فلنج A', v: spec(size.A, 'mm') },
    { k: 'طول L (فلنج A1)', v: spec(size.L, 'mm') },
    { k: 'طول L1 (فلنج A7)', v: spec(size.L1, 'mm') },
    { k: 'پایوتینگ R', v: spec(size.R, 'mm') },
    { k: 'دایرهٔ پیچ‌ها T', v: spec(size.T, 'mm') },
    { k: 'فاصلهٔ N', v: spec(size.N, 'mm') },
    { k: 'فاصلهٔ N1', v: spec(size.N1, 'mm') },
    { k: 'ضخامت فلت F', v: spec(size.F, 'mm') },
    { k: 'ارتفاع K', v: spec(size.K, 'mm') },
  ]

  /* Where this size sits in the range — helps a reader who is choosing
     between two neighbours. */
  const isSmall = idx === 0
  const isLarge = idx === R_SERIES.length - 1

  return (
    <>
      <PageHeader
        eyebrow="Ringspann — سری R"
        breadcrumb={[
          { href: '/', label: 'خانه' },
          { href: '/ringspann', label: 'Ringspann' },
          { label: size.code },
        ]}
        title={size.code}
        subtitle={size.order}
        lead={leadFor(size)}
        specs={[
          { label: 'گشتاور اسمی', value: spec(size.torqueNm), unit: 'N·m' },
          { label: 'قطر شفت', value: `⌀${spec(size.bore)}`, unit: 'mm' },
          { label: 'دور آزاد — داخلی', value: spec(size.nInner), unit: 'min⁻¹' },
          { label: 'وزن', value: spec(size.weight), unit: 'kg' },
        ]}
      />

      <div className="shell pb-20">
        {/* ---------------- technical drawing ---------------- */}
        <section className="grid gap-8 border border-line bg-surface p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-fg">نقشهٔ ابعادی</h2>
            <p className="mt-2 max-w-lg text-sm leading-7 text-fg-muted">
              هر دو نما با نسبت واقعی ابعاد کاتالوگ ترسیم شده‌اند. اگر نقشهٔ قبلی دستتان هست، همین
              اعداد را با آن مقایسه کنید.
            </p>
            <div className="mt-5 border border-line bg-ink p-3 sm:p-5">
              <SizeDrawing size={size} className="h-auto w-full" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-lg font-bold text-fg">ابعاد نصب</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line">
              {DIMS.map((d) => (
                <div key={d.k} className="bg-surface-2 px-3.5 py-3">
                  <dt className="text-[0.7rem] leading-5 text-fg-dim">{d.k}</dt>
                  <dd className="tnum mt-0.5 text-sm text-fg">{d.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border border-line bg-surface-2 p-4">
              <p className="text-xs leading-6 text-fg-dim">
                اتصال: <span className="tnum text-fg-muted">{size.Z}×</span> پیچ{' '}
                <span dir="ltr" className="text-fg-muted">
                  {size.G}
                </span>{' '}
                روی دایرهٔ <span className="tnum text-fg-muted">T = {spec(size.T, 'mm')}</span> — فلت{' '}
                <span className="tnum text-fg-muted">{size.F} mm</span>. تلورانس شفت{' '}
                {R_NOTES.shaftTolerance} و پایوتینگ قطعهٔ مقابل {R_NOTES.pilotTolerance}.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- performance ---------------- */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">عملکرد و محدودهٔ کاری</h2>
          <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              label="گشتاور اسمی M_N"
              value={spec(size.torqueNm)}
              unit="N·m"
              note={`حداکثر لحظه‌ای: ${spec(size.torqueNm * 2, 'N·m')}`}
            />
            <Metric
              label="دور آزاد — حلقهٔ داخلی"
              value={spec(size.nInner)}
              unit="min⁻¹"
              note="حالت freewheeling / overrun"
            />
            <Metric
              label="دور آزاد — حلقهٔ بیرونی"
              value={spec(size.nOuter)}
              unit="min⁻¹"
              note="حالت freewheeling / overrun"
            />
            <Metric
              label="نسبت دور آزاد"
              value={`${(size.nOuter / size.nInner).toFixed(2)}×`}
              unit=""
              note="بیرونی نسبت به داخلی"
            />
          </div>

          <div className="prose-ir mt-8 max-w-3xl">
            {bodyFor(size).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ---------------- sprag comparison ---------------- */}
        {size.sprag && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">همین سایز، نسخهٔ سپراگ</h2>
            <p className="mt-3 max-w-3xl leading-8 text-fg-muted">
              برای قطر شفت {spec(size.bore, 'mm')} یک نسخهٔ سپراگ هم در کاتالوگ تعریف شده. اگر
              دور آزادچرخش شما از{' '}
              <span className="tnum text-fg">{spec(size.nInner, 'min⁻¹')}</span> پایین‌تر است و
              دقت موقعیت‌دهی برایتان مهم‌تر از عمر در دور بالاست، این گزینه را هم در نظر بگیرید.
            </p>
            <SpecTable
              className="mt-6 border border-line"
              dense
              highlight={size.code}
              columns={[
                { key: 'code', label: 'تیپ' },
                { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
                { key: 'nInner', label: 'دور آزاد — داخلی', unit: 'min⁻¹' },
                { key: 'nOuter', label: 'دور آزاد — بیرونی', unit: 'min⁻¹' },
                { key: 'weight', label: 'وزن', unit: 'kg' },
              ]}
              rows={[
                {
                  code: 'رولری (R)',
                  torque: spec(size.torqueNm),
                  nInner: spec(size.nInner),
                  nOuter: spec(size.nOuter),
                  weight: spec(size.weight),
                },
                {
                  code: 'سپراگ (SF)',
                  torque: spec(size.sprag.torqueNm),
                  nInner: spec(size.sprag.nInner),
                  nOuter: spec(size.sprag.nOuter),
                  weight: spec(size.weight),
                },
              ]}
            />
            <p className="mt-3 text-xs leading-6 text-fg-dim">
              وزن هر دو نسخه در کاتالوگ یکسان چاپ شده است؛ بدنهٔ فلنج‌دار مشترک است و فقط مجموعهٔ
              گیرکننده عوض می‌شود.
            </p>
          </section>
        )}

        {/* ---------------- neighbours ---------------- */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">جای {size.code} در سری</h2>
          <div className="mt-5">
            <SpecTable
              dense
              highlight={size.code}
              columns={[
                { key: 'code', label: 'سایز' },
                { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
                { key: 'bore', label: 'قطر شفت', unit: 'mm' },
                { key: 'nInner', label: 'دور آزاد — داخلی', unit: 'min⁻¹' },
                { key: 'weight', label: 'وزن', unit: 'kg' },
              ]}
              rows={R_SERIES_MAIN.map((s) => ({
                code: s.code,
                torque: spec(s.torqueNm),
                bore: spec(s.bore),
                nInner: spec(s.nInner),
                weight: spec(s.weight),
              }))}
              hrefFor={(r) => `/ringspann/${String(r.code).toLowerCase()}`}
            />
          </div>
          <p className="mt-3 text-xs leading-6 text-fg-dim">
            سایزهای زیر {R_SERIES_MAIN[0].code} هم در سری هستند؛ اگر شفت شما کوچک‌تر است، صفحهٔ
            کامل سری را ببینید.
          </p>
        </section>

        {/* ---------------- buy path ---------------- */}
        <section className="mt-16">
          <div className="panel p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              {size.code} را می‌خواهید — بعدش چه؟
            </h2>
            <p className="mt-3 max-w-2xl leading-8 text-fg-muted">
              مشخصات بالا برای تصمیم کافی است، اما موجودی و قیمت روز این‌جا نیست. قیمت و سفارش از{' '}
              <a
                href={SHOPS.bearing.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                dir="ltr"
                className="font-semibold text-fg underline decoration-accent decoration-1 underline-offset-[5px] hover:text-accent"
              >
                {SHOPS.bearing.host}
              </a>{' '}
              گرفته می‌شود. اگر قبلش مطمئن نیستید که همین سایز درست است، فرم درخواست قیمت را پر
              کنید و بگویید قطر شفت و توان موتور چقدر است — سایزبندی رایگان است.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticLink
                href="/contact"
                className="bg-accent text-ink hover:bg-accent-hot"
              >
                درخواست قیمت و تأیید سایزبندی
              </MagneticLink>
              <MagneticLink
                href={SHOPS.bearing.href}
                external
                className="border border-line-strong text-fg hover:border-accent hover:text-accent"
              >
                {SHOPS.bearing.host} ↗
              </MagneticLink>
            </div>
          </div>

          <ShopRoute to="bearing" className="mt-6" />

          {/* prev / next */}
          <nav aria-label="سایزهای مجاور" className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/ringspann/${prev.slug}`}
                className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
              >
                <svg viewBox="0 0 16 16" className="size-4 flex-none text-fg-dim transition-colors group-hover:text-accent" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>
                  <span className="block text-[0.7rem] text-fg-dim">سایز کوچک‌تر</span>
                  <span className="tnum mt-0.5 block text-sm text-fg">{prev.code}</span>
                </span>
              </Link>
            ) : (
              <div className="bg-surface px-5 py-4 text-sm text-fg-dim">
                {isSmall && 'کوچک‌ترین سایز سری R است.'}
              </div>
            )}
            {next ? (
              <Link
                href={`/ringspann/${next.slug}`}
                className="group flex items-center justify-end gap-4 bg-surface px-5 py-4 text-end transition-colors hover:bg-surface-2"
              >
                <span>
                  <span className="block text-[0.7rem] text-fg-dim">سایز بزرگ‌تر</span>
                  <span className="tnum mt-0.5 block text-sm text-fg">{next.code}</span>
                </span>
                <svg viewBox="0 0 16 16" className="size-4 flex-none text-fg-dim transition-colors group-hover:text-accent" fill="none" aria-hidden>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            ) : (
              <div className="bg-surface px-5 py-4 text-end text-sm text-fg-dim">
                {isLarge && 'بزرگ‌ترین سایز سری R است — ۶۸٬۰۰۰ نیوتن‌متر.'}
              </div>
            )}
          </nav>
        </section>
      </div>

      <JsonLd
        data={{
          '@type': 'Product',
          '@id': `${BASE_URL}/ringspann/${size.slug}#product`,
          name: `${size.code} — Freewheel ${size.order}`,
          sku: size.order.replace(/\s+/g, '-'),
          mpn: size.order,
          description: toEnDigits(
            `فری‌ویل رولری کامل Ringspann با فلنج نصب. گشتاور اسمی ${size.torqueNm} N·m، قطر شفت ${size.bore} mm، حداکثر دور آزادچرخش ${size.nInner} min⁻¹، وزن ${size.weight} kg.`,
          ),
          category: 'Freewheel Clutches &gt; Complete Freewheels',
          brand: { '@type': 'Brand', name: 'Ringspann' },
          manufacturer: { '@type': 'Organization', name: 'RINGSPANN GmbH' },
          countryOfOrigin: 'DE',
          weight: { '@type': 'QuantitativeValue', value: size.weight, unitCode: 'KGM' },
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Nominal torque', value: `${size.torqueNm} N·m` },
            { '@type': 'PropertyValue', name: 'Bore d', value: `${size.bore} mm` },
            { '@type': 'PropertyValue', name: 'Outside diameter D', value: `${size.D} mm` },
            { '@type': 'PropertyValue', name: 'Flange diameter A', value: `${size.A} mm` },
            { '@type': 'PropertyValue', name: 'Length L', value: `${size.L} mm` },
            {
              '@type': 'PropertyValue',
              name: 'Max speed, inner ring freewheeling',
              value: `${size.nInner} min-1`,
            },
            {
              '@type': 'PropertyValue',
              name: 'Max speed, outer ring freewheeling',
              value: `${size.nOuter} min-1`,
            },
            { '@type': 'PropertyValue', name: 'Clamping elements', value: 'Rollers' },
            { '@type': 'PropertyValue', name: 'Lubrication', value: 'Oil' },
          ],
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'IRR',
            url: SHOPS.bearing.href,
            seller: { '@type': 'Organization', name: SHOPS.bearing.host },
            priceSpecification: {
              '@type': 'PriceSpecification',
              valueAddedTaxIncluded: false,
            },
          },
        }}
      />
    </>
  )
}

function Metric({
  label,
  value,
  unit,
  note,
}: {
  label: string
  value: string
  unit: string
  note?: string
}) {
  return (
    <div className="bg-surface p-5">
      <p className="text-[0.72rem] leading-6 text-fg-dim">{label}</p>
      <p className="tnum mt-1.5 text-2xl font-bold text-fg">
        {value}
        {unit && <span className="ms-1 text-sm font-normal text-fg-dim">{unit}</span>}
      </p>
      {note && <p className="mt-1.5 text-[0.68rem] leading-5 text-fg-dim">{note}</p>}
    </div>
  )
}

/** Lead paragraph — differs by where the size sits in the range, because
 *  the decision a buyer faces at R35 is not the one at R150. */
function leadFor(size: ReturnType<typeof getRSize> extends infer T ? NonNullable<T> : never) {
  if (size.bore <= 30) {
    return `کوچک‌ترین کاربرد سری. با قطر شفت ${spec(size.bore, 'mm')} و گشتاور ${spec(size.torqueNm, 'N·m')}، بیشتر جایی می‌نشیند که کلاچ روی یک میلهٔ کوچک سوار است — ایندکس کوچک، دریچه، یا فیدِ یک ماشین کوچک. اگر شفت شما بزرگ‌تر است، سری R از {R_SERIES[3].code} به بالا منطقی‌تر است.`
  }
  if (size.bore <= 60) {
    return `سایز کاری سری. ${spec(size.torqueNm, 'N·m')} گشتاور اسمی و قطر شفت ${spec(size.bore, 'mm')}، این بازه دقیقاً همان‌جایی است که بیشتر کلاچ‌های ریل، انبساط‌دهنده‌ها و موتورهای چندگانهٔ کوچک می‌نشینند. تا ${spec(size.nOuter, 'min⁻¹')} دور آزاد را تحمل می‌کند.`
  }
  return `سایز سنگین. گشتاور اسمی ${spec(size.torqueNm, 'N·m')} یعنی اینجا دیگر صحبت از کلاچ‌های رومیزی نیست؛ نوار نقالهٔ شیب‌دار، بک‌استاپ معدن و محورهای سنگین. دور آزاد پایین می‌آید، چون گشتاور بالا یعنی قطر بزرگ‌تر و دور کمتر.`
}

function bodyFor(size: NonNullable<ReturnType<typeof getRSize>>): string[] {
  const lighter = R_SERIES[R_SERIES.findIndex((s) => s.slug === size.slug) - 1]
  const heavier = R_SERIES[R_SERIES.findIndex((s) => s.slug === size.slug) + 1]

  const neighbour = lighter
    ? lighter.torqueNm < size.torqueNm * 0.75
      ? `برای بازهٔ گشتاوری بین ${spec(lighter.torqueNm, 'N·m')} و ${spec(size.torqueNm, 'N·m')} هم سایز هست. اگر گشتاور طراحی‌تان از ${spec(size.torqueNm, 'N·m')} کمتر است، ${lighter.code} بهتر جواب می‌دهد و ${spec(size.weight - lighter.weight, 'kg')} سبک‌تر است.`
      : `اگر گشتاور طراحی‌تان بالاتر از ${spec(size.torqueNm, 'N·m')} است، ${heavier?.code ?? 'سایز بعدی'} گزینهٔ بعدی است.`
    : `این کوچک‌ترین سایز سری است؛ اگر شفت شما بزرگ‌تر از ${spec(size.bore, 'mm')} است، سری را از ابتدا ببینید.`

  return [
    `${size.code} از خانوادهٔ FGR … R A1A2 است: فری‌ویل رولری کامل با بلبرینگ و فلنج نصب. روغنی است و باید قبل از راه‌اندازی پر شود. ${neighbour}`,
    `حداکثر گشتاور قابل انتقال در لحظه، دو برابر گشتاور اسمی است. این یعنی ${spec(size.torqueNm * 2, 'N·m')} — نه اینکه بتوانید همیشه با این مقدار کار کنید. اگر راه‌اندازی مستقیم و بدون کوپلینگ نرم دارید، پیک لحظه‌ای می‌تواند از این هم بیشتر شود.`,
    `تلورانس شفت ${R_NOTES.shaftTolerance} و پایوتینگ قطعهٔ مقابل شما ${R_NOTES.pilotTolerance} است. کلید هم ${R_NOTES.keyway}. اگر این سه مورد را در نقشهٔ ساخت ننویسید، بعداً کسی که شفت را می‌تراشد حدس می‌زند — و حدس معمولاً به خرابی ختم می‌شود.`,
  ]
}
