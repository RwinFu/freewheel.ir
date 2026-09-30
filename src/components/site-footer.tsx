import Link from "next/link";
import { MoveUpLeft } from "lucide-react";

import { FOOTER_NOTE, SHOPS } from "@/content/site";

const FOOTER_LINKS = [
  { href: "/ringspann", label: "مدل‌ها و کاتالوگ" },
  { href: "/applications", label: "کاربردهای صنعتی" },
  { href: "/brands", label: "برندها" },
  { href: "/articles", label: "راهنما و مقاله‌ها" },
  { href: "/about", label: "درباره‌ی مرجع" },
  { href: "/contact", label: "تماس و استعلام" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ocean text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-14 md:px-8 md:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="صفحه‌ی اصلی freewheel.ir">
            <span className="grid h-10 w-10 place-items-center rounded-[13px] border border-white/15 bg-white/5">
              <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
                <circle cx="20" cy="20" r="15" fill="none" stroke="#B8CFD1" strokeWidth="2" />
                <circle cx="20" cy="20" r="8" fill="none" stroke="#72DED2" strokeWidth="2" />
                <path d="M20 4v7M36 20h-7M20 36v-7M4 20h7" stroke="#EE7958" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="2.5" fill="#EE7958" />
              </svg>
            </span>
            <span dir="ltr" className="text-[16px] font-bold tracking-tight text-white">
              freewheel.ir
            </span>
          </Link>
          <p className="mt-5 max-w-md text-[13.5px] leading-7 text-white/70">
            فری‌ویل صنعتی را ساده بشناسید؛ از سازوکار و کاربردها تا مدل‌ها و راهنمای انتخاب.
          </p>
        </div>

        <nav aria-label="لینک‌های مفید">
          <h2 className="text-[13px] font-semibold text-white">برای ادامه</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {FOOTER_LINKS.map((item) => (
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
            برای موجودی و قیمت، مستقیم از فروشگاه آنلاین استعلام بگیرید. برای انتخاب سایز و بررسی پروژه، با ما در تماس باشید.
          </p>
          <a
            href={SHOPS.bearing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-[12.5px] font-semibold text-ocean transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            {SHOPS.bearing.name}
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-5 text-[11.5px] leading-6 text-white/50 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>{FOOTER_NOTE}</p>
          <p className="shrink-0">© ۱۴۰۵ freewheel.ir</p>
        </div>
      </div>
    </footer>
  );
}
