import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, MoveUpLeft } from "lucide-react";

import { BrandMarquee, Counter, Magnetic, Reveal } from "@/components/motion";
import { PinnedFreewheel } from "@/components/pinned-freewheel";
import {
  BackstopSchematic,
  ExplodedView,
  FreewheelHero,
  MagneticTypeDiagram,
  RollerTypeDiagram,
  SpragTypeDiagram,
} from "@/components/diagrams";
import {
  BuyNote,
  Callout,
  Panel,
  RobotNote,
  SectionHeading,
  SpecTable,
  StatBlock,
  Tag,
} from "@/components/ui";
import { FaqList } from "@/components/faq";
import { APPLICATIONS } from "@/content/applications";
import { ARTICLES } from "@/content/articles";
import { BRANDS } from "@/content/brands";
import { RINGSPANN_OTHER_SERIES, RINGSPANN_SERIES } from "@/content/ringspann";
import { SHOPS } from "@/content/site";
import { cn, num } from "@/lib/utils";

const fgr = RINGSPANN_SERIES[0];

const TYPES = [
  {
    title: "اسپراگ (Sprag)",
    diagram: <SpragTypeDiagram className="w-full" />,
    lead: "المان فولادی با مقطع خاص، بین دو حلقه. تماس خطی و قفل سریع.",
    points: [
      "پخش بار بهتر در گشتاور بالا",
      "حساس به تلرانس شفت و تمیزی روغن",
      "سری‌ها: FB، FRHN، FZ، FA",
    ],
    span: "lg:col-span-3",
  },
  {
    title: "رولری (Roller)",
    diagram: <RollerTypeDiagram className="w-full" />,
    lead: "رولر داخل فضای گوه‌ای می‌غلتد؛ ساختار ساده و ارزان.",
    points: [
      "تحمل دور آزاد بیشتر",
      "ساختار ساده‌تر و ساخت ارزان‌تر",
      "سری‌ها: FGR … R، BM … R، FAV",
    ],
    span: "lg:col-span-3",
  },
  {
    title: "مغناطیسی",
    diagram: <MagneticTypeDiagram className="w-full" />,
    lead: "انتقال گشتاور با میدان مغناطیسی، بدون تماس مکانیکی.",
    points: [
      "سایش مکانیکی تقریباً حذف می‌شود",
      "گشتاور محدودتر و هزینه بالاتر",
      "برای مکانیزم‌های دقیق و کم‌بار",
    ],
    span: "lg:col-span-2",
  },
];

export default function HomePage() {
  const maxLog = Math.log10(fgr.maxTorqueNm);

  return (
    <>
      {/* ---------------- هیرو ---------------- */}
      <section className="relative border-b border-line">
        <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Tag accent>مرجع فنی فری‌ویل</Tag>
                <Tag>محور اصلی: RINGSPANN آلمان</Tag>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[34px] leading-[1.25] text-fg sm:text-[44px] lg:text-[50px]">
                فری‌ویل صنعتی: قطعه‌ای که در یک جهت قفل می‌کند و در جهت دیگر آزاد می‌چرخد.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 max-w-xl space-y-4 text-[15.5px] leading-8 text-fg-muted">
                <p>
                  در خط تولید، فری‌ویل همان جایی است که جلوی برگشت نوار نقاله را می‌گیرد یا دو
                  موتور را از هم جدا می‌کند. قطعه‌ای کوچک، بدون فرمان و بدون سنسور — و وقتی
                  اشتباه انتخاب شود، کل خط می‌ایستد.
                </p>
                <p>
                  این سایت را برای همین ساختیم: مشخصات واقعی سری‌های RINGSPANN، راهنمای سایزبندی
                  و اشتباه‌هایی که در پانزده سال دیده‌ایم. خرید را در فروشگاه آنلاین انجام
                  می‌دهیم؛ سایزبندی را با هم.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link
                    href="/ringspann/fgr-r"
                    className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
                  >
                    جدول مشخصات FGR … R
                    <MoveUpLeft className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link
                  href="/articles/freewheel-sizing"
                  className="inline-flex items-center gap-2 border border-line-2 px-5 py-3 text-[14px] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  سایزبندی: چه اطلاعاتی لازم است؟
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
                <StatBlock
                  label="حداکثر گشتاور FGR"
                  value={<Counter value={fgr.maxTorqueNm} />}
                  unit="N·m"
                />
                <StatBlock label="تعداد سایز سری" value={<Counter value={fgr.sizes.length} />} unit="سایز" />
                <StatBlock
                  label="محدوده‌ی قطر شفت"
                  value={<span className="tnum">۱۲ — ۱۵۰</span>}
                  unit="mm"
                />
                <StatBlock
                  label="حداکثر دور آزاد"
                  value={<Counter value={5400} />}
                  unit="rpm"
                />
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={0}>
            <div className="relative">
              <div className="border border-line bg-panel-2/70 p-3">
                <FreewheelHero className="h-auto w-full" />
              </div>
              <div className="mt-3 flex items-center justify-between border border-line bg-panel px-4 py-2.5 text-[12px] text-fg-dim">
                <span>برش فری‌ویل اسپراگ — حالت قفل و رها شدن</span>
                <span className="tnum" dir="ltr">
                  1 : 1
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- مارکی برندها ---------------- */}
      <section className="border-b border-line bg-panel/60 py-4">
        <div className="mx-auto max-w-[1240px]">
          <BrandMarquee
            items={["RINGSPANN", "INA", "SKF", "STIEBER", "KOYO", "LUK", "NIKO", "NTN"]}
          />
        </div>
      </section>

      {/* ---------------- فری‌ویل چطور کار می‌کند ---------------- */}
      <section id="how" className="mx-auto max-w-[1240px] px-6 py-20">
        <SectionHeading
          kicker="اصول کار"
          title="فری‌ویل چطور کار می‌کند؟"
          desc="سه تکنولوژی اصلی که در بازار ایران می‌بینید. اصل کار همه یکی است: تبدیل چرخش به نیروی نرمال و قفل. تفاوت در رفتار سایش، دور آزاد و هزینه است."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          <Reveal className="lg:col-span-2">
            <Panel className="h-full p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[19px] text-fg">{TYPES[0].title}</h3>
                <Tag accent>پرکاربرد در گشتاور بالا</Tag>
              </div>
              <p className="mt-3 max-w-md text-[14px] leading-7 text-fg-muted">{TYPES[0].lead}</p>
              <div className="mt-6 border border-line bg-panel-2/60 p-2">{TYPES[0].diagram}</div>
              <ul className="mt-5 space-y-2">
                {TYPES[0].points.map((point) => (
                  <li key={point} className="flex gap-3 text-[13.5px] text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-2">
            <Panel className="h-full p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[19px] text-fg">{TYPES[1].title}</h3>
                <Tag>ارزان‌ترین ساختار</Tag>
              </div>
              <p className="mt-3 max-w-md text-[14px] leading-7 text-fg-muted">{TYPES[1].lead}</p>
              <div className="mt-6 border border-line bg-panel-2/60 p-2">{TYPES[1].diagram}</div>
              <ul className="mt-5 space-y-2">
                {TYPES[1].points.map((point) => (
                  <li key={point} className="flex gap-3 text-[13.5px] text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <Panel className="h-full p-6">
              <h3 className="text-[19px] text-fg">{TYPES[2].title}</h3>
              <p className="mt-3 max-w-md text-[14px] leading-7 text-fg-muted">{TYPES[2].lead}</p>
              <div className="mt-6 border border-line bg-panel-2/60 p-2">{TYPES[2].diagram}</div>
              <ul className="mt-5 space-y-2">
                {TYPES[2].points.map((point) => (
                  <li key={point} className="flex gap-3 text-[13.5px] text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <Panel className="h-full p-6">
              <h3 className="text-[19px] text-fg">نمای انفجادی اجزا</h3>
              <p className="mt-3 text-[14px] leading-7 text-fg-muted">
                همان چیزی که در دیتاشیت می‌بینید: حلقه‌ی خارجی، قفس و المان‌ها، حلقه‌ی داخلی و
                شفت. در فری‌ویل پایه این اجزا را مشتری داخل محفظه‌ی خودش مونتاژ می‌کند.
              </p>
              <div className="mt-6 border border-line bg-panel-2/60 p-2">
                <ExplodedView className="h-auto w-full" />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* ---------------- بخش پین‌شده ---------------- */}
      <PinnedFreewheel />

      {/* ---------------- RINGSPANN ---------------- */}
      <section id="ringspann" className="mx-auto max-w-[1240px] px-6 py-20">
        <SectionHeading
          kicker="RINGSPANN — Bad Homburg"
          title="سری‌های RINGSPANN که با آن‌ها کار می‌کنیم"
          desc="محور اصلی این سایت. برنامه‌ی RINGSPANN از فری‌ویل داخلی کوچک تا بک‌استاپ ۳۲۰ میلی‌متری را پوشش می‌دهد؛ در بازار ایران پرتقاضاترین سری آن FGR … R است."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Panel className="h-full p-6">
              <h3 className="text-[19px] text-fg">نردبان گشتاور سری FGR … R</h3>
              <p className="mt-2 text-[13.5px] leading-7 text-fg-muted">
                گشتاور اسمی روی مقیاس لگاریتمی؛ هر پله یک سایز کاتالوگی است. همان‌طور که می‌بینید
                با بزرگ‌تر شدن قطر شفت، حداکثر دور آزاد پایین می‌آید.
              </p>
              <ul className="mt-6 space-y-1.5">
                {fgr.sizes.map((size) => {
                  const width = (Math.log10(size.torqueNm) / maxLog) * 100;
                  return (
                    <li key={size.designation} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 text-[12px] text-fg-dim" dir="ltr">
                        {size.designation}
                      </span>
                      <span className="h-4 flex-1 bg-panel-2">
                        <span
                          className="block h-4 bg-accent/75 transition-[width] duration-500"
                          style={{ width: `${Math.max(width, 4)}%` }}
                        />
                      </span>
                      <span className="tnum w-24 shrink-0 text-end text-[12px] text-fg-muted" dir="ltr">
                        {num(size.torqueNm)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[11.5px] text-fg-dim">
                محور افقی: گشتاور اسمی (N·m) — مقیاس لگاریتمی
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={0.05}>
            <Panel className="h-full p-6">
              <h3 className="text-[19px] text-fg">جدول خلاصه‌ی سایزها</h3>
              <p className="mt-2 text-[13.5px] leading-7 text-fg-muted">
                مقادیر کاتالوگی. حداکثر دور در دو حالت: حلقه‌ی داخلی آزاد / حلقه‌ی خارجی آزاد.
              </p>
              <div className="mt-6">
                <SpecTable
                  columns={["مدل", "d (mm)", "M_N (N·m)", "n_max (rpm)", "D (mm)"]}
                  rows={fgr.sizes.map((size) => [
                    size.designation,
                    size.bore,
                    size.torqueNm,
                    `${num(size.speedInner)} / ${num(size.speedOuter)}`,
                    size.outerDiameter,
                  ])}
                />
              </div>
              <Link
                href="/ringspann/fgr-r"
                className="mt-5 inline-flex items-center gap-2 text-[13.5px] text-accent transition-colors hover:text-accent-soft"
              >
                جدول کامل با پهنا و وزن
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </Panel>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RINGSPANN_SERIES.map((series, index) => (
            <Reveal key={series.slug} delay={index * 0.03}>
              <Link
                href={`/ringspann/${series.slug}`}
                className={cn(
                  "group relative block h-full border border-line bg-panel p-6 transition-colors hover:border-accent/50",
                  series.slug === "fgr-r" && "border-accent/40 bg-accent/4",
                )}
              >
                <div className="flex items-center justify-between">
                  <span dir="ltr" className="text-[17px] font-semibold text-fg">
                    {series.designation}
                  </span>
                  <span className="text-[11.5px] text-fg-dim">
                    {series.element === "roller" ? "رولری" : "اسپراگ"}
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{series.short}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
                  <div>
                    <div className="text-[11px] text-fg-dim">حداکثر گشتاور</div>
                    <div className="tnum mt-1 text-[16px] text-fg" dir="ltr">
                      {num(series.maxTorqueNm)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-fg-dim">حداکثر قطر شفت</div>
                    <div className="tnum mt-1 text-[16px] text-fg" dir="ltr">
                      {series.maxBoreMm} mm
                    </div>
                  </div>
                </div>
                <span className="mt-5 flex items-center gap-2 text-[13px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  مشخصات و ابعاد
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <Panel className="p-6">
            <h3 className="text-[16px] text-fg">سری‌های دیگر RINGSPANN</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RINGSPANN_OTHER_SERIES.map((series) => (
                <div key={series.designation} className="border-r border-line-2 pr-4">
                  <div dir="ltr" className="text-[14px] font-semibold text-fg">
                    {series.designation}
                  </div>
                  <div className="mt-1.5 text-[13px] text-fg-muted">{series.title}</div>
                  <p className="mt-2 text-[12.5px] leading-6 text-fg-dim">{series.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal className="mt-6">
          <BuyNote />
        </Reveal>
      </section>

      {/* ---------------- شِمای بک‌استاپ ---------------- */}
      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <SectionHeading
            kicker="کاربرد شاخص"
            title="بک‌استاپ روی درایو نوار نقاله"
            desc="رایج‌ترین سناریویی که برای آن استعلام می‌گیریم. فری‌ویل روی سر شفت نصب می‌شود و اهرم آن به پایه‌ی صلب باز می‌شود؛ در توقف یا قطع برق، برگشت نوار گرفته می‌شود."
          />
          <Reveal className="mt-10">
            <div className="blueprint border border-line bg-panel-2/60 p-4">
              <BackstopSchematic className="h-auto w-full" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Reveal>
              <RobotNote />
            </Reveal>
            <Reveal delay={0.05}>
              <Callout title="عددی که بیشتر جا می‌افتد">
                حداکثر گشتاور قابل انتقال دو برابرِ گشتاور اسمی است. این عدد برای ضربه‌های لحظه‌ای
                است، نه برای انتخاب سایز. سایز را همیشه از گشتاور اسمی با ضریب سرویس شروع کنید.
              </Callout>
            </Reveal>
            <Reveal delay={0.1}>
              <BuyNote compact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- برندهای دیگر ---------------- */}
      <section className="mx-auto max-w-[1240px] px-6 py-20">
        <SectionHeading
          kicker="برندهای دیگر"
          title="غیر از RINGSPANN چه چیزهایی تأمین می‌کنیم؟"
          desc="بعد از RINGSPANN، بیشتر درخواست‌ها برای این برندها می‌آید. برای هرکدام صفحه‌ی جداگانه با نکات انتخاب و جایگزینی گذاشته‌ایم."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BRANDS.filter((brand) => brand.slug !== "ringspann").map((brand, index) => (
            <Reveal key={brand.slug} delay={index * 0.03}>
              <Link
                href={`/brands/${brand.slug}`}
                className="group flex h-full flex-col justify-between border border-line bg-panel p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <span dir="ltr" className="text-[18px] font-semibold tracking-tight text-fg">
                      {brand.name}
                    </span>
                    <span className="text-[11.5px] text-fg-dim">{brand.country}</span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{brand.tagline}</p>
                </div>
                <span className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                  نکات انتخاب و جایگزینی
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- کاربردها ---------------- */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-20">
          <SectionHeading
            kicker="کاربردها"
            title="فری‌ویل کجا به کار می‌آید؟"
            desc="شش صنعتی که بیشتر درخواست‌های ما از آن‌ها می‌آید. هر صفحه سناریوی واقعی، سری پیشنهادی و حالت‌های خرابی را دارد."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((application, index) => (
              <Reveal key={application.slug} delay={index * 0.04}>
                <Link
                  href={`/applications/${application.slug}`}
                  className="group flex h-full flex-col border border-line bg-panel"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                    <Image
                      src={application.image.src}
                      alt={application.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-75 saturate-[0.55] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent" />
                    <span className="absolute bottom-3 right-3 text-[11px] tracking-[0.1em] text-fg-muted">
                      {application.kicker}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[17px] text-fg">{application.title}</h3>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-7 text-fg-muted">
                      {application.intro[0]}
                    </p>
                    <span className="mt-4 flex items-center gap-2 text-[12.5px] text-fg-dim transition-colors group-hover:text-accent">
                      سناریو و سری پیشنهادی
                      <ArrowUpLeft className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- مقالات ---------------- */}
      <section className="mx-auto max-w-[1240px] px-6 py-20">
        <SectionHeading
          kicker="مقالات فنی"
          title="چیزهایی که در کار روزمره یاد گرفته‌ایم"
          desc="پنج متن، بدون تعارف و بدون چارچوب تبلیغاتی. اگر فقط یکی را می‌خوانید، سایزبندی را بخوانید."
        />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {ARTICLES.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.03}>
              <Link
                href={`/articles/${article.slug}`}
                className="group grid gap-3 py-6 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
                    <span className="text-accent">{article.tag}</span>
                    <span className="tnum">{article.date}</span>
                    <span className="tnum">{article.readingMinutes} دقیقه مطالعه</span>
                  </div>
                  <h3 className="mt-2 text-[18px] leading-8 text-fg transition-colors group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-7 text-fg-muted">
                    {article.dek}
                  </p>
                </div>
                <span className="hidden items-center gap-2 border border-line-2 px-4 py-2.5 text-[12.5px] text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent lg:flex">
                  خواندن
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- سؤالات پرتکرار ---------------- */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1240px] px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading kicker="پرسش‌های پرتکرار" title="آنچه بیشتر می‌پرسند" />
              <div className="mt-6">
                <BuyNote compact />
              </div>
            </div>
            <Reveal>
              <FaqList />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-5 px-6 py-16 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border border-line bg-panel p-8">
              <span className="text-[12px] tracking-[0.12em] text-accent">خرید قطعه</span>
              <h2 className="mt-3 text-[24px] leading-tight text-fg">
                استعلام قیمت و سفارش در فروشگاه آنلاین
              </h2>
              <p className="mt-4 text-[14px] leading-8 text-fg-muted">
                فروشگاه آنلاین{" "}
                <span dir="ltr" className="font-semibold text-fg">
                  {SHOPS.bearing.name}
                </span>{" "}
                محل اصلی فروش و استعلام قیمت است. کد قطعه یا مشخصات پروژه را بفرستید؛ موجودی و
                زمان تأمین را همان‌جا می‌بینید.
              </p>
              <a
                href={SHOPS.bearing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
              >
                ورود به {SHOPS.bearing.name}
                <MoveUpLeft className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="h-full border border-line bg-panel p-8">
              <span className="text-[12px] tracking-[0.12em] text-accent">پروژه و نوار نقاله</span>
              <h2 className="mt-3 text-[24px] leading-tight text-fg">
                طراحی و ارتقای سیستم نوار نقاله
              </h2>
              <p className="mt-4 text-[14px] leading-8 text-fg-muted">
                شرکت اتوماسیون{" "}
                <span dir="ltr" className="font-semibold text-fg">
                  {SHOPS.robot.name}
                </span>{" "}
                روی طراحی، ساخت و ارتقای نوار نقاله و اتوماسیون کار می‌کند؛ از مرحله‌ی نقشه
                می‌توانید مکان فری‌ویل و پایه‌ی اهرم را در طرح رزرو کنید.
              </p>
              <a
                href={SHOPS.robot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border border-line-2 px-5 py-3 text-[14px] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                ورود به {SHOPS.robot.name}
                <MoveUpLeft className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
