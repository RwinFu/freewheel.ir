# freewheel.ir

مرجع فنی فارسی و راست‌به‌چپ برای فری‌ویل و کلاچ یک‌طرفهٔ صنعتی. پروژهٔ Next.js در همین پوشه، سایت اصلی است و صفحهٔ اول آن از مسیر `/` ارائه می‌شود.

این سایت فقط معرفی و توضیح است: سازوکار، انواع، کاربردها، کاتالوگ سری‌ها و راهنمای انتخاب. خرید و استعلام قیمت در `bearingonline.ir` انجام می‌شود و پروژه‌های نوار نقاله در `persiarobot.ir`؛ این‌جا هیچ تراکنش یا سبد خریدی وجود ندارد.

## اجرا

نیازمندی‌ها: Node.js 22+ و npm.

```bash
npm ci
npm run dev
```

برای ساخت نسخهٔ production و اجرای آن:

```bash
npm run build
npm start -- -H 0.0.0.0 -p 3000
```

برای دیدن سایت روی دستگاه دیگر، آن دستگاه باید به سرور دسترسی شبکه داشته باشد؛ `localhost` فقط روی دستگاه خودتان کار می‌کند. لینک پیش‌نمایش محیط توسعه موقت است و جای استقرار پایدار روی دامنهٔ `freewheel.ir` را نمی‌گیرد.

بررسی کد:

```bash
npm run lint
npm run typecheck   # اول next typegen، بعد tsc --noEmit
npm run build
```

> `next-env.d.ts` را پاک نکنید؛ همین فایل تایپ‌های ماژول‌های تصویر (`*.jpg`) و مسیرها را به TypeScript می‌دهد. اگر نبود، با `npm run typegen` دوباره ساخته می‌شود.

## طراحی و اسکیل‌ها

اسکیل‌های طراحی در `.claude/skills/` نصب شده‌اند. پوشهٔ `.claude` طبق `.gitignore`
محلی است، اما فهرست اسکیل‌ها در `skills-lock.json` کامیت می‌شود؛ برای بازساختنشان
روی هر ماشینی:

```bash
npx skills@latest experimental_install   # از روی skills-lock.json
npx skills@latest add <repo> --skill <name>   # یا نصب دستی هر اسکیل
```


| اسکیل | منبع | استفاده در این پروژه |
| --- | --- | --- |
| `frontend-design` | anthropics/skills | جهت‌گیری زیبایی‌شناسی و پرهیز از الگوهای تکراری |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | چک‌لیست UX، کنتراست، رفتار موبایل |
| `web-design-guidelines` | vercel-labs/agent-skills | بازبینی دسترس‌پذیری و کیفیت رابط |
| `vercel-react-best-practices` | vercel-labs/agent-skills | الگوهای کارایی React/Next |
| `emil-design-eng` | emilkowalski/skills | جزئیات تعامل، تایمینگ و حس نهایی |
| `review-animations` | emilkowalski/skills | بازبینی موشن |

نکات سیستم طراحی:

- رنگ‌ها معنا دارند: `mint`/`accent` = یعنی حالت آزاد و کنش اصلی، `coral`/`lock` =
  یعنی درگیری و هشدار، `ocean` = سطح سازه و تیتر.
- تیترها با برش نمایشی وزیرمتن (`Vazirmatn-Display.woff2`) و متن‌ها با برش
  متنی (`Vazirmatn-Text.woff2`) — هر دو محلی، بدون وابستگی به فونت آنلاین.
- کدهای لاتین قطعه با کلاس `code` نمایش داده می‌شوند (جهت ایزوله + ارقام ثابت) تا
  در جمله‌ی فارسی شکسته نشوند.
- تصاویر قطعات در `src/assets/images/product/` **رندر شبیه‌سازی‌شده** هستند، نه
  عکس قطعه‌ی واقعی؛ برای شناختن اجزا خوب‌اند و در `FOOTER_NOTE` هم صریح گفته شده
  که برای تطبیق ظاهری باید عکس قطعه‌ی مشتری بررسی شود.
- جدول گشتاور در کاتالوگ روی مقیاس لگاریتمی رسم می‌شود؛ روی مقیاس خطی، فاصله‌ی
  ۴۲۰ تا ۵۰۳٫۵۵۰ نیوتن‌متر همه‌چیز را در یک نقطه جمع می‌کرد.

## فناوری‌ها

- Next.js App Router، React و TypeScript
- Tailwind CSS v4، GSAP/ScrollTrigger و Lenis
- توکن‌های طراحی در `src/app/globals.css` (`@theme`) و کامپوننت‌های مشترک در
  `src/components/ui.tsx`
- فونت Vazirmatn به‌صورت محلی در `public/fonts/`
- تصاویر کاربردها از `src/assets/images/` و تصاویر سری‌های کاتالوگ از
  `src/assets/images/product/` (فایل محلی؛ بهینه‌سازی تصویر به میزبان بیرونی وابسته نیست)
- Drizzle ORM و PostgreSQL برای APIهای جستجو و ثبت درخواست

## پایگاه داده

صفحه‌ها و جست‌وجوی کاتالوگ بدون دیتابیس هم کار می‌کنند: `/api/search` اگر `DATABASE_URL` تنظیم نباشد (یا دیتابیس جواب ندهد) همان کاتالوگ ایستای `src/content/ringspann.ts` را می‌گردد و نتیجهٔ یکسان با جدول‌های سایت می‌دهد. `/api/health` در این حالت `database: not-configured` و `search: catalog` می‌دهد.

فقط ثبت فرم‌ها به دیتابیس نیاز دارد. بدون آن، `/api/inquiry` عدد `503` با پیام فارسی و مسیر جایگزین (فروشگاه آنلاین) برمی‌گرداند و فرم همان را به کاربر نشان می‌دهد؛ هیچ درخواستی بی‌سروصدا گم نمی‌شود.

نمونهٔ متغیرها را در `.env.example` ببینید.

مسیرهای API:

- `GET /api/health`
- `GET /api/search?q=...`
- `POST /api/inquiry`

## انتشار عمومی

سایت کاملِ Next.js با APIهای جست‌وجو و ثبت درخواست روی میزبانی Node.js اجرا می‌شود. برای ثبت واقعی فرم‌ها، `DATABASE_URL` و PostgreSQL لازم است.

برای نمایش عمومی سایت روی GitHub Pages، یک **نسخهٔ نمایشی استاتیک** جدا بسازید:

```bash
npm run build:pages
```

خروجی در `pages-out/` است و با مسیر پایهٔ `/freewheel.ir` برای آدرس `https://rwinfu.github.io/freewheel.ir/` ساخته می‌شود. این دستور، APIهای سرور را فقط در پوشهٔ موقت ساخت کنار می‌گذارد و برنامهٔ اصلی را تغییر نمی‌دهد. جست‌وجوی کاتالوگ در نسخهٔ نمایشی داخل مرورگر انجام می‌شود؛ فرم درخواست در آن نمایش داده نمی‌شود و به‌جایش لینک فروشگاه و هشدار روشن وجود دارد تا اطلاعات کاربران گم نشود.

ورک‌فلو پس از هر push به `main`، نسخهٔ نمایشی را روی Pages منتشر می‌کند. برای انتشار دستی یک شاخهٔ بررسی‌شده، Workflow با نام «Validate and deploy site» را از تب Actions همان شاخه اجرا کنید. تا زمانی که Workflow جدید اجرا نشده، ممکن است آدرس Pages همچنان نسخهٔ قبلی را نشان دهد. برای استفاده از دامنهٔ `freewheel.ir` جداگانه باید DNS و تنظیمات دامنهٔ میزبان آماده شود.

## ابزارهای بررسی (اختیاری)

اسکریپت‌های `scripts/shoot.mjs`، `scripts/slices.mjs` و `scripts/probe.mjs` برای گرفتن اسکرین‌شات و سنجش سرریز افقی هستند و به این دو بسته نیاز دارند (در `devDependencies` نیستند):

```bash
npm i -D @sparticuz/chromium puppeteer-core
node scripts/shoot.mjs /contact
```
