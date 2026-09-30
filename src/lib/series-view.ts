import type { CatalogItem } from "@/components/catalog-explorer";
import { RINGSPANN_SERIES, type Series } from "@/content/ringspann";

/**
 * نگاشت محتوای کاتالوگ به شکل نمایشی.
 *
 * فقط در سرور استفاده می‌شود: تصاویر محصول اینجا به مسیر تبدیل می‌شوند تا
 * کلاینت، داده‌ی سنگین `StaticImageData` را دریافت نکند.
 */
export function toCatalogItem(series: Series): CatalogItem {
  const torques = series.sizes.map((size) => size.torqueNm);
  return {
    slug: series.slug,
    designation: series.designation,
    family: series.family,
    element: series.element,
    shape: series.shape,
    short: series.short,
    tagline: series.tagline,
    // سری‌های بدون جدول سایز، فقط سقف اعلام‌شده را دارند؛ برای همین یک نقطه‌اند.
    minTorqueNm: torques.length > 0 ? Math.min(...torques) : series.maxTorqueNm,
    maxTorqueNm: series.maxTorqueNm,
    maxBoreMm: series.maxBoreMm,
    sizeCount: series.sizes.length,
    imageSrc: series.image.src.src,
    imageAlt: series.image.alt,
  };
}

export const CATALOG_ITEMS: CatalogItem[] = RINGSPANN_SERIES.map(toCatalogItem);

/** کف و سقف مقیاس گشتاور برای نمودارهای مقایسه‌ای. */
export const TORQUE_SCALE = {
  min: Math.min(...RINGSPANN_SERIES.map((series) => (series.sizes[0]?.torqueNm ?? series.maxTorqueNm))),
  max: Math.max(...RINGSPANN_SERIES.map((series) => series.maxTorqueNm)),
} as const;
