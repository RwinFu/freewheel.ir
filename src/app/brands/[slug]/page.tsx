import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";

import { Reveal } from "@/components/motion";
import { InquiryForm } from "@/components/inquiry-form";
import { BuyNote, Breadcrumbs, Callout, Panel, SectionHeading } from "@/components/ui";
import { BRANDS, getBrand } from "@/content/brands";
import { BRAND_IMAGE } from "@/content/product-images";
import { ARTICLES } from "@/content/articles";
import { RINGSPANN_SERIES } from "@/content/ringspann";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "برند پیدا نشد" };

  const title = `فری‌ویل ${brand.name}`;
  return {
    title,
    description: `${brand.tagline} — ${brand.country}. نکات انتخاب، سری‌ها و راهنمای جایگزینی فری‌ویل ${brand.name}.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const related = ARTICLES.filter((article) =>
    brand.slug === "ina" || brand.slug === "stieber"
      ? article.slug === "sprag-vs-roller"
      : article.slug === "freewheel-sizing",
  ).slice(0, 2);

  return (
    <PageTransition>
      <section className="border-b border-line">
        <div className="relative mx-auto max-w-[1240px] px-6 py-14">
          <div className="blueprint absolute inset-x-0 top-0 h-52 opacity-60" aria-hidden />
          <div className="relative">
            <Breadcrumbs
              items={[
                { href: "/", label: "خانه" },
                { href: "/brands", label: "برندها" },
                { href: `/brands/${brand.slug}`, label: brand.name },
              ]}
            />

            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 dir="ltr" className="text-[34px] font-semibold leading-tight tracking-tight text-fg sm:text-[42px]">
                    {brand.name}
                  </h1>
                  {brand.tier === 1 ? (
                    <span className="border border-accent/50 px-2.5 py-1 text-[11.5px] text-accent">
                      محور اصلی
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[13px] text-fg-dim">{brand.country}</p>
                <p className="mt-6 max-w-2xl text-[16px] leading-8 text-fg-muted">
                  {brand.tagline}
                </p>
              </div>
              {BRAND_IMAGE[brand.slug] ? (
                <Reveal delay={0.1} y={0}>
                  <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-ocean">
                    <Image
                      src={BRAND_IMAGE[brand.slug].src}
                      alt={BRAND_IMAGE[brand.slug].alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#06171e]/80 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 right-4 text-[11px] text-white/80">
                      {BRAND_IMAGE[brand.slug].caption}
                    </span>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            {brand.summary.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.03}>
                <p className="text-[15px] leading-8 text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="space-y-5">
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">نقاط قوت</h2>
                <ul className="mt-4 space-y-2.5">
                  {brand.strengths.map((item) => (
                    <li key={item} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">مراقب این‌ها باشید</h2>
                <ul className="mt-4 space-y-2.5">
                  {brand.watchOut.map((item) => (
                    <li key={item} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 bg-line-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading kicker="برنامه‌ی محصول" title="سری‌ها و رده‌ها" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brand.series.map((item, index) => (
              <Reveal key={item.designation} delay={index * 0.03}>
                <Panel className="h-full p-5">
                  <div dir="ltr" className="text-[15px] font-semibold text-fg">
                    {item.designation}
                  </div>
                  <p className="mt-2 text-[13px] leading-7 text-fg-muted">{item.note}</p>
                </Panel>
              </Reveal>
            ))}
          </div>

          {brand.slug === "ringspann" ? (
            <Reveal className="mt-8">
              <Panel className="p-6">
                <h3 className="text-[16px] text-fg">صفحه‌ی اختصاصی هر سری</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {RINGSPANN_SERIES.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/ringspann/${item.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="border border-line-2 px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                      dir="ltr"
                    >
                      {item.designation}
                    </Link>
                  ))}
                </div>
              </Panel>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading kicker="نکات عملی" title="برای استعلام این برند" />
            <div className="mt-8 space-y-4">
              {brand.notes.map((note, index) => (
                <Reveal key={index} delay={index * 0.04}>
                  <Callout>{note}</Callout>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <Panel className="p-6">
                <h3 className="text-[15px] font-semibold text-fg">مطالب مرتبط</h3>
                <ul className="mt-4 space-y-3">
                  {related.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/articles/${article.slug}`}
                        transitionTypes={["nav-forward"]}
                        className="group flex items-center justify-between gap-4 text-[13.5px] leading-7 text-fg-muted transition-colors hover:text-accent"
                      >
                        {article.title}
                        <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <BuyNote partNumber={brand.name} />
            </Reveal>
            <Reveal delay={0.05} className="mt-5">
              <InquiryForm source="brand" partNumber={brand.name} compact />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-12">
          <h2 className="text-[16px] text-fg">سایر برندها</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BRANDS.filter((item) => item.slug !== brand.slug).map((item) => (
              <Link
                key={item.slug}
                href={`/brands/${item.slug}`}
                transitionTypes={["nav-forward"]}
                className={cn(
                  "group flex items-center justify-between border border-line bg-panel px-5 py-4 transition-colors hover:border-accent/50",
                )}
              >
                <span dir="ltr" className="text-[14.5px] font-semibold text-fg">
                  {item.name}
                </span>
                <ArrowUpLeft className="h-3.5 w-3.5 text-fg-dim transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
