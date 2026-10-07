import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import {
  CategoryChips,
  CategoryFilterProvider,
  CategoryItem,
  CategoryTag,
} from "@/components/category-filter";
import { Reveal } from "@/components/motion";
import { PageTransition } from "@/components/page-transition";
import { BuyNote, Callout, Panel, SectionHeading } from "@/components/ui";
import { BRANDS } from "@/content/brands";
import { BRAND_IMAGE } from "@/content/product-images";
import {
  BRAND_CATEGORIES,
  FILTERABLE_BRANDS,
  brandCategory,
  categoryById,
  withCounts,
} from "@/content/taxonomy";

const BRAND_CATEGORIES_COUNTED = withCounts(
  BRAND_CATEGORIES,
  FILTERABLE_BRANDS.map((brand) => brand.slug),
  brandCategory,
);

export const metadata: Metadata = {
  title: "برندهای فری‌ویل — RINGSPANN، INA، SKF، Stieber، Koyo، LUK، NIKO",
  description:
    "برندهایی که از آن‌ها فری‌ویل و کلچ یک‌سره تأمین می‌کنیم؛ با نکات انتخاب، محدوده‌ی سایز و راهنمای جایگزینی. RINGSPANN در صدر فهرست.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  const [ringspann] = BRANDS;

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
              <span className="text-fg-muted">برندها</span>
            </nav>
            <h1 className="max-w-3xl text-[32px] leading-tight text-fg sm:text-[40px]">
              برندهای فری‌ویل و کلچ یک‌سره
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              کار ما با RINGSPANN شروع شد و هنوز هم محور اصلی‌مان است؛ اما در پروژه‌ها همیشه با
              برندهای دیگر سروکار داریم — یا برای تعویض قطعه‌ی فرسوده، یا برای پروژه‌ای که به
              برند خاصی گره خورده است.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <Reveal>
          <Link
            href={`/brands/${ringspann.slug}`}
            transitionTypes={["nav-forward"]}
            className="group grid gap-8 border border-accent/40 bg-accent/4 p-8 transition-colors hover:border-accent lg:grid-cols-[auto_1fr_auto]"
          >
            <div className="relative hidden w-[220px] shrink-0 self-stretch overflow-hidden border border-line bg-ocean lg:block">
              <Image
                src={BRAND_IMAGE.ringspann.src}
                alt={BRAND_IMAGE.ringspann.alt}
                fill
                sizes="220px"
                className="kb-breathe object-cover opacity-95"
              />
              <span
                className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#06171e]/80 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span dir="ltr" className="text-[26px] font-semibold tracking-tight text-fg">
                  {ringspann.name}
                </span>
                <span className="border border-accent/50 px-2 py-[3px] text-[11.5px] text-accent">
                  محور اصلی سایت
                </span>
              </div>
              <p className="mt-3 text-[12.5px] text-fg-dim">{ringspann.country}</p>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-8 text-fg-muted">
                {ringspann.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ringspann.series.map((item) => (
                  <span
                    key={item.designation}
                    dir="ltr"
                    className="border border-line-2 bg-panel px-2.5 py-1 text-[12px] text-fg-muted"
                  >
                    {item.designation}
                  </span>
                ))}
              </div>
            </div>
            <span className="flex items-center gap-2 self-end border border-line-2 px-4 py-2.5 text-[13px] text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
              صفحه‌ی اختصاصی
              <ArrowUpLeft className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading
            kicker="سایر برندها"
            title="این‌ها را هم تأمین می‌کنیم"
            desc="برای هرکدام، محدوده‌ی سایز و نکته‌ی جایگزینی را جداگانه نوشته‌ایم تا استعلام کوتاه‌تر شود."
          />
          <CategoryFilterProvider>
            <div className="mt-10">
              <CategoryChips
                categories={BRAND_CATEGORIES_COUNTED}
                label="فیلتر برندها بر اساس نزدیکی به RINGSPANN"
              />
            </div>
            <div data-filter-grid className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FILTERABLE_BRANDS.map((brand) => {
                const category = categoryById(BRAND_CATEGORIES, brandCategory(brand.slug));
                return (
                  <CategoryItem key={brand.slug} category={brandCategory(brand.slug)}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="group flex h-full flex-col justify-between border border-line bg-panel p-6 transition-colors hover:border-accent/50"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span dir="ltr" className="text-[18px] font-semibold text-fg">
                            {brand.name}
                          </span>
                          <span className="text-[11.5px] text-fg-dim">{brand.country}</span>
                        </div>
                        {category ? <CategoryTag category={category} className="mt-3" /> : null}
                        <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">
                          {brand.tagline}
                        </p>
                      </div>
                      <span className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                        نکات انتخاب
                        <ArrowUpLeft className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </CategoryItem>
                );
              })}
            </div>
          </CategoryFilterProvider>

          <Reveal className="mt-10">
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel className="p-6">
                <h3 className="text-[16px] text-fg">جایگزینی و معکشی</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">
                  اگر قطعه‌ی قبلی روی ماشین‌تان هست و کدش خوانا نیست، سه چیز را بفرستید: قطر
                  داخلی، قطر خارجی و پهنا. با یک عکس از قطعه، معمولاً در همان روز معادل را پیدا
                  می‌کنیم.
                </p>
                <ul className="mt-4 space-y-2 text-[13px] leading-7 text-fg-muted">
                  <li>— سمت قفل‌شدن (راست‌گرد یا چپ‌گرد) را مشخص کنید.</li>
                  <li>— اگر المان رولر یا اسپراگ دیده می‌شود، بگویید.</li>
                  <li>— برای قطعات مونتاژی، عکس از کل مجموعه بفرستید.</li>
                </ul>
              </Panel>
              <Callout title="قاعده‌ی کار ما">
                هر برندی که باشد، اول مشخصات فنی را تطبیق می‌دهیم و بعد قیمت می‌دهیم. اگر قطعه‌ای
                برای کار شما مناسب نیست، همان را می‌گوییم؛ برای ما ارزان‌تر است که یک سفارش را
                نگیریم تا اینکه قطعه‌ی اشتباه بفرستیم.
              </Callout>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <BuyNote />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
