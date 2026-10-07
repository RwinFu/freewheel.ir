import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Gauge, LockKeyhole, Ruler, RotateCcw, Timer } from "lucide-react";

import { FaqList } from "@/components/faq";
import { FreewheelDemo } from "@/components/freewheel-demo";
import { FreewheelGallery } from "@/components/freewheel-gallery";
import { HeroVisual } from "@/components/hero-visual";
import { RollerTypeDiagram, SpragTypeDiagram } from "@/components/diagrams";
import { APPLICATIONS } from "@/content/applications";
import { PageTransition } from "@/components/page-transition";

const FEATURED_APPLICATIONS = APPLICATIONS.filter((application) =>
  ["conveyor", "textile", "packaging"].includes(application.slug),
);

const APPLICATION_COPY: Record<string, string> = {
  conveyor: "وقتی خط می‌ایستد، فری‌ویل جلوی برگشت ناخواسته‌ی نوار را می‌گیرد.",
  textile: "برای حرکت پله‌ای یا جداکردن دو محرک در ماشین‌آلات نساجی.",
  packaging: "برای حرکت مرحله‌ای و تکرارپذیر در ماشین‌های بسته‌بندی.",
};

const WORK_STEPS = [
  {
    title: "چرخش در جهت مجاز",
    text: "فری‌ویل اجازه می‌دهد شفت و اجزای دستگاه آزادانه بچرخند.",
  },
  {
    title: "تغییر جهت یا اختلاف سرعت",
    text: "المان‌های کوچک داخل قطعه به سمت فضای باریک بین دو حلقه می‌روند.",
  },
  {
    title: "درگیری و انتقال نیرو",
    text: "دو حلقه قفل می‌شوند؛ برگشت گرفته می‌شود یا نیرو به بخش بعدی می‌رسد.",
  },
];

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
    diagram: <SpragTypeDiagram animate={false} className="h-auto w-full" />,
  },
  {
    name: "رولری",
    english: "ROLLER",
    summary: "غلتک‌هایی که در فضای گوه‌ای حرکت می‌کنند",
    body: "ساختاری رایج و فشرده برای کاربردهای عمومی؛ جزئیات انتخاب به سرعت آزاد و شرایط کار بستگی دارد.",
    diagram: <RollerTypeDiagram animate={false} className="h-auto w-full" />,
  },
];

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
      <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-accent">
        <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-balance text-[28px] font-bold leading-[1.45] text-fg sm:text-[36px]">
        {title}
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-fg-muted sm:text-[15px] sm:leading-8">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageTransition>
      <section className="hero-surface relative overflow-hidden text-white">
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
      </section>

      <section id="how" className="scroll-mt-24 border-b border-line bg-base">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              label="اصل کار"
              title="یک قطعه، دو حالت ساده"
              description="داخل فری‌ویل، المان‌هایی بین یک حلقه‌ی داخلی و یک حلقه‌ی بیرونی قرار دارند. شکل این المان‌هاست که چرخش آزاد را از قفل‌شدن جدا می‌کند."
            />
            <div className="mt-6 rounded-2xl border border-line bg-white px-5 py-4">
              <p className="text-[11px] font-semibold text-accent">یک مثال آشنا</p>
              <p className="mt-1.5 text-[13px] leading-7 text-fg-muted">
                توپی چرخ دوچرخه وقتی رکاب را رها می‌کنی، چرخ را آزاد می‌گذارد؛ در صنعت همین منطق برای کنترل بارهای سنگین به کار می‌رود.
              </p>
            </div>
            <div className="mt-6">
              <FreewheelDemo />
            </div>
          </div>

          <ol className="grid content-center gap-3 sm:grid-cols-3 lg:gap-2">
            {WORK_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-white p-5 sm:p-4 lg:p-5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-panel-2 text-[13px] font-bold text-accent" dir="ltr">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-[14px] font-bold leading-6 text-fg">{step.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="applications" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="کاربردها"
              title="فری‌ویل کجا به کار می‌آید؟"
              description="هر جا لازم است چرخش یک‌طرفه کنترل شود، فری‌ویل می‌تواند بخشی از راه‌حل باشد. این‌ها چند نمونه‌ی رایج‌اند."
            />
            <Link
              href="/applications"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-accent transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
                className="group overflow-hidden rounded-[22px] border border-line bg-panel transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative aspect-[1.35] overflow-hidden bg-panel-2">
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
                    <h3 className="text-[16px] font-bold text-fg">{application.title}</h3>
                    <ArrowUpLeft className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
                  </div>
                  <p className="mt-2.5 text-[13px] leading-7 text-fg-muted">
                    {APPLICATION_COPY[application.slug] ?? application.intro[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FreewheelGallery />

      <section id="types" className="scroll-mt-24 border-y border-line bg-base">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="انواع رایج"
              title="دو ساختار را بیشتر می‌بینید"
              description="فری‌ویل‌ها از نظر شکل المان داخلی تفاوت دارند. این نگاه کلی برای شروع خوب است؛ انتخاب نهایی به شرایط واقعی کار بستگی دارد."
            />
            <Link
              href="/articles/sprag-vs-roller"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-accent transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              مقایسه‌ی کامل‌تر
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {TYPES.map((type) => (
              <article key={type.english} className="home-type-card">
                <div className="home-type-art">{type.diagram}</div>
                <div className="mt-3 flex items-center gap-3">
                  <h3 className="text-[18px] font-bold text-fg">{type.name}</h3>
                  <span className="rounded-full bg-panel-2 px-2.5 py-1 text-[9px] font-semibold tracking-[0.13em] text-fg-dim" dir="ltr" translate="no">
                    {type.english}
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-fg-muted">{type.summary}</p>
                <p className="mt-2 text-[12.5px] leading-7 text-fg-dim">{type.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="choose" className="scroll-mt-24 bg-white px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="selection-panel relative mx-auto grid max-w-[1240px] gap-9 overflow-hidden rounded-[28px] px-6 py-8 text-white sm:px-9 sm:py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-12 lg:py-12">
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

      <section className="border-t border-line bg-base">
        <div className="mx-auto grid max-w-[1240px] gap-9 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              label="سؤالات پرتکرار"
              title="هنوز سؤالی مانده؟"
              description="چند جواب کوتاه برای شروع؛ برای بررسی یک کاربرد یا انتخاب سایز، مشخصات پروژه را بفرست."
            />
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-2 bg-white px-5 py-3 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              پرسش از کارشناس
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={HOME_FAQ} />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-panel-2 text-accent">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[14px] font-bold text-fg">به دنبال مدل یا جدول ابعاد هستی؟</h2>
              <p className="mt-1 text-[12px] leading-6 text-fg-muted">از کاتالوگ RINGSPANN شروع کن یا همه‌ی برندها را ببین.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ringspann" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ocean px-4 text-[12px] font-semibold text-white transition-colors hover:bg-ocean-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              مدل‌ها و ابعاد
              <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link href="/brands" className="inline-flex min-h-10 items-center rounded-full border border-line-2 px-4 text-[12px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              همه‌ی برندها
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
