export const SITE = {
  name: "freewheel.ir",
  title: "freewheel.ir | فری‌ویل صنعتی به زبان ساده",
  description:
    "فری‌ویل یا کلاچ یک‌طرفه چیست و چطور کار می‌کند؟ آشنایی ساده با سازوکار، کاربردها، انواع و راهنمای انتخاب فری‌ویل صنعتی.",
  locale: "fa_IR",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://freewheel.ir",
} as const;

export const SHOPS = {
  bearing: {
    name: "bearingonline.ir",
    label: "فروشگاه آنلاین بلبرینگ",
    url: "https://bearingonline.ir",
    description: "استعلام قیمت و خرید فری‌ویل، بلبرینگ و قطعات صنعتی",
  },
  robot: {
    name: "persiarobot.ir",
    label: "شرکت اتوماسیون و نوار نقاله",
    url: "https://persiarobot.ir",
    description: "طراحی، ساخت و ارتقای سیستم‌های نوار نقاله و اتوماسیون صنعتی",
  },
} as const;

export const CONTACT = {
  phone: "[شماره تماس]",
  mobile: "[شماره موبایل]",
  email: "[ایمیل]",
  address: "[آدرس واقعی]",
  hours: "شنبه تا چهارشنبه، ۸ تا ۱۷ — پنجشنبه ۸ تا ۱۳",
} as const;

/**
 * ناوبری سایت در هدر و فوتر از خود کاتالوگ (`src/content/ringspann.ts`)
 * ساخته می‌شود تا فهرست سری‌ها یک منبع واحد داشته باشد.
 */
export const FOOTER_NOTE =
  "اعداد و ابعادی که در این سایت آمده از کاتالوگ و دیتاشیت سازنده‌ها نقل شده است و تصاویر قطعات، رندر شبیه‌سازی‌شده برای شناختن اجزاست؛ برای تطبیق ظاهری قطعه، عکس قطعه‌ی خودتان را بفرستید. برای خرید قطعه، استعلام قیمت را از فروشگاه آنلاین بگیرید؛ برای پروژه و سایزبندی، با ما تماس بگیرید." as const;
