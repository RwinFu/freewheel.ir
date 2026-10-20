"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * کیت حرکتی صفحه‌ی اول — الهام از زبان حرکتی Belgrade Arbor:
 * - متن‌ها کلمه‌به‌کلمه از پشت ماسک بالا می‌آیند (word reveal)
 * - حروف لاتین تکی‌تکی ظاهر می‌شوند (char reveal)
 * - درصد پیشرفت اسکرول ثابت گوشه‌ی صفحه
 * - ریل شماره‌ی بخش‌ها (۰۱ تا ۰۸) که با اسکرول فعال می‌شود
 *
 * برای متن فارسی عمداً فقط «کلمه» جدا می‌شود نه حرف؛ چون جداکردن حروف
 * فارسی اتصال‌شان را می‌شکند.
 */

/* ---------------- word-by-word reveal ---------------- */

export function WordReveal({
  text,
  className,
  mode = "scroll",
  stagger = 0.055,
  variant = "rise",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** scroll = با اسکرول scrub می‌شود؛ enter = یک‌بار هنگام ورود به دید */
  /**
   * static = هیچ انیمیشنی در کامپوننت اجرا نمی‌شود؛ والد (مثلاً تایم‌لاین
   * صحنه‌ی چسبیده) کلمه‌ها را با همان اسکرول صفحه حرکت می‌دهد.
   */
  mode?: "scroll" | "enter" | "load" | "static";
  stagger?: number;
  /**
   * rise = کلمه از پشت ماسک بالا می‌آید (تیترهای صفحه)
   * dim  = متن از قبل سرجایش است و با اسکرول از کم‌رنگ به کامل می‌رسد
   *        (همان چیزی که در بلوک‌های تحریریه‌ی مرجع می‌بینیم)
   */
  variant?: "rise" | "dim";
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>("[data-word-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0, opacity: 1 });
      return;
    }

    if (mode === "static") return;

    if (mode === "load") {
      const tween = gsap.fromTo(
        inners,
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power4.out",
          stagger,
          delay: 0.15,
        },
      );
      return () => {
        tween.kill();
      };
    }

    if (variant === "dim") {
      const dim = gsap.fromTo(
        inners,
        { opacity: 0.16, filter: "blur(0.4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: stagger * 2.4,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 38%",
            scrub: 0.5,
          },
        },
      );
      return () => {
        dim.scrollTrigger?.kill();
        dim.kill();
      };
    }

    const tween = gsap.fromTo(
      inners,
      { yPercent: 112, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: mode === "enter" ? "top 92%" : "top 88%",
          end: mode === "enter" ? "top 60%" : "top 34%",
          scrub: mode === "enter" ? false : 0.65,
          once: mode === "enter",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [mode, stagger, variant]);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="fw-word">
          <span className="fw-word-inner" data-word-inner>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- latin char reveal ---------------- */

export function CharLatin({
  text,
  className,
  mode = "load",
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  mode?: "load" | "enter";
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>("[data-char-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      inners,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger:
          mode === "enter"
            ? { trigger: el, start: "top 92%", once: true }
            : undefined,
        delay: mode === "load" ? 0.35 : 0,
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [mode, stagger]);

  return (
    <span ref={ref} className={className} dir="ltr" aria-label={text}>
      {chars.map((ch, index) => (
        <span key={`${ch}-${index}`} className="fw-char" aria-hidden="true">
          <span className="fw-char-inner" data-char-inner>
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- scroll percent ---------------- */

export function ScrollPercent() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setValue(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fw-progress"
      aria-hidden="true"
      style={{ "--fw-progress": value } as CSSProperties}
    >
      <span className="fw-progress-value">{value}</span>
      <span className="fw-progress-unit">%</span>
    </div>
  );
}

/* ---------------- section number rail ---------------- */

const RAIL_SECTIONS = [
  { id: "hero", numeral: "۰۱" },
  { id: "intro", numeral: "۰۲" },
  { id: "applications", numeral: "۰۳" },
  { id: "families", numeral: "۰۴" },
  { id: "mechanism", numeral: "۰۵" },
  { id: "drive-system", numeral: "۰۶" },
  { id: "gallery", numeral: "۰۷" },
  { id: "choose", numeral: "۰۸" },
];

export function SectionRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = RAIL_SECTIONS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = targets.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="fw-rail" aria-hidden="true">
      {RAIL_SECTIONS.map((item, index) => (
        <li
          key={item.id}
          className={index === active ? "fw-rail-item is-active" : "fw-rail-item"}
        >
          <span className="fw-rail-num" dir="ltr">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="fw-rail-dot" />
        </li>
      ))}
    </ol>
  );
}

/* ---------------- simple fade-up on enter ---------------- */

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const tween = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: prefersReducedMotion() ? 1 : undefined }}>
      {children}
    </div>
  );
}

/* ---------------- parallax image helper ---------------- */

export function ParallaxMedia({
  children,
  strength = 12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: -strength / 2 },
      {
        yPercent: strength / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
