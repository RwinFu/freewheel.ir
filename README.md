# freewheel.ir

مرجع فنی فارسی و راست‌به‌چپ برای فری‌ویل و کلاچ یک‌طرفهٔ صنعتی. سورس اصلی رابط و مسیرهای سایت از آرشیو `industrial-freewheel-website-development.zip` استخراج شده است.

## اجرا

نیازمندی‌ها: Node.js 22+ و npm.

```bash
npm ci
npm run dev
```

برای ساخت نسخهٔ production و اجرای آن:

```bash
npm run build
npm start
```

بررسی کد:

```bash
npm run lint
npm run typecheck
```

## فناوری‌ها

- Next.js App Router، React و TypeScript
- Tailwind CSS v4، GSAP/ScrollTrigger، Motion و Lenis
- فونت Vazirmatn به‌صورت محلی در `public/fonts/`
- Drizzle ORM و PostgreSQL برای APIهای جستجو و ثبت درخواست

## پایگاه داده

صفحه‌های محتوایی بدون دیتابیس هم اجرا می‌شوند. برای فعال شدن جستجو و ثبت فرم‌ها، متغیر `DATABASE_URL` را به یک PostgreSQL قابل‌دسترسی تنظیم کنید. در نبود دیتابیس، `/api/health` وضعیت `database: down` می‌دهد و APIهای وابسته به دیتابیس کار نمی‌کنند.

مسیرهای API:

- `GET /api/health`
- `GET /api/search?q=...`
- `POST /api/inquiry`

## استقرار

این نسخه از Next.js از APIهای Node.js و PostgreSQL استفاده می‌کند و خروجی استاتیک GitHub Pages نیست. برای انتشار عمومی به میزبانی سازگار با Next.js/Node و تنظیم `DATABASE_URL` نیاز است. تا مشخص شدن مقصد استقرار، ورک‌فلو فقط lint، typecheck و build را اعتبارسنجی می‌کند و deploy انجام نمی‌دهد.
