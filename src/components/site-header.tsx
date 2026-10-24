"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { PartSearch } from "@/components/part-search";

const NAV_LINKS = [
  { href: "/#intro", label: "معرفی" },
  { href: "/#mechanism", label: "سازوکار" },
  { href: "/#applications", label: "کاربردها" },
  { href: "/#families", label: "خانواده‌ها" },
  { href: "/#drive-system", label: "درایو" },
  { href: "/ringspann", label: "کاتالوگ" },
];

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="lg-wordmark group flex shrink-0 items-center gap-2.5"
      aria-label="صفحه‌ی اصلی freewheel.ir"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl overflow-hidden">
        {/* gradient background */}
        <span className="absolute inset-0 bg-gradient-to-br from-accent to-[#A04000] shadow-lg shadow-accent/30" />
        <span className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-accent-soft/40 to-transparent" />
        <svg viewBox="0 0 40 40" className="relative h-6 w-6" aria-hidden="true">
          <circle cx="20" cy="20" r="13" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="white" strokeWidth="1.8" opacity="0.7" />
          {/* صلیب دنده‌ای، آرام می‌چرخد — فری‌ویل زنده‌ی لوگو */}
          <g className="lg-ring-spin">
            <path d="M20 6v5M34 20h-5M20 34v-5M6 20h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="20" cy="20" r="2" fill="white" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className="block text-[15px] font-black tracking-tight text-white"
          dir="ltr"
        >
          freewheel<span className="text-accent-soft">.ir</span>
        </span>
        <span className="mt-0.5 block text-[10px] font-medium text-white/60">
          راهکارهای انتقال قدرت
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // لکه‌ی نور شیشه — مستقیم روی CSS varها می‌نویسد تا re-render ندهد
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--lg-mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--lg-sheen-opacity", "1");
  }, []);

  const handlePointerLeave = useCallback(() => {
    headerRef.current?.style.setProperty("--lg-sheen-opacity", "0");
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 pointer-events-none">
      <div className="flex justify-center px-3 sm:px-6 pt-3">
        <header
          ref={headerRef}
          data-scrolled={scrolled || undefined}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={[
            "liquid-glass pointer-events-auto relative w-full max-w-[1200px]",
            "rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          ].join(" ")}
        >
          {/* لکه‌ی نور روی سطح شیشه + نوار نور مورب عبوری */}
          <span className="liquid-glass-sheen" aria-hidden="true" />

          <div className="lg-row relative flex items-center justify-between gap-3 px-4 sm:px-6">
            <Wordmark onNavigate={() => setOpen(false)} />

            {/* Desktop nav */}
            <nav className="lg-nav hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2 text-[12.5px] font-semibold text-white/60 transition-all duration-300 hover:text-white hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>

            {/* سرچ‌بارِ کاتالوگ — جای CTA، درون کپسول شیشه‌ای */}
            <PartSearch variant="glass" className="relative hidden w-52 lg:block" />

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06] text-white/70 transition-all hover:bg-white/[0.12] hover:text-white lg:hidden"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>

          {/* Mobile panel — به‌جای زمینه‌ی مات، شیشه‌ی هدر از این‌جا هم دیده می‌شود */}
          <div
            id="mobile-navigation"
            hidden={!open}
            className="relative border-t border-white/[0.08] bg-white/[0.04] px-4 pb-5 pt-3 lg:hidden"
          >
            {/* accent stripe */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <nav className="mx-auto grid max-w-[1100px] gap-1.5" aria-label="ناوبری موبایل">
              {/* سرچ‌بار در دراور موبایل، بالای فهرست */}
              <PartSearch variant="glass" className="relative mb-2" />
              {NAV_LINKS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold text-white/75 transition-all hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-[11px] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
