import type { Metadata } from "next";
import Link from "next/link";
import { MoveUpLeft } from "lucide-react";

import { Reveal } from "@/components/motion";
import { BuyNote, Callout, Panel, RobotNote, SectionHeading, StatBlock } from "@/components/ui";
import { CONTACT, SHOPS } from "@/content/site";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "freewheel.ir بخش فنی کار ما در حوزه‌ی فری‌ویل و قطعات انتقال قدرت است؛ خرید در bearingonline.ir و پروژه‌های نوار نقاله در persiarobot.ir انجام می‌شود.",
  alternates: { canonical: "/about" },
};

const NOTES = [
  {
    title: "از کجا شروع شد",
    body: "کار ما با بلبرینگ و قطعات انتقال قدرت شروع شد. همان اول فهمیدیم مشتری برای فری‌ویل معمولاً یک کد کوتاه می‌آورد — «فری‌ویل R35» — و بعد از آن، بحث سایزبندی و جهت چرخش پیش می‌آید. همین جای خالی، دلیل ساخت این سایت بود.",
  },
  {
    title: "چرا فقط اطلاعات، نه فروش",
    body: "خرید قطعه در فروشگاه آنلاین انجام می‌شود؛ آن‌جا موجودی و قیمت و زمان تأمین دیده می‌شود. این‌جا کار فنی است: مشخصات، مقایسه‌ی سری‌ها، سایزبندی و خطاهای رایج. قاطی کردن این دو، کار مشتری را سخت می‌کند.",
  },
  {
    title: "روال کار",
    body: "مشتری مشخصات را می‌فرستد — قطر شفت، توان یا گشتاور، دور و جهت چرخش. ما گشتاور طراحی را با ضریب سرویس حساب می‌کنیم، سایز را روی جدول کاتالوگ می‌بندیم، نسخه‌ی درست (استاندارد، X، با اهرم، با فلنج) را پیشنهاد می‌دهیم و بعد لینک خرید می‌دهیم.",
  },
];

export default function AboutPage() {
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
              <span className="text-fg-muted">درباره ما</span>
            </nav>
            <h1 className="max-w-3xl text-[32px] leading-tight text-fg sm:text-[40px]">
              بخش فنی کار ما: فری‌ویل و قطعات انتقال قدرت
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              freewheel.ir یک سایت اطلاعاتی است. ما روی مشخصات فنی، انتخاب سری و سایزبندی
              کار می‌کنیم؛ خرید را در فروشگاه آنلاین انجام می‌دهیم و پروژه‌های نوار نقاله را در
              شرکت اتوماسیون می‌بندیم.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            {NOTES.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.04}>
                <div>
                  <h2 className="text-[21px] text-fg">{note.title}</h2>
                  <p className="mt-3 text-[15px] leading-8 text-fg-muted">{note.body}</p>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <Callout title="یک جمله که همیشه تکرار می‌کنیم">
                اعداد کاتالوگی را حتماً با آخرین نسخه‌ی دیتاشیت کنترل کنید. ما هم همین کار را
                می‌کنیم؛ هر چند سال یک بار سازنده جدول را بازبینی می‌کند.
              </Callout>
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">دو آدرس، دو کار</h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={SHOPS.bearing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-line-2 bg-panel-2 p-4 transition-colors hover:border-accent/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-fg-muted">{SHOPS.bearing.label}</span>
                      <MoveUpLeft className="h-4 w-4 text-accent" />
                    </div>
                    <div dir="ltr" className="mt-2 text-[15px] font-semibold text-fg">
                      {SHOPS.bearing.name}
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-6 text-fg-dim">
                      {SHOPS.bearing.description}
                    </p>
                  </a>
                  <a
                    href={SHOPS.robot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-line-2 bg-panel-2 p-4 transition-colors hover:border-accent/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-fg-muted">{SHOPS.robot.label}</span>
                      <MoveUpLeft className="h-4 w-4 text-accent" />
                    </div>
                    <div dir="ltr" className="mt-2 text-[15px] font-semibold text-fg">
                      {SHOPS.robot.name}
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-6 text-fg-dim">
                      {SHOPS.robot.description}
                    </p>
                  </a>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.05}>
              <Panel className="p-6">
                <h2 className="text-[15px] font-semibold text-fg">در یک نگاه</h2>
                <dl className="mt-5 grid grid-cols-2 gap-6">
                  <StatBlock label="سری ثبت‌شده در سایت" value="۷" unit="سری" />
                  <StatBlock label="سایز با جدول مشخصات" value="۲۳" unit="سایز" />
                  <StatBlock label="برند قابل تأمین" value="۷" unit="برند" />
                  <StatBlock label="صنعت هدف" value="۶" unit="صنعت" />
                </dl>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-14">
          <SectionHeading
            kicker="تماس"
            title="چطور با ما در ارتباط باشید"
            desc="برای سایزبندی و انتخاب سری، فرم سایت را پر کنید یا در ساعات کاری تلفن بزنید. برای خرید، مستقیم به فروشگاه بروید."
          />
          <Reveal className="mt-8">
            <Panel className="p-7">
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-[11.5px] text-fg-dim">تلفن</dt>
                  <dd dir="ltr" className="tnum mt-1.5 text-[15px] text-fg">
                    {CONTACT.phone}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-fg-dim">موبایل</dt>
                  <dd dir="ltr" className="tnum mt-1.5 text-[15px] text-fg">
                    {CONTACT.mobile}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-fg-dim">ایمیل</dt>
                  <dd dir="ltr" className="mt-1.5 text-[15px] text-fg">
                    {CONTACT.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-fg-dim">ساعات کاری</dt>
                  <dd className="mt-1.5 text-[13.5px] leading-7 text-fg">{CONTACT.hours}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-line pt-5 text-[12.5px] text-fg-dim">
                نشانی: {CONTACT.address}
              </p>
            </Panel>
          </Reveal>

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
    </>
  );
}
