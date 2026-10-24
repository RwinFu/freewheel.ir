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

ستاره‌ها در زمان نوشتن این فایل از GitHub API خوانده شده‌اند و تقریبی‌اند.
یک مهارت سفارشی هم کنار آن‌هاست: `annotated-illustration` از
[`kiarashjam/crm`](https://github.com/kiarashjam/crm) که برش‌های فنی با برچسب‌های بدون تداخل می‌سازد.

## دسته‌بندی

### ۱. طراحی و فرانت‌اند

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `frontend-design` | anthropics/skills | جهت بصری، تایپوگرافی و پرهیز از ظاهر قالبی و پیش‌فرض |
| `canvas-design` | anthropics/skills | طراحی بصری و ترکیب‌بندی روی canvas |
| `brand-guidelines` | anthropics/skills | نگه‌داشتن رنگ، لحن و هویت برند در سراسر صفحه‌ها |
| `theme-factory` | anthropics/skills | ۱۰ تم آماده و ساخت تم سفارشی برای همه‌ی آرتیفکت‌ها |
| `web-artifacts-builder` | anthropics/skills | آرتیفکت‌های پیچیده‌ی وب با React/Tailwind/shadcn |
| `algorithmic-art` | anthropics/skills | هنر الگوریتمی با p5.js و randomness کنترل‌شده |

### ۱-ب. تصویرسازی توضیحی (جدید)

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `annotated-illustration` | kiarashjam/crm | برش، انفجاری، ghosted و نمای آناتومی با لیدرهای بدون تداخل؛ اسکریپت `layout_callouts.py` برای جانمایی خودکار برچسب‌ها |
| `anatomy` (اختیاری) | wheresryan22/anatomy | فیگورهای ایزومتریک تعاملی از ماشین‌ها — اگر بخواهید نسخه‌ی ۳D آناتومی هم بسازید |

### ۲. موشن و ترنزیشن

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `vercel-react-view-transitions` | vercel-labs/agent-skills | ترنزیشن صفحه، morph عنصر مشترک و انیمیشن فهرست با View Transition API بومی |

### ۲-ب. بهینه‌سازی اجرا

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `vercel-optimize` | vercel-labs/agent-skills | تحلیل متریک‌های Vercel و پیشنهاد بهینه‌سازی هزینه/سرعت بر اساس داده |

### ۳. کیفیت کد ری‌اکت و نکست

> ترنزیشن‌های بالا مستقیماً با `vercel-react-view-transitions` ساخته شدند.
> خودِ Next.js هم در `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` به همین مهارت ارجاع می‌دهد.

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `vercel-react-best-practices` | vercel-labs/agent-skills | الگوهای کارایی ری‌اکت/نکست از تیم مهندسی Vercel |
| `vercel-composition-patterns` | vercel-labs/agent-skills | ترکیب‌پذیری کامپوننت‌ها؛ شامل تغییرات API ری‌اکت ۱۹ |
| `web-design-guidelines` | vercel-labs/agent-skills | بازبینی رابط کاربری بر اساس Web Interface Guidelines و دسترسی‌پذیری |

### ۴. تست و بررسی

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `webapp-testing` | anthropics/skills | تست واقعی برنامه‌ی وب در مرورگر، نه فقط build گرفتن |
| `test-driven-development` | obra/superpowers | نوشتن تست قبل از کد؛ RED→GREEN→REFACTOR |
| `writing-plans` | obra/superpowers | طرح چندمرحله‌ای قبل از شروع کدنویسی |

### ۵. روش کار

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `verification-before-completion` | obra/superpowers | قبل از «تمام شد» گفتن، ادعاها را با اجرای واقعی بررسی کن |
| `systematic-debugging` | obra/superpowers | ریشه‌یابی مرحله‌به‌مرحله به‌جای حدس زدن |
| `brainstorming` | obra/superpowers | شفاف‌کردن صورت مسئله پیش از نوشتن کد |
| `subagent-driven-development` | obra/superpowers | اجرای موازی کارهای مستقل با sub-agent |
| `finishing-a-development-branch` | obra/superpowers | تصمیم‌گیری برای ادغام و انتشار شاخه |

### ۶. ساخت مهارت

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `skill-creator` | anthropics/skills | نوشتن مهارت تازه با ساختار درست `SKILL.md` |

### ۷. محتوا و نگارش

| مهارت | مبدأ | به چه کاری می‌آید |
| --- | --- | --- |
| `writing-guidelines` | vercel-labs/agent-skills | بازبینی متن‌ها: شفاف، کوتاه و بدون حشو؛ مبنای بازنویسی بخش «اصل کار» |

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
