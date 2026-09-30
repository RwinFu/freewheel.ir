import Link from "next/link";

import { APPLICATIONS } from "@/content/applications";
import { CONTACT, FOOTER_NOTE, SHOPS } from "@/content/site";
import { RINGSPANN_SERIES } from "@/content/ringspann";
import { ARTICLES } from "@/content/articles";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#39434c" strokeWidth="1.2" />
                <circle cx="18" cy="18" r="9.5" fill="none" stroke="#39434c" strokeWidth="1.2" />
                <circle cx="18" cy="18" r="3.4" fill="none" stroke="#ff6a13" strokeWidth="1.4" />
              </svg>
              <span dir="ltr" className="text-[15px] font-semibold tracking-tight">
                freewheel.ir
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-7 text-fg-muted">
              این سایت مرجع فنی فری‌ویل و کلچ یک‌سره صنعتی است: مشخصات کاتالوگی، راهنمای انتخاب
              و سایزبندی. خرید و استعلام قیمت در فروشگاه آنلاین انجام می‌شود.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={SHOPS.bearing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-line-2 bg-panel-2 px-4 py-3 transition-colors hover:border-accent/60"
              >
                <span className="text-[13px] text-fg-muted">{SHOPS.bearing.label}</span>
                <span dir="ltr" className="text-[13.5px] font-semibold text-accent">
                  {SHOPS.bearing.name}
                </span>
              </a>
              <a
                href={SHOPS.robot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-line-2 bg-panel-2 px-4 py-3 transition-colors hover:border-accent/60"
              >
                <span className="text-[13px] text-fg-muted">{SHOPS.robot.label}</span>
                <span dir="ltr" className="text-[13.5px] font-semibold text-accent">
                  {SHOPS.robot.name}
                </span>
              </a>
            </div>
          </div>

          <nav aria-label="سری‌های RINGSPANN">
            <h3 className="text-[13px] font-semibold text-fg">RINGSPANN</h3>
            <ul className="mt-4 space-y-2.5">
              {RINGSPANN_SERIES.map((series) => (
                <li key={series.slug}>
                  <Link
                    href={`/ringspann/${series.slug}`}
                    className="text-[13px] text-fg-muted transition-colors hover:text-accent"
                  >
                    <span dir="ltr">{series.designation}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="کاربردها">
            <h3 className="text-[13px] font-semibold text-fg">کاربردها</h3>
            <ul className="mt-4 space-y-2.5">
              {APPLICATIONS.map((application) => (
                <li key={application.slug}>
                  <Link
                    href={`/applications/${application.slug}`}
                    className="text-[13px] text-fg-muted transition-colors hover:text-accent"
                  >
                    {application.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[13px] font-semibold text-fg">مقالات و تماس</h3>
            <ul className="mt-4 space-y-2.5">
              {ARTICLES.slice(0, 3).map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-[13px] text-fg-muted transition-colors hover:text-accent"
                  >
                    {article.title.length > 42 ? `${article.title.slice(0, 42)}…` : article.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/articles" className="text-[13px] text-fg-muted hover:text-accent">
                  همه‌ی مقالات فنی
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-fg-muted hover:text-accent">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-fg-muted hover:text-accent">
                  تماس و استعلام
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-[13px] text-fg-muted hover:text-accent">
                  نقشه‌ی سایت
                </Link>
              </li>
            </ul>

            <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[12.5px] text-fg-muted">
              <div className="flex gap-2">
                <dt className="text-fg-dim">تلفن:</dt>
                <dd dir="ltr" className="tnum">
                  {CONTACT.phone}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-fg-dim">ایمیل:</dt>
                <dd dir="ltr">{CONTACT.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-fg-dim">نشانی:</dt>
                <dd>{CONTACT.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[12.5px] leading-6 text-fg-dim">{FOOTER_NOTE}</p>
          <p className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-fg-dim">
            <span>© ۱۴۰۴ — freewheel.ir</span>
            <span>RINGSPANN® نشان ثبت‌شده‌ی RINGSPANN GmbH است؛ این سایت فروش رسمی آن نیست.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
