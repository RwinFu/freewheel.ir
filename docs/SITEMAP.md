# نقشه‌ی سایت freewheel.ir — Sitemap

> دامنه‌ی اصلی: `https://freewheel.ir` — پیش‌نمایش GH Pages: `https://rwinfu.github.io/freewheel.ir/`  
> تولید خودکار: `src/app/sitemap.ts` (داینامیک از `SITE.url` + محتوای statik)  
> آخرین به‌روزرسانی: ۱۴۰۴/۰۸/۰۲ — ۴۳ مسیر استاتیک + ۳ API

---

## ۱) نمای کلی درختی (ASCII)

```
freewheel.ir (priority 1.0)
│
├─ / (خانه — page.tsx)
│   ├─ #intro          → معرفی کوتاه + Hero سینمایی
│   ├─ #mechanism      → سازوکار سه‌حالته (HowItWorks + AxisFreewheel)
│   ├─ #story          → داستان پروژه: نوار ۱۲۰متری
│   ├─ #applications   → ۶ کاربرد (نمای افقی)
│   ├─ #families       → خانواده‌های RINGSPANN
│   ├─ #drive-system   → چیدمان درایو (۶ قطعه‌ی شماره‌دار)
│   └─ #faq            → پرسش‌های پرتکرار
│
├─ /ringspann (priority 0.9) — فهرست سری‌های RINGSPANN
│   ├─ /ringspann/fgr-r    (0.95) ★ پربازدید — FGR … R پایه رولری
│   ├─ /ringspann/fz       (0.75) — FZ داخلی
│   ├─ /ringspann/bm-r     (0.75) — BM … R کامل
│   ├─ /ringspann/fb       (0.75) — FB کامل اسپراگ
│   ├─ /ringspann/frhn     (0.75) — FRHN بک‌استاپ اهرمی
│   ├─ /ringspann/fkh      (0.75) — FKh لیفت‌آف هیدرودینامیک
│   ├─ /ringspann/fa-fav   (0.75) — FA / FAV با اهرم
│   ├─ /ringspann/fw       (0.75) — FW گریزازمرکز
│   ├─ /ringspann/er       (0.75) — ER داخلی رولری
│   ├─ /ringspann/fxm      (0.75) — FXM حلقه‌ای
│   ├─ /ringspann/fso      (0.75) — FSO قفل‌دار
│   └─ /ringspann/sm       (0.75) — SM / SMP ایندکسینگ
│
├─ /brands (0.8) — برندها
│   ├─ /brands/ringspann (0.85) — RINGSPANN اصلی
│   ├─ /brands/ina       (0.6) — INA کاپ کشیده
│   ├─ /brands/skf       (0.6) — SKF
│   ├─ /brands/stieber   (0.6) — Stieber
│   ├─ /brands/koyo      (0.6) — Koyo
│   ├─ /brands/luk       (0.6) — LUK انتقال قدرت
│   └─ /brands/niko      (0.6) — NIKO
│
├─ /applications (0.8) — کاربردها
│   ├─ /applications/conveyor  (0.7) — نوار نقاله و بک‌استاپ ★
│   ├─ /applications/textile   (0.7) — نساجی و ریسندگی
│   ├─ /applications/food      (0.7) — صنایع غذایی
│   ├─ /applications/packaging (0.7) — بسته‌بندی
│   ├─ /applications/printing  (0.7) — چاپ و کاغذ
│   └─ /applications/mining    (0.7) — معدن و سنگ‌شکن
│
├─ /articles (0.8) — مقالات فنی
│   ├─ /articles/sprag-vs-roller          (0.7) — اسپراگ vs رولری
│   ├─ /articles/freewheel-sizing          (0.7) — سایزبندی
│   ├─ /articles/why-textile-conveyor-burned (0.7) — چرا نوار نساجی سوخت
│   ├─ /articles/lift-off-explained        (0.7) — لیفت‌آف چیست
│   └─ /articles/backstop-mounting         (0.7) — نصب بک‌استاپ
│
├─ /media (0.6) — فیلم و گیف پروژه (public/media/*.webm|mp4|poster)
├─ /about (0.5) — درباره ما
├─ /contact (0.6) — تماس و فرم استعلام
│
├─ /sitemap.xml (داینامیک — از sitemap.ts)
├─ /robots.txt  (allow: /, host: freewheel.ir, sitemap: /sitemap.xml)
├─ /opengraph-image (داینامیک — 1200×630)
└─ /icon.svg + /favicon.ico

API (فقط روی هاست Node.js — در GH Pages حذف می‌شود)
├─ GET  /api/health  → { database: "ok|not-configured", search: "db|catalog" }
├─ GET  /api/search?q=...  → جستجوی کاتالوگ (DB یا catalog fallback)
└─ POST /api/inquiry  → ثبت فرم (503 اگر DB نباشد + لینک فروشگاه)
```

---

## ۲) جدول کامل مسیرها با اولویت (از sitemap.ts)

| URL | priority | changeFrequency | منبع داده |
|---|---|---|---|
| `/` | 1.0 | monthly | staticRoutes |
| `/ringspann` | 0.9 | monthly | staticRoutes |
| `/ringspann/fgr-r` | **0.95** | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fz` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/bm-r` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fb` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/frhn` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fkh` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fa-fav` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fw` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/er` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fxm` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/fso` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/ringspann/sm` | 0.75 | monthly | `RINGSPANN_SERIES` |
| `/brands` | 0.8 | monthly | staticRoutes |
| `/brands/ringspann` | 0.85 | monthly | `BRANDS` |
| `/brands/ina` | 0.6 | monthly | `BRANDS` |
| `/brands/skf` | 0.6 | monthly | `BRANDS` |
| `/brands/stieber` | 0.6 | monthly | `BRANDS` |
| `/brands/koyo` | 0.6 | monthly | `BRANDS` |
| `/brands/luk` | 0.6 | monthly | `BRANDS` |
| `/brands/niko` | 0.6 | monthly | `BRANDS` |
| `/applications` | 0.8 | monthly | staticRoutes |
| `/applications/conveyor` | 0.7 | monthly | `APPLICATIONS` |
| `/applications/textile` | 0.7 | monthly | `APPLICATIONS` |
| `/applications/food` | 0.7 | monthly | `APPLICATIONS` |
| `/applications/packaging` | 0.7 | monthly | `APPLICATIONS` |
| `/applications/printing` | 0.7 | monthly | `APPLICATIONS` |
| `/applications/mining` | 0.7 | monthly | `APPLICATIONS` |
| `/articles` | 0.8 | monthly | staticRoutes |
| `/articles/sprag-vs-roller` | 0.7 | yearly | `ARTICLES` |
| `/articles/freewheel-sizing` | 0.7 | yearly | `ARTICLES` |
| `/articles/why-textile-conveyor-burned` | 0.7 | yearly | `ARTICLES` |
| `/articles/lift-off-explained` | 0.7 | yearly | `ARTICLES` |
| `/articles/backstop-mounting` | 0.7 | yearly | `ARTICLES` |
| `/media` | 0.6 | monthly | staticRoutes |
| `/about` | 0.5 | yearly | staticRoutes |
| `/contact` | 0.6 | yearly | staticRoutes |

**جمع:** ۳۸ URL در sitemap + ۳ API + ۲ متا = ۴۳ route تولیدشده در build.

---

## ۳) ناوبری (NAV) — همان که هدر می‌بیند

```ts
// src/content/site.ts → NAV
RINGSPANN → ۷ فرزند (FGR … R، FZ، BM … R، FB، FRHN، FKh، FA/FAV)
برندها   → ۷ فرزند (RINGSPANN، INA، SKF، Stieber، Koyo، LUK، NIKO)
کاربردها → ۶ فرزند (نوار نقاله، نساجی، غذایی، بسته‌بندی، چاپ، معدن)
مقالات فنی
درباره ما
تماس
```

هدر موبایل همین ساختار را به‌صورت `Sheet` با دکمه‌ی `Menu/X` نمایش می‌دهد؛ `Esc` می‌بندد، `aria-label` دارد.

---

## ۴) دسته‌بندی (Taxonomy) — لایه‌ی هوشمند روی محتوا

| صفحه | دسته‌ها | آیکون / لحن |
|---|---|---|
| `/applications` | بک‌استاپ (coral)، ایندکسینگ (mint)، اورانینگ (steel) | `taxonomy.ts → APPLICATION_CATEGORIES` |
| `/ringspann` | پایه و داخلی (steel)، کامل و آب‌بندی (mint)، با اهرم (coral)، لیفت‌آف (ocean) | `SERIES_CATEGORIES` |
| `/brands` | کاپ کشیده (steel)، بلبرینگ‌ساز جامع (mint)، انتقال قدرت خودرو (coral) | `BRAND_CATEGORIES` |

اگر slug جدیدی بدون دسته اضافه شود، `categoryOf()` در build خطا می‌دهد — نه پیش کاربر.

---

## ۵) فایل‌های مرتبط

- `src/app/sitemap.ts` — منبع حقیقت (داینامیک)
- `src/app/robots.ts` — robots.txt
- `src/content/site.ts` — NAV، SHOPS، CONTACT، SITE.url
- `src/content/*.ts` — تعریف محتوا (RINGSPANN_SERIES، BRANDS، APPLICATIONS، ARTICLES)
- `public/media/` — ویدیو و پوسترهای محلی (webm/mp4/webp)
- `public/cutouts/` — کات‌اوت‌های قطعات (لایه‌های axis-freewheel)
- `public/fonts/` — Vazirmatn لوکال

---

## ۶) مشاهده‌ی بصری

فایل `public/sitemap-visual.html` یک نقشه‌ی تعاملی است — آن را در مرورگر باز کنید یا `npm run dev` را اجرا کنید و به `/sitemap-visual.html` بروید.
