"use client";

import { useEffect } from "react";

/**
 * اسکرول نرم با CSS بومی مرورگر.
 *
 * قبلاً از Lenis + GSAP ticker استفاده می‌شد که هر فریم یک حلقه‌ی
 * requestAnimationFrame جدا + هم‌زمان‌سازی با ScrollTrigger داشت.
 * نتیجه: لگ روی اسکرول، مصرف CPU بالا، و تاخیر در پاسخ به touch.
 *
 * حالا فقط `scroll-behavior: smooth` روی html فعال می‌شود —
 * مرورگر خودش با compositing thread اسکرول را نرم می‌کند، بدون JS.
 * لینک‌های داخلی (#anchor) هم با scrollIntoView رفتار نرم دارند.
 */
export function SmoothScroll() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    const onAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const destination = document.querySelector(href);
      if (!destination) return;
      event.preventDefault();
      (destination as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      html.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
