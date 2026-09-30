import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-24">
      <div className="border border-line bg-panel p-10">
        <span className="tnum text-[12px] tracking-[0.14em] text-accent" dir="ltr">
          404
        </span>
        <h1 className="mt-4 text-[28px] leading-tight text-fg sm:text-[34px]">
          این صفحه در نقشه نیست.
        </h1>
        <p className="mt-4 max-w-xl text-[14.5px] leading-8 text-fg-muted">
          آدرس عوض شده یا اشتباه تایپ شده. از این‌جا می‌توانید به جدول مشخصات سری‌ها یا فهرست
          مقالات بروید.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/ringspann"
            className="bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
          >
            سری‌های RINGSPANN
          </Link>
          <Link
            href="/"
            className="border border-line-2 px-5 py-3 text-[14px] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            صفحه‌ی اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
