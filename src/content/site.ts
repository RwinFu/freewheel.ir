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

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV: NavItem[] = [
  {
    href: "/ringspann",
    label: "RINGSPANN",
    children: [
      { href: "/ringspann/fgr-r", label: "سری FGR … R (اسپراگ‌دار رولری)" },
      { href: "/ringspann/fz", label: "فری‌ویل داخلی FZ" },
      { href: "/ringspann/bm-r", label: "کامل BM … R" },
      { href: "/ringspann/fb", label: "کامل اسپراگ FB" },
      { href: "/ringspann/frhn", label: "بک‌استاپ FRHN" },
      { href: "/ringspann/fkh", label: "لیفت‌آف هیدرودینامیک FKh" },
      { href: "/ringspann/fa-fav", label: "با اهرم FA / FAV" },
    ],
  },
  {
    href: "/brands",
    label: "برندها",
    children: [
      { href: "/brands/ringspann", label: "RINGSPANN" },
      { href: "/brands/ina", label: "INA" },
      { href: "/brands/skf", label: "SKF" },
      { href: "/brands/stieber", label: "Stieber" },
      { href: "/brands/koyo", label: "Koyo" },
      { href: "/brands/luk", label: "LUK" },
      { href: "/brands/niko", label: "NIKO" },
    ],
  },
  {
    href: "/applications",
    label: "کاربردها",
    children: [
      { href: "/applications/conveyor", label: "نوار نقاله و بک‌استاپ" },
      { href: "/applications/textile", label: "نساجی و ریسندگی" },
      { href: "/applications/food", label: "صنایع غذایی و نوشیدنی" },
      { href: "/applications/packaging", label: "بسته‌بندی و پالتیزه" },
      { href: "/applications/printing", label: "چاپ و تبدیل کاغذ" },
      { href: "/applications/mining", label: "معدن و سنگ‌شکن" },
    ],
  },
  { href: "/articles", label: "مقالات فنی" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس" },
];

export const FOOTER_NOTE =
  "اعداد و ابعادی که در این سایت آمده از کاتالوگ و دیتاشیت سازنده‌ها نقل شده است. برای خرید قطعه، استعلام قیمت را از فروشگاه آنلاین بگیرید؛ برای پروژه و سایزبندی، با ما تماس بگیرید." as const;
