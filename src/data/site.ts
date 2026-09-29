export const site = {
  name: 'freewheel.ir',
  title: 'فری‌ویل | کلاچ یک‌طرفه Ringspann و برندهای دیگر',
  shortTitle: 'فری‌ویل',
  tagline: 'مرجع فنی کلاچ یک‌طرفه و فری‌ویل صنعتی',
  description:
    'راهنمای فنی فری‌ویل (کلاچ یک‌طرفه): از انتخاب نوع سپراگ یا رولری تا جدول مشخصات واقعی سری R رینگسپان. برای استعلام قیمت و خرید به فروشگاه آنلاین بلبرینگ مراجعه کنید.',
  locale: 'fa_IR',
  dir: 'rtl' as const,
  /** Fill these in before going live — placeholders are deliberate. */
  contact: {
    phone: '[شماره تماس]',
    phoneHref: 'tel:[شماره تماس]',
    email: '[آدرس ایمیل]',
    address: '[آدرس واقعی]',
    hours: 'شنبه تا چهارشنبه، ۸ تا ۱۷ — پنجشنبه‌ها با هماهنگی قبلی',
  },
} as const

/** The two sister sites. Every page points at one or both. */
export const SHOPS = {
  bearing: {
    name: 'فروشگاه آنلاین بلبرینگ',
    host: 'bearingonline.ir',
    href: 'https://bearingonline.ir',
    blurb: 'انواع بلبرینگ، یاتاقان و متعلقات با ارسال سراسری',
  },
  automation: {
    name: 'شرکت اتوماسیون',
    host: 'persiarobot.ir',
    href: 'https://persiarobot.ir',
    blurb: 'طراحی و ساخت سیستم‌های نوار نقاله و اتوماسیون صنعتی',
  },
} as const

export const NAV = [
  { href: '/ringspann', label: 'Ringspann' },
  { href: '/applications', label: 'کاربردها' },
  { href: '/brands', label: 'برندها' },
  { href: '/articles', label: 'مقالات فنی' },
  { href: '/about', label: 'دربارهٔ ما' },
  { href: '/contact', label: 'تماس' },
] as const
