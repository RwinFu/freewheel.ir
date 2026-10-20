"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * نوار سینمایی متن — همان «تیکر» بزرگ مرجع که بین بخش‌ها می‌گذرد.
 *
 * - پیوسته حرکت می‌کند (یک دور کامل در `duration` ثانیه)
 * - سرعتش با سرعت اسکرول کاربر بالا/پایین می‌رود و کج می‌شود (skew)،
 *   پس حس «فیزیک» دارد، نه یک گیف تکرارشونده
 * - جهت حرکت با `direction` عوض می‌شود تا دو نوار پشت‌سرهم خلاف هم بروند
 */
export function KineticBand({
  text,
  latin = true,
  direction = "left",
  duration = 46,
  className,
  variant = "line",
}: {
  text: string;
  latin?: boolean;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  /** line = نوار نازک بین بخش‌ها، hero = نوار بزرگ تیتر */
  variant?: "line" | "hero";
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || prefersReducedMotion()) return;

    // محتوا دو بار تکرار شده؛ جابه‌جایی ۵۰٪ = یک دور بی‌درز.
    const sign = direction === "left" ? -1 : 1;
    const loop = gsap.to(track, {
      xPercent: 50 * sign,
      duration,
      ease: "none",
      repeat: -1,
    });
    gsap.set(track, { xPercent: sign === -1 ? 0 : -50 });

    // سرعت اسکرول، سرعت نوار را مدوله می‌کند و کمی کجش می‌کند.
    const sync = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 2600);
        gsap.to(loop, {
          timeScale: 1 + Math.abs(velocity) * 5,
          duration: 0.4,
          overwrite: true,
        });
        gsap.to(track, {
          skewX: velocity * 5 * -sign,
          duration: 0.6,
          overwrite: true,
        });
      },
      onLeave: () => gsap.to(loop, { timeScale: 1, duration: 0.6 }),
      onLeaveBack: () => gsap.to(loop, { timeScale: 1, duration: 0.6 }),
    });

    return () => {
      sync.kill();
      loop.kill();
      gsap.killTweensOf(track);
    };
  }, [direction, duration]);

  const run = (
    <span className="kinetic-run" dir={latin ? "ltr" : "rtl"}>
      <span className="kinetic-text">{text}</span>
      <span className="kinetic-sep" aria-hidden="true">
        ✳
      </span>
    </span>
  );

  return (
    <div
      ref={rootRef}
      className={cn("kinetic-band", `kinetic-band-${variant}`, className)}
      data-direction={direction}
      aria-hidden="true"
    >
      <div ref={trackRef} className="kinetic-track">
        {run}
        {run}
      </div>
    </div>
  );
}
