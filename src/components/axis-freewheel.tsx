"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/components/motion";
import { AXIS_LAYERS } from "@/content/product-images";
import { cn } from "@/lib/utils";

export type AxisPhase = "free" | "engaging" | "locked";

/**
 * سرعت زاویه‌ای هر بخش، درجه بر ثانیه. علامت مثبت = جهت کارکرد.
 *
 * منطق مکانیکی: در چرخش آزاد شفت (حلقه‌ی داخلی) می‌گردد و قفس المان‌ها با
 * کشیده‌شدن، با حدود نیمی از سرعت آن می‌چرخد؛ حلقه‌ی بیرونی که روی بدنه بسته
 * شده ساکن است. در لحظه‌ی برگشت سرعت‌ها به هم نزدیک می‌شوند و در قفل، هر سه
 * بخش یک‌پارچه می‌گردند — همان چیزی که انتقال گشتاور یعنی.
 */
const SPEEDS: Record<AxisPhase, { hub: number; race: number; flange: number }> = {
  free: { hub: 62, race: 31, flange: 0 },
  engaging: { hub: 46, race: 39, flange: 7 },
  locked: { hub: 42, race: 42, flange: 42 },
};

/** در حالت کاهش حرکت، این زاویه‌ها ثابت می‌مانند (بدون هیچ چرخشی). */
const STILL: Record<AxisPhase, { hub: number; race: number; flange: number }> = {
  free: { hub: 0, race: -13, flange: 0 },
  engaging: { hub: -6, race: -6, flange: -6 },
  locked: { hub: -18, race: -18, flange: -18 },
};

/**
 * بخش «اصل کار»: عکس استودیویی واقعی فری‌ویل از روبه‌روی محور، بریده‌شده به
 * سه نوار هم‌مرکز (حلقه‌ی داخلی، قفس المان‌ها، حلقه‌ی بیرونی). هر نوار روی
 * محور خودش می‌چرخد، پس با انتخاب هر مرحله، حرکت واقعی قطعه دیده می‌شود.
 *
 * لایه‌ها با `scripts/build_freewheel_layers.py` از یک رندر ساخته شده‌اند و
 * بوم مربع‌شان هم‌مرکز است؛ بنابراین چرخاندن هر لایه دقیقاً یعنی چرخاندن همان
 * حلقه حول محور قطعه.
 */
export function AxisFreewheel({ phase, className }: { phase: AxisPhase; className?: string }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const flangeRef = useRef<HTMLDivElement | null>(null);
  const raceRef = useRef<HTMLDivElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLSpanElement | null>(null);
  const phaseRef = useRef<AxisPhase>(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // ضربه‌ی کوچک هنگام درگیرشدن: مثل تکان مکانیزم در لحظه‌ی قفل‌شدن
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || phase !== "engaging" || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      stage,
      { rotate: 0 },
      {
        rotate: -1.15,
        duration: 0.13,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => gsap.set(stage, { rotate: 0 }),
      },
    );
    return () => {
      tween.kill();
      gsap.set(stage, { rotate: 0 });
    };
  }, [phase]);

  useEffect(() => {
    const flange = flangeRef.current;
    const race = raceRef.current;
    const hub = hubRef.current;
    const readout = readoutRef.current;
    if (!flange || !race || !hub) return;

    if (prefersReducedMotion()) {
      const still = STILL[phaseRef.current];
      gsap.set(hub, { rotation: still.hub });
      gsap.set(race, { rotation: still.race });
      gsap.set(flange, { rotation: still.flange });
      if (readout) readout.textContent = "0";
      return;
    }

    const angle = { hub: 0, race: -13, flange: 0 };
    const speed = { hub: 0, race: 0, flange: 0 };
    let label = "";

    const tick = (_time: number, delta: number) => {
      // سقف گام زمانی: بعد از پنهان‌شدن تب، قطعه یک‌دفعه چند دور نمی‌زند
      const dt = Math.min(delta, 64) / 1000;
      // هم‌سرعت‌شدن نرم (چند ثانیه) تا تغییر مرحله پرش نداشته باشد
      const ease = 1 - Math.pow(0.02, dt);
      const target = SPEEDS[phaseRef.current];

      speed.hub += (target.hub - speed.hub) * ease;
      speed.race += (target.race - speed.race) * ease;
      speed.flange += (target.flange - speed.flange) * ease;

      angle.hub += speed.hub * dt;
      angle.race += speed.race * dt;
      angle.flange += speed.flange * dt;

      gsap.set(hub, { rotation: angle.hub });
      gsap.set(race, { rotation: angle.race });
      gsap.set(flange, { rotation: angle.flange });

      if (readout) {
        const next = String(Math.round(((angle.hub % 360) + 360) % 360));
        if (next !== label) {
          label = next;
          readout.textContent = next;
        }
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className={cn("part-stage relative mx-auto aspect-square w-full max-w-[420px]", className)}>
      <div
        role="img"
        aria-label="فری‌ویل واقعی از روبه‌روی محور: حلقه‌ی داخلی، قفس المان‌های قفل‌کننده و حلقه‌ی بیرونی، هر بخش با چرخش مستقل"
        className="absolute inset-0"
      >
      <div ref={stageRef} className="absolute inset-0">
          {/* پس‌زمینه‌ی استودیویی عکس: ثابت می‌ماند تا چرخش لایه‌ها سایه را نکشد */}
          <Image
            src={AXIS_LAYERS.backdrop}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 420px, 88vw"
            className="object-cover"
          />

          {/* حلقه‌ی بیرونی (فلنج روی بدنه) */}
          <div ref={flangeRef} className="part-layer" aria-hidden="true">
            <Image
              src={AXIS_LAYERS.flange}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 88vw"
              className="part-layer-img"
              draggable={false}
            />
          </div>

          {/* قفس و المان‌های قفل‌کننده */}
          <div ref={raceRef} className="part-layer" aria-hidden="true">
            <Image
              src={AXIS_LAYERS.race}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 88vw"
              className="part-layer-img"
              draggable={false}
            />
          </div>

          {/* حلقه‌ی داخلی و توپی (شفت) */}
          <div ref={hubRef} className="part-layer" aria-hidden="true">
            <Image
              src={AXIS_LAYERS.hub}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 88vw"
              className="part-layer-img"
              draggable={false}
            />
          </div>

          {/* راهنمای حلقه‌ها، پیکان جهت و مسیر گشتاور */}
          <svg className="part-stage-overlay" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <marker
                id="ax-arrow-mint"
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
                id="ax-arrow-coral"
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

            {/* مرزهای برش لایه‌ها: همان‌جا که قطعه به بخش‌های مستقل تقسیم شده */}
            <circle
              cx="200"
              cy="200"
              r="118"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.16"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
            <circle
              cx="200"
              cy="200"
              r="156"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.16"
              strokeWidth="1"
              strokeDasharray="3 7"
            />

            {/* جهت کارکرد روی حلقه‌ی داخلی */}
            <path
              d="M 128 128 A 100 100 0 0 1 262 148"
              fill="none"
              stroke="#72DED2"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#ax-arrow-mint)"
              className="part-stage-fade"
              opacity={phase === "free" ? 1 : phase === "engaging" ? 0.55 : 0.18}
            />

            {/* جهت خروجی روی حلقه‌ی بیرونی */}
            <path
              d="M 336 250 A 177 177 0 0 1 264 360"
              fill="none"
              stroke="#EE7958"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#ax-arrow-coral)"
              className="part-stage-fade"
              opacity={phase === "locked" ? 1 : phase === "engaging" ? 0.6 : 0.16}
            />

            {/* موج درگیری — فقط در لحظه‌ی برگشت */}
            {phase === "engaging" ? (
              <circle
                cx="200"
                cy="200"
                r="137"
                fill="none"
                stroke="#EE7958"
                strokeWidth="2.5"
                className="how-ping"
              />
            ) : null}

            {/* مسیر گشتاور روی ردیف المان‌ها — فقط در قفل */}
            <g className="part-stage-fade" opacity={phase === "locked" ? 1 : 0}>
              <path
                d="M 200 63 A 137 137 0 0 1 200 337"
                fill="none"
                stroke="#EE7958"
                strokeOpacity="0.22"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 200 63 A 137 137 0 0 1 200 337"
                fill="none"
                stroke="#EE7958"
                strokeWidth="3"
                strokeLinecap="round"
                markerEnd="url(#ax-arrow-coral)"
              />
            </g>
          </svg>
        </div>
        </div>

      <span className="part-stage-chip" dir="ltr">
        <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
        ROT <span ref={readoutRef}>0</span>°
      </span>
    </div>
  );
}
