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
    <Link href="/" onClick={onNavigate} className="group flex shrink-0 items-center gap-3" aria-label="صفحه‌ی اصلی freewheel.ir">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean shadow-sm shadow-ocean/20">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <circle cx="20" cy="20" r="15" fill="none" stroke="#CBD5BC" strokeWidth="2" />
          <circle cx="20" cy="20" r="8" fill="none" stroke="#DDE5D2" strokeWidth="2" />
          <path d="M20 4v7M36 20h-7M20 36v-7M4 20h7" stroke="#C07B58" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2.5" fill="#C07B58" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[14.5px] font-bold tracking-tight text-fg" dir="ltr">
          freewheel.ir
        </span>
        <span className="mt-0.5 block text-[10px] text-fg-dim">راهکارهای انتقال قدرت</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const delta = y - lastScrollY.current;

    // بعد از 80 پیکسل اسکرول، با جهت اسکرول مخفی/نمایش بده
    if (y > 80) {
      if (delta > 6) {
        setVisible(false);
      } else if (delta < -6) {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }

    lastScrollY.current = y;
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

  return (
    <div
      className={[
        "fixed top-3 right-0 left-0 z-50 flex justify-center px-3 sm:px-5",
        "pointer-events-none",
        "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0 opacity-100" : "-translate-y-[calc(100%+1rem)] opacity-0",
      ].join(" ")}
      aria-hidden={false}
    >
      <header
        className={[
          "pointer-events-auto w-full max-w-[1280px]",
          "rounded-2xl border border-white/10 bg-ocean/80 backdrop-blur-xl",
          "shadow-[0_8px_32px_rgba(26,20,16,0.18),0_2px_8px_rgba(26,20,16,0.12)]",
        ].join(" ")}
      >
        <div className="flex h-[68px] items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark onNavigate={() => setOpen(false)} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden min-h-10 items-center gap-2 rounded-full bg-accent px-4.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex"
          >
            مشاوره‌ی فنی
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {/* پنل موبایل */}
        <div
          id="mobile-navigation"
          hidden={!open}
          className="border-t border-white/8 bg-black/10 px-4 pb-4 pt-2 lg:hidden"
        >
          <nav className="mx-auto grid max-w-[1200px] gap-1" aria-label="ناوبری موبایل">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[14px] font-medium text-white/80 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[14px] font-semibold text-white transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              مشاوره‌ی فنی
              <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
