"use client";

// مرز خطای ناحیه — اولین جایی که خطای زمان رندر صفحه‌ها گرفته می‌شود.
// در Next.js 16 امضای مرز خطا است: { error: unknown, retry }.
import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // خطا کنسول می‌شود تا در لاگ سمت مشتری قابل ردیابی باشد؛
    // جزئیات به کاربر نمایش داده نمی‌شود.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <p className="text-[13px] text-fg-dim">خطا</p>
      <h1 className="text-2xl font-bold text-fg">مشکلی پیش آمد</h1>
      <p className="text-[15px] leading-8 text-fg-muted">
        صفحه درست بارگذاری نشد. معمولاً با یک تلاش دوباره درست می‌شود؛ اگر نشد،
        بعداً سر بزنید یا از صفحه‌ی نخست شروع کنید.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="rounded-full border border-line bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
        >
          تلاش دوباره
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-fg transition-colors hover:bg-panel-2"
        >
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}
