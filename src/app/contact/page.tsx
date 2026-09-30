import type { Metadata } from "next";
import Link from "next/link";
import { MoveUpLeft } from "lucide-react";

import { Reveal } from "@/components/motion";
import { InquiryForm } from "@/components/inquiry-form";
import { Callout, Panel, SectionHeading } from "@/components/ui";
import { CONTACT, SHOPS } from "@/content/site";

export const metadata: Metadata = {
  title: "تماس و استعلام سایز",
  description:
    "برای سایزبندی فری‌ویل و انتخاب سری RINGSPANN با ما تماس بگیرید. خرید و استعلام قیمت در فروشگاه آنلاین bearingonline.ir انجام می‌شود.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
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
              <span className="text-fg-muted">تماس</span>
            </nav>
            <h1 className="font-display max-w-3xl text-[32px] leading-[1.35] text-fg sm:text-[42px]">
              تماس و استعلام سایز
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              فرم پایین را پر کنید؛ مشخصات را بررسی می‌کنیم و کد قطعه‌ی دقیق را با شما در میان
              می‌گذاریم. اگر کار فوری است، تلفن سریع‌ترین راه است.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <InquiryForm source="contact" />
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">اطلاعات تماس</h2>
                <dl className="mt-4 space-y-4">
                  <div className="flex justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-[12.5px] text-fg-dim">تلفن</dt>
                    <dd dir="ltr" className="tnum text-[14px] text-fg">
                      {CONTACT.phone}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-[12.5px] text-fg-dim">موبایل</dt>
                    <dd dir="ltr" className="tnum text-[14px] text-fg">
                      {CONTACT.mobile}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-[12.5px] text-fg-dim">ایمیل</dt>
                    <dd dir="ltr" className="text-[14px] text-fg">
                      {CONTACT.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] text-fg-dim">ساعات کاری</dt>
                    <dd className="mt-1.5 text-[13.5px] leading-7 text-fg-muted">
                      {CONTACT.hours}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] text-fg-dim">نشانی</dt>
                    <dd className="mt-1.5 text-[13.5px] leading-7 text-fg-muted">
                      {CONTACT.address}
                    </dd>
                  </div>
                </dl>
              </Panel>
            </Reveal>

            <Reveal delay={0.05}>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">خرید قطعه</h2>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">
                  برای استعلام قیمت و خرید، به فروشگاه آنلاین بلبرینگ{" "}
                  <a
                    href={SHOPS.bearing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline decoration-accent/40 underline-offset-4"
                  >
                    {SHOPS.bearing.name}
                  </a>{" "}
                  مراجعه کنید.
                </p>
                <a
                  href={SHOPS.bearing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
                >
                  ورود به فروشگاه
                  <MoveUpLeft className="h-4 w-4" />
                </a>
              </Panel>
            </Reveal>

            <Reveal delay={0.1}>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">پروژه‌ی نوار نقاله</h2>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">
                  برای طراحی و ارتقای سیستم نوار نقاله، شرکت اتوماسیون{" "}
                  <a
                    href={SHOPS.robot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline decoration-accent/40 underline-offset-4"
                  >
                    {SHOPS.robot.name}
                  </a>{" "}
                  تجربه‌ی پروژه‌های مشابه را دارد.
                </p>
                <a
                  href={SHOPS.robot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  مشاوره‌ی پروژه
                  <MoveUpLeft className="h-4 w-4" />
                </a>
              </Panel>
            </Reveal>

            <Reveal delay={0.15}>
              <Callout title="چه بفرستم؟">
                کد قطعه اگر می‌دانید؛ اگر نمی‌دانید، قطر شفت، توان یا گشتاور محرک، دور کاری و جهت
                چرخش. با همین چهار مورد معمولاً در یک رفت‌وبرگشت به جواب می‌رسیم.
              </Callout>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading
            kicker="قبل از تماس"
            title="سه چیزی که جواب را سریع‌تر می‌کند"
            desc="بیشتر رفت‌وبرگشت‌ها برای همین سه مورد است."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "جهت چرخش",
                body: "فری‌ویل راست‌گرد و چپ‌گرد دو کد متفاوت‌اند. روی بدنه‌ی قطعه‌ی قبلی معمولاً فلش حک شده است.",
              },
              {
                title: "کدام حلقه آزاد می‌چرخد",
                body: "در بک‌استاپ معمولاً حلقه‌ی داخلی روی شفت است و حلقه‌ی خارجی با اهرم به پایه بسته می‌شود. در اوررانینگ برعکس.",
              },
              {
                title: "پروفایل کاری",
                body: "چند ساعت در شبانه‌روز آزاد می‌چرخد؟ همین عدد تعیین می‌کند نسخه‌ی استاندارد کافی است یا لیفت‌آف لازم است.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Panel className="h-full p-6">
                  <h3 className="text-[16px] text-fg">{item.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{item.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
