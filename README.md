# freewheel.ir

مرجع تخصصی و راهنمای خرید کلاچ یک‌طرفه (فری‌ویل) — فارسی، راست‌به‌چپ.

مرجع اصلی محتوا سری **Ringspann R** (فری‌ویل کامل رولری با فلنج نصب، `FGR … R A1A2`)
است؛ سایر برندها به‌عنوان مقایسه در کنار آن آمده‌اند. اعداد و ابعاد از کاتالوگ
رینگسپان گرفته شده‌اند، نه از حدس.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- GSAP / ScrollTrigger برای ریل‌ویل و بخش چسبانده، Motion برای بقیه
- Lenis برای اسکرول نرم
- فونت Vazirmatn به‌صورت self-hosted و subset (بدون Google Fonts)

## Scripts

| فرمان | کار |
| --- | --- |
| `npm run dev` | سرور توسعه |
| `npm run build` / `npm start` | بیلد و اجرای نسخهٔ تولید |
| `npm run lint` | ESLint |
| `npm run font` | ساخت دوبارهٔ subset فونت (`scripts/build-font.mjs`) |
| `npm run serve` | بیلد + ری‌استارت سرور روی پورت ۳۰۰۰ |
| `npm run shoot` | اسکن خودکار همهٔ مسیرها در دو ویوپورت (`screens/report.json`) |
| `npm run slices` | اسکرین‌شات تکه‌به‌تکه برای بازبینی چشمی |
| `node scripts/probe.mjs <route> <width>` | پیدا کردن عنصری که سرریز افقی می‌سازد |

ابزارهای `shoot` / `slices` / `probe` به `@sparticuz/chromium` نیاز دارند؛ خروجی
`screens/` در گیت نیست.

## ساختار

- `src/app/` — مسیرها؛ مدل‌های رینگسپان با `generateStaticParams` به‌صورت SSG
- `src/components/visual/` — نقشه‌های فنی SVG (هیرو، سه نوع کلاچ، چرخهٔ کاری، ابعاد)
- `src/components/sections/` — بخش‌های محتوایی
- `src/data/` — کاتالوگ، برندها، کاربردها، مقالات
- `src/lib/utils.ts` — قالب‌بندی عدد و تاریخ

## نکته‌های محتوا

- قیمت و خرید واقعی روی `bearingonline.ir` انجام می‌شود؛ طراحی و ارتقای سیستم
  نقاله با `persiarobot.ir`. لینک هر دو در `ShopRoute` متمرکز است.
- آدرس و تلفن فوتر عمداً `[آدرس واقعی]` است و باید توسط صاحب سایت پر شود.
- ارقام با ارقام لاتین و `tabular-nums` نوشته می‌شوند؛ ترکیب عدد فارسی با واحد
  لاتین داخل متن راست‌به‌چپ با کلاس `.num` ایزوله می‌شود تا ترتیب بصری به هم نریزد.
