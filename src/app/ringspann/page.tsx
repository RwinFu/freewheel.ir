import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, MoveUpLeft } from "lucide-react";

import { PartSearch } from "@/components/part-search";
import { Reveal } from "@/components/motion";
import { BuyNote, Callout, Panel, SectionHeading, SpecTable } from "@/components/ui";
import {
  RINGSPANN_OTHER_SERIES,
  RINGSPANN_SERIES,
} from "@/content/ringspann";
import { SHOPS } from "@/content/site";
import { num } from "@/lib/utils";

export const metadata: Metadata = {
  title: "فری‌ویل RINGSPANN — سری FGR … R و سایر سری‌ها",
  description:
    "معرفی سری‌های فری‌ویل RINGSPANN: FGR … R از سایز ۱۲ تا ۱۵۰ میلی‌متر تا ۶۸٫۰۰۰ نیوتن‌متر، سری FZ، BM … R، FB، FRHN، FKh و FA/FAV با مشخصات کاتالوگی.",
  alternates: { canonical: "/ringspann" },
};

export default function RingspannPage() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="blueprint absolute inset-x-0 top-0 h-64 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-[1240px] px-6 py-16">
          <nav className="mb-6 flex items-center gap-2 text-[12px] text-fg-dim">
            <Link href="/" className="hover:text-accent">
              خانه
            </Link>
            <span className="text-line-2">/</span>
            <span className="text-fg-muted">RINGSPANN</span>
          </nav>

          <Reveal>
            <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-fg-dim">
              <span className="border border-accent/50 px-2 py-[3px] text-accent">سازنده‌ی اصلی</span>
              <span className="border border-line-2 px-2 py-[3px]">RINGSPANN GmbH — Bad Homburg, Germany</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-[34px] leading-tight text-fg sm:text-[42px]">
              فری‌ویل RINGSPANN: سری‌ها، محدوده‌ها و جدول مشخصات
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-8 text-fg-muted">
              برنامه‌ی RINGSPANN از فری‌ویل داخلی کوچک تا بک‌استاپ ۳۲۰ میلی‌متری را پوشش می‌دهد.
              این‌جا سری‌هایی را آورده‌ایم که در بازار ایران قابل تأمین‌اند و برایشان استعلام
              می‌گیریم. اعداد همه از کاتالوگ سازنده نقل شده است.
            </p>
          </Reveal>

          <div className="mt-7 max-w-xl">
            <PartSearch className="relative w-full" />
          </div>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              <div>
                <dt className="text-[11.5px] text-fg-dim">سری فعال در این صفحه</dt>
                <dd className="tnum mt-1 text-[24px] font-semibold">{RINGSPANN_SERIES.length}</dd>
              </div>
              <div>
                <dt className="text-[11.5px] text-fg-dim">بیشترین گشتاور (FRHN)</dt>
                <dd className="tnum mt-1 text-[24px] font-semibold" dir="ltr">
                  {num(503550)}
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] text-fg-dim">بیشترین قطر شفت (FRHN)</dt>
                <dd className="tnum mt-1 text-[24px] font-semibold" dir="ltr">
                  320 mm
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] text-fg-dim">سایز سری FGR … R</dt>
                <dd className="tnum mt-1 text-[24px] font-semibold" dir="ltr">
                  12 → 150
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16">
        <SectionHeading
          kicker="مقایسه‌ی سری‌ها"
          title="کدام سری برای کار شما؟"
          desc="سه ستون مهم: نوع المان، حداکثر گشتاور و حداکثر قطر شفت. اگر بین دو سری مردد هستید، نوع نصب و دور آزاد را تعیین‌کننده کنید."
        />

        <Reveal className="mt-8">
          <SpecTable
            columns={[
              "سری",
              "خانواده",
              "المان",
              "حداکثر گشتاور (N·m)",
              "حداکثر قطر شفت (mm)",
              "تعداد سایز ثبت‌شده",
            ]}
            rows={RINGSPANN_SERIES.map((series) => [
              series.designation,
              series.family,
              series.element === "roller" ? "رولری" : "اسپراگ",
              num(series.maxTorqueNm),
              series.maxBoreMm,
              series.sizes.length > 0 ? series.sizes.length : "—",
            ])}
            caption="مقادیر از کاتالوگ RINGSPANN؛ برای ابعاد هر سایز به صفحه‌ی همان سری بروید."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {RINGSPANN_SERIES.map((series, index) => (
            <Reveal key={series.slug} delay={index * 0.03}>
              <Link
                href={`/ringspann/${series.slug}`}
                className="group flex h-full flex-col justify-between border border-line bg-panel p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <span dir="ltr" className="text-[18px] font-semibold text-fg">
                    {series.designation}
                  </span>
                  <p className="mt-2 text-[12.5px] text-fg-dim">{series.family}</p>
                  <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{series.tagline}</p>
                </div>
                <span className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                  مشخصات و جدول ابعاد
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Panel className="h-full p-7">
              <h2 className="text-[22px] text-fg">درباره‌ی کد «R» که در بازار می‌شنوید</h2>
              <div className="mt-4 space-y-4 text-[14.5px] leading-8 text-fg-muted">
                <p>
                  خیلی‌ها این قطعه را با کد کوتاه می‌خوانند؛ مثلاً می‌گویند «فری‌ویل R35». کد کامل
                  کاتالوگی همان <span dir="ltr" className="text-fg">FGR 35 R</span> است و عدد
                  بعد از FGR، قطر سوراخ به میلی‌متر است. سری FGR … R تا سایز ۱۵۰ می‌رود؛ بالاتر
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

      <section className="mx-auto max-w-[1240px] px-6 py-16">
        <SectionHeading
          kicker="خارج از فهرست بالا"
          title="سری‌های تکمیلی RINGSPANN"
          desc="این‌ها را در صفحه‌ی جداگانه نیاورده‌ایم چون تعداد درخواستشان کم است؛ اما در دسترس‌اند و برای بعضی کاربردها دقیقاً جواب می‌دهند."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RINGSPANN_OTHER_SERIES.map((series, index) => (
            <Reveal key={series.designation} delay={index * 0.03}>
              <Panel className="h-full p-5">
                <div dir="ltr" className="text-[15px] font-semibold text-fg">
                  {series.designation}
                </div>
                <div className="mt-2 text-[13px] text-fg-muted">{series.title}</div>
                <p className="mt-2 text-[12.5px] leading-6 text-fg-dim">{series.note}</p>
              </Panel>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-5 border border-line bg-panel p-7">
            <div>
              <h2 className="text-[20px] text-fg">خرید و استعلام قیمت</h2>
              <p className="mt-2 max-w-xl text-[14px] leading-7 text-fg-muted">
                خرید قطعه در فروشگاه آنلاین{" "}
                <span dir="ltr" className="font-semibold text-fg">
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
              className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
            >
              ورود به فروشگاه
              <MoveUpLeft className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
