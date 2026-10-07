import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * ترنزیشن جهت‌دار بین صفحه‌ها با View Transition API بومی مرورگر.
 *
 * نکته‌ی راست‌به‌چپ: سایت `dir="rtl"` است، پس «رفتن به عمق» (nav-forward)
 * باید از سمت چپ وارد شود و صفحه‌ی قبلی به سمت راست برود — برعکس LTR.
 * آفست‌ها در `globals.css` روی همین نام کلاس‌ها بسته شده‌اند.
 *
 * `default="none"` عمدی است: در App Router هر کلیک لینک یک Transition است و
 * بدون آن، همه‌ی ViewTransitionها روی هر ناوبری cross-fade پیش‌فرض مرورگر را
 * اجرا می‌کنند و با هم تداخل می‌کنند.
 *
 * این کامپوننت هیچ DOM اضافه‌ای نمی‌سازد؛ `<ViewTransition>` باید اولین گره
 * خروجی صفحه باشد تا enter/exit فعال شود (قانون جای‌گذاری در skill).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "page-enter-forward",
        "nav-back": "page-enter-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "page-exit-forward",
        "nav-back": "page-exit-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

/**
 * morph اشتراک عنصر بین دو صفحه (مثلاً تصویر کارت → تصویر بزرگ صفحه‌ی جزئیات).
 * `name` باید در هر دو صفحه یکی و یکتا باشد.
 *
 * `<ViewTransition>` پراپ `className` ندارد؛ استایل را روی عنصر داخلش بگذارید.
 */
export function SharedElement({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * morph متن بین دو صفحه (مثلاً عنوان کارت → عنوان صفحه‌ی مقاله).
 *
 * متن جدا از تصویر است: snapshot قدیمی raster است و اگر بزرگ شود «شبح»
 * می‌اندازد، پس `text-morph` قدیمی را پنهان می‌کند و متن جدید را با وضوح
 * کامل نشان می‌دهد (در `globals.css`).
 */
export function SharedText({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="text-morph" default="none">
      {children}
    </ViewTransition>
  );
}
