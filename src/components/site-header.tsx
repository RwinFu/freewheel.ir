"use client";

import { Menu, MoveUpLeft, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="صفحه‌ی اصلی freewheel.ir"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl overflow-hidden">
        {/* gradient background */}
        <span className="absolute inset-0 bg-gradient-to-br from-accent to-[#A04000] shadow-lg shadow-accent/30" />
        <span className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-accent-soft/40 to-transparent" />
        <svg viewBox="0 0 40 40" className="relative h-6 w-6" aria-hidden="true">
          <circle cx="20" cy="20" r="13" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="white" strokeWidth="1.8" opacity="0.7" />
          <path d="M20 6v5M34 20h-5M20 34v-5M6 20h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
          {/* لکه‌ی نور روی سطح شیشه */}
          <span className="liquid-glass-sheen" aria-hidden="true" />

          <div className="relative flex h-[64px] items-center justify-between gap-3 px-4 sm:px-6">
            <Wordmark onNavigate={() => setOpen(false)} />

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
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

            {/* CTA — خودش هم یک تکه شیشه‌ی کوچک است: برق لبه‌ی بالا دارد */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 h-9 px-4 rounded-full text-[12.5px] font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98] group"
              style={{
                background: "linear-gradient(135deg, #D35400 0%, #E67E22 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 2px 10px rgba(211,84,0,0.30)",
              }}
            >
              مشاوره‌ی فنی
              <MoveUpLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>

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
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2.5 flex items-center justify-center gap-2 min-h-11 rounded-xl text-[14px] font-bold text-white transition-all hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #D35400 0%, #E67E22 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 2px 10px rgba(211,84,0,0.25)",
                }}
              >
                مشاوره‌ی فنی
                <MoveUpLeft className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
