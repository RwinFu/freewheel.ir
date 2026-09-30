"use client";

import { Menu, MoveUpLeft, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#how", label: "سازوکار" },
  { href: "/#applications", label: "کاربردها" },
  { href: "/#types", label: "انواع فری‌ویل" },
  { href: "/ringspann", label: "کاتالوگ" },
];

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} className="group flex shrink-0 items-center gap-3" aria-label="صفحه‌ی اصلی freewheel.ir">
      <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-ocean shadow-sm shadow-ocean/15">
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <circle cx="20" cy="20" r="15" fill="none" stroke="#B8CFD1" strokeWidth="2" />
          <circle cx="20" cy="20" r="8" fill="none" stroke="#72DED2" strokeWidth="2" />
          <path d="M20 4v7M36 20h-7M20 36v-7M4 20h7" stroke="#EE7958" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2.5" fill="#EE7958" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-fg" dir="ltr">
          freewheel.ir
        </span>
        <span className="mt-1 block text-[10.5px] text-fg-dim">فری‌ویل، ساده و دقیق</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-5 px-5 sm:px-7">
        <Wordmark onNavigate={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-fg-muted transition-colors hover:bg-panel hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#963b29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex"
        >
          مشاوره‌ی انتخاب
          <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-panel text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t border-line bg-panel px-5 pb-5 pt-3 lg:hidden"
      >
        <nav className="mx-auto grid max-w-[1320px] gap-1" aria-label="ناوبری موبایل">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[14px] font-medium text-fg transition-colors hover:bg-panel-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#963b29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              مشاوره‌ی انتخاب
              <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
        </nav>
      </div>
    </header>
  );
}
