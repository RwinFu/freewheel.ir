"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { AXIS_LAYERS } from "@/content/product-images";
import type { HomeStill } from "@/content/home-media";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * لایه‌ی حرکت درون‌تصویری.
 *
 * مرجع، عکس‌های ساکن ندارد؛ تصویرها درون قاب حرکت می‌کنند (ویدیو/گیف یا
 * پن آهسته). اینجا همان حس با دو حالت ساخته می‌شود:
 *
 * - `drift`  حرکت پیوسته و آهسته‌ی قاب (کن‌برنز) که در دید کاربر روشن می‌شود
 * - `scrub`  پن/زوم وابسته به اسکرول، برای قاب‌های عریض
 *
 * حرکت فقط وقتی در حال اجراست که قاب در دید باشد و با `prefers-reduced-motion`
 * کاملاً خاموش می‌شود.
 */
export type MotionKind = "drift" | "scrub" | "still";

type MotionImageProps = {
  still: HomeStill;
  motion?: MotionKind;
  sizes?: string;
  priority?: boolean;
  /** مدت یک دور حرکت پیوسته، ثانیه */
  duration?: number;
  /** تاخیر شروع، برای اینکه همه‌ی قاب‌ها هم‌زمان نفس نکشند */
  delay?: number;
  className?: string;
  imgClassName?: string;
  /** درخشش آهسته روی سطح فلز؛ حس نور متحرک روی قطعه */
  sheen?: boolean;
};

export function MotionImage({
  still,
  motion = "drift",
  sizes = "100vw",
  priority = false,
  duration = 26,
  delay = 0,
  className,
  imgClassName,
  sheen = true,
}: MotionImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // حرکت پیوسته فقط در دید اجرا می‌شود تا وقتی قاب بیرون صفحه است GPU/باتری مصرف نشود.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || motion !== "drift" || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => frame.classList.toggle("is-live", entry.isIntersecting),
      { rootMargin: "12% 0px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [motion]);

  // پن وابسته به اسکرول برای قاب‌های عریض.
  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || motion !== "scrub" || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      img,
      { yPercent: -3.5, xPercent: 2.5, scale: 1.16 },
      {
        yPercent: 3.5,
        xPercent: -2.5,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: frame.parentElement ?? frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [motion]);

  return (
    <div
      ref={frameRef}
      className={cn("fw-mm", className)}
      data-motion={motion}
      style={
        {
          "--fw-drift-duration": `${duration}s`,
          "--fw-drift-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <Image
        ref={imgRef}
        src={still.src}
        alt={still.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={priority ? "empty" : "blur"}
        className={cn("fw-mm-img", imgClassName)}
      />
      {sheen ? <span className="fw-mm-sheen" aria-hidden="true" /> : null}
    </div>
  );
}

/**
 * قطعه‌ی زنده: همان عکس استودیویی روبه‌روی محور، ولی به سه نوار هم‌مرکز بریده
 * شده که هرکدام حول محور خودش می‌چرخد — حلقه‌ی داخلی تندتر، قفس المان‌ها
 * آهسته‌تر و حلقه‌ی بیرونی ساکن؛ دقیقاً مثل چرخش آزاد یک فری‌ویل واقعی.
 *
 * این همان «حرکت داخل تصویر» است، بدون ویدیو: تصویر قطعه هیچ‌وقت ساکن نمی‌ماند
 * و کاربر می‌تواند سازوکار را همان‌جا ببیند.
 */
export function SpinPart({
  className,
  sizes = "(min-width: 900px) 58vw, 92vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-spin='hub']", { rotate: 360, duration: 24, ease: "none", repeat: -1 });
      gsap.to("[data-spin='race']", { rotate: 360, duration: 48, ease: "none", repeat: -1 });
      gsap.to("[data-spin='flange']", { rotate: 1.2, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className={cn("fw-spin", className)} role="img" aria-label="فری‌ویل در حال چرخش آزاد: حلقه‌ی داخلی می‌چرخد و حلقه‌ی بیرونی ساکن است">
      {/* همان عکس، تار و بزرگ‌شده، تا قابِ مربع روی زمینه‌ی خودش بنشیند و نوار خالی نماند */}
      <Image
        src={AXIS_LAYERS.backdrop}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="fw-spin-fill"
        aria-hidden="true"
      />
      <div className="fw-spin-layer" data-spin="flange" aria-hidden="true">
        <Image src={AXIS_LAYERS.flange} alt="" fill sizes={sizes} className="fw-spin-img" />
      </div>
      <div className="fw-spin-layer" data-spin="race" aria-hidden="true">
        <Image src={AXIS_LAYERS.race} alt="" fill sizes={sizes} className="fw-spin-img" />
      </div>
      <div className="fw-spin-layer" data-spin="hub" aria-hidden="true">
        <Image src={AXIS_LAYERS.hub} alt="" fill sizes={sizes} className="fw-spin-img" />
      </div>
      <span className="fw-spin-sheen" aria-hidden="true" />
      <span className="fw-spin-tag">
        <span className="fw-spin-dot" aria-hidden="true" />
        چرخش آزاد
      </span>
    </div>
  );
}
