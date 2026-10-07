/**
 * تایپ‌های کانال `canary` ری‌اکت را فعال می‌کند.
 *
 * چرا لازم است: App Router در Next.js نسخه‌ی canary ری‌اکت را داخل خودش
 * bundle می‌کند و `ViewTransition` / `addTransitionType` در زمان اجرا موجودند،
 * ولی `@types/react` این دو را فقط در `react/canary` تعریف کرده و `index.d.ts`
 * آن‌ها را reference نمی‌کند. بدون این فایل، `import { ViewTransition } from "react"`
 * در `tsc --noEmit` خطا می‌دهد در حالی که در build واقعی کار می‌کند.
 *
 * خودِ `react/canary` در زمان اجرا import نمی‌شود؛ فقط تایپ اضافه می‌کند.
 * این reference یک بار در کل پروژه کافی است.
 */
/// <reference types="react/canary" />
