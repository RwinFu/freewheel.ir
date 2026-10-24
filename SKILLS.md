# مهارت‌های ایجنت (Agent Skills)

مجموعه‌ی مهارت‌هایی که ایجنت روی این پروژه استفاده می‌کند. همه از مخزن‌های
عمومی و پراستفاده‌ی گیت‌هاب می‌آیند و با CLI رسمی [`skills`](https://github.com/vercel-labs/skills)
نصب می‌شوند.

```bash
npm run skills:install    # نصب همه‌ی مهارت‌های زیر
npm run skills:list       # فهرست نصب‌شده‌ها
npm run skills:update     # به‌روزرسانی به آخرین نسخه
```

## چه چیزی commit می‌شود؟

| فایل | وضعیت | نقش |
| --- | --- | --- |
| `skills-lock.json` | در گیت | منبع حقیقت: نام، مخزن مبدأ و هش هر مهارت |
| `SKILLS.md` (همین فایل) | در گیت | دسته‌بندی و توضیح مهارت‌ها |
| `scripts/install-skills.sh` | در گیت | نصب بازتولیدپذیر |
| `.claude/skills/` | در `.gitignore` | فایل‌های نصب‌شده؛ ابزار محلی، نه بخشی از سایت |

یعنی یک کلون تازه هیچ مهارتی ندارد؛ با `npm run skills:install` دقیقاً به همین
مجموعه می‌رسد. این همان قراردادی است که از قبل در `.gitignore` نوشته شده بود.

## مخزن‌های مبدأ

| مخزن | ستاره | چرا انتخاب شد |
| --- | --- | --- |
| [`obra/superpowers`](https://github.com/obra/superpowers) | ~۲۹۶٬۱۰۰ | چارچوب مهارت و روش کار؛ پراستفاده‌ترین مخزن مهارت |
| [`anthropics/skills`](https://github.com/anthropics/skills) | ~۱۷۹٬۹۰۰ | مجموعه‌ی رسمی Anthropic؛ مرجع طراحی و تست |
| [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | ~۳۲٬۰۰۰ | مجموعه‌ی رسمی Vercel؛ دقیقاً هم‌راستا با Next.js این پروژه |
| [`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) | ~۱۹٬۹۵۳ | مجموعه‌ی تخصصی سئو؛ با کنوانسیون استاندارد SKILL.md سازگار |
| [`Jeffallan/claude-skills`](https://github.com/Jeffallan/claude-skills) | ~۱۲٬۰۰۰ | ۶۷ مهارت تخصصی فول‌استک؛ امنیت، معماری و بازبینی کد |

ستاره‌ها در زمان نوشتن این فایل از GitHub API خوانده شده‌اند و تقریبی‌اند.

## دسته‌بندی

### ۱. طراحی و فرانت‌اند

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `frontend-design` | anthropics/skills | جهت بصری، تایپوگرافی و پرهیز از ظاهر قالبی و پیش‌فرض |
| `canvas-design` | anthropics/skills | طراحی بصری و ترکیب‌بندی روی canvas |
| `brand-guidelines` | anthropics/skills | نگه‌داشتن رنگ، لحن و هویت برند در سراسر صفحه‌ها |

### ۲. موشن و ترنزیشن

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `vercel-react-view-transitions` | vercel-labs/agent-skills | ترنزیشن صفحه، morph عنصر مشترک و انیمیشن فهرست با View Transition API بومی |

این مهارت مستقیماً همان چیزی را ساخت که در بخش «ترنزیشن‌ها» پایین‌تر آمده است.
خودِ Next.js هم در راهنمای داخلی‌اش
(`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`) به همین
مهارت ارجاع می‌دهد.

### ۳. کیفیت کد ری‌اکت و نکست

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `vercel-react-best-practices` | vercel-labs/agent-skills | الگوهای کارایی ری‌اکت/نکست از تیم مهندسی Vercel |
| `vercel-composition-patterns` | vercel-labs/agent-skills | ترکیب‌پذیری کامپوننت‌ها؛ شامل تغییرات API ری‌اکت ۱۹ |
| `web-design-guidelines` | vercel-labs/agent-skills | بازبینی رابط کاربری بر اساس Web Interface Guidelines و دسترسی‌پذیری |

### ۴. تست و بررسی

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `webapp-testing` | anthropics/skills | تست واقعی برنامه‌ی وب در مرورگر، نه فقط build گرفتن |

### ۵. روش کار

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `verification-before-completion` | obra/superpowers | قبل از «تمام شد» گفتن، ادعاها را با اجرای واقعی بررسی کن |
| `systematic-debugging` | obra/superpowers | ریشه‌یابی مرحله‌به‌مرحله به‌جای حدس زدن |
| `brainstorming` | obra/superpowers | شفاف‌کردن صورت مسئله پیش از نوشتن کد |

### ۶. ساخت مهارت

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `skill-creator` | anthropics/skills | نوشتن مهارت تازه با ساختار درست `SKILL.md` |

### ۷. محتوا و نگارش

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `writing-guidelines` | vercel-labs/agent-skills | بازبینی متن‌ها: شفاف، کوتاه و بدون حشو؛ مبنای بازنویسی بخش «اصل کار» |

### ۸. سئو

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `seo` | AgriciDaniel/claude-seo | ارکسترِ ۲۶ زیرمهارت سئو (فنی، محتوا، GEO/AEO، خزنده‌های هوش مصنوعی و گزارش) |
| `seo-technical` | AgriciDaniel/claude-seo | ممیزی فنی: خزش‌پذیری، ایندکس، canonical، رندر JS، Core Web Vitals، امنیت |
| `seo-schema` | AgriciDaniel/claude-seo | تولید/اعتبارسنجی JSON-LD مطابق وضعیت به‌روز انواع schema (مثل کنار رفتن FAQPage) |
| `seo-sitemap` | AgriciDaniel/claude-seo | بررسی و تولید نقشه‌ی سایت XML |

با این مهارت‌ها ممیزی سئوی سایت انجام شد: BreadcrumbList به کامپوننت
`Breadcrumbs` اضافه شد، تاریخ ISO به داده‌ی ساختاریافته‌ی مقاله‌ها رفت و
`contactPoint` سازمان با متغیر محیطی شماره‌ی تماس واقعی پُر می‌شود.

### ۹. امنیت و بازبینی

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `security-reviewer` | Jeffallan/claude-skills | ممیزی امنیت: SAST، وابستگی‌ها، اسرار، رتبه‌بندی یافته‌ها و راه‌حل |
| `secure-code-guardian` | Jeffallan/claude-skills | پیاده‌سازی امن: هدرها، محدودیت نرخ، اعتبارسنجی ورودی (OWASP) |
| `code-reviewer` | Jeffallan/claude-skills | بازبینی ساختاری کد با لیست‌شدگی شدت و پیشنهاد اصلاح |

نتیجه‌ی استفاده: به‌روزرسانی امنیتی وابستگی‌ها (Next 16.4.3 و sharp 0.35.5؛
`npm audit` صفر)، افزودن هدرهای امنیتی و `poweredByHeader: false` به پیکربندی،
محدودیت نرخ و سقف اندازه‌ی بدنه برای `api/inquiry` و `api/search`، و مرزهای
خطای `error.tsx` و `global-error.tsx` با API جدید Next 16 (`retry`).

## افزودن مهارت تازه

```bash
# اول ببین مخزن چه مهارت‌هایی دارد
npx skills add owner/repo --list

# بعد نصب کن
npx skills add owner/repo --skill skill-name -a claude-code -y
```

سپس همین فایل را به‌روز کنید تا دسته‌بندی با `skills-lock.json` هم‌خوان بماند.
`skills-lock.json` را دستی ویرایش نکنید؛ CLI آن را می‌سازد.

> مهارت‌ها با دسترسی کامل ایجنت اجرا می‌شوند. پیش از استفاده، محتوایشان را بخوانید.
