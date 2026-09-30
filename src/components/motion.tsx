"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

let registered = false;
function useGsap() {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
  }, []);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** آشکارسازی بخش‌ها با اسکرول (GSAP ScrollTrigger) */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useGsap();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => el.classList.add("is-in"),
    });
    return () => trigger.kill();
  }, [y]);

  return (
    <Tag
      ref={ref}
      className={["reveal-item", className].filter(Boolean).join(" ")}
      style={{ ["--reveal-y" as string]: `${y}px`, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/** شمارنده‌ی اعداد مشخصات */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  useGsap();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }
    const state = { current: 0 };
    const tween = gsap.to(state, {
      current: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(state.current)),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat("en-US").format(display)}
      {suffix}
    </span>
  );
}

/** دکمه‌ی مگنتی — جابه‌جایی ظریف نشانگر نسبت به موقعیت موس */
export function Magnetic({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength * 0.5,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/** مارکی ظریف برای نام برندها */
export function BrandMarquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div dir="ltr" className="marquee-wrap relative overflow-hidden py-1">
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-sm tracking-[0.22em] text-fg-dim"
          >
            <span className="font-medium">{item}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-base to-transparent" />
    </div>
  );
}
