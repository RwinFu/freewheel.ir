/**
 * آدرس فایل‌های داخل `public/`.
 *
 * در حالت عادی سایت از ریشه سرو می‌شود و آدرس همان `/cutouts/x.webp` است.
 * اما نسخه‌ی استاتیک روی GitHub Pages زیر مسیر `/freewheel.ir` منتشر می‌شود؛
 * Next فقط برای ایمپورت‌های ماژولی این پیشوند را می‌گذارد، نه برای رشته‌های
 * دستی. بدون این تابع، فایل‌های `public` روی نسخه‌ی منتشرشده ۴۰۴ می‌شوند.
 *
 * مقدار پیشوند در `next.config.ts` با `env.NEXT_PUBLIC_BASE_PATH` تزریق می‌شود.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  if (!BASE_PATH) return path;
  return `${BASE_PATH}${path}`;
}
