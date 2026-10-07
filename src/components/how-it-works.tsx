"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  Bike,
  ChevronDown,
  Gauge,
  LockKeyhole,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/components/motion";
import { cn } from "@/lib/utils";

type Mode = "free" | "engaging" | "locked";

const STEPS: Array<{
  mode: Mode;
  numeral: string;
  title: string;
  body: string;
  practice: string;
  readout: { state: string; input: string; output: string; elements: string };
}> = [
  {
    mode: "free",
    numeral: "۰۱",
    title: "چرخش آزاد",
    body: "در جهت مجاز، المان‌ها خوابیده‌اند و دو حلقه بدون تماسِ قفل‌کننده نسبت به هم می‌چرخند؛ شفت می‌گردد اما چیزی را با خود نمی‌کشد.",
    practice: "موتورِ خاموش، خط را ترمز نمی‌کند؛ هرزگردیِ تمیز بدون سایش اضافه.",
    readout: { state: "آزاد", input: "می‌چرخد", output: "سکون", elements: "خوابیده" },
  },
  {
    mode: "engaging",
    numeral: "۰۲",
    title: "لحظه‌ی برگشت",
    body: "جهت عوض می‌شود یا بار از محرک جلو می‌زند؛ المان‌ها در همان کسری از دور به سمت فضای باریک می‌لغزند و با هر دو حلقه تماس می‌گیرند.",
    practice: "همان لحظه‌ای که برق می‌رود و بارِ نوار می‌خواهد برگردد — اینجاست که فری‌ویل وارد عمل می‌شود.",
    readout: { state: "در حال درگیری", input: "برگشت", output: "در آستانه‌ی قفل", elements: "گوه‌شونده" },
  },
  {
    mode: "locked",
    numeral: "۰۳",
    title: "قفل و انتقال نیرو",
    body: "المان‌ها گوه می‌شوند و دو حلقه یکپارچه می‌گردند؛ گشتاور کامل منتقل می‌شود تا وقتی که جهت دوباره عوض شود و قطعه خودش آزاد کند.",
    practice: "بار نگه داشته می‌شود یا حرکت پله‌ای به مرحله‌ی بعد می‌رسد — بدون برق، سنسور و فرمان.",
    readout: { state: "قفل", input: "هم‌چرخ", output: "انتقال گشتاور", elements: "گوه‌شده" },
  },
];

const FACTS = [
  { Icon: Zap, title: "بدون برق و فرمان", detail: "درگیری کاملاً مکانیکی" },
  { Icon: Gauge, title: "واکنش در کسری از دور", detail: "به‌محض برگشت جهت" },
  { Icon: LockKeyhole, title: "قفل مثبت، نه لغزش", detail: "گوه‌شدن المان‌ها بین دو حلقه" },
];

function CrossSection({ mode }: { mode: Mode }) {
  const isFree = mode === "free";
  const isLocked = mode === "locked";
  const tilt = isFree ? "0deg" : mode === "engaging" ? "-9deg" : "-13deg";
  const spragFill = isFree ? "#72DED2" : "#EE7958";

  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="برش فری‌ویل: حلقه‌ی بیرونی، المان‌های قفل‌کننده و حلقه‌ی داخلی"
    >
      <defs>
        <radialGradient id="how-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#58D7CE" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#58D7CE" stopOpacity="0" />
        </radialGradient>
        <marker
          id="how-arrow-mint"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="#72DED2" />
        </marker>
        <marker
          id="how-arrow-coral"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="#EE7958" />
        </marker>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#how-glow)" />
      <circle
        cx="200"
        cy="200"
        r="175"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="1"
        strokeDasharray="2 8"
      />

      {/* حلقه‌ی بیرونی — در حالت قفل با حلقه‌ی داخلی هم‌چرخ است */}
      <g className={isLocked ? "how-spin-sync" : undefined}>
        <circle cx="200" cy="200" r="150" fill="#163B45" stroke="#B8CFD1" strokeWidth="17" />
        <circle
          cx="200"
          cy="200"
          r="166"
          fill="none"
          stroke="#DCE9E8"
          strokeOpacity="0.48"
          strokeWidth="2"
        />
        {Array.from({ length: 24 }, (_, index) => index * 15).map((degree) => (
          <line
            key={degree}
            x1="200"
            y1="28"
            x2="200"
            y2="38"
            stroke="#DCE9E8"
            strokeOpacity="0.65"
            strokeWidth="2"
            transform={`rotate(${degree} 200 200)`}
          />
        ))}
        {Array.from({ length: 10 }, (_, index) => index * 36).map((degree) => (
          <g key={degree} transform={`rotate(${degree} 200 200)`}>
            <path
              d="M190 71 L210 71 L206 111 L194 111 Z"
              fill={spragFill}
              stroke="#F4F8F7"
              strokeOpacity="0.76"
              strokeWidth="1.5"
              className="how-sprag"
              style={{ ["--tilt" as string]: tilt }}
            />
          </g>
        ))}
      </g>

      {/* حلقه‌ی داخلی و شفت — سرعت چرخش با هر مرحله عوض می‌شود */}
      <g
        className={
          isLocked ? "how-spin-sync" : isFree ? "how-spin-fast" : "how-spin-creep"
        }
      >
        <circle cx="200" cy="200" r="103" fill="#102F3B" stroke="#72DED2" strokeWidth="8" />
        <circle
          cx="200"
          cy="200"
          r="84"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.36"
          strokeWidth="2"
        />
        {Array.from({ length: 6 }, (_, index) => index * 60).map((degree) => (
          <line
            key={degree}
            x1="200"
            y1="111"
            x2="200"
            y2="128"
            stroke="#B8CFD1"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${degree} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="43" fill="#0B2630" stroke="#B8CFD1" strokeWidth="3" />
        <circle cx="200" cy="200" r="8" fill="#EE7958" />
      </g>

      {/* موج درگیری — فقط در لحظه‌ی برگشت */}
      {mode === "engaging" ? (
        <circle
          cx="200"
          cy="200"
          r="128"
          fill="none"
          stroke="#EE7958"
          strokeWidth="2.5"
          className="how-ping"
        />
      ) : null}

      {/* مسیر گشتاور — فقط در حالت قفل */}
      <g
        className="transition-opacity duration-500"
        opacity={isLocked ? 1 : 0}
        aria-hidden="true"
      >
        <path
          d="M 264 89 A 128 128 0 0 1 264 311"
          fill="none"
          stroke="#EE7958"
          strokeOpacity="0.22"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 264 89 A 128 128 0 0 1 264 311"
          fill="none"
          stroke="#EE7958"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#how-arrow-coral)"
        />
      </g>

      {/* پیکان‌های جهت */}
      <path
        d="M296 93 A132 132 0 0 1 331 157"
        fill="none"
        stroke="#72DED2"
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#how-arrow-mint)"
        className="transition-opacity duration-500"
        opacity={isFree ? 1 : mode === "engaging" ? 0.55 : 0.2}
      />
      <path
        d="M322 268 A132 132 0 0 1 268 322"
        fill="none"
        stroke="#EE7958"
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#how-arrow-coral)"
        className="transition-opacity duration-500"
        opacity={isLocked ? 1 : mode === "engaging" ? 0.6 : 0.2}
      />
    </svg>
  );
}

/**
 * بخش «اصل کار»: به‌جای سه کارت ایستا، یک سازوکار تعاملی که با انتخاب هر
 * مرحله، برش قطعه، وضعیت المان‌ها و معنای عملی‌اش را هم‌زمان نشان می‌دهد.
 */
export function HowItWorks() {
  const [step, setStep] = useState(0);
  const [played, setPlayed] = useState(false);
  const interacted = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const current = STEPS[step];

  const select = (index: number): void => {
    interacted.current = true;
    setStep(index);
  };

  // اولین ورود به دید: یک‌بار مراحل را خودکار جلو می‌برد، مگر کاربر دخالت کند
  useEffect(() => {
    if (played || prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !interacted.current) {
          setPlayed(true);
          timers.push(window.setTimeout(() => {
            if (!interacted.current) setStep(1);
          }, 2600));
          timers.push(window.setTimeout(() => {
            if (!interacted.current) setStep(2);
          }, 5200));
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [played]);

  return (
    <section id="how" ref={sectionRef} aria-labelledby="how-title" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              اصل کار
            </p>
            <h2
              id="how-title"
              className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]"
            >
              از چرخش آزاد تا قفل، قدم‌به‌قدم
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-white/65 sm:text-[15px] sm:leading-8">
              به‌جای تعریف خشک، هر مرحله را انتخاب کن و ببین داخل قطعه دقیقاً چه اتفاقی
              می‌افتد — و در خط تولید یعنی چه.
            </p>
          </div>
          <div
            aria-live="polite"
            className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[12px] font-semibold text-white backdrop-blur-md lg:self-auto"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                current.mode === "free" ? "bg-mint" : "bg-coral",
              )}
              aria-hidden="true"
            />
            وضعیت: {current.readout.state}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
          {/* برش تعاملی */}
          <div className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] font-medium text-white/55">سازوکار فری‌ویل</p>
              <span className="text-[11px] tracking-[0.18em] text-white/35" dir="ltr">
                CROSS-SECTION
              </span>
            </div>
            <div className="relative mx-auto mt-2 aspect-square w-full max-w-[420px]">
              <CrossSection mode={current.mode} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {(
                [
                  ["ورودی · شفت", current.readout.input],
                  ["خروجی", current.readout.output],
                  ["المان‌ها", current.readout.elements],
                  ["مرحله", `${current.numeral} / ۰۳`],
                ] as const
              ).map(([term, value]) => (
                <div
                  key={term}
                  className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5"
                >
                  <dt className="text-[10.5px] text-white/45">{term}</dt>
                  <dd
                    className="mt-1 truncate text-[12.5px] font-bold text-white"
                    aria-live="polite"
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/45">
              <span>حلقه‌ی بیرونی</span>
              <span>المان‌های قفل‌کننده</span>
              <span>حلقه‌ی داخلی</span>
            </div>
          </div>

          {/* مرحله‌ها */}
          <div>
            <div className="grid gap-3" role="group" aria-label="مراحل عملکرد فری‌ویل">
              {STEPS.map((item, index) => {
                const active = index === step;
                return (
                  <button
                    key={item.mode}
                    type="button"
                    onClick={() => select(index)}
                    aria-expanded={active}
                    aria-label={`مرحله‌ی ${item.numeral}: ${item.title}`}
                    className={cn(
                      "group w-full rounded-2xl border p-5 text-start transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint sm:p-6",
                      active
                        ? "border-mint/40 bg-white/[0.07] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-bold transition-colors",
                          active ? "bg-mint text-ocean" : "bg-white/10 text-white/70",
                        )}
                      >
                        {item.numeral}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[16px] font-bold text-white">
                          {item.title}
                        </span>
                        {!active ? (
                          <span className="mt-1 line-clamp-1 block text-[12px] text-white/45">
                            {item.body}
                          </span>
                        ) : null}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-white/40 transition-transform duration-300",
                          active && "rotate-180 text-mint",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    {active ? (
                      <span className="how-rise mt-4 block" key={item.mode}>
                        <span className="block text-[13.5px] leading-8 text-white/75">
                          {item.body}
                        </span>
                        <span className="mt-4 block rounded-xl border-r-2 border-coral bg-coral/10 px-4 py-3 text-[12.5px] leading-7 text-white/85">
                          <span className="font-bold text-coral">در عمل: </span>
                          {item.practice}
                        </span>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex gap-1.5" aria-hidden="true">
                {STEPS.map((item, index) => (
                  <span
                    key={item.mode}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === step ? "w-8 bg-mint" : "w-3 bg-white/15",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => select((step + STEPS.length - 1) % STEPS.length)}
                  aria-label="مرحله‌ی قبل"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-[12.5px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  قبل
                </button>
                <button
                  type="button"
                  onClick={() => select((step + 1) % STEPS.length)}
                  aria-label="مرحله‌ی بعد"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mint px-4 text-[12.5px] font-bold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  بعد
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {FACTS.map(({ Icon, title, detail }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-bold text-white">{title}</span>
                    <span className="mt-0.5 block text-[11px] text-white/50">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
            <Bike className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-[13px] leading-7 text-white/70">
            <span className="font-bold text-white">یک مثال آشنا: </span>
            توپی چرخ دوچرخه وقتی رکاب را رها می‌کنی، چرخ را آزاد می‌گذارد؛ در صنعت همین
            منطق، بارهای سنگین را کنترل می‌کند.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/articles/freewheel-sizing"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[12.5px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            راهنمای سایزبندی
            <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/applications"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[12.5px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            کاربردها در خط تولید
            <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
