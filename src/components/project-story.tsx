import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, ImageIcon } from "lucide-react";

import { DriveTrainFigure } from "@/components/drive-train-figure";
import { Reveal } from "@/components/motion";
import { PROJECT_STORY } from "@/content/story";
import { SHOPS } from "@/content/site";

/**
 * بخش «داستان پروژه» صفحه‌ی اول.
 *
 * الگو از صفحه‌های کاتالوگ صنعتی آمده است: یک چیدمان واقعی درایو با
 * شماره‌گذاری روی قطعه‌ها. اینجا آن الگو به یک روایت تبدیل شده — از شب اولی که
 * نوار برگشت، تا انتخاب بک‌استاپ و نتیجه‌ی سه سال بعد؛ و در میانه‌اش همان
 * نقشه‌ی شماره‌دار که قطعه‌ها را به صفحه‌های کاتالوگ وصل می‌کند.
 */
export function ProjectStory() {
  const story = PROJECT_STORY;

  return (
    <section id="story" aria-labelledby="story-title" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
                <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
                {story.kicker}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="story-title"
                className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]"
              >
                {story.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[560px] text-[14px] leading-8 text-white/65 sm:text-[15px]">
                {story.dek}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/60">
                {["تشخیص در شب اول", "محاسبه‌ی گشتاور برگشت", "انتخاب و نصب", "بازرسی سه سال"].map(
                  (step, index) => (
                    <li key={step} className="inline-flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[10.5px] font-semibold text-mint">
                        {["۰۱", "۰۲", "۰۳", "۰۴"][index]}
                      </span>
                      {step}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <figure className="relative aspect-[5/4] overflow-hidden rounded-[26px] border border-white/12 sm:aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src={story.photo.src}
                alt={story.photo.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean via-ocean/25 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
                <span className="max-w-[22rem] text-[12px] leading-6 text-white/85">
                  {story.photo.caption}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ocean/60 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                  <ImageIcon className="h-3 w-3" aria-hidden="true" />
                  {story.photo.credit}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {story.facts.map((fact) => (
              <li
                key={fact.label}
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur-sm"
              >
                <span className="text-[11.5px] text-white/55">{fact.label}</span>
                <span className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="tnum text-[26px] font-bold leading-none text-white">
                    {fact.value}
                  </span>
                  <span className="text-[11.5px] text-mint">{fact.unit}</span>
                </span>
                <span className="mt-2 block text-[11px] leading-5 text-white/50">{fact.hint}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {story.chapters.map((chapter, index) => (
            <Reveal
              key={chapter.numeral}
              delay={index * 0.06}
              className="flex flex-col rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6"
            >
              <span className="tnum inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold text-mint">
                {chapter.numeral}
              </span>
              <h3 className="mt-3.5 text-[16.5px] font-bold leading-8 text-white">{chapter.title}</h3>
              {chapter.body.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="mt-3 text-[12.5px] leading-7 text-white/65 sm:text-[13px]"
                >
                  {paragraph}
                </p>
              ))}
              {chapter.callout ? (
                <p className="mt-auto pt-4 text-[11.5px] leading-6 text-white/75">
                  <span className="block border-r-2 border-coral/70 bg-coral/[0.07] px-3.5 py-3">
                    {chapter.callout}
                  </span>
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Reveal className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              {story.figure.label}
            </p>
            <h3 className="text-balance text-[22px] font-bold leading-[1.5] text-white sm:text-[27px]">
              {story.figure.title}
            </h3>
          </Reveal>

          <Reveal delay={0.08} className="mt-6">
            <DriveTrainFigure
              items={story.figure.items}
              note={story.figure.note}
              label="نقشه‌ی شماتیک چیدمان درایو نوار نقاله: پولی سر نوار، شفت درایو با بک‌استاپ سرعت پایین، گیربکس کاهنده، اتصال انقباضی، کوپلینگ فلنجی، بک‌استاپ سرعت بالا، ترمز و موتور، و نمای جدا از درایو دوم"
            />
          </Reveal>

          <p className="mt-4 text-[11.5px] leading-6 text-white/45">{story.figure.caption}</p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <h3 className="text-[16.5px] font-bold text-white">{story.outcome.title}</h3>
            <p className="mt-2.5 text-[12.5px] leading-7 text-white/60">{story.outcome.body}</p>
            <ul className="mt-4 grid gap-2.5">
              {story.outcome.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[12.5px] leading-7 text-white/75">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.06}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
          >
            <h3 className="text-[16.5px] font-bold text-white">{story.lessons.title}</h3>
            <ul className="mt-4 grid gap-2.5">
              {story.lessons.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[12.5px] leading-7 text-white/70"
                >
                  <span
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="selection-panel relative overflow-hidden rounded-[26px] border border-white/10 px-6 py-8 text-white sm:px-9 sm:py-9">
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-[20px] font-bold leading-[1.5] sm:text-[25px]">{story.cta.title}</h3>
              <p className="mt-3 text-[13px] leading-7 text-white/70">{story.cta.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-[12.5px] font-bold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  مشاوره‌ی انتخاب
                  <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/applications/conveyor"
                  transitionTypes={["nav-forward"]}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[12.5px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  فری‌ویل در نوار نقاله
                  <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SHOPS.robot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[12.5px] font-semibold text-white/85 transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  ارتقای خط نوار نقاله ({SHOPS.robot.name})
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
