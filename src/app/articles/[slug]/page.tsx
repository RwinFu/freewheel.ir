import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";

import { Reveal } from "@/components/motion";
import { InquiryForm } from "@/components/inquiry-form";
import { BuyNote, Breadcrumbs, Callout, Panel, RobotNote } from "@/components/ui";
import { ARTICLES, getArticle } from "@/content/articles";
import { SHOPS, SITE } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "مقاله پیدا نشد" };

  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      url: `${SITE.url}/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.dek,
    inLanguage: "fa-IR",
    articleSection: article.tag,
    author: { "@type": "Organization", name: "freewheel.ir" },
    publisher: { "@type": "Organization", name: "freewheel.ir" },
  };

  const others = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[1240px] px-6 py-14">
        <Breadcrumbs
          items={[
            { href: "/", label: "خانه" },
            { href: "/articles", label: "مقالات فنی" },
            { href: `/articles/${article.slug}`, label: article.title },
          ]}
        />

        <header className="border-b border-line pb-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
              <span className="text-accent">{article.tag}</span>
              <span className="tnum">{article.date}</span>
              <span className="tnum">{article.readingMinutes} دقیقه مطالعه</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-5 max-w-3xl text-[30px] leading-[1.35] text-fg sm:text-[38px]">
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-fg-muted">{article.dek}</p>
          </Reveal>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            {article.keyNumbers ? (
              <Reveal>
                <dl className="mb-10 grid gap-5 rounded-[16px] border border-line bg-panel p-6 sm:grid-cols-2">
                  {article.keyNumbers.map((item) => (
                    <div key={item.label} className="border-r border-line pe-4">
                      <dt className="text-[11.5px] text-fg-dim">{item.label}</dt>
                      <dd className="mt-1.5 text-[14px] leading-7 text-fg">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            <div className="space-y-12">
              {article.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.02}>
                  <section>
                    <h2 className="text-[22px] leading-tight text-fg">{section.heading}</h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-[15px] leading-8 text-fg-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.list ? (
                      <ul className="mt-5 space-y-2.5 rounded-[14px] border border-line bg-panel p-5">
                        {section.list.map((item) => (
                          <li key={item} className="flex gap-3 text-[13.5px] leading-7 text-fg-muted">
                            <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <div className="rounded-[16px] border border-line bg-panel p-6">
                <h2 className="text-[16px] font-bold text-fg">ادامه‌ی مسیر</h2>
                <ul className="mt-4 space-y-3">
                  {article.related.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-4 text-[14px] leading-7 text-fg-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                        <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={SHOPS.bearing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 text-[14px] leading-7 text-accent"
                    >
                      استعلام قیمت در {SHOPS.bearing.name}
                      <ArrowUpLeft className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-5">
            <Reveal>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">سایز می‌خواهید؟</h2>
                <p className="mt-3 text-[13px] leading-7 text-fg-muted">
                  مشخصات پروژه را بفرستید؛ گشتاور و دور را حساب می‌کنیم و کد قطعه‌ی دقیق را
                  می‌دهیم.
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={0.05}>
              <InquiryForm source="article" compact />
            </Reveal>
            <Reveal delay={0.1}>
              <BuyNote compact />
            </Reveal>
            <Reveal delay={0.15}>
              <Callout title="یادآوری">
                اعداد این متن مقادیر کاتالوگی است؛ قبل از سایزبندی نهایی، آخرین نسخه‌ی دیتاشیت
                سازنده را کنترل کنید.
              </Callout>
            </Reveal>
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h2 className="text-[17px] text-fg">مقالات دیگر</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                className="group border border-line bg-panel p-5 transition-colors hover:border-accent/50"
              >
                <div className="text-[12px] text-accent">{item.tag}</div>
                <h3 className="mt-2.5 text-[15.5px] leading-7 text-fg transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-6 text-fg-dim">{item.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {article.slug === "backstop-mounting" || article.slug === "why-textile-conveyor-burned" ? (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 py-12">
            <RobotNote />
          </div>
        </section>
      ) : null}
    </>
  );
}
