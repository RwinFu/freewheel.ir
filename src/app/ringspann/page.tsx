import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, MoveUpLeft } from "lucide-react";

import { CatalogExplorer } from "@/components/catalog-explorer";
import { PartSearch } from "@/components/part-search";
import { Reveal } from "@/components/motion";
import {
  BuyNote,
  Callout,
  Panel,
  SectionHeading,
  SectionLink,
  SpecTable,
  Tag,
  TorqueBar,
} from "@/components/ui";
import { RINGSPANN_OTHER_SERIES, RINGSPANN_SERIES } from "@/content/ringspann";
import { CATALOG_ITEMS, TORQUE_SCALE } from "@/lib/series-view";
import { SHOPS } from "@/content/site";
import { num } from "@/lib/utils";

export const metadata: Metadata = {
  title: "کاتالوگ فری‌ویل RINGSPANN — سری FGR … R، FZ، BM، FB، FRHN، FKh و FA",
  description:
    "کاتالوگ فری‌ویل و کلاچ یک‌طرفه RINGSPANN با کاتالوگ‌بندی بر اساس شکل قطعه: FGR … R از سایز ۱۲ تا ۱۵۰ میلی‌متر تا ۶۸٫۰۰۰ نیوتن‌متر، سری FZ، BM … R، FB، FRHN، FKh و FA/FAV با جدول مشخصات.",
  alternates: { canonical: "/ringspann" },
};

const SIZE_ROWS = RINGSPANN_SERIES.map((series) => [
  series.designation,
  series.family,
  series.element === "roller" ? "رولری" : "اسپراگ",
  series.maxTorqueNm,
  series.maxBoreMm,
  series.sizes.length > 0 ? series.sizes.length : "—",
]);

export default function RingspannPage() {
  return (
    <>
      <section className="relative border-b border-line bg-base">
        <div className="blueprint absolute inset-x-0 top-0 h-64 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1320px] px-5 py-14 sm:px-7 lg:px-8 lg:py-16">
          <nav className="mb-7 flex items-center gap-2 text-[12px] text-fg-dim">
            <Link href="/" className="hover:text-accent">
              خانه
            </Link>
            <span className="text-line-2">/</span>
            <span className="text-fg-muted">کاتالوگ</span>
          </nav>

          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <Tag accent>سازنده‌ی اصلی</Tag>
              <Tag>RINGSPANN GmbH — Bad Homburg, Germany</Tag>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-5 max-w-3xl text-[34px] leading-[1.35] text-fg sm:text-[44px]">
              کاتالوگ فری‌ویل RINGSPANN
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-8 text-fg-muted">
              کاتالوگ را بر اساس شکل قطعه دسته‌بندی کرده‌ایم، نه فقط کد: قطعه‌ی لخت برای مونتاژ
              داخل محفظه، فری‌ویل داخلی با تحمل بار، نسخه‌ی کامل و آماده‌ی نصب، و بک‌استاپ سرعت
              پایین. اعداد همه از دیتاشیت سازنده نقل شده‌اند.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              <div>
                <dt className="whitespace-nowrap text-[11.5px] text-fg-dim">سری فعال</dt>
                <dd className="code mt-1.5 text-[25px] font-bold" translate="no">
                  {RINGSPANN_SERIES.length}
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11.5px] text-fg-dim">سقف گشتاور</dt>
                <dd className="code mt-1.5 text-[25px] font-bold" translate="no">
                  {num(TORQUE_SCALE.max)}
                  <span className="ms-1 text-[12px] font-medium text-fg-dim">N·m</span>
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11.5px] text-fg-dim">سقف قطر شفت</dt>
                <dd className="code mt-1.5 text-[25px] font-bold" translate="no">
                  320 mm
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11.5px] text-fg-dim">سایز سری FGR … R</dt>
                <dd className="code mt-1.5 text-[25px] font-bold" translate="no">
                  12 → 150
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-9 max-w-xl">
            <label
              htmlFor="catalog-search"
              className="mb-2 block text-[12.5px] font-semibold text-fg-muted"
            >
              جست‌وجوی کد قطعه یا قطر سوراخ
            </label>
            <PartSearch className="relative w-full" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 lg:px-8">
        <SectionHeading
          index="۰۱"
          kicker="کاتالوگ‌بندی"
          title="سری‌ها را با صافی پیدا کنید"
          desc="اگر نمی‌دانید کدام سری به کار شما می‌خورد، از شکل قطعه شروع کنید؛ اگر می‌دانید، نوع المان یا قطر شفت را صافی کنید."
          action={<SectionLink href="/contact">مشخصات را برای انتخاب سایز بفرستید</SectionLink>}
        />

        <div className="mt-9">
          <CatalogExplorer items={CATALOG_ITEMS} />
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 lg:px-8">
          <SectionHeading
            index="۰۲"
            kicker="مقایسه‌ی سری‌ها"
            title="سه ستون برای حذف گزینه‌ها"
            desc="نوع المان، سقف گشتاور و سقف قطر شفت. اگر بین دو سری مردد هستید، نوع نصب و دور آزاد را تعیین‌کننده کنید."
          />

          <Reveal className="mt-8">
            <SpecTable
              columns={[
                "سری",
                "خانواده",
                "المان",
                "حداکثر گشتاور (N·m)",
                "حداکثر قطر شفت (mm)",
                "سایز ثبت‌شده",
              ]}
              rows={SIZE_ROWS}
              caption="مقادیر از کاتالوگ RINGSPANN؛ برای ابعاد هر سایز، صفحه‌ی همان سری را باز کنید."
            />
          </Reveal>

          <Reveal className="mt-6 rounded-[16px] border border-line bg-panel px-5 py-5">
            <p className="text-[12.5px] font-semibold text-fg-muted">
              جای‌گیری هر سری روی بازه‌ی گشتاور (مقیاس لگاریتمی)
            </p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {CATALOG_ITEMS.map((item) => (
                <li key={item.slug} className="grid gap-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="code text-[12.5px] font-semibold text-fg" translate="no">
                      {item.designation}
                    </span>
                    <span className="code text-[11px] text-fg-dim" translate="no">
                      {num(item.maxTorqueNm)} N·m
                    </span>
                  </div>
                  <TorqueBar
                    min={item.minTorqueNm}
                    max={item.maxTorqueNm}
                    scaleMin={200}
                    scaleMax={TORQUE_SCALE.max}
                    tone={item.element === "roller" ? "mint" : "lock"}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Panel tone="raised" className="h-full p-6 sm:p-7">
              <h2 className="font-display text-[22px] text-fg">
                درباره‌ی کد «R» که در بازار می‌شنوید
              </h2>
              <div className="mt-4 space-y-4 text-[14.5px] leading-8 text-fg-muted">
                <p>
                  خیلی‌ها این قطعه را با کد کوتاه می‌خوانند؛ مثلاً می‌گویند «فری‌ویل R35». کد کامل
                  کاتالوگی همان <span className="code text-fg" translate="no">FGR 35 R</span> است و
                  عدد بعد از FGR، قطر سوراخ به میلی‌متر است. سری FGR … R تا سایز ۱۵۰ می‌رود؛ بالاتر
                  از آن چیزی به اسم R160 یا R220 در این سری وجود ندارد.
                </p>
                <p>
                  اگر قطر شفت شما بالای ۱۵۰ میلی‌متر است، مسیر درست این است:{" "}
                  <Link href="/ringspann/fb" className="text-accent hover:underline">
                    سری FB
                  </Link>{" "}
                  تا ۳۰۰ میلی‌متر و ۱۶۰٫۰۰۰ نیوتن‌متر، یا{" "}
                  <Link href="/ringspann/frhn" className="text-accent hover:underline">
                    سری FRHN
                  </Link>{" "}
                  تا ۳۲۰ میلی‌متر و ۵۰۳٫۵۵۰ نیوتن‌متر.
                </p>
                <p>
                  در استعلام، کد کامل و جهت چرخش را بنویسید. این دو مورد رایج‌ترین دلیل برگشت
                  قطعه از پروژه است.
                </p>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex h-full flex-col gap-5">
              <Callout title="اعداد کاتالوگی، نه تخمینی">
                اعدادی که در این سایت آمده از دیتاشیت سازنده نقل شده است. وزن چند سایز را که
                تأیید نکرده‌ایم، خالی گذاشته‌ایم تا عدد نادرست جلوی چشم شما نباشد. قبل از
                سفارش، آخرین نسخه‌ی دیتاشیت را کنترل می‌کنیم.
              </Callout>
              <BuyNote compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 lg:px-8">
          <SectionHeading
            index="۰۳"
            kicker="تکمیلی"
            title="سری‌هایی که صفحه‌ی جدا ندارند"
            desc="این‌ها را جداگانه باز نکرده‌ایم چون تعداد درخواستشان کم است؛ اما تأمین می‌شوند و برای بعضی کاربردها دقیقاً جواب می‌دهند."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RINGSPANN_OTHER_SERIES.map((series, index) => (
              <Reveal key={series.designation} delay={index * 0.03}>
                <Panel tone="raised" className="h-full p-5">
                  <div className="code text-[15px] font-semibold text-fg" translate="no">
                    {series.designation}
                  </div>
                  <div className="mt-2 text-[13px] text-fg-muted">{series.title}</div>
                  <p className="mt-2 text-[12.5px] leading-6 text-fg-dim">{series.note}</p>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-[16px] border border-line bg-panel p-6 sm:p-7">
              <div>
                <h2 className="text-[20px] text-fg">خرید و استعلام قیمت</h2>
                <p className="mt-2 max-w-xl text-[14px] leading-7 text-fg-muted">
                  خرید قطعه در فروشگاه آنلاین{" "}
                  <span className="code font-semibold text-fg" translate="no">
                    {SHOPS.bearing.name}
                  </span>{" "}
                  انجام می‌شود. برای سایزبندی و انتخاب نسخه (استاندارد، X، با اهرم، با فلنج) فرم
                  سایت را پر کنید یا تماس بگیرید.
                </p>
              </div>
              <a
                href={SHOPS.bearing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13.5px] font-semibold text-accent-ink transition-colors hover:bg-ocean"
              >
                ورود به فروشگاه
                <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-fg-dim">
              {RINGSPANN_SERIES.slice(0, 4).map((series) => (
                <li key={series.slug}>
                  <Link
                    href={`/ringspann/${series.slug}`}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    {series.designation} — {series.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
