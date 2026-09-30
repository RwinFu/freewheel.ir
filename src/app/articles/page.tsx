import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { Reveal } from "@/components/motion";
import { BuyNote, Callout, SectionHeading } from "@/components/ui";
import { ARTICLES } from "@/content/articles";

export const metadata: Metadata = {
  title: "مقالات فنی فری‌ویل — انتخاب، سایزبندی، نصب و روانکاری",
  description:
    "مقالات فنی فری‌ویل و کلچ یک‌سره: تفاوت سپراگ و رولری، راهنمای سایزبندی، مطالعه‌ی موردی سوختن فری‌ویل نوار نقاله‌ی نساجی، لیفت‌آف و نصب بک‌استاپ.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <>
      <section className="border-b border-line">
        <div className="relative mx-auto max-w-[1240px] px-6 py-16">
          <div className="blueprint absolute inset-x-0 top-0 h-56 opacity-60" aria-hidden />
          <div className="relative">
            <nav className="mb-6 flex items-center gap-2 text-[12px] text-fg-dim">
              <Link href="/" className="hover:text-accent">
                خانه
              </Link>
              <span className="text-line-2">/</span>
              <span className="text-fg-muted">مقالات فنی</span>
            </nav>
            <h1 className="font-display max-w-3xl text-[32px] leading-[1.35] text-fg sm:text-[42px]">
              مقالات فنی
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              پنج متن از کار روزمره: انتخاب تکنولوژی، سایزبندی، نصب و اشتباه‌هایی که دیده‌ایم.
              خلاصه‌ی هجده‌سال کار با قطعات انتقال قدرت، بدون تعارف.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <Reveal>
          <Link
            href={`/articles/${lead.slug}`}
            className="group grid gap-6 rounded-[18px] border border-line bg-panel p-8 transition-colors hover:border-accent/50 lg:grid-cols-[1.4fr_auto] lg:items-end"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
                <span className="text-accent">{lead.tag}</span>
                <span className="tnum">{lead.date}</span>
                <span className="tnum">{lead.readingMinutes} دقیقه مطالعه</span>
              </div>
              <h2 className="mt-4 max-w-2xl text-[26px] leading-tight text-fg transition-colors group-hover:text-accent sm:text-[30px]">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-8 text-fg-muted">{lead.dek}</p>
            </div>
            <span className="flex items-center gap-2 border border-line-2 px-5 py-3 text-[13px] text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
              خواندن مقاله
              <ArrowUpLeft className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.04}>
              <Link
                href={`/articles/${article.slug}`}
                className="group flex h-full flex-col justify-between rounded-[16px] border border-line bg-panel p-7 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
                    <span className="text-accent">{article.tag}</span>
                    <span className="tnum">{article.date}</span>
                    <span className="tnum">{article.readingMinutes} دقیقه</span>
                  </div>
                  <h2 className="mt-4 text-[20px] leading-8 text-fg transition-colors group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{article.dek}</p>
                </div>
                <span className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                  ادامه‌ی متن
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading
            kicker="راهنمای سریع"
            title="چهار داده‌ای که برای استعلام لازم داریم"
            desc="این فهرست را داشته باشید؛ با همین چهار مورد می‌توانیم سایز را روی جدول کاتالوگ ببندیم."
          />
          <Reveal className="mt-8">
            <SpecList />
          </Reveal>
          <Reveal delay={0.05} className="mt-8 grid gap-5 lg:grid-cols-2">
            <Callout title="یک نکته‌ی صادقانه">
              اعداد این مقالات از کاتالوگ سازنده نقل شده است. اگر بین متن ما و دیتاشیت جدید
              اختلاف دیدید، دیتاشیت را بگیرید و به ما هم بگویید تا اصلاح کنیم.
            </Callout>
            <BuyNote compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SpecList() {
  const items = [
    { label: "قطر شفت", value: "مثلاً 45 mm" },
    { label: "گشتاور محرک", value: "یا توان و دور موتور + نسبت گیربکس" },
    { label: "دور کاری و دور آزاد", value: "rpm" },
    { label: "جهت چرخش", value: "راست‌گرد یا چپ‌گرد" },
  ];
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.label} className="border border-line bg-panel p-5">
          <span className="tnum text-[12px] text-accent" dir="ltr">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="mt-3 text-[15px] text-fg">{item.label}</div>
          <div className="mt-1.5 text-[12.5px] text-fg-dim">{item.value}</div>
        </li>
      ))}
    </ol>
  );
}
