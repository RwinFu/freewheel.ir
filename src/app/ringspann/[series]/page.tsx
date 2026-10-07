import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";

import { Counter, Reveal } from "@/components/motion";
import { DimensionDrawing } from "@/components/diagrams";
import { InquiryForm } from "@/components/inquiry-form";
import { SERIES_IMAGE } from "@/content/product-images";
import {
  BuyNote,
  Breadcrumbs,
  Callout,
  Panel,
  RobotNote,
  SectionHeading,
  SpecTable,
  StatBlock,
  Tag,
} from "@/components/ui";
import { RINGSPANN_SERIES, getSeries } from "@/content/ringspann";
import { SHOPS, SITE } from "@/content/site";
import { anchorId, cn, num } from "@/lib/utils";
import { PageTransition, SharedElement } from "@/components/page-transition";

type Params = { series: string };

export function generateStaticParams(): Params[] {
  return RINGSPANN_SERIES.map((series) => ({ series: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { series: slug } = await params;
  const series = getSeries(slug);
  if (!series) return { title: "سری پیدا نشد" };

  const title = `فری‌ویل RINGSPANN ${series.designation}`;
  const description = `${series.short} — گشتاور تا ${num(
    series.maxTorqueNm,
  )} نیوتن‌متر و قطر شفت تا ${series.maxBoreMm} میلی‌متر. جدول مشخصات، ابعاد و راهنمای انتخاب.`;

  return {
    title,
    description,
    alternates: { canonical: `/ringspann/${series.slug}` },
    openGraph: { title, description, url: `${SITE.url}/ringspann/${series.slug}` },
  };
}

export default async function SeriesPage({ params }: { params: Promise<Params> }) {
  const { series: slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  const product = SERIES_IMAGE[series.slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `RINGSPANN ${series.designation}`,
    category: "Freewheel / One-way clutch",
    description: series.short,
    brand: { "@type": "Brand", name: "RINGSPANN" },
    manufacturer: { "@type": "Organization", name: "RINGSPANN GmbH" },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "حداکثر گشتاور اسمی",
        value: `${series.maxTorqueNm} N·m`,
      },
      {
        "@type": "PropertyValue",
        name: "حداکثر قطر سوراخ",
        value: `${series.maxBoreMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "نوع المان قفل‌کننده",
        value: series.element === "roller" ? "رولری" : "اسپراگ",
      },
    ],
    offers: {
      "@type": "Offer",
      url: SHOPS.bearing.url,
      seller: { "@type": "Organization", name: "bearingonline.ir" },
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-line">
        <div className="relative mx-auto max-w-[1240px] px-6 py-14">
          <div className="blueprint absolute inset-x-0 top-0 h-56 opacity-60" aria-hidden />
          <div className="relative">
            <Breadcrumbs
              items={[
                { href: "/", label: "خانه" },
                { href: "/ringspann", label: "RINGSPANN" },
                { href: `/ringspann/${series.slug}`, label: series.designation },
              ]}
            />

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <Reveal>
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag accent>{series.family}</Tag>
                    <Tag>{series.element === "roller" ? "المان رولری" : "المان اسپراگ"}</Tag>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="mt-5 text-[32px] leading-tight text-fg sm:text-[40px]">
                    <span dir="ltr">RINGSPANN {series.designation}</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 text-[16px] leading-8 text-fg-muted">{series.tagline}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
                    <StatBlock
                      label="حداکثر گشتاور اسمی"
                      value={<Counter value={series.maxTorqueNm} />}
                      unit="N·m"
                    />
                    <StatBlock
                      label="حداکثر قطر سوراخ"
                      value={<Counter value={series.maxBoreMm} />}
                      unit="mm"
                    />
                    <StatBlock
                      label="تعداد سایز ثبت‌شده"
                      value={series.sizes.length > 0 ? <Counter value={series.sizes.length} /> : "—"}
                      unit={series.sizes.length > 0 ? "سایز" : undefined}
                    />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1} y={0}>
                <div className="space-y-4">
                {product ? (
                  <SharedElement name={`series-image-${series.slug}`}>
                    <div className="group relative aspect-[16/9] overflow-hidden border border-line bg-ocean">
                      <Image
                        src={product.src}
                        alt={product.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span
                        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#06171e]/85 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-3 right-4 text-[11.5px] text-white/85">
                        {product.caption} — {product.sub}
                      </span>
                    </div>
                  </SharedElement>
                ) : null}
                <div className="border border-line bg-panel-2/60 p-2">
                  {series.sizes.length > 0 ? (
                    <DimensionDrawing
                      bore={series.sizes[0].bore}
                      outerDiameter={series.sizes[0].outerDiameter}
                      width={series.sizes[0].width}
                      className="h-auto w-full"
                    />
                  ) : (
                    <DimensionDrawing
                      bore={series.maxBoreMm}
                      outerDiameter={Math.round(series.maxBoreMm * 2.6)}
                      width={null}
                      className="h-auto w-full"
                    />
                  )}
                </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            {series.summary.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.03}>
                <p className="text-[15px] leading-8 text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <Panel className="p-6">
              <h2 className="text-[15px] font-semibold text-fg">مشخصات کلیدی</h2>
              <ul className="mt-4 space-y-3">
                {series.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>
      </section>

      {series.sizes.length > 0 ? (
        <section className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-[1240px] px-6 py-14">
            <SectionHeading
              kicker="جدول مشخصات"
              title={`سایزهای ${series.designation}`}
              desc="روی هر کارت بروید تا نقشه‌ی ابعادی همان سایز را ببینید. ستون وزن در چند سایز عمداً خالی است؛ عددی که تأیید نکرده‌ایم نمایش نمی‌دهیم."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {series.sizes.map((size, index) => (
                <Reveal key={size.designation} delay={index * 0.02}>
                  <div
                    id={anchorId(size.designation)}
                    className="group relative h-full overflow-hidden border border-line bg-panel p-5 transition-colors hover:border-accent/50"
                  >
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-base/92 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <DimensionDrawing
                        bore={size.bore}
                        outerDiameter={size.outerDiameter}
                        width={size.width}
                        className="h-full max-h-[260px] w-auto"
                      />
                    </div>

                    <div dir="ltr" className="text-[16px] font-semibold text-fg">
                      {size.designation}
                    </div>
                    <dl className="mt-4 space-y-2.5">
                      {[
                        { label: "قطر سوراخ", value: `${size.bore} mm` },
                        { label: "قطر خارجی", value: `${size.outerDiameter} mm` },
                        { label: "گشتاور اسمی", value: `${num(size.torqueNm)} N·m` },
                        {
                          label: "حداکثر دور (داخلی / خارجی)",
                          value: `${num(size.speedInner)} / ${num(size.speedOuter)} rpm`,
                        },
                        { label: "پهنا", value: size.width ? `${size.width} mm` : "—" },
                        { label: "وزن", value: size.weightKg ? `${size.weightKg} kg` : "—" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-3">
                          <dt className="text-[12px] text-fg-dim">{row.label}</dt>
                          <dd className="tnum text-[13.5px] text-fg" dir="ltr">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <SpecTable
                columns={[
                  "مدل",
                  "قطر سوراخ (mm)",
                  "قطر خارجی (mm)",
                  "پهنا (mm)",
                  "گشتاور اسمی (N·m)",
                  "حداکثر دور — حلقه‌ی داخلی آزاد",
                  "حداکثر دور — حلقه‌ی خارجی آزاد",
                  "وزن (kg)",
                ]}
                rows={series.sizes.map((size) => [
                  size.designation,
                  size.bore,
                  size.outerDiameter,
                  size.width,
                  size.torqueNm,
                  size.speedInner,
                  size.speedOuter,
                  size.weightKg,
                ])}
                caption="مقادیر کاتالوگی RINGSPANN. حداکثر گشتاور قابل انتقال دو برابر گشتاور اسمی است."
              />
            </Reveal>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {series.notes.map((note, index) => (
                <Reveal key={index} delay={index * 0.04}>
                  <Callout>{note}</Callout>
                </Reveal>
              ))}
            </div>

            {series.extraTable ? (
              <Reveal className="mt-10">
                <h3 className="text-[19px] text-fg">{series.extraTable.title}</h3>
                <div className="mt-4">
                  <SpecTable
                    columns={series.extraTable.columns}
                    rows={series.extraTable.rows}
                    caption={series.extraTable.note}
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-[1240px] px-6 py-14">
            <SectionHeading
              kicker="مشخصات"
              title={`این سری را چطور سفارش بدهیم؟`}
              desc="جدول ابعاد این سری را در صفحه نمایش نمی‌دهیم چون نسخه‌ها (استاندارد، X، با اهرم، با فلنج) ابعاد متفاوتی دارند. برای هر پروژه، دیتاشیت همان نسخه را می‌فرستیم."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {series.notes.map((note, index) => (
                <Reveal key={index} delay={index * 0.04}>
                  <Callout>{note}</Callout>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading kicker="راهنمای انتخاب" title="مراحل سایزبندی" />
            <ol className="mt-8 space-y-4">
              {series.selection.map((step, index) => (
                <Reveal key={step} delay={index * 0.03}>
                  <li className="flex gap-4 border-b border-line pb-4">
                    <span className="tnum mt-0.5 text-[13px] text-accent" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-8 text-fg-muted">{step}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-8">
              <Panel className="p-6">
                <h3 className="text-[15px] font-semibold text-fg">کاربردهای این سری</h3>
                <ul className="mt-4 space-y-2.5">
                  {series.applications.map((application) => (
                    <li key={application} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                      {application}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <BuyNote partNumber={series.sizes[0]?.designation ?? series.designation} />
            </Reveal>
            <Reveal delay={0.05} className="mt-5">
              <InquiryForm source="series" partNumber={series.designation} compact />
            </Reveal>
            {series.slug === "frhn" || series.slug === "fgr-r" ? (
              <Reveal delay={0.1} className="mt-5">
                <RobotNote />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading kicker="ادامه‌ی مسیر" title="سری‌های دیگر و مطالب مرتبط" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RINGSPANN_SERIES.filter((item) => item.slug !== series.slug).map((item) => (
              <Link
                key={item.slug}
                href={`/ringspann/${item.slug}`}
                transitionTypes={["nav-forward"]}
                className={cn(
                  "group border border-line bg-panel px-5 py-4 transition-colors hover:border-accent/50",
                )}
              >
                <div dir="ltr" className="text-[14.5px] font-semibold text-fg">
                  {item.designation}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[12px] text-fg-dim">
                  <span>{item.family}</span>
                  <ArrowUpLeft className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
