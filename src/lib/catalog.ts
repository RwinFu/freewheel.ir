import { RINGSPANN_SERIES } from "@/content/ringspann";
import { anchorId } from "@/lib/utils";

export type CatalogEntry = {
  brand: string;
  designation: string;
  seriesSlug: string;
  seriesName: string;
  boreMm: number | null;
  torqueNm: number | null;
  speedInner: number | null;
  speedOuter: number | null;
  outerDiameterMm: number | null;
  widthMm: number | null;
  weightKg: number | null;
  href: string;
};

/**
 * فهرست جست‌وجو از همان محتوای کاتالوگ صفحه‌ها ساخته می‌شود. این‌طوری جست‌وجو
 * حتی وقتی پایگاه داده تنظیم نشده یا در دسترس نیست هم کار می‌کند و نتیجه‌اش با
 * جدول‌های روی سایت یکسان است.
 */
export const CATALOG: CatalogEntry[] = RINGSPANN_SERIES.flatMap((series) =>
  series.sizes.map((size) => ({
    brand: "RINGSPANN",
    designation: size.designation,
    seriesSlug: series.slug,
    seriesName: `RINGSPANN ${series.designation}`,
    boreMm: size.bore,
    torqueNm: size.torqueNm,
    speedInner: size.speedInner,
    speedOuter: size.speedOuter,
    outerDiameterMm: size.outerDiameter,
    widthMm: size.width,
    weightKg: size.weightKg,
    href: `/ringspann/${series.slug}#${anchorId(size.designation)}`,
  })),
);

/** ارقام فارسی/عربی را به لاتین برمی‌گرداند تا «۴۵» و «45» یکسان دیده شوند. */
function toLatinDigits(value: string): string {
  return value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (digit) =>
    String(digit.charCodeAt(0) & 0xf),
  );
}

/** فاصله، خط تیره و نویسه‌های تزئینی را حذف می‌کند: «FGR 45 R» → «fgr45r». */
function compact(value: string): string {
  return toLatinDigits(value)
    .toLowerCase()
    .replace(/[\s\u200c\u200f_\-–—.…/\\]+/g, "");
}

function digitsOf(value: string): string {
  return toLatinDigits(value).replace(/\D+/g, "");
}

type Scored = { entry: CatalogEntry; score: number };

/**
 * جست‌وجوی ساده و قابل‌پیش‌بینی روی کاتالوگ:
 * کد کامل قطعه، بخشی از کد (fgr 45)، یا قطر سوراخ (۴۵ / 45 mm).
 */
export function searchCatalog(query: string, limit = 12): CatalogEntry[] {
  const term = query.trim();
  if (term.length < 2) return [];

  const needle = compact(term);
  const needleDigits = digitsOf(term);
  const scored: Scored[] = [];

  for (const entry of CATALOG) {
    const designation = compact(entry.designation);
    let score = Number.POSITIVE_INFINITY;

    if (needle.length >= 2 && designation.includes(needle)) {
      score = designation === needle ? 0 : 1 + (designation.length - needle.length) / 100;
    } else if (needleDigits.length >= 2 && entry.boreMm !== null) {
      const bore = String(entry.boreMm);
      if (needleDigits === bore) score = 2;
      else if (designation.includes(needleDigits)) score = 3;
      else if (bore.startsWith(needleDigits) || bore.endsWith(needleDigits)) score = 4;
    }

    if (!Number.isFinite(score)) continue;
    scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => a.score - b.score || (a.entry.boreMm ?? 0) - (b.entry.boreMm ?? 0))
    .slice(0, limit)
    .map((item) => item.entry);
}
