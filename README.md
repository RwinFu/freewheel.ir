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
npm run typecheck   # اول next typegen، بعد tsc --noEmit
npm run build
```

> `next-env.d.ts` را پاک نکنید؛ همین فایل تایپ‌های ماژول‌های تصویر (`*.jpg`) و مسیرها را به TypeScript می‌دهد. اگر نبود، با `npm run typegen` دوباره ساخته می‌شود.

## فناوری‌ها

- Next.js App Router، React و TypeScript
- Tailwind CSS v4، GSAP/ScrollTrigger، Motion و Lenis
- فونت Vazirmatn به‌صورت محلی در `public/fonts/`
- تصاویر صفحات کاربرد از `src/assets/images/` (فایل محلی؛ بهینه‌سازی تصویر به میزبان بیرونی وابسته نیست)
- Drizzle ORM و PostgreSQL برای APIهای جستجو و ثبت درخواست

## پایگاه داده

صفحه‌ها و جست‌وجوی کاتالوگ بدون دیتابیس هم کار می‌کنند: `/api/search` اگر `DATABASE_URL` تنظیم نباشد (یا دیتابیس جواب ندهد) همان کاتالوگ ایستای `src/content/ringspann.ts` را می‌گردد و نتیجهٔ یکسان با جدول‌های سایت می‌دهد. `/api/health` در این حالت `database: not-configured` و `search: catalog` می‌دهد.

فقط ثبت فرم‌ها به دیتابیس نیاز دارد. بدون آن، `/api/inquiry` عدد `503` با پیام فارسی و مسیر جایگزین (فروشگاه آنلاین) برمی‌گرداند و فرم همان را به کاربر نشان می‌دهد؛ هیچ درخواستی بی‌سروصدا گم نمی‌شود.

نمونهٔ متغیرها را در `.env.example` ببینید.

مسیرهای API:

- `GET /api/health`
- `GET /api/search?q=...`
- `POST /api/inquiry`

## استقرار

این نسخه از Next.js از APIهای Node.js و PostgreSQL استفاده می‌کند و خروجی استاتیک GitHub Pages نیست. برای انتشار عمومی به میزبانی سازگار با Next.js/Node و تنظیم `DATABASE_URL` نیاز است. تا مشخص شدن مقصد استقرار، ورک‌فلو فقط lint، typecheck و build را اعتبارسنجی می‌کند و deploy انجام نمی‌دهد.

## ابزارهای بررسی (اختیاری)

اسکریپت‌های `scripts/shoot.mjs`، `scripts/slices.mjs` و `scripts/probe.mjs` برای گرفتن اسکرین‌شات و سنجش سرریز افقی هستند و به این دو بسته نیاز دارند (در `devDependencies` نیستند):

```bash
npm i -D @sparticuz/chromium puppeteer-core
node scripts/shoot.mjs /contact
```
