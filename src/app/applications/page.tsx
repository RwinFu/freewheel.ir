import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { CategoryChips, CategoryFilterProvider, CategoryItem } from "@/components/category-filter";
import { Reveal } from "@/components/motion";
import { PageTransition, SharedElement } from "@/components/page-transition";
import { BuyNote, RobotNote, SectionHeading } from "@/components/ui";
import { APPLICATIONS } from "@/content/applications";
import { APPLICATION_CATEGORIES, applicationCategory, withCounts } from "@/content/taxonomy";

const APPLICATION_CATEGORIES_COUNTED = withCounts(
  APPLICATION_CATEGORIES,
  APPLICATIONS.map((application) => application.slug),
  applicationCategory,
);

export const metadata: Metadata = {
  title: "کاربردهای فری‌ویل — نوار نقاله، نساجی، غذایی، بسته‌بندی، چاپ، معدن",
  description:
    "سناریوهای واقعی استفاده از فری‌ویل و کلچ یک‌سره در شش صنعت؛ با سری پیشنهادی RINGSPANN، پارامترهای کلیدی و حالت‌های خرابی.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  return (
    <PageTransition>
      <section className="border-b border-line">
        <div className="relative mx-auto max-w-[1240px] px-6 py-16">
          <div className="blueprint absolute inset-x-0 top-0 h-56 opacity-60" aria-hidden />
          <div className="relative">
            <nav className="mb-6 flex items-center gap-2 text-[12px] text-fg-dim">
              <Link href="/" className="hover:text-accent">
                خانه
              </Link>
              <span className="text-line-2">/</span>
              <span className="text-fg-muted">کاربردها</span>
            </nav>
            <h1 className="max-w-3xl text-[32px] leading-tight text-fg sm:text-[40px]">
              فری‌ویل در خط تولید چه کاری انجام می‌دهد؟
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              شش صنعتی که بیشتر درخواست‌های ما از آن‌ها می‌آید. برای هرکدام نوشته‌ایم چه سناریویی
              دارید، کدام سری جواب می‌دهد و معمولاً چه چیزی خراب می‌شود.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <CategoryFilterProvider>
          <CategoryChips categories={APPLICATION_CATEGORIES_COUNTED} label="فیلتر کاربردها بر اساس وظیفه‌ی قطعه" />
          <div data-filter-grid className="mt-7 grid gap-6 lg:grid-cols-2">
          {APPLICATIONS.map((application) => (
            <CategoryItem
              key={application.slug}
              category={applicationCategory(application.slug)}
            >
              <Link
                href={`/applications/${application.slug}`}
                transitionTypes={["nav-forward"]}
                prefetch
                className="group flex h-full flex-col border border-line bg-panel transition-colors hover:border-accent/50"
              >
                <SharedElement name={`app-image-${application.slug}`}>
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                    <Image
                      src={application.image.src}
                      alt={application.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-75 saturate-[0.55] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-panel to-transparent" />
                    <span className="absolute bottom-4 right-4 text-[11.5px] tracking-[0.1em] text-fg-muted">
                      {application.kicker}
                    </span>
                  </div>
                </SharedElement>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-[20px] text-fg">{application.title}</h2>
                  <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{application.intro[0]}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {application.recommended.map((item) => (
                      <span
                        key={item}
                        className="border border-line-2 px-2.5 py-1 text-[11.5px] text-fg-dim"
                      >
                        {item.split("—")[0].trim()}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                    سناریوها و راهنمای انتخاب
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </CategoryItem>
          ))}
          </div>
        </CategoryFilterProvider>
      </section>

      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading
            kicker="از دو طرف"
            title="قطعه را از کجا بخرم و خط را با کجا بسنجم؟"
            desc="خرید قطعه در فروشگاه آنلاین انجام می‌شود؛ طراحی و ارتقای خط نوار نقاله با شرکت اتوماسیون. هر دو مسیر باز است."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <BuyNote />
            </Reveal>
            <Reveal delay={0.05}>
              <RobotNote />
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
