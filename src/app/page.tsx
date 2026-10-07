import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Gauge, LockKeyhole, Ruler, RotateCcw, Timer } from "lucide-react";

import { FaqList } from "@/components/faq";
import { DriveStationSection } from "@/components/drive-station";
import { FloatingFreewheels } from "@/components/floating-freewheels";
import { FreewheelGallery } from "@/components/freewheel-gallery";
import { HeroVisual } from "@/components/hero-visual";
import { HowItWorks } from "@/components/how-it-works";
import { ScrollBackdrop } from "@/components/scroll-backdrop";
import { APPLICATIONS } from "@/content/applications";
import { PART_IMAGE } from "@/content/product-images";
import { PageTransition } from "@/components/page-transition";
import { ProjectStory } from "@/components/project-story";

const FEATURED_APPLICATIONS = APPLICATIONS.filter((application) =>
  ["conveyor", "textile", "packaging"].includes(application.slug),
);

const APPLICATION_COPY: Record<string, string> = {
  conveyor: "وقتی خط می‌ایستد، فری‌ویل جلوی برگشت ناخواسته‌ی نوار را می‌گیرد.",
  textile: "برای حرکت پله‌ای یا جداکردن دو محرک در ماشین‌آلات نساجی.",
  packaging: "برای حرکت مرحله‌ای و تکرارپذیر در ماشین‌های بسته‌بندی.",
};

const HOME_FAQ = [
  {
    q: "فری‌ویل همان کلاچ یک‌طرفه است؟",
    a: "بله. فری‌ویل یا کلاچ یک‌طرفه در یک جهت آزاد می‌چرخد و در جهت مخالف درگیر می‌شود. انتخاب مدل به گشتاور، سرعت و نوع نصب بستگی دارد.",
  },
  {
    q: "برای کار کردن به برق یا سنسور نیاز دارد؟",
    a: "خیر. عملکرد آن مکانیکی است؛ تغییر جهت یا اختلاف سرعت باعث درگیری المان‌ها می‌شود و قطعه بدون فرمان الکتریکی کار می‌کند.",
  },
  {
    q: "برای پیشنهاد مدل چه اطلاعاتی لازم است؟",
    a: "قطر شفت، گشتاور یا توان و دور موتور، سرعت چرخش آزاد و جهت عملکرد را بفرستید. اگر همه‌ی عددها را ندارید، عکس قطعه یا پلاک موتور هم برای شروع کمک می‌کند.",
  },
  {
    q: "فری‌ویل با بک‌استاپ چه فرقی دارد؟",
    a: "بک‌استاپ یکی از کاربردهای فری‌ویل است: روی شفت نصب می‌شود تا وقتی نوار نقاله یا بار می‌خواهد برگردد، قفل کند. فری‌ویل در کاربردهای دیگری مثل جداسازی دو محرک و حرکت پله‌ای هم استفاده می‌شود.",
  },
] as const;

const TYPES = [
  {
    name: "اسپراگ",
    english: "SPRAG",
    summary: "المان‌های گوه‌ایِ فولادی بین دو حلقه",
    body: "برای درگیری مطمئن و انتقال گشتاورهای بالا در بسیاری از کاربردهای صنعتی استفاده می‌شود.",
    image: PART_IMAGE.typeSprag,
    series: { href: "/ringspann/fb", label: "سری FB در کاتالوگ RINGSPANN" },
  },
  {
    name: "رولری",
    english: "ROLLER",
    summary: "غلتک‌هایی که در فضای گوه‌ای حرکت می‌کنند",
    body: "ساختاری رایج و فشرده برای کاربردهای عمومی؛ جزئیات انتخاب به سرعت آزاد و شرایط کار بستگی دارد.",
    image: PART_IMAGE.typeRoller,
    series: { href: "/ringspann/fgr-r", label: "سری FGR … R در کاتالوگ RINGSPANN" },
  },
] as const;

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
        <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]">
        {title}
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-white/65 sm:text-[15px] sm:leading-8">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageTransition>
      <ScrollBackdrop />
      <div className="home-grain" aria-hidden="true" />

      <section className="relative overflow-hidden text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-12 sm:px-7 sm:py-16 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] text-white/80">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
              مرجع ساده‌ی فری‌ویل صنعتی
            </p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.65rem,5.6vw,5.25rem)] font-bold leading-[1.27] tracking-tight text-white">
              فری‌ویل؛
              <br />
              <span className="text-mint">آزاد در یک جهت،</span>
              <br className="hidden sm:block" />
              قفل در جهت دیگر.
            </h1>
            <p className="mt-6 max-w-[590px] text-[15px] leading-8 text-white/75 sm:text-[16px] sm:leading-9">
              فری‌ویل یا کلاچ یک‌طرفه، اجازه می‌دهد شفت در مسیر درست آزاد بچرخد و به‌محض برگشت، دو بخش را به هم قفل می‌کند؛ بدون برق، سنسور یا فرمان.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#how"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-mint px-5 text-[13px] font-bold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                اصل کار را ببین
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/ringspann"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                مدل‌ها و کاتالوگ
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/65">
              {["عملکرد مکانیکی", "بی‌نیاز از برق", "واکنش سریع به برگشت"].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual />
        </div>

        <a
          href="#how"
          aria-label="اسکرول به بخش اصل کار"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-mint md:flex"
        >
          <span className="text-[11px]">اسکرول کن</span>
          <span className="relative block h-10 w-6 overflow-hidden rounded-full border border-white/20">
            <span className="scroll-cue-dot absolute left-1/2 top-1 h-2 w-2 rounded-full bg-mint" />
          </span>
        </a>
      </section>

      <HowItWorks />

      <div className="home-hairline" aria-hidden="true" />

      <ProjectStory />

      <div className="home-hairline" aria-hidden="true" />

      <DriveStationSection />

      <div className="home-hairline" aria-hidden="true" />

      <section id="applications" className="scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="کاربردها"
              title="فری‌ویل کجا به کار می‌آید؟"
              description="هر جا لازم است چرخش یک‌طرفه کنترل شود، فری‌ویل می‌تواند بخشی از راه‌حل باشد. این‌ها چند نمونه‌ی رایج‌اند."
            />
            <Link
              href="/applications"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-mint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
            >
              دیدن همه‌ی کاربردها
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {FEATURED_APPLICATIONS.map((application) => (
              <Link
                key={application.slug}
                href={`/applications/${application.slug}`}
                transitionTypes={["nav-forward"]}
                className="group overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-mint/40 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
              >
                <div className="relative aspect-[1.35] overflow-hidden bg-[#0b2630]">
                  <Image
                    src={application.image.src}
                    alt={application.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="kb-breathe object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-ocean/5 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-ocean/65 px-3 py-1.5 text-[10.5px] text-white backdrop-blur-sm">
                    {application.kicker}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[16px] font-bold text-white">{application.title}</h3>
                    <ArrowUpLeft className="h-4 w-4 shrink-0 text-mint transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
                  </div>
                  <p className="mt-2.5 text-[13px] leading-7 text-white/60">
                    {APPLICATION_COPY[application.slug] ?? application.intro[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FreewheelGallery />

      <div className="home-hairline" aria-hidden="true" />

      <section id="types" className="scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="انواع رایج"
              title="دو ساختار را بیشتر می‌بینید"
              description="فری‌ویل‌ها از نظر شکل المان داخلی تفاوت دارند. این‌ها عکس واقعی داخل قطعه است؛ انتخاب نهایی به شرایط واقعی کار بستگی دارد."
            />
            <Link
              href="/articles/sprag-vs-roller"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-mint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
            >
              مقایسه‌ی کامل‌تر
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {TYPES.map((type) => (
              <article key={type.english} className="home-type-card">
                <div className="home-type-art">
                  <Image
                    src={type.image.src}
                    alt={type.image.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="object-cover"
                  />
                  <span className="home-type-tag" dir="ltr" translate="no">
                    {type.english}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <h3 className="text-[18px] font-bold text-white">{type.name}</h3>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.13em] text-mint" dir="ltr" translate="no">
                    {type.english}
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-white/80">{type.summary}</p>
                <p className="mt-2 text-[12.5px] leading-7 text-white/55">{type.body}</p>
                <Link
                  href={type.series.href}
                  className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-semibold text-mint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
                >
                  {type.series.label}
                  <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FloatingFreewheels />

      <div className="home-hairline" aria-hidden="true" />

      <section id="choose" className="scroll-mt-24 px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="selection-panel relative mx-auto grid max-w-[1240px] gap-9 overflow-hidden rounded-[28px] border border-white/10 px-6 py-8 text-white sm:px-9 sm:py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-12 lg:py-12">
          <div className="relative z-10">
            <p className="text-[12px] font-semibold text-mint">راهنمای انتخاب</p>
            <h2 className="mt-3 max-w-lg text-[27px] font-bold leading-[1.5] text-white sm:text-[34px]">
              برای شروع انتخاب، چهار چیز را بدان.
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-7 text-white/70">
              لازم نیست از همان اول همه‌چیز را بدانی. این اطلاعات کمک می‌کند مدل مناسب‌تری پیدا کنیم.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-[12.5px] font-bold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                شروع مشاوره
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/articles/freewheel-sizing"
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                راهنمای سایزبندی
              </Link>
            </div>
          </div>

          <ul className="relative z-10 grid gap-2 sm:grid-cols-2">
            {[
              { title: "قطر شفت", detail: "اندازه‌ی محل نصب", Icon: Ruler },
              { title: "گشتاور یا توان", detail: "به‌همراه دور موتور", Icon: Gauge },
              { title: "سرعت چرخش آزاد", detail: "چند دور و چه مدت؟", Icon: Timer },
              { title: "جهت عملکرد", detail: "وضعیت نصب قطعه", Icon: RotateCcw },
            ].map(({ title, detail, Icon }) => (
              <li key={title} className="flex min-h-[94px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 sm:px-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-white">{title}</span>
                  <span className="mt-1 block text-[11px] text-white/60">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="relative z-10 -mt-3 text-[11.5px] leading-6 text-white/55 sm:col-span-2 lg:-mt-5">
            اگر عددها را نداری، عکس پلاک موتور یا کد قطعه‌ی فعلی هم برای شروع مفید است.
          </p>
        </div>
      </section>

      <div className="home-hairline" aria-hidden="true" />

      <section>
        <div className="mx-auto grid max-w-[1240px] gap-9 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              label="سؤالات پرتکرار"
              title="هنوز سؤالی مانده؟"
              description="چند جواب کوتاه برای شروع؛ برای بررسی یک کاربرد یا انتخاب سایز، مشخصات پروژه را بفرست."
            />
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[12.5px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              پرسش از کارشناس
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={HOME_FAQ} tone="dark" />
        </div>
      </section>

      <div className="home-hairline" aria-hidden="true" />

      <section>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[14px] font-bold text-white">به دنبال مدل یا جدول ابعاد هستی؟</h2>
              <p className="mt-1 text-[12px] leading-6 text-white/55">از کاتالوگ RINGSPANN شروع کن یا همه‌ی برندها را ببین.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ringspann" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-mint px-4 text-[12px] font-bold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
              مدل‌ها و ابعاد
              <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link href="/brands" className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-[12px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
              همه‌ی برندها
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
