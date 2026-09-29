import type { Metadata } from 'next'

import { R_SERIES, R_NOTES, BD_R_SERIES } from '@/data/ringspann'
import { RingspannSection } from '@/components/sections/RingspannSection'
import { PageHeader } from '@/components/ui/PageHeader'
import { SpecTable } from '@/components/ui/SpecTable'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { FaqSection } from '@/components/sections/FaqSection'
import { Reveal } from '@/components/motion/Reveal'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { buildMetadata } from '@/lib/seo'
import { spec } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Ringspann سری R — جدول کامل مشخصات و ابعاد',
  description:
    'جدول کامل سری R رینگسپان (FGR … R A1A2): گشتاور اسمی، دور آزادچرخش، قطر شفت، ابعاد نصب و وزن برای همهٔ سایزها — از R12 تا R150. نقشهٔ فنی مقیاس‌دار و راهنمای نصب.',
  path: '/ringspann',
})

export default function RingspannPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ringspann"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'Ringspann' }]}
        title="Ringspann"
        subtitle="FGR … R A1A2 — Complete Freewheels, with mounting flange, with rollers"
        lead="کاتالوگ رینگسپان بیش از سی سری دارد. ما روی سری R تمرکز کرده‌ایم چون در عمل، همین خط پاسخ بیشتر کارهای صنعتی ایران را می‌دهد: رولری، بلبرینگ، آب‌بند و روان‌کار روغنی، همه در یک قطعهٔ آمادهٔ نصب."
        specs={[
          { label: 'گشتاور اسمی', value: '۵۵ – ۶۸٬۰۰۰', unit: 'N·m' },
          { label: 'قطر شفت', value: '۱۲ – ۱۵۰', unit: 'mm' },
          { label: 'تعداد سایز', value: String(R_SERIES.length) },
          { label: 'حداکثر وزن', value: '۱۸۷', unit: 'kg' },
        ]}
      />

      {/* How the series is put together */}
      <section className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-12 [&>*]:min-w-0">
          <Reveal className="lg:col-span-7">
            <h2 className="text-2xl font-bold">این سری از چه چیزی ساخته شده</h2>
            <div className="prose-ir mt-4 max-w-none">
              <p>
                چهار قطعه داخل یک بدنهٔ فلنج‌دار: رینگ بیرونی با شیب‌های تراش‌خورده برای رولری‌ها،
                رینگ داخلی که به شفت شما می‌نشیند، دو بلبرینگ که بار شعاعی را می‌گیرند، و دو کاسه‌نمد
                که روغن را داخل نگه می‌دارند. روغن باید پیش از راه‌اندازی ریخته شود؛ کاتالوگ
                تأکید می‌کند که کارکرد صحیح بدون آن قابل انتظار نیست.
              </p>
              <p>
                دو پیکربندی نصب دارید. فلنج <strong>A1</strong> می‌گوید قطعهٔ شما روی قطر بیرونی
                D متمرکز و از روی صفحه پیچ شود. فلنج <strong>A7</strong> می‌گوید روی پایوتینگ R
                بنشیند. برای زمانی که چرخ‌دنده یا چین‌سککت شما کوچک و باریک است، A7 انتخاب درست
                است چون سطح تکیه‌گاه کوچک‌تری می‌خواهد.
              </p>
            </div>

            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-surface p-5">
                <p className="text-sm font-semibold text-fg">پیکربندی A1A2</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">
                  تکیه‌گاه روی قطر بیرونی <span className="tnum">D</span>. برای قطعاتی که سطح
                  پیشانی بزرگ دارند: پولی، فلنج، هاوب.
                </p>
                <p className="tnum mt-3 text-xs text-fg-dim">L = {spec(R_SERIES[6].L, 'mm')} در R35</p>
              </div>
              <div className="bg-surface p-5">
                <p className="text-sm font-semibold text-fg">پیکربندی A2A7</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">
                  تکیه‌گاه روی پایوتینگ <span className="tnum">R</span>. برای چرخ‌دنده و
                  چین‌سککت کوچک که جای زیادی ندارند.
                </p>
                <p className="tnum mt-3 text-xs text-fg-dim">L1 = {spec(R_SERIES[6].L1, 'mm')} در R35</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold text-fg">مشخصات نصب، بدون استثنا</h2>
              <dl className="mt-4 divide-y divide-line">
                {[
                  ['تلورانس شفت', R_NOTES.shaftTolerance],
                  ['تلورانس پایوتینگ قطعهٔ مقابل', R_NOTES.pilotTolerance],
                  ['استاندارد کلید', 'DIN 6885 صفحهٔ ۱'],
                  ['تلورانس عرض کلید', 'JS10'],
                  ['روان‌کار', R_NOTES.lubrication],
                  ['جهت آزادچرخش', R_NOTES.freewheelDirection],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-fg-dim">{k}</dt>
                    <dd className="text-end text-fg-muted">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-fg-dim">
                هنگام سفارش حتماً جهت آزادچرخش را هم مشخص کنید. بدون آن، مونتاژ اشتباه است و قطعه
                در جهت اشتباه قفل می‌شود.
              </p>
            </div>

            <div className="mt-4 border border-line bg-surface-2 p-5">
              <p className="text-sm font-semibold text-fg">سرهای دیگر که ممکن است لازم شود</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-fg-muted">
                <li>
                  <span className="text-fg">BD … R</span> — همان رولری، اما پیچیده می‌شود به صفحهٔ
                  قطعهٔ شما به‌جای فلنج.
                </li>
                <li>
                  <span className="text-fg">FGR … SF</span> — نسخهٔ سپراگ، برای وقتی که دقت
                  موقعیت‌دهی اولویت دارد.
                </li>
                <li>
                  <span className="text-fg">FXM / FON</span> — فری‌ویل یکپارچهٔ بزرگ برای شفت‌های
                  خیلی درشت.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main size table */}
      <RingspannSection />

      {/* Full table including small sizes */}
      <section className="shell pb-20">
        <Reveal>
          <h2 className="text-2xl font-bold">سایزهای زیر R35</h2>
          <p className="mt-3 max-w-3xl leading-8 text-fg-muted">
            این‌ها در همان خانواده‌اند و همان جدول را دارند؛ فقط در بلوک اصلی سایت نیامدند چون
            کاربردشان محدودتر است. اگر شفت شما زیر ۳۵ میلی‌متر است، سایز درست احتمالاً همین‌جاست.
          </p>
          <SpecTable
            className="mt-6 border border-line"
            caption="FGR … R A1A2 — سایزهای کوچک"
            columns={[
              { key: 'code', label: 'سایز' },
              { key: 'order', label: 'کد سفارش' },
              { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
              { key: 'bore', label: 'قطر شفت', unit: 'mm' },
              { key: 'nInner', label: 'دور آزاد — داخلی', unit: 'min⁻¹' },
              { key: 'nOuter', label: 'دور آزاد — بیرونی', unit: 'min⁻¹' },
              { key: 'D', label: 'قطر بیرونی', unit: 'mm' },
              { key: 'L', label: 'طول', unit: 'mm' },
              { key: 'weight', label: 'وزن', unit: 'kg' },
            ]}
            rows={R_SERIES.filter((s) => s.bore < 35).map((s) => ({
              code: s.code,
              order: s.order,
              torque: spec(s.torqueNm),
              bore: spec(s.bore),
              nInner: spec(s.nInner),
              nOuter: spec(s.nOuter),
              D: spec(s.D),
              L: spec(s.L),
              weight: spec(s.weight),
            }))}
            hrefFor={(r) => `/ringspann/${String(r.code).toLowerCase()}`}
          />
        </Reveal>
      </section>

      {/* BD R — the face-mount alternative */}
      <section className="border-y border-line bg-surface">
        <div className="shell py-20">
          <Reveal>
            <h2 className="text-2xl font-bold">
              اگر فلنج جا نمی‌شود: <span className="tnum" dir="ltr">BD … R</span>
            </h2>
            <p className="mt-3 max-w-3xl leading-8 text-fg-muted">
              سری BD همان رولری و همان بلبرینگ است، اما به‌جای فلنج، مستقیم به صفحهٔ قطعهٔ شما پیچ
              می‌شود. یعنی چند میلی‌متر کوتاه‌تر. اگر در حال جانمایی روی شفت هستید و طول موجود
              کم است، این را قبل از آنکه سایز را عوض کنید بررسی کنید.
            </p>
            <SpecTable
              className="mt-6 border border-line"
              dense
              caption="BD … R — فری‌ویل رولری با پیچش روی صفحه"
              columns={[
                { key: 'code', label: 'سایز' },
                { key: 'torque', label: 'گشتاور اسمی', unit: 'N·m', strong: true },
                { key: 'bores', label: 'قطرهای شفت', unit: 'mm' },
                { key: 'nInner', label: 'دور آزاد — داخلی', unit: 'min⁻¹' },
                { key: 'nOuter', label: 'دور آزاد — بیرونی', unit: 'min⁻¹' },
                { key: 'L', label: 'طول', unit: 'mm' },
                { key: 'weight', label: 'وزن', unit: 'kg' },
              ]}
              rows={BD_R_SERIES.map((s) => ({
                code: s.code,
                torque: spec(s.torqueNm),
                bores: s.bores.join(' / '),
                nInner: spec(s.nInner),
                nOuter: spec(s.nOuter),
                L: spec(s.L),
                weight: spec(s.weight),
              }))}
            />
          </Reveal>
        </div>
      </section>

      <FaqSection
        index="—"
        eyebrow="قبل از انتخاب"
        title="چند سؤال که برای همین سری پرتکرار است"
      />

      <section className="shell pb-24">
        <Reveal className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-2xl font-bold">سایز دقیق را نمی‌دانید؟</h2>
            <p className="mt-2 max-w-lg leading-8 text-fg-muted">
              قطر شفت و توان موتور را بفرستید. ما جدول بالا را برایتان به یک پیشنهاد مشخص تبدیل
              می‌کنیم و اگر بین دو سایز مردد بودیم، دلیلش را هم می‌نویسیم.
            </p>
          </div>
          <MagneticLink href="/contact" className="flex-none bg-accent text-ink hover:bg-accent-hot">
            درخواست سایزبندی
          </MagneticLink>
        </Reveal>
        <ShopRoute to="bearing" variant="band" className="mt-6" />
      </section>
    </>
  )
}
