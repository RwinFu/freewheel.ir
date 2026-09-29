import Link from 'next/link'
import { R_SERIES_MAIN, type RSize } from '@/data/ringspann'
import { SHOPS } from '@/data/site'
import { SpecTable } from '@/components/ui/SpecTable'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { SizeDrawing } from '@/components/visual/SizeDrawing'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { Counter } from '@/components/motion/Counter'
import { spec } from '@/lib/utils'

/**
 * The Ringspann block. This is the centre of gravity of the site, so it
 * gets the real table rather than a marketing summary: every figure here
 * is a printed catalogue value for the FGR … R A1A2 roller series.
 */
export function RingspannSection({ compact = false }: { compact?: boolean }) {
  const sizes = compact ? R_SERIES_MAIN.slice(0, 8) : R_SERIES_MAIN
  const maxTorque = R_SERIES_MAIN[R_SERIES_MAIN.length - 1].torqueNm

  const rows = sizes.map((s) => ({
    code: s.code,
    order: s.order,
    torque: s.torqueNm,
    bore: s.bore,
    nInner: s.nInner,
    nOuter: s.nOuter,
    D: s.D,
    A: s.A,
    L: s.L,
    weight: s.weight,
  }))

  return (
    <section id="ringspann" className="shell py-20 sm:py-28">
      <Reveal>
        <SectionHeader
          index="۰۲"
          eyebrow="Ringspann"
          title={
            <>
              سری R — دوازده سایز، از{' '}
              <span className="tnum text-accent">R35</span> تا{' '}
              <span className="tnum text-accent">R150</span>
            </>
          }
          lead="فری‌ویل کامل با فلنج نصب، رولری، بلبرینگ و روان‌کار روغنی. یک قطعهٔ آمادهٔ نصب که روی شفت سوار می‌شود و همان لحظه کار می‌کند. اعداد زیر مستقیم از جدول کاتالوگ آمده‌اند؛ نه گرد شده‌اند، نه از سایزهای مشابه حدس زده شده‌اند."
        />
      </Reveal>

      {/* Headline figures */}
      <Reveal className="mt-12 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
        {[
          { label: 'بیشترین گشتاور اسمی', value: maxTorque, unit: 'N·m' },
          { label: 'بیشترین قطر شفت', value: 150, unit: 'mm' },
          { label: 'تعداد سایزهای این بلوک', value: R_SERIES_MAIN.length, unit: '' },
          { label: 'بیشترین دور آزاد', value: 2850, unit: 'min⁻¹' },
        ].map((f) => (
          <RevealItem key={f.label} className="bg-surface px-5 py-6">
            <p className="text-xs leading-6 text-fg-dim">{f.label}</p>
            <p className="tnum mt-2 text-3xl font-bold text-fg">
              <Counter value={f.value} />
              {f.unit && <span className="ms-1.5 text-sm font-normal text-fg-dim">{f.unit}</span>}
            </p>
          </RevealItem>
        ))}
      </Reveal>

      {/* The table */}
      <Reveal className="mt-12">
        <SpecTable
          caption="FGR … R A1A2 — مقادیر کاتالوگ. برای مشاهدهٔ ابعاد کامل هر سایز، روی شمارهٔ مدل بزنید."
          columns={[
            { key: 'code', label: 'سایز' },
            { key: 'order', label: 'کد سفارش' },
            { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
            { key: 'bore', label: 'قطر شفت', unit: 'mm' },
            { key: 'nInner', label: 'دور آزاد — حلقهٔ داخلی', unit: 'min⁻¹' },
            { key: 'nOuter', label: 'دور آزاد — حلقهٔ بیرونی', unit: 'min⁻¹' },
            { key: 'D', label: 'قطر بیرونی', unit: 'mm' },
            { key: 'A', label: 'قطر فلنج', unit: 'mm' },
            { key: 'L', label: 'طول', unit: 'mm' },
            { key: 'weight', label: 'وزن', unit: 'kg' },
          ]}
          rows={rows}
          hrefFor={(r) => `/ringspann/${String(r.code).toLowerCase()}`}
          className="border border-line"
        />
      </Reveal>

      {/* Size strip — hover a card to get its drawing */}
      <Reveal className="mt-12">
        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {sizes.map((s) => (
            <SizeCard key={s.slug} size={s} />
          ))}
        </div>
      </Reveal>

      <ShopRoute to="bearing" variant="band" className="mt-12" />
    </section>
  )
}

function SizeCard({ size }: { size: RSize }) {
  return (
    <Link
      href={`/ringspann/${size.slug}`}
      className="group relative flex flex-col bg-surface p-4 transition-colors duration-300 hover:bg-surface-2"
    >
      {/* The technical drawing only exists on hover — CSS-driven, so no JS. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <SizeDrawing size={size} className="h-full w-full p-2" />
      </div>

      <div className="relative transition-opacity duration-300 group-hover:opacity-0">
        <p className="tnum text-lg font-bold text-fg">{size.code}</p>
        <p dir="ltr" className="mt-1 text-start text-[0.68rem] tracking-wide text-fg-dim">
          {size.order}
        </p>
        <dl className="mt-4 space-y-1.5 text-[0.72rem]">
          <div className="flex justify-between gap-2">
            <dt className="text-fg-dim">گشتاور</dt>
            <dd className="tnum text-fg-muted">{spec(size.torqueNm)} N·m</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-fg-dim">شفت</dt>
            <dd className="tnum text-fg-muted">⌀{spec(size.bore)} mm</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-fg-dim">وزن</dt>
            <dd className="tnum text-fg-muted">{spec(size.weight)} kg</dd>
          </div>
        </dl>
      </div>

      <span className="pointer-events-none absolute bottom-0 start-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}

export { SHOPS }
