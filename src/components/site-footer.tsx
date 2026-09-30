import Link from "next/link";
import { MoveUpLeft } from "lucide-react";

import { RINGSPANN_SERIES } from "@/content/ringspann";
import { FOOTER_NOTE, SHOPS } from "@/content/site";

const SITE_LINKS = [
  { href: "/#mechanism", label: "سازوکار فری‌ویل" },
  { href: "/#types", label: "انواع و مقایسه" },
  { href: "/ringspann", label: "کاتالوگ سری‌ها" },
  { href: "/applications", label: "کاربردها" },
  { href: "/brands", label: "برندها" },
  { href: "/articles", label: "مقالات فنی" },
  { href: "/about", label: "درباره‌ی مرجع" },
  { href: "/contact", label: "تماس و استعلام" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ocean text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:px-7 md:grid-cols-[1.15fr_0.85fr_1fr] md:gap-14 md:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="صفحه‌ی اصلی freewheel.ir">
            <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/15 bg-white/5">
              <svg viewBox="0 0 44 44" className="h-7 w-7" aria-hidden="true">
                <circle cx="22" cy="22" r="19" fill="none" stroke="#A9C1C3" strokeOpacity="0.4" strokeWidth="2" />
                <circle cx="22" cy="22" r="13.5" fill="none" stroke="#A9C1C3" strokeWidth="3.5" />
                <circle cx="22" cy="22" r="7" fill="none" stroke="#5FD8C6" strokeWidth="2.5" />
                <path d="M22 8.5V2.5M35.5 22h6M22 35.5v6M8.5 22h-6" stroke="#EE7958" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="22" cy="22" r="2.5" fill="#EE7958" />
              </svg>
            </span>
            <span className="code text-[16px] font-bold tracking-tight text-white" translate="no">
              freewheel.ir
            </span>
          </Link>
          <p className="mt-5 max-w-md text-[13.5px] leading-7 text-white/70">
            مرجع فارسی فری‌ویل و کلاچ یک‌طرفه: سازوکار، انواع، کاربردها و کاتالوگ سری‌ها — با
            اعدادی که از دیتاشیت سازنده نقل شده‌اند.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {RINGSPANN_SERIES.map((series) => (
              <Link
                key={series.slug}
                href={`/ringspann/${series.slug}`}
                className="code rounded-md border border-white/15 px-2.5 py-1 text-[11.5px] text-white/75 transition-colors hover:border-mint hover:text-mint"
                translate="no"
              >
                {series.designation}
              </Link>
            ))}
          </div>
        </div>

        <nav aria-label="لینک‌های مفید">
          <h2 className="text-[13px] font-semibold text-white">مسیرهای سایت</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {SITE_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[12.5px] text-white/65 transition-colors hover:text-mint">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[13px] font-semibold text-white">قطعه را پیدا کرده‌اید؟</h2>
          <p className="mt-3 text-[12.5px] leading-6 text-white/65">
            برای موجودی و قیمت، مستقیم از فروشگاه آنلاین استعلام بگیرید. برای انتخاب سایز و بررسی
            پروژه، با ما در تماس باشید.
          </p>
          <a
            href={SHOPS.bearing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-mint px-5 text-[12.5px] font-bold text-ocean transition-colors hover:bg-white active:scale-[0.98]"
          >
            {SHOPS.bearing.name}
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/contact"
            className="mt-3 block text-[12.5px] text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
          >
            یا مشخصات پروژه را برای سایزبندی بفرستید
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-5 text-[11.5px] leading-6 text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="max-w-3xl">{FOOTER_NOTE}</p>
          <p className="shrink-0">© ۱۴۰۵ freewheel.ir</p>
        </div>
      </div>
    </footer>
  );
}
