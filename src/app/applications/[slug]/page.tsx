import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft, TriangleAlert } from "lucide-react";

import { Reveal } from "@/components/motion";
import { InquiryForm } from "@/components/inquiry-form";
import {
  BuyNote,
  Breadcrumbs,
  Callout,
  Panel,
  RobotNote,
  SectionHeading,
  SpecTable,
} from "@/components/ui";
import { APPLICATIONS, getApplication } from "@/content/applications";
import { ARTICLES } from "@/content/articles";
import { getSeries } from "@/content/ringspann";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return APPLICATIONS.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const application = getApplication(slug);
  if (!application) return { title: "کاربرد پیدا نشد" };

  const title = `فری‌ویل در ${application.title}`;
  return {
    title,
    description: application.intro[0].slice(0, 180),
    alternates: { canonical: `/applications/${application.slug}` },
  };
}

export default async function ApplicationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const application = getApplication(slug);
  if (!application) notFound();

  return (
    <>
      <section className="border-b border-line">
        <div className="relative mx-auto max-w-[1240px] px-6 py-14">
          <Breadcrumbs
            items={[
              { href: "/", label: "خانه" },
              { href: "/applications", label: "کاربردها" },
              { href: `/applications/${application.slug}`, label: application.title },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Reveal>
                <span className="text-[12px] tracking-[0.12em] text-accent">
                  {application.kicker}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-display mt-4 text-[32px] leading-[1.35] text-fg sm:text-[42px]">
                  فری‌ویل در {application.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 space-y-4">
                  {application.intro.map((paragraph, index) => (
                    <p key={index} className="text-[15px] leading-8 text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.08} y={0}>
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <Image
                  src={application.image.src}
                  alt={application.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover opacity-85 saturate-[0.6]"
                />
                <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10.5px] text-fg-dim" dir="ltr">
                  {application.image.credit}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <SectionHeading kicker="سناریو" title="در خط تولید چه می‌گذرد؟" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {application.scenario.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <Panel className="h-full p-6">
                <span className="tnum text-[12px] text-accent" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[16.5px] leading-7 text-fg">{item.title}</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{item.body}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeading kicker="انتخاب" title="سری‌های پیشنهادی" />
              <div className="mt-8 space-y-3">
                {application.relatedSeries.map((seriesSlug) => {
                  const series = getSeries(seriesSlug);
                  if (!series) return null;
                  return (
                    <Reveal key={seriesSlug}>
                      <Link
                        href={`/ringspann/${series.slug}`}
                        className="group flex items-start justify-between gap-6 rounded-[14px] border border-line bg-panel p-5 transition-colors hover:border-accent/50"
                      >
                        <div>
                          <span dir="ltr" className="text-[16px] font-semibold text-fg">
                            RINGSPANN {series.designation}
                          </span>
                          <p className="mt-2 text-[13px] leading-7 text-fg-muted">{series.short}</p>
                          <p className="mt-2 text-[12.5px] text-fg-dim">
                            تا {new Intl.NumberFormat("en-US").format(series.maxTorqueNm)} N·m —
                            تا {series.maxBoreMm} mm
                          </p>
                        </div>
                        <ArrowUpLeft className="mt-1 h-4 w-4 shrink-0 text-fg-dim transition-colors group-hover:text-accent" />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal className="mt-8">
                <SpecTable
                  columns={["پارامتر", "مقدار / محدوده"]}
                  rows={application.specs.map((spec) => [spec.label, spec.value])}
                  caption="مقادیر راهنما برای اولین غربال؛ برای انتخاب نهایی، مشخصات پروژه را بفرستید."
                />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <Panel className="p-6">
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold text-fg">
                    <TriangleAlert className="h-4 w-4 text-accent" />
                    حالت‌های خرابی رایج
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {application.failureModes.map((item) => (
                      <li key={item} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                        <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Reveal>

              <Reveal delay={0.05} className="mt-5">
                <Callout title="قبل از سفارش">
                  جهت چرخش، دور آزاد و اینکه کدام حلقه در حالت آزاد می‌چرخد را بنویسید. همین سه
                  مورد، بیشتر اختلاف‌های سفارش را حل می‌کند.
                </Callout>
              </Reveal>

              <Reveal delay={0.1} className="mt-5">
                {application.cta === "robot" || application.cta === "both" ? (
                  <RobotNote />
                ) : (
                  <BuyNote compact />
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading kicker="مطالب مرتبط" title="بیشتر بخوانید" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {ARTICLES.slice(0, 4).map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="text-[14.5px] leading-7 text-fg-muted transition-colors group-hover:text-accent">
                      {article.title}
                    </span>
                    <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 text-fg-dim transition-colors group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <InquiryForm source="application" compact />
            </Reveal>
            {application.cta === "both" ? (
              <Reveal delay={0.05} className="mt-5">
                <BuyNote />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
