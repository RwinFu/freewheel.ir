import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpLeft,
  BadgeCheck,
  Gauge,
  Layers,
  LockKeyhole,
  MoveUpLeft,
  RotateCcw,
  Ruler,
  Timer,
} from "lucide-react";

import heroCutaway from "@/assets/images/product/hero-cutaway.jpg";
import conveyorMill from "@/assets/images/conveyor-mill.jpg";
import packagingLine from "@/assets/images/packaging-line.jpg";
import textileMill from "@/assets/images/textile-mill.jpg";

import { FaqList } from "@/components/faq";
import { CatalogPlate } from "@/components/catalog-explorer";
import { MechanismExplorer } from "@/components/mechanism";
import { PinnedFreewheel } from "@/components/pinned-freewheel";
import { PartSearch } from "@/components/part-search";
import { Reveal } from "@/components/motion";
import { SectionHeading, SectionLink, Tag } from "@/components/ui";
import { RINGSPANN_SERIES, type SeriesShape } from "@/content/ringspann";
import { CATALOG_ITEMS, TORQUE_SCALE } from "@/lib/series-view";
import { num } from "@/lib/utils";

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

/** چهار شکل قطعه در کاتالوگ؛ ستون فقرات دسته‌بندی سایت. */
const SHAPES: {
  key: SeriesShape;
  title: string;
  lead: string;
  seriesSlugs: string[];
  where: string;
}[] = [
  {
    key: "basic",
    title: "فری‌ویل پایه",
    lead: "قطعه‌ی لخت برای مونتاژ داخل پولی، فلنج یا محفظه‌ی ساخت خودتان.",
    seriesSlugs: ["fgr-r"],
    where: "فشرده و کم‌هزینه؛ روانکاری و آب‌بندی با شماست.",
  },
  {
    key: "internal",
    title: "فری‌ویل داخلی",
    lead: "همان کار بلبرینگ را هم انجام می‌دهد؛ بار شعاعی را تحمل می‌کند.",
    seriesSlugs: ["fz"],
    where: "برای فضای محدود، غلتک نساجی و قطر شفت کوچک.",
  },
  {
    key: "complete",
    title: "فری‌ویل کامل",
    lead: "آب‌بندی‌شده و روغن‌پر، آماده‌ی نصب روی شفت.",
    seriesSlugs: ["bm-r", "fb", "fkh", "fa-fav"],
    where: "برای نصب سریع، استفاده در محیط گردوغبار و رطوبت.",
  },
  {
    key: "backstop",
    title: "بک‌استاپ سرعت پایین",
    lead: "برای گشتاورهای صدها هزار نیوتن‌متر و شفت‌های بزرگ.",
    seriesSlugs: ["frhn"],
    where: "پشت گیربکس نوار نقاله‌ی شیب‌دار، بالابر و سنگ‌شکن.",
  },
];

const FEATURED_APPLICATIONS = [
  {
    slug: "conveyor",
    title: "نوار نقاله و بک‌استاپ",
    image: conveyorMill,
    alt: "نوار نقاله‌های شیب‌دار در واحد دانه‌بندی و دپوی مواد",
    body: "وقتی خط می‌ایستد، فری‌ویل جلوی برگشت ناخواسته‌ی نوار را می‌گیرد.",
    series: "FRHN · FGR … R A3A4",
  },
  {
    slug: "textile",
    title: "نساجی و ریسندگی",
    image: textileMill,
    alt: "خط بافندگی با نخ‌کشی و غلتک‌های ماشین نساجی",
    body: "برای حرکت پله‌ای و جداکردن دو محرک در ماشین‌آلات نساجی.",
    series: "FZ · SM / SMP",
  },
  {
    slug: "packaging",
    title: "بسته‌بندی و پالتیزه",
    image: packagingLine,
    alt: "خط بسته‌بندی و انتقال بسته‌ها روی نوار نقاله",
    body: "برای حرکت مرحله‌ای و تکرارپذیر در ماشین‌های بسته‌بندی.",
    series: "FGR … R · FA / FAV",
  },
];

const SELECTION_ITEMS = [
  { title: "قطر شفت", detail: "اندازه‌ی محل نصب", Icon: Ruler },
  { title: "گشتاور یا توان", detail: "به‌همراه دور موتور", Icon: Gauge },
  { title: "سرعت چرخش آزاد", detail: "چند دور و چه مدت؟", Icon: Timer },
  { title: "جهت عملکرد", detail: "وضعیت نصب قطعه", Icon: RotateCcw },
];

export default function HomePage() {
  const seriesByShape = (shape: SeriesShape) =>
    RINGSPANN_SERIES.filter((series) => series.shape === shape);
  const featuredPlates = CATALOG_ITEMS.filter((item) =>
    ["fgr-r", "fz", "frhn"].includes(item.slug),
  );

  return (
    <>
      {/* ---------------- هیرو ---------------- */}
      <section className="hero-instrument relative overflow-hidden text-white">
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-12 pt-14 sm:px-7 lg:min-h-[660px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:pb-16 lg:pt-16">
          <div className="relative z-10 text-left">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] text-white/80">
              <span className="h-2 w-2 rounded-full bg-mint animate-pulse-dot" aria-hidden="true" />
              مرجع فارسی فری‌ویل و کلاچ یک‌طرفه
            </p>

            <h1 className="hero-rise font-display mt-6 max-w-2xl text-[clamp(2.5rem,5.2vw,4.6rem)] font-black leading-[1.3] tracking-tight text-white">
              آزاد در یک جهت،
              <br />
              <span className="text-mint">قفل در جهت دیگر.</span>
            </h1>

            <p className="hero-rise mt-6 max-w-[600px] text-[15.5px] leading-9 text-white/75 [animation-delay:120ms]">
              فری‌ویل — یا کلاچ یک‌طرفه — قطعه‌ای مکانیکی است که در مسیر درست اجازه می‌دهد شفت آزاد
              بچرخد و به‌محض برگشت، دو حلقه را به هم قفل می‌کند. بدون برق، سنسور و فرمان؛ فقط با
              شکل المان‌های داخلی.
            </p>

            <div className="hero-rise mt-8 flex flex-wrap items-center gap-3 [animation-delay:200ms]">
              <Link
                href="#mechanism"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-mint px-5 text-[13.5px] font-bold text-ocean transition-colors hover:bg-white active:scale-[0.98]"
              >
                سازوکار را ببین
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/ringspann"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[13.5px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                کاتالوگ سری‌ها
              </Link>
            </div>

            <dl className="hero-rise mt-10 grid max-w-xl grid-cols-2 gap-x-5 gap-y-5 border-t border-white/12 pt-7 sm:grid-cols-4 [animation-delay:280ms]">
              <div>
                <dt className="whitespace-nowrap text-[11px] text-white/55">سری فعال</dt>
                <dd className="code mt-1.5 text-[22px] font-bold text-white" translate="no">
                  {RINGSPANN_SERIES.length}
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11px] text-white/55">سقف گشتاور</dt>
                <dd className="code mt-1.5 text-[22px] font-bold text-white" translate="no">
                  {num(TORQUE_SCALE.max)}
                  <span className="ms-1 text-[11px] font-medium text-white/60">N·m</span>
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11px] text-white/55">سقف قطر شفت</dt>
                <dd className="code mt-1.5 text-[22px] font-bold text-white" translate="no">
                  320
                  <span className="ms-1 text-[11px] font-medium text-white/60">mm</span>
                </dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[11px] text-white/55">بازه‌ی FGR … R</dt>
                <dd className="code mt-1.5 text-[22px] font-bold text-white" translate="no">
                  12→150
                </dd>
              </div>
            </dl>
          </div>

          {/* قاب تصویر: تصویر خودِ قطعه، نه یک کارت تزئینی */}
          <figure className="hero-shot relative z-10 [animation-delay:80ms]">
            <div className="plate-shot plate-ticks overflow-hidden rounded-[20px] border border-white/12">
              <Image
                src={heroCutaway}
                alt="برش رندر‌شده‌ی یک کلاچ یک‌طرفه روی شفت: حلقه‌ی بیرونی، المان‌های گوه‌ای و حلقه‌ی داخلی"
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-white/55">
              <span>برش شبیه‌سازی‌شده: حلقه‌ی بیرونی، المان‌های قفل‌کننده، حلقه‌ی داخلی روی شفت</span>
              <span className="code" translate="no">
                SECTION A–A
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- سازوکار ---------------- */}
      <section id="mechanism" className="scroll-mt-24 border-b border-line bg-base">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <SectionHeading
            index="۰۱"
            kicker="سازوکار"
            title="داخل قطعه چه خبر است؟"
            desc="هر فری‌ویل از چند حلقه و یک ردیف المان کوچک ساخته شده. همین المان‌ها هستند که آزادی یک‌طرفه را می‌سازند. سه بخش زیر را به ترتیب ببینید."
          />
          <div className="mt-10">
            <MechanismExplorer />
          </div>
        </div>
      </section>

      {/* ---------------- چرخه‌ی کار روی خط (اسکرول‌محور) ---------------- */}
      <PinnedFreewheel />

      {/* ---------------- انواع / کاتالوگ‌بندی ---------------- */}
      <section id="types" className="scroll-mt-24 border-b border-line bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <SectionHeading
            index="۰۳"
            kicker="کاتالوگ‌بندی"
            title="چهار شکل قطعه، چهار کار متفاوت"
            desc="پیش از انتخاب سایز، باید بدانید کدام شکل قطعه در خط شما می‌نشیند: لخت داخل محفظه، داخلی با تحمل بار، کامل و آماده‌ی نصب، یا بک‌استاپ سنگین."
            action={<SectionLink href="/ringspann">کاتالوگ کامل با جدول ابعاد</SectionLink>}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SHAPES.map((shape, index) => {
              const series = seriesByShape(shape.key);
              return (
                <Reveal key={shape.key} delay={index * 0.04}>
                  <article className="flex h-full flex-col rounded-[16px] border border-line bg-panel p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[17px] font-bold text-fg">{shape.title}</h3>
                      <span className="code text-[11.5px] text-fg-dim" translate="no">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] leading-7 text-fg-muted">{shape.lead}</p>
                    <p className="mt-2 text-[12px] leading-6 text-fg-dim">{shape.where}</p>

                    <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                      {series.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/ringspann/${item.slug}`}>
                            <Tag tone={item.element === "roller" ? "mint" : "lock"}>
                              <span className="code" translate="no">
                                {item.designation}
                              </span>
                            </Tag>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/ringspann/${series[0].slug}`}
                      className="mt-5 inline-flex min-h-10 items-center gap-2 border-t border-line pt-4 text-[12.5px] font-semibold text-accent transition-colors hover:text-fg"
                    >
                      مشخصات این خانواده
                      <MoveUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- کاتالوگ سری‌ها ---------------- */}
      <section className="border-b border-line bg-base">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <SectionHeading
            index="۰۴"
            kicker="کاتالوگ"
            title="سری‌ها؛ از ۵۵ تا ۵۰۳٫۵۵۰ نیوتن‌متر"
            desc="هر سری یک کار را بهتر انجام می‌دهد. نوار گشتاور زیر هر کارت نشان می‌دهد آن سری کجای این بازه می‌نشیند؛ برای دیدن جدول ابعاد، کارت را باز کنید."
            action={<SectionLink href="/ringspann">همه‌ی سری‌ها و جست‌وجوی کد</SectionLink>}
          />

          <Reveal className="mt-8 rounded-[16px] border border-line bg-panel px-5 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-fg">کد قطعه را می‌دانید؟</h3>
                <p className="mt-1.5 text-[12.5px] leading-6 text-fg-muted">
                  کد را بنویسید — مثل <span className="code" translate="no">FGR 45 R</span> — تا
                  گشتاور، قطر سوراخ و دور مجاز همان سایز را ببینید.
                </p>
              </div>
              <div className="w-full max-w-sm">
                <PartSearch className="relative w-full" />
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredPlates.map((item) => (
              <CatalogPlate key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- کاربردها ---------------- */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
          <SectionHeading
            index="۰۵"
            kicker="کاربردها"
            title="در خط تولید کجا دیده می‌شود؟"
            desc="هر جا چرخش باید یک‌طرفه کنترل شود، فری‌ویل بخشی از راه‌حل است: بک‌استاپ نوار شیب‌دار، جداسازی دو محرک، حرکت پله‌ای."
            action={<SectionLink href="/applications">همه‌ی کاربردها</SectionLink>}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FEATURED_APPLICATIONS.map((application, index) => (
              <Reveal key={application.slug} delay={index * 0.05}>
                <Link
                  href={`/applications/${application.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-panel transition-colors hover:border-accent/55"
                >
                  <div className="plate-shot plate-ticks aspect-[4/3]">
                    <Image
                      src={application.image}
                      alt={application.alt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ocean/80 to-transparent" aria-hidden="true" />
                    <span className="code absolute bottom-3.5 right-3.5 rounded-md border border-white/20 bg-ocean/55 px-2 py-1 text-[10.5px] text-white/85 backdrop-blur-sm" translate="no">
                      {application.series}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[16.5px] font-bold text-fg">{application.title}</h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-7 text-fg-muted">{application.body}</p>
                    <span className="mt-4 inline-flex items-center gap-2 border-t border-line pt-4 text-[12.5px] font-semibold text-fg-dim transition-colors group-hover:text-accent">
                      سناریو و راهنمای انتخاب
                      <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- راهنمای انتخاب ---------------- */}
      <section className="bg-paper px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="selection-panel relative mx-auto grid max-w-[1320px] gap-9 overflow-hidden rounded-[22px] px-6 py-9 text-white sm:px-9 sm:py-11 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-12 lg:py-12">
          <div className="relative z-10">
            <p className="text-[12px] font-semibold text-mint">پیش از استعلام</p>
            <h2 className="font-display mt-3 max-w-lg text-[28px] font-bold leading-[1.45] text-white sm:text-[35px]">
              برای انتخاب، چهار چیز را بدان.
            </h2>
            <p className="mt-3 max-w-lg text-[13.5px] leading-7 text-white/70">
              لازم نیست از همان اول همه‌چیز را بدانی؛ با همین چهار مورد می‌توان سایز را روی جدول
              کاتالوگ بست.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mint px-5 text-[12.5px] font-bold text-ocean transition-colors hover:bg-white active:scale-[0.98]"
              >
                شروع مشاوره
                <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/articles/freewheel-sizing"
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                راهنمای سایزبندی
              </Link>
            </div>
          </div>

          <ul className="relative z-10 grid gap-2 sm:grid-cols-2">
            {SELECTION_ITEMS.map(({ title, detail, Icon }) => (
              <li
                key={title}
                className="flex min-h-[92px] items-center gap-4 rounded-[16px] border border-white/10 bg-white/[0.045] px-4 py-4 sm:px-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-white/10 text-mint">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold text-white">{title}</span>
                  <span className="mt-1 block text-[11.5px] text-white/60">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="relative z-10 text-[11.5px] leading-6 text-white/55 sm:col-span-2 lg:-mt-4">
            اگر عددها را نداری، عکس پلاک موتور یا کد قطعه‌ی فعلی هم برای شروع مفید است.
          </p>
        </div>
      </section>

      {/* ---------------- پرسش‌های پرتکرار ---------------- */}
      <section className="border-t border-line bg-base">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              index="۰۵"
              kicker="پرسش‌های پرتکرار"
              title="هنوز سؤالی مانده؟"
              desc="چند جواب کوتاه برای شروع؛ برای بررسی یک کاربرد یا انتخاب سایز، مشخصات پروژه را بفرست."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 bg-panel px-5 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                پرسش از کارشناس
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 bg-panel px-5 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                مقالات فنی
              </Link>
            </div>
          </div>
          <FaqList items={HOME_FAQ} />
        </div>
      </section>

      {/* ---------------- نوار پایانی ---------------- */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-panel-2 text-accent">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[15px] font-bold text-fg">مدل یا جدول ابعاد را می‌خواهی؟</h2>
              <p className="mt-1 text-[12.5px] leading-6 text-fg-muted">
                از کاتالوگ RINGSPANN شروع کن یا فهرست برندها را ببین.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ringspann"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ocean px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-ocean-light"
            >
              مدل‌ها و ابعاد
              <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/brands"
              className="inline-flex min-h-11 items-center rounded-full border border-line-2 px-5 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              همه‌ی برندها
            </Link>
          </div>
        </div>
      </section>

      {/* نشان‌های اعتماد محتوایی: داده از کاتالوگ، بدون اغراق */}
      <section className="border-t border-line bg-base">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-7 gap-y-3 px-5 py-6 text-[12px] text-fg-dim sm:px-7 lg:px-8">
          {[
            { Icon: BadgeCheck, text: "اعداد نقل‌شده از دیتاشیت سازنده" },
            { Icon: Layers, text: "هفت سری و ۲۳ سایز با جدول مشخصات" },
            { Icon: RotateCcw, text: "راهنمای انتخاب، نصب و رفع اشکال" },
          ].map(({ Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
