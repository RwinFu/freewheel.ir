import type { Metadata } from "next";
import Link from "next/link";
import { Download, Film, Gauge, Sparkles } from "lucide-react";

import { LoopGif, MotionFilm } from "@/components/media/film";
import { Reveal } from "@/components/motion";
import { PageTransition } from "@/components/page-transition";
import { Panel, SectionHeading } from "@/components/ui";
import { PLANT_FILMS, SPIN_FILM } from "@/content/media";

export const metadata: Metadata = {
  title: "فیلم و گیف فری‌ویل — چرخش آزاد، قفل و کاربردهای صنعتی",
  description:
    "ویدیوی کوتاه و گیف از سازوکار فری‌ویل و شش صنعتی که بیشترین کاربرد را دارد؛ همه از عکس‌های خودِ قطعه و خط تولید ساخته شده‌اند.",
  alternates: { canonical: "/media" },
};

const SIZES = [
  { label: "قطعه — WebM", value: "۶۸۶ کیلوبایت", note: "VP9، سبک‌ترین" },
  { label: "قطعه — MP4", value: "۴۷۷ کیلوبایت", note: "H.264، همه‌جا پخش می‌شود" },
  { label: "قطعه — GIF", value: "۶۰۰ کیلوبایت", note: "۲۸۰×۲۸۰، ۱۲ فریم" },
  { label: "کاربردها — هر فیلم", value: "۵۰ تا ۲۲۰ کیلوبایت", note: "VP9/MP4، ۱۱۲۰×۶۳۰" },
];

export default function MediaPage() {
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
              <span className="text-fg-muted">فیلم و گیف</span>
            </nav>
            <h1 className="max-w-3xl text-[32px] leading-tight text-fg sm:text-[40px]">
              سازوکار در حرکت، نه در توضیح
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
              فری‌ویل را نمی‌شود با عکس ساکن فهمید؛ چیزی که مهم است نسبت چرخش سه حلقه و لحظه‌ی
              قفل شدن است. این کلیپ‌ها از عکس‌های خودِ قطعه ساخته شده‌اند و می‌شود دانلودشان
              کرد.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-14">
        <SectionHeading kicker="سازوکار" title="چرخش آزاد، بعد قفل" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden border border-line bg-[#1A1410]">
              <MotionFilm
                media={SPIN_FILM}
                priority
                videoClassName="fw-film-video"
              />
              <span className="absolute bottom-4 left-4 z-[3] flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[11px] text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ed7a8]" />
                حلقه‌ی داخلی ← قفس المان‌ها ← حلقه‌ی بیرونی
              </span>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <p className="text-[14.5px] leading-8 text-fg-muted">{SPIN_FILM.caption}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <Panel className="p-5">
                <p className="flex items-center gap-2 text-[12px] text-fg-dim">
                  <Gauge className="h-4 w-4" aria-hidden />
                  چه چیزی را نشان می‌دهد
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-7 text-fg-muted">
                  <li>در چرخش آزاد، حلقه‌ی بیرونی هیچ حرکتی ندارد.</li>
                  <li>قفس المان‌ها با حدود نیمی از سرعت حلقه‌ی داخلی می‌گردد.</li>
                  <li>در لحظه‌ی برگشت، هر سه بخش یکی می‌شوند: انتقال گشتاور.</li>
                </ul>
              </Panel>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <a href={SPIN_FILM.mp4} download className="cinema-btn cinema-btn-solid">
                  <Download className="h-4 w-4" aria-hidden />
                  دانلود MP4
                </a>
                <a href={SPIN_FILM.webm} download className="cinema-btn cinema-btn-line">
                  <Film className="h-4 w-4" aria-hidden />
                  دانلود WebM
                </a>
                <a href={SPIN_FILM.gif} download className="cinema-btn cinema-btn-line">
                  <Download className="h-4 w-4" aria-hidden />
                  دانلود GIF
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-14">
        <SectionHeading kicker="خط تولید" title="شش صنعت، شش قاب متحرک" />
        <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.values(PLANT_FILMS).map((film, index) => (
            <Reveal key={film.key} delay={index * 0.04}>
              <figure className="border border-line bg-panel">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                  <MotionFilm media={film} />
                </div>
                <figcaption className="p-5">
                  <h3 className="text-[15px] text-fg">{film.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-7 text-fg-muted">{film.caption}</p>
                  <div className="mt-4 flex gap-2">
                    <a href={film.mp4} download className="fw-dl">
                      MP4
                    </a>
                    <a href={film.webm} download className="fw-dl">
                      WebM
                    </a>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <LoopGif media={{ ...SPIN_FILM }} label="چرخش آزاد فری‌ویل — گیف" />
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <div>
                <p className="flex items-center gap-2 text-[12px] text-fg-dim">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  گیف برای جاهایی که ویدیو پخش نمی‌شود
                </p>
                <p className="mt-3 max-w-xl text-[14px] leading-8 text-fg-muted">
                  گیف زیر یک چرخه‌ی کامل است: در ۲٫۴ ثانیه حلقه‌ی داخلی دو دور و قفس المان‌ها
                  یک دور می‌زند، پس حلقه‌ی گیف بی‌درز بسته می‌شود. برای پیش‌نمایش در چت، ایمیل
                  و شبکه‌های اجتماعی مناسب است.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                {SIZES.map((item) => (
                  <div key={item.label} className="bg-panel p-4">
                    <p className="text-[11.5px] text-fg-dim">{item.label}</p>
                    <p className="mt-1 text-[15px] text-fg">{item.value}</p>
                    <p className="mt-1 text-[11px] text-fg-dim">{item.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[12.5px] leading-7 text-fg-dim">
                اگر در سیستم شما «کاهش حرکت» روشن باشد، ویدیوها دانلود نمی‌شوند و فقط پوستر
                نشان داده می‌شود؛ گیف هم پنهان می‌ماند. حرکت هیچ‌وقت اجباری نیست.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
