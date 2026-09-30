"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * سه فازی که یک بک‌استاپ در یک خط واقعی می‌گذراند.
 * این‌جا عمداً از «فری‌ویل در حالت آزاد/قفل» حرف نمی‌زنیم — آن را بخش
 * سازوکار گفته است. این‌جا روایت خط است: کار عادی، توقف، راه‌اندازی دوباره.
 */
const PHASES = [
  {
    code: "01",
    title: "کار عادی: نوار بالا می‌رود",
    state: "RUNNING",
    body: "موتور، پولی درایو را در جهت بالا رفتن می‌چرخاند. حلقه‌ی داخلی فری‌ویل آزادانه می‌گردد و المان‌ها بیکار می‌مانند؛ گشتاوری منتقل نمی‌شود. تنها چیزی که در این حالت مهم است دور آزاد و روانکاری است.",
  },
  {
    code: "02",
    title: "توقف: بار می‌خواهد برگردد",
    state: "LOCKED",
    body: "به‌محض قطع شدن موتور، وزن مواد روی نوار شیب‌دار به عقب می‌کشد. همین برگشت کافی است تا المان‌ها در دهانه‌ی باریک گوه گیر کنند و دو حلقه قفل شوند. کل بار روی بدنه و اهرم فری‌ویل می‌افتد؛ این‌جاست که ضریب سرویس معنی پیدا می‌کند.",
  },
  {
    code: "03",
    title: "راه‌اندازی دوباره: قفل رها می‌شود",
    state: "RELEASED",
    body: "موتور دوباره در جهت درست راه می‌افتد و قفل باز می‌شود؛ قطعه بدون هیچ فرمانی به حالت آزاد برمی‌گردد. اگر این چرخه در سالن پرفرز یا پرمسیر تکرار شود، آب‌بندی محفظه و روانکاری همان چیزی است که عمر قطعه را تعیین می‌کند.",
  },
] as const;

const SPRAG_ANGLE = [0, 45, 90, 135, 180, 225, 270, 315];

export function PinnedFreewheel() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const spinRef = useRef<SVGGElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const [phase, setPhase] = useState(0);
  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const spin = spinRef.current;
    if (!wrap || !spin) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        // یک دور کامل روی کل مسیر اسکرول؛ عدد نمایشی هم از همین می‌آید.
        const total = progress * 1440;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
        }
        if (!reduced) {
          gsap.set(spin, { rotate: total, svgOrigin: "260 260" });
        }
        setDegrees(Math.round(total));
        const next = progress < 0.36 ? 0 : progress < 0.7 ? 1 : 2;
        setPhase((current) => (current === next ? current : next));
      },
    });

    return () => trigger.kill();
  }, []);

  const locked = phase === 1;
  const spragFill = locked ? "#EE7958" : phase === 2 ? "#A9C1C3" : "#5FD8C6";

  return (
    <section ref={wrapRef} className="hero-instrument relative border-y border-line text-white">
      <div className="lg:h-[200vh]">
        <div className="flex items-center overflow-hidden lg:sticky lg:top-[74px] lg:min-h-[calc(100dvh-74px)]">
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 py-10 sm:px-7 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8">
            {/* قطعه در حال چرخش */}
            <div className="relative z-10 order-1 lg:order-1">
              <div className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0c242b]/70 p-2">
                <svg
                  viewBox="0 0 520 520"
                  className="h-auto w-full"
                  role="img"
                  aria-label="شماتیک فری‌ویل در حال چرخش؛ با اسکرول می‌چرخد و در فاز توقف قفل می‌شود"
                >
                  <defs>
                    <radialGradient id="pin-glow" cx="50%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="#5FD8C6" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#5FD8C6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="260" cy="260" r="230" fill="url(#pin-glow)" />
                  <circle
                    cx="260"
                    cy="260"
                    r="238"
                    fill="none"
                    stroke="#A9C1C3"
                    strokeOpacity="0.22"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="260"
                    cy="260"
                    r="200"
                    fill="none"
                    stroke="#A9C1C3"
                    strokeOpacity="0.18"
                    strokeWidth="1.5"
                  />

                  <g ref={spinRef}>
                    {/* حلقه‌ی خارجی با خط‌های مدرج */}
                    <circle
                      cx="260"
                      cy="260"
                      r="176"
                      fill="none"
                      stroke="#A9C1C3"
                      strokeOpacity="0.5"
                      strokeWidth="14"
                    />
                    {Array.from({ length: 36 }, (_, index) => index * 10).map((deg) => (
                      <line
                        key={deg}
                        x1="260"
                        y1="70"
                        x2="260"
                        y2={deg % 30 === 0 ? "56" : "62"}
                        stroke="#DCE9E8"
                        strokeOpacity={deg % 30 === 0 ? "0.6" : "0.3"}
                        strokeWidth={deg % 30 === 0 ? "2.5" : "1.5"}
                        transform={`rotate(${deg} 260 260)`}
                      />
                    ))}

                    {/* المان‌های قفل‌کننده */}
                    {SPRAG_ANGLE.map((deg) => (
                      <g key={deg} transform={`rotate(${deg} 260 260)`}>
                        <path
                          d="M249 96 L271 96 L267 130 L253 130 Z"
                          fill="#0f2a31"
                          stroke={spragFill}
                          strokeWidth="2.4"
                          style={{ transition: "stroke 400ms ease" }}
                        />
                      </g>
                    ))}

                    <circle
                      cx="260"
                      cy="260"
                      r="132"
                      fill="#0d2229"
                      stroke="#A9C1C3"
                      strokeOpacity="0.55"
                      strokeWidth="2"
                    />
                    {Array.from({ length: 6 }, (_, index) => index * 60).map((deg) => (
                      <line
                        key={deg}
                        x1="260"
                        y1="132"
                        x2="260"
                        y2="168"
                        stroke="#A9C1C3"
                        strokeOpacity="0.7"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${deg} 260 260)`}
                      />
                    ))}
                    <circle cx="260" cy="260" r="44" fill="#082027" stroke="#A9C1C3" strokeWidth="2" />
                    <circle cx="260" cy="260" r="7" fill={spragFill} style={{ transition: "fill 400ms ease" }} />
                    <path d="M260 92 L272 70 L248 70 Z" fill="#EE7958" />
                  </g>

                  <line
                    x1="14"
                    y1="260"
                    x2="506"
                    y2="260"
                    stroke="#A9C1C3"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    strokeDasharray="18 6 3 6"
                  />
                  <text x="26" y="44" fontSize="12" fill="#A9C1C3" letterSpacing="1.5" direction="ltr">
                    ROT {degrees}°
                  </text>
                  <text
                    x="494"
                    y="44"
                    fontSize="12"
                    fill={locked ? "#EE7958" : "#5FD8C6"}
                    letterSpacing="1.5"
                    textAnchor="end"
                    direction="ltr"
                  >
                    {PHASES[phase].state}
                  </text>
                </svg>
              </div>

              <div className="relative z-10 mt-3 flex items-center gap-3">
                <span className="h-[2px] flex-1 bg-white/15">
                  <span
                    ref={barRef}
                    className="block h-[2px] origin-right bg-mint"
                    style={{ transform: "scaleX(0.02)" }}
                  />
                </span>
                <span className="whitespace-nowrap text-[11.5px] text-white/60">
                  <span className="lg:hidden">با اسکرول، قطعه می‌چرخد و قفل می‌شود</span>
                  <span className="hidden lg:inline">اسکرول کنید تا خط بچرخد</span>
                </span>
              </div>
            </div>

            {/* روایت سه فاز */}
            <div className="relative z-10 order-2 lg:order-2">
              <div className="mb-5 flex items-center gap-3">
                <span className="code text-[11.5px] font-semibold text-white/45">۰۲</span>
                <span className="text-[12px] font-semibold text-mint">روی خط تولید</span>
              </div>
              <h2 className="font-display text-[28px] leading-[1.4] text-white sm:text-[36px]">
                یک چرخه‌ی کامل، از بالا رفتن نوار تا توقف
              </h2>
              <p className="mt-4 max-w-xl text-[14.5px] leading-8 text-white/70">
                فری‌ویل در بیشتر ساعت‌های کار، بی‌کار است. کاری که می‌کند فقط در چند ثانیه‌ی
                توقف اتفاق می‌افتد — و همین چند ثانیه است که خط را از ریختن بار و آسیب کابل
                نجات می‌دهد.
              </p>

              <ol className="mt-7 space-y-3">
                {PHASES.map((item, index) => {
                  const active = index === phase;
                  return (
                    <li
                      key={item.code}
                      className={cn(
                        "rounded-[14px] border px-5 py-4 transition-colors duration-500",
                        active
                          ? index === 1
                            ? "border-coral/50 bg-coral/10"
                            : "border-mint/45 bg-mint/10"
                          : "border-white/12 bg-white/[0.03]",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="code text-[12px] font-semibold text-white/45" translate="no">
                          {item.code}
                        </span>
                        <span
                          className={cn(
                            "text-[15px] font-bold transition-colors",
                            active ? "text-white" : "text-white/70",
                          )}
                        >
                          {item.title}
                        </span>
                        <span
                          className={cn(
                            "code ms-auto rounded-md border px-2 py-[3px] text-[10.5px] transition-colors",
                            active
                              ? index === 1
                                ? "border-coral/50 text-coral"
                                : "border-mint/50 text-mint"
                              : "border-white/15 text-white/45",
                          )}
                          translate="no"
                        >
                          {item.state}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "grid overflow-hidden text-[13px] leading-7 transition-[grid-template-rows,opacity,margin] duration-500",
                          active
                            ? "mt-3 grid-rows-[1fr] text-white/75 opacity-100"
                            : "grid-rows-[1fr] opacity-100 lg:mt-0 lg:grid-rows-[0fr] lg:opacity-0",
                        )}
                      >
                        <span className="min-h-0">{item.body}</span>
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
