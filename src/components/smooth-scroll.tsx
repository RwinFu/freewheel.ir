"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * اسکرول نرم + هم‌زمان‌سازی با موتور انیمیشن.
 *
 * قبلاً Lenis حلقه‌ی requestAnimationFrame خودش را داشت و GSAP/ScrollTrigger
 * هم حلقه‌ی جدا. نتیجه‌اش دو ساعت جدا بود: انیمیشن‌های scrub یک فریم عقب
 * می‌افتادند و صحنه‌هایی که sticky هستند می‌لرزیدند. اینجا یک ساعت واحد
 * داریم — ticker گسپ Lenis را جلو می‌برد و Lenis هم هر اسکرول را به
 * ScrollTrigger خبر می‌دهد — پس صحنه‌های چسبیده و متن‌های اسکرول‌محور
 * دقیقاً با هم حرکت می‌کنند.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // در موبایل لمسی، نرم‌سازی بومی خودِ مرورگر بهتر است تا دو اینرسی روی هم
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    // یک ساعت: Lenis با ticker گسپ جلو می‌رود، پس هیچ فریم عقب‌ماندگی نیست.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ارتفاع صفحه بعد از لود فونت/تصویر عوض می‌شود؛ اندازه‌ها را دوباره بگیر.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    const onAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const destination = document.querySelector(href);
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -90 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
