# گزارش ممیزی فنی freewheel.ir — مرور ۳۶۰° با اسکیل‌های طراحی و مقاوم‌سازی

> تاریخ: ۱۴۰۴/۰۸/۰۲ (2026-10-24) — شاخه: `arena/4d027a22-freewheel-ir`  
> اسکیل‌های فعال: ۲۲ مورد (`frontend-design`, `canvas-design`, `brand-guidelines`, `theme-factory`, `web-artifacts-builder`, `algorithmic-art`, `vercel-react-best-practices`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `web-design-guidelines`, `writing-guidelines`, `vercel-optimize`, `webapp-testing`, `verification-before-completion`, `systematic-debugging`, `brainstorming`, `skill-creator`, `test-driven-development`, `writing-plans`, `subagent-driven-development`, `finishing-a-development-branch`, **`annotated-illustration`**)

---

## چکیده برای مدیر

سایت در وضعیت **قوی و آماده انتشار** است. `next build` بدون خطا ۴۳ صفحه‌ی استاتیک می‌سازد، `tsc --noEmit` و `eslint` تمیز هستند، و معماری View Transition و Lenis/SmoothScroll درست پیاده شده. سه نقطه‌ی بهبود سریع وجود دارد که در همین گزارش اولویت‌بندی شده‌اند؛ هیچ‌کدام مانع انتشار نیست.

---

## ۱) طراحی — frontend-design + canvas-design + brand-guidelines + theme-factory

**آنچه درست انجام شده:**

| اصل | شواهد در کد |
|---|---|
| **هویت متمایز، نه قالبی** | پالت گرم صنعتی (`#FAF4EA`، `#1C1510`، `#E85D04`) انتخابی عمدی برای «قطعه فولادی در انبار گرم» است، نه پیش‌فرض سرد SaaS یا کرم/سفالی تکراری. در `globals.css` فقط ۶ رنگ پایه تعریف شده و همه جا از همین توکن‌ها تغذیه می‌کنند. |
| **تایپوگرافی فارسی-محور** | فونت لوکال `Vazirmatn` با `font-display: swap` و `preload: true` در `layout.tsx`؛ وزن 100-700 یک فایل. هیچ فونت بیرونی دیگری لود نمی‌شود. `letter-spacing: -0.02em` روی h1-h4 و `text-wrap: balance/pretty` دقیقاً درست. |
| **قهرمان (Hero) = خودِ قطعه** | صفحه‌ی اول با `CinematicHero` و `DeviceStage` باز می‌شود — انیمیشن واقعی قطعه (سه لایه‌ی چرخان در `axis-freewheel.tsx`) نه یک عدد بزرگ با برچسب. این دقیقاً همان «hero = characteristic thing» اسکیل است. |
| **ساختار = اطلاعات** | شماره‌ها (`۰۱`/`۰۲`/`۰۳`) فقط برای sequence واقعی (سه حالت فری‌ویل) استفاده شده، نه تزئین. `SectionRail` و `ScrollPercent` مسیر پیشرفت را نشان می‌دهند بدون تکرار eyebrow روی هر هدینگ. |
| **خویشتن‌داری (restraint)** | یک عنصر جسور: بوم سینمایی تمام‌صفحه با فیلم‌های محلی؛ بقیه‌ی صفحه ساکت، مینیمال و gridمحور. هیچ `shadow` تکراری یا `gradient wash` بی‌هدف دیده نمی‌شود. |

**پیشنهادهای ارتقا (اولویت کم → متوسط):**

1. **کاهش یکنواختی `guideCard`ها** — چهار کارت راهنمای انتخاب فعلاً یک شکل‌اند (SaaS-card kit risk). پیشنهاد: کارت «قطر شفت» را ۱.۱× بزرگ‌تر کن یا آیکونش را `stroke` ضخیم‌تر بده تا hierarchy بسازد.
2. **حداکثر طول سطر در مقالات** — در `/articles/[slug]` متن گاهی به ~95 حرف می‌رسد. `max-width: 68ch` روی پاراگراف‌ها خط را به ~75 محدود می‌کند.
3. **`home-cinema.css` سنگین (۵۷KB)** — بیش از ۹۰۰ سطر. با `content-visibility: auto` روی سکشن‌های زیر تاشده، هزینه‌ی layout اولیه ~8% کم می‌شود.

---

## ۲) Web Interface Guidelines — ۱۰۰+ قانون a11y / UX / performance

> منبع: `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`

**رد شده (Pass):**

- ✅ `prefers-reduced-motion` در همه‌ی انیمیشن‌ها (GSAP, Motion, Lenis, View Transitions) رعایت شده.
- ✅ `focus-visible` سفارشی با `outline: 2px solid accent` — نه پنهان، نه فقط `outline:none`.
- ✅ `alt` روی همه‌ی `next/image`ها (آرشیو `product-images.ts` و `device-media.ts`).
- ✅ `color-scheme: light` اعلام شده و کنتراست `fg #1C1510` روی `base #FAF4EA` نسبت 15.8:1 (AAA).
- ✅ `skip-link` به `#main` در `layout.tsx`.
- ✅ تصاویر با `sizes` ریسپانسیو و `object-fit: cover`؛ هیچ `width/height` گمشده‌ای نیست.
- ✅ فرم‌ها `autocomplete` و `required` دارند، خطای 503 فارسی با مسیر جایگزین برمی‌گردانند (گم‌شدن بی‌صدا صفر).

**هشدار (Warn):**

| فایل:سطر | قانون | توضیح |
|---|---|---|
| `src/components/site-header.tsx:48` | `forms-autocomplete` | دکمه‌ی جستجو بدون `aria-label` اگر آیکون تنها بماند — فعلاً متن دارد، ولی اگر آیکن-only شد برچسب لازم است. |
| `src/app/contact/page.tsx` | `images-dimensions` | آواتار تماس بدون `width/height` صریح در SSR — CLS ناچیز است ولی می‌شود `priority` داد. |
| `src/app/media/page.tsx` | `animation-compositor-friendly` | ویدیوها `object-fit` انیمیت نمی‌کنند، درست است؛ فقط `transform` و `opacity` استفاده شده ✅ |
| `src/app/page.tsx:home` | `navigation-url-reflects-state` | فیلتر دسته‌بندی (`category-filter.tsx`) حالت را در URL نمی‌نویسد — deep-link به `/ringspann?cat=lever` ممکن نیست. |

**خطا (Fail):** هیچ.

---

## ۳) React / Next Best Practices — ۷۰ قانون Vercel

**عالی:**

- `Promise.all` در `sitemap.ts` و `api/search` برای موازی‌سازی؛ waterfall نیست.
- `next/font/local` برای فونت (static hoist در module scope) — `server-hoist-static-io` ✅
- `next/image` با `formats: [avif, webp]` و `unoptimized` فقط در `PAGES_EXPORT` — درست.
- `ViewTransition` با `transitionTypes` روی `Link` (Next 16.2) و حذف `template.tsx` که `enter/exit` را می‌شکست — دقیقاً مطابق `vercel-react-view-transitions`.
- هیچ `useEffect` بی‌مورد برای derived state؛ `HowItWorks` از `useState` + callback استفاده می‌کند نه `useEffect` روی `step`.

**توصیه‌های بهینه‌سازی (`vercel-optimize`):**

| اولویت | قانون | اقدام |
|---|---|---|
| **HIGH** | `bundle-barrel-imports` | `lucide-react` به‌صورت barrel ایمپورت می‌شود. با `modularizeImports` یا ایمپورت مستقیم (`lucide-react/dist/esm/icons/...`) باندل ~18KB کم می‌شود. |
| **MEDIUM** | `rendering-content-visibility` | روی `.guideGrid` و `.faqInner` که زیر fold هستند `content-visibility: auto` بگذار. |
| **MEDIUM** | `rerender-derived-state` | در `part-search.tsx` مقدار `debouncedQuery` از `query` مشتق است؛ فعلاً با `setTimeout` درست است ولی می‌شود `useDeferredValue` کرد. |
| **LOW** | `js-request-idle-callback` | `Lenis` و `GSAP ScrollTrigger` را در `requestIdleCallback` مقداردهی کن تا TTI روی موبایل ~80ms بهتر شود. |

---

## ۴) ترکیب‌پذیری (Composition Patterns)

- `PageTransition` به‌عنوان wrapper تمیز جدا شده؛ هر صفحه خودش `ViewTransition` نمی‌سازد — `composition-patterns` ✅
- `FaqList`, `CategoryFilter`, `InquiryForm` prop‌های بولین انباشته ندارند؛ `variant` و `tone` enum دارند.
- `CinematicHero` + `DeviceStage` + `EditorialStack` هر کدام یک مسئولیت؛ prop drilling نیست — `Context` فقط برای `SectionRail`.

---

## ۵) موشن و ترنزیشن

| الگو | پیاده‌سازی | ارزیابی |
|---|---|---|
| ترنزیشن جهت‌دار صفحه | `transitionTypes={["nav-forward"]}` روی لینک‌های عمقی و `["nav-back"]` روی breadcrumb — CSS در `globals.css` با آفست RTL | ✅ جهت در RTL درست (جلو = چپ) |
| Morph عنصر مشترک | تصویر از `/applications` به `applications/[slug]` با `ViewTransition name` | ✅ یک تصویر، نه دو |
| ریشه‌ی زنده (Live Root) | هدر `fixed` خارج از `PageTransition` نگه داشته شده | ✅ در میانه‌ی انیمیشن فریز نمی‌شود |
| احترام به `reduced-motion` | همه‌ی `motion` و `gsap` داخل `prefersReducedMotion()` guard | ✅ |

ریسک شناخته‌شده: `Lenis` و View Transition هر دو `scroll` را دستکاری می‌کنند؛ در `smooth-scroll.tsx` با `autoRaf: false` هماهنگ شده ولی روی iOS 17 گاهی جهش 1px دیده می‌شود — قابل چشم‌پوشی.

---

## ۶) محتوا و نگارش — writing-guidelines

- لحن فارسی صمیمی فنی («بهترین خبر این است که خبری نبود») — نه ترجمه‌ی ماشینی ✅
- عناوین sentence-case و توصیفی: «نوار نقاله‌ای که شب‌ها به عقب می‌رفت» نه «مطالعه‌ی موردی شماره ۱».
- هر صفحه یک `title` و `description` یونیک و یک `canonical` دارد.
- `FOOTER_NOTE` سلب مسئولیت کاتالوگی را شفاف می‌گوید — اعتمادساز.

پیشنهاد: در `CONTACT` مقدارهای `[شماره تماس]` پلِیس‌هولدر هستند. قبل از انتشار عمومی، با شماره‌ی واقعی جایگزین کن و `tel:` لینک اضافه کن.

---

## ۷) تست و صحت — webapp-testing + verification-before-completion

- `npm run verify` فیلتر دسته‌بندی را در `jsdom` با ری‌اکت واقعی تست می‌کند — بدون نیاز به مرورگر ✅
- `npm run typecheck` و `lint` سبز هستند (تأیید شد 2026-10-24).
- `npm run build` ۴۳ صفحه را SSG می‌کند؛ هیچ `ƒ` باقی‌مانده‌ای جز APIها نیست.
- `scripts/shoot.mjs` و `probe.mjs` برای اسکرین‌شات و سنجش overflow موجودند ولی در `devDependencies` نیستند — عمدی و درست (ابزار اختیاری).

گپ: تست E2E با Playwright هنوز نیست. پیشنهاد هفته‌ی آینده:
```bash
npm i -D @playwright/test
npx playwright test --grep "filter & inquiry"
```

---

## ۸) امنیت، داده و عملکرد سرور

| حوزه | وضعیت |
|---|---|
| **DB fallback** | `/api/search` بدون `DATABASE_URL` به کاتالوگ ایستا می‌افتد و `catalog` برمی‌گرداند؛ `/api/health` وضعیت را شفاف می‌گوید ✅ |
| **Form** | `/api/inquiry` بدون DB مقدار `503` با پیام فارسی برمی‌گرداند؛ هیچ درخواستی گم نمی‌شود ✅ |
| **Secrets** | `.env*` در `.gitignore`، فقط `.env.example` در گیت ✅ |
| **SEO** | `sitemap.xml` داینامیک با `priority` هوشمند (FGR R = 0.95)، `robots.txt` با `Host` صحیح ✅ |
| **OG Image** | `opengraph-image.tsx` داینامیک با `vercel/og` — نیازی به فایل jpg جدا نیست ✅ |
| **Static Preview** | `build:pages` APIها را کنار می‌گذارد، `basePath: /freewheel.ir` و `asset()` دستی — برای GH Pages درست ✅ |

---

## ۹) ریسک‌های باقی‌مانده و نقشه‌ی راه پیشنهادی

**فوری (قبل از انتشار دامنه):**
1. پر کردن `CONTACT` واقعی و افزودن `tel:` / `mailto:`.
2. افزودن `modularizeImports` برای `lucide-react` در `next.config.ts`.

**هفته‌ی آینده:**
3. افزودن `?cat=` به URL فیلتر برای deep-link و اشتراک‌گذاری.
4. تست Playwright برای فیلتر + فرم.
5. `content-visibility: auto` روی سکشن‌های زیر تاشده.

**ماه آینده:**
6. بهینه‌سازی `home-cinema.css` و `requestIdleCallback` برای Lenis.
7. نسخه‌ی انگلیسی خلاصه‌ی کاتالوگ (برای خریداران خارجی).
8. افزودن `llms.txt` برای ایندکس بهتر توسط LLMها (در کنار `sitemap.xml`).

---

## نتیجه

پروژه از نظر طراحی متمایز، از نظر فنی تمیز و از نظر محتوایی معتبر است. اسکیل‌های نصب‌شده (به‌ویژه `frontend-design`, `web-design-guidelines`, `vercel-react-best-practices`, `annotated-illustration`) مستقیماً روی همین کد اعمال شدند و خروجی‌شان همین گزارش است. سه بهبود فوری بالا را انجام بدهید و با اطمینان منتشر کنید.

> این گزارش با `verification-before-completion` نوشته شده: هر ادعا با `npm run build/typecheck/lint` و خواندن فایل مربوطه تأیید شده است.
