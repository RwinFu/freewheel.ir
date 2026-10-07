"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import heroImage from "@/assets/images/hero-freewheel.jpg";
import { prefersReducedMotion } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  { label: "چرخش آزاد", sub: "FREE", tone: "mint", pos: "right-[6%] top-[10%]", depth: 28 },
  { label: "درگیر و قفل", sub: "LOCKED", tone: "coral", pos: "left-[5%] bottom-[16%]", depth: 40 },
  { label: "اسپراگ · رولری", sub: "Ø 8 – 240 mm", tone: "steel", pos: "left-[10%] top-[22%]", depth: 18 },
] as const;

/** تصویر اصلی صفحه‌ی اول با موشن: ورود با وایپ، کن‌برنز، پارالاکس اسکرول و تیلت سه‌بعدی با موس */
export function HeroVisual() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const frame = frameRef.current;
    const tilt = tiltRef.current;
    const img = imgRef.current;
    const glow = glowRef.current;
    if (!frame || !tilt || !img || !glow) return;
    const chips = chipRefs.current.filter(Boolean) as HTMLDivElement[];

    if (prefersReducedMotion()) {
      gsap.set([frame, img, ...chips], { clearProps: "all", opacity: 1 });
      frame.classList.add("is-ready");
      return;
    }

    const ctx = gsap.context(() => {
      // ورود
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        frame,
        { clipPath: "inset(12% 50% 12% 50% round 28px)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1, duration: 1.4 },
      )
        .fromTo(img, { scale: 1.35, rotate: -4 }, { scale: 1.08, rotate: 0, duration: 1.8 }, 0)
        .fromTo(
          chips,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12 },
          0.7,
        )
        .add(() => frame.classList.add("is-ready"), 1.2);

      // پارالاکس اسکرول
      gsap.to(img, {
        yPercent: 14,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(frame, {
        yPercent: -8,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 20%", end: "bottom top", scrub: 0.8 },
      });
      chips.forEach((chip, i) => {
        gsap.to(chip, {
          yPercent: -40 - i * 25,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
    }, frame);

    // تیلت سه‌بعدی با موس
    const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3.out" });
    const ix = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3.out" });
    const iy = gsap.quickTo(img, "y", { duration: 0.8, ease: "power3.out" });
    const gx = gsap.quickTo(glow, "xPercent", { duration: 0.5, ease: "power2.out" });
    const gy = gsap.quickTo(glow, "yPercent", { duration: 0.5, ease: "power2.out" });
    const chipTo = chips.map((chip) => ({
      x: gsap.quickTo(chip, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(chip, "y", { duration: 0.9, ease: "power3.out" }),
    }));

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = frame.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rx(-py * 10);
      ry(px * 12);
      ix(px * -26);
      iy(py * -20);
      gx(px * 100);
      gy(py * 100);
      chips.forEach((chip, i) => {
        const depth = CHIPS[i].depth;
        chipTo[i].x(px * depth);
        chipTo[i].y(py * depth);
      });
      frame.classList.add("is-hover");
    };
    const onLeave = () => {
      rx(0);
      ry(0);
      ix(0);
      iy(0);
      gx(0);
      gy(0);
      chips.forEach((_, i) => {
        chipTo[i].x(0);
        chipTo[i].y(0);
      });
      frame.classList.remove("is-hover");
    };
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);

    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-visual relative mx-auto w-full max-w-[640px] lg:max-w-none" style={{ perspective: "1400px" }}>
      {/* هاله‌ی پشت تصویر */}
      <div className="hero-visual-aura pointer-events-none absolute -inset-10 -z-10" aria-hidden="true" />

      <div ref={tiltRef} className="hero-visual-tilt" style={{ transformStyle: "preserve-3d" }}>
        <div ref={frameRef} className="hero-visual-frame relative aspect-[16/11] overflow-hidden rounded-[28px] opacity-0">
          <div ref={imgRef} className="hero-visual-img absolute inset-0 will-change-transform">
            <Image
              src={heroImage}
              alt="کلاچ یک‌طرفه‌ی فولادی (فری‌ویل) با المان‌های قفل‌کننده بین دو حلقه"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover object-[62%_50%]"
              placeholder="blur"
            />
          </div>

          {/* نور متحرک همراه موس */}
          <div ref={glowRef} className="hero-visual-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* جاروی نور */}
          <div className="hero-visual-sheen pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* شبکه و حاشیه */}
          <div className="hero-visual-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="hero-visual-scan pointer-events-none absolute inset-x-0 h-24" aria-hidden="true" />

          {/* حلقه‌ی چرخان روی قطعه */}
          <svg
            className="hero-visual-orbit pointer-events-none absolute left-[18%] top-1/2 h-[66%] w-auto -translate-y-1/2"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="92" fill="none" stroke="#72ded2" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx="100" cy="100" r="78" fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="60 200" />
          </svg>

          <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] text-white/85 backdrop-blur-md">
            <span className="hero-visual-dot h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            کلاچ یک‌طرفه · نمای نزدیک
          </div>
        </div>

        {/* چیپ‌های شناور */}
        {CHIPS.map((chip, i) => (
          <div
            key={chip.sub}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            className={`hero-chip hero-chip-${chip.tone} absolute ${chip.pos} opacity-0`}
            style={{ transform: `translateZ(${chip.depth * 2}px)`, animationDelay: `${i * 0.8}s` }}
          >
            <span className="block text-[12px] font-bold leading-5">{chip.label}</span>
            <span className="block text-[10px] tracking-[0.2em] opacity-70" dir="ltr">
              {chip.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
