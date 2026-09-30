"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const PHASES = [
  {
    code: "01",
    title: "درایو در جهت کارکرد",
    body: "موتور، شفت را در جهت کارکرد می‌چرخاند. المان‌های قفل‌کننده در فضای گوه‌ای جلو می‌روند و هیچ تماسی با سطح قفل نمی‌گیرند. اصطکاک تقریباً صفر است و گشتاور منتقل نمی‌شود.",
    state: "FREE",
  },
  {
    code: "02",
    title: "حالت آزاد و سایش",
    body: "در کاربردهای اوررانینگ، فری‌ویل ساعت‌ها در همین حالت می‌ماند. اگر دور آزاد بالا باشد، سایش المان و دمای روغن تعیین‌کننده‌ی عمر قطعه است؛ این‌جاست که نسخه‌ی لیفت‌آف معنی پیدا می‌کند.",
    state: "OVERRUNNING",
  },
  {
    code: "03",
    title: "برگشت: قفل در چند میلی‌ثانیه",
    body: "به محض اینکه جهت چرخش برعکس شود، المان در دهانه‌ی باریک گوه گیر می‌کند و دو حلقه به هم قفل می‌شوند. هیچ فرمان و هیچ تأخیری در کار نیست؛ همین سادگی باعث شده بک‌استاپ محتمل‌ترین راهکار باشد.",
    state: "LOCKED",
  },
];

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
        const total = progress * 1440;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
        }
        if (!reduced) {
          gsap.set(spin, { rotate: total, svgOrigin: "260 260" });
        }
        setDegrees(Math.round(total));
        const next = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
        setPhase((current) => (current === next ? current : next));
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={wrapRef} className="relative border-y border-line bg-panel/40">
      <div className="h-[300vh]">
        <div className="sticky top-16 flex min-h-[calc(100dvh-64px)] items-center overflow-hidden md:top-[100px] md:min-h-[calc(100dvh-100px)]">
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-6 py-12 lg:grid-cols-[1.05fr_1fr]">
            {/* دیاگرام در حال چرخش */}
            <div className="relative">
              <div className="blueprint border border-line bg-panel-2/60 p-2">
                <svg viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-label="فری‌ویل در حال چرخش">
                  <g ref={spinRef}>
                    <circle cx="260" cy="260" r="238" fill="none" stroke="#39434c" strokeWidth="1.5" />
                    <circle cx="260" cy="260" r="200" fill="none" stroke="#39434c" strokeWidth="1.5" />
                    {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
                      <g key={deg} transform={`rotate(${deg} 260 260)`}>
                        <path
                          d="M 249 70 L 271 70 L 267 104 L 253 104 Z"
                          fill="#101417"
                          stroke={phase === 2 ? "#ff6a13" : "#5c6770"}
                          strokeWidth="1.4"
                        />
                      </g>
                    ))}
                    <circle cx="260" cy="260" r="172" fill="none" stroke="#39434c" strokeWidth="1.5" />
                    <circle cx="260" cy="260" r="132" fill="#0d1114" stroke="#39434c" strokeWidth="1.5" />
                    {Array.from({ length: 6 }, (_, i) => i * 60).map((deg) => (
                      <line
                        key={deg}
                        x1="260"
                        y1="88"
                        x2="260"
                        y2="128"
                        stroke="#5c6770"
                        strokeWidth="1.2"
                        transform={`rotate(${deg} 260 260)`}
                      />
                    ))}
                    <path d="M 260 66 L 270 48 L 250 48 Z" fill="#ff6a13" />
                  </g>
                  <line
                    x1="10"
                    y1="260"
                    x2="510"
                    y2="260"
                    stroke="#242c33"
                    strokeWidth="1"
                    strokeDasharray="18 6 3 6"
                  />
                  <text x="30" y="40" fontSize="12" fill="#5c6770" letterSpacing="1.5" direction="ltr">
                    ROT {degrees}°
                  </text>
                </svg>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-[2px] flex-1 bg-line">
                  <span
                    ref={barRef}
                    className="block h-[2px] origin-right bg-accent"
                    style={{ transform: "scaleX(0.02)" }}
                  />
                </span>
                <span className="text-[11.5px] text-fg-dim">اسکرول برای چرخش</span>
              </div>
            </div>

            {/* فازها */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-accent" />
                <span className="text-[12px] tracking-[0.12em] text-accent">چرخه‌ی کارکرد</span>
              </div>
              <h2 className="text-[26px] leading-tight text-fg sm:text-[32px]">
                فری‌ویل در یک چرخه‌ی کامل
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-8 text-fg-muted">
                نمودار بالا با اسکرول شما می‌چرخد. سه حالت پایین را به ترتیب رد کنید تا ببینید
                قطعه در هر لحظه چه کاری انجام می‌دهد.
              </p>

              <ol className="mt-8 space-y-3">
                {PHASES.map((item, index) => {
                  const active = index === phase;
                  return (
                    <li
                      key={item.code}
                      className={cn(
                        "border border-line bg-panel px-5 py-4 transition-all duration-500",
                        active && "border-accent/50 bg-accent/6",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "tnum text-[12px] tracking-widest transition-colors",
                            active ? "text-accent" : "text-fg-dim",
                          )}
                          dir="ltr"
                        >
                          {item.code}
                        </span>
                        <span className="text-[15px] font-semibold text-fg">{item.title}</span>
                        <span
                          className={cn(
                            "ms-auto border px-2 py-[3px] text-[10.5px] tracking-[0.12em] transition-colors",
                            active ? "border-accent/50 text-accent" : "border-line-2 text-fg-dim",
                          )}
                          dir="ltr"
                        >
                          {item.state}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "grid overflow-hidden text-[13.5px] leading-7 text-fg-muted transition-all duration-500",
                          active ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
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
