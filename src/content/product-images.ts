import type { StaticImageData } from "next/image";

import fwAxis from "@/assets/images/part/fw-axis.jpg";
import fwAxisBackdrop from "@/assets/images/part/fw-axis-backdrop.webp";
import fwAxisFlange from "@/assets/images/part/fw-axis-flange.webp";
import fwAxisHub from "@/assets/images/part/fw-axis-hub.webp";
import fwAxisRace from "@/assets/images/part/fw-axis-race.webp";
import typeRoller from "@/assets/images/part/type-roller.jpg";
import typeSprag from "@/assets/images/part/type-sprag.jpg";
import unitBackstop from "@/assets/images/part/unit-backstop.jpg";
import unitSealed from "@/assets/images/part/unit-sealed.jpg";
import unitSprag from "@/assets/images/part/unit-sprag.jpg";
import fwBackstop from "@/assets/images/fw-backstop.jpg";
import fwBackstopPng from "@/assets/images/fw-backstop.png";
import fwLiftoffPng from "@/assets/images/fw-liftoff.png";
import fwRollerPng from "@/assets/images/fw-roller.png";
import fwSpragPng from "@/assets/images/fw-sprag.png";
import fwDrawnCup from "@/assets/images/fw-drawncup.jpg";
import fwInternal from "@/assets/images/fw-internal.jpg";
import fwLeverSmall from "@/assets/images/fw-lever-small.jpg";
import fwLiftoff from "@/assets/images/fw-liftoff.jpg";
import fwRoller from "@/assets/images/fw-roller.jpg";
import fwSealed from "@/assets/images/fw-sealed.jpg";
import fwSprag from "@/assets/images/fw-sprag.jpg";
import heroFreewheel from "@/assets/images/hero-freewheel.jpg";

/**
 * تصاویر استودیویی خودِ قطعه (فری‌ویل) به‌تفکیک خانواده‌ی محصول.
 *
 * این تصاویر «دید» دوم روی داده‌ی محصول‌اند — مثل taxonomy — پس نگاشت‌شان به
 * سری‌ها و برندها این‌جا یک‌جا نگه داشته می‌شود تا کارت‌ها، صفحه‌های جزئیات و
 * گالری صفحه‌ی اول از یک منبع مشترک بخوانند.
 */
export type ProductImage = {
  src: StaticImageData;
  alt: string;
  /** عنوان کوتاه زیر تصویر در گالری */
  caption: string;
  /** توضیح یک‌خطی زیر عنوان در گالری */
  sub: string;
};

const rollerBasic: ProductImage = {
  src: fwRoller,
  alt: "فری‌ویل رولری پایه با بلبرینگ و راه‌کلید روی حلقه‌ی داخلی",
  caption: "فری‌ویل رولری پایه",
  sub: "المان رولری + بلبرینگ، برای مونتاژ در محفظه‌ی مشتری",
};

const spragHeavy: ProductImage = {
  src: fwSprag,
  alt: "نمای نزدیک المان‌های اسپراگ بین دو حلقه در فری‌ویل سنگین",
  caption: "فری‌ویل کامل اسپراگ",
  sub: "گشتاور بالا تا ۱۶۰٬۰۰ نیوتن‌متر",
};

const sealedComplete: ProductImage = {
  src: fwSealed,
  alt: "فری‌ویل کامل آب‌بندی‌شده و روغن‌پر با کلید روی حلقه‌ی خارجی",
  caption: "فری‌ویل کامل آب‌بندی‌شده",
  sub: "روغن‌پر و آماده‌ی نصب، بدون طراحی محفظه",
};

const backstopLever: ProductImage = {
  src: fwBackstop,
  alt: "بک‌استاپ سرعت پایین با اهرم گشتاور بسته‌شده به حلقه‌ی خارجی",
  caption: "بک‌استاپ با اهرم",
  sub: "اهرم روی پایه‌ی ثابت؛ تا ۵۰۳٬۵۵۰ نیوتن‌متر",
};

const internalBearing: ProductImage = {
  src: fwInternal,
  alt: "فری‌ویل داخلی اسپراگ هم‌اندازه‌ی بلبرینگ با تحمل بار شعاعی",
  caption: "فری‌ویل داخلی",
  sub: "اسپراگ با رفتار بلبرینگ، برای فضای محدود",
};

const liftoffPolished: ProductImage = {
  src: fwLiftoff,
  alt: "فری‌ویل صیقل‌خورده با لیفت‌آف هیدرودینامیک برای دور آزاد بالا",
  caption: "لیفت‌آف هیدرودینامیک",
  sub: "سایش نزدیک به صفر در چرخش آزاد طولانی",
};

const leverSmall: ProductImage = {
  src: fwLeverSmall,
  alt: "فری‌ویل اقتصادی با اهرم و بوش برای بک‌استاپ سبک",
  caption: "کامل با اهرم و بوش",
  sub: "راه‌حل اقتصادی برای بک‌استاپ و ایندکسینگ سبک",
};

const drawnCup: ProductImage = {
  src: fwDrawnCup,
  alt: "کلاچ یک‌سره‌ی کاپ کشیده با رولرهای سوزنی و فنر",
  caption: "کلاچ کاپ کشیده",
  sub: "سایز کوچک برای مکانیزم‌های فشرده",
};

export const SERIES_IMAGE: Record<string, ProductImage> = {
  "fgr-r": rollerBasic,
  fz: internalBearing,
  "bm-r": sealedComplete,
  fb: spragHeavy,
  frhn: backstopLever,
  fkh: liftoffPolished,
  "fa-fav": leverSmall,
};

export const BRAND_IMAGE: Record<string, ProductImage> = {
  ringspann: rollerBasic,
  ina: { ...drawnCup, sub: "سری HF و HFL" },
  stieber: { ...drawnCup, sub: "سری CSK و KK" },
  skf: { ...internalBearing, caption: "کلاچ یک‌سره‌ی سوزنی", sub: "رده‌ی سایز کوچک و کاربرد عمومی" },
  koyo: { ...internalBearing, caption: "کلاچ یک‌سره‌ی ژاپنی", sub: "تجهیزات اصلی و سایزهای کوچک" },
  luk: { ...rollerBasic, caption: "فری‌ویل انتقال قدرت", sub: "پولی آلترناتور و فلایویل دولایه" },
  niko: { ...drawnCup, caption: "فری‌ویل سبک", sub: "کاربردهای کم‌بار و مکانیزم‌های کوچک" },
};

/**
 * عکس‌های استودیویی تازه: قطعه از روبه‌روی محور، ماکروی داخل آن و چند مجموعه‌ی
 * کامل. این تصاویر با مدل تصویرساز ساخته شده‌اند (نه عکس واقعی یک برند خاص)
 * و مثل بقیه‌ی تصاویر سایت، محلی و برای پیش‌نمایش‌اند؛ پیش از استفاده‌ی تجاری
 * باید با عکس محصول خودِ فروشنده جایگزین شوند.
 *
 * ساخت‌شان: رندرهای خام در `.renders/` می‌مانند و
 * `scripts/build_freewheel_layers.py` از آن‌ها همین فایل‌های بهینه‌شده را
 * می‌سازد (لایه‌های چرخان بخش «اصل کار» هم از همان‌جا می‌آید).
 */
export const PART_IMAGE = {
  axis: {
    src: fwAxis,
    alt: "فری‌ویل واقعی از روبه‌روی محور: حلقه‌ی بیرونی با سوراخ‌های پیچ، ردیف المان‌های قفل‌کننده و حلقه‌ی داخلی با راه‌کلید",
    caption: "کلاچ یک‌طرفه",
    sub: "نمای روبه‌روی محور — آزاد در یک جهت، قفل در جهت دیگر",
  },
  typeSprag: {
    src: typeSprag,
    alt: "نمای نزدیک داخل فری‌ویل اسپراگ: ردیف المان‌های گوه‌ای فولادی و فنرها بین دو حلقه",
    caption: "المان اسپراگ",
    sub: "گوه‌های فولادی و فنر، فشرده بین دو حلقه",
  },
  typeRoller: {
    src: typeRoller,
    alt: "نمای نزدیک داخل فری‌ویل رولری: غلتک‌های استوانه‌ای و فنرها در دهانه‌ی گوه‌ای",
    caption: "رولر و فنر",
    sub: "غلتک‌ها در دهانه‌ی باریک گوه قفل می‌شوند",
  },
  unitSprag: {
    src: unitSprag,
    alt: "مجموعه‌ی کامل فری‌ویل رینگی اسپراگ با قفس، المان‌ها و راه‌کلید روی حلقه‌ی داخلی",
    caption: "فری‌ویل رینگی اسپراگ",
    sub: "قفس و المان‌ها در یک مجموعه‌ی آماده‌ی نصب",
  },
  unitSealed: {
    src: unitSealed,
    alt: "فری‌ویل آب‌بندی‌شده با محفظه‌ی پیچی و درپوش روی حلقه‌ی بیرونی",
    caption: "آب‌بندی‌شده با پیچ",
    sub: "محفظه‌ی بسته و روغن‌پر، بدون طراحی محفظه",
  },
  unitBackstop: {
    src: unitBackstop,
    alt: "بک‌استاپ کامل روی شفت با اهرم گشتاور پیچ‌شده به حلقه‌ی بیرونی",
    caption: "بک‌استاپ کامل",
    sub: "اهرم گشتاور روی پایه‌ی ثابت، نصب‌شده روی شفت",
  },
} as const satisfies Record<string, ProductImage>;

/**
 * لایه‌های چرخان بخش «اصل کار»: یک عکس واحد که به سه نوار هم‌مرکز بریده شده
 * است. هر نوار در بوم مربعِ هم‌مرکز ذخیره شده، پس چرخاندن هر فایل یعنی
 * چرخاندن همان حلقه حول محور قطعه.
 */
export const AXIS_LAYERS = {
  /** پس‌زمینه‌ی ثابت: همان عکس، بدون برش، تا لبه‌ی نرم لایه‌ها روی خودش بیفتد */
  backdrop: fwAxisBackdrop,
  flange: fwAxisFlange,
  race: fwAxisRace,
  hub: fwAxisHub,
} as const;

/**
 * نسخه‌های بدون پس‌زمینه (PNG شفاف) برای بخش شناور صفحه‌ی اول.
 * این‌ها با `scripts/remove_bg.py` از روی همان رندرها بریده شده‌اند.
 */
export const SERIES_FLOAT: Record<string, StaticImageData> = {
  "fgr-r": fwRollerPng,
  fb: fwSpragPng,
  frhn: fwBackstopPng,
  fkh: fwLiftoffPng,
};

/** نوار گالری صفحه‌ی اول: خودِ قطعه از نمای نزدیک */
export const GALLERY: ProductImage[] = [
  PART_IMAGE.axis,
  PART_IMAGE.typeSprag,
  spragHeavy,
  PART_IMAGE.typeRoller,
  rollerBasic,
  PART_IMAGE.unitSprag,
  sealedComplete,
  PART_IMAGE.unitSealed,
  backstopLever,
  PART_IMAGE.unitBackstop,
  liftoffPolished,
  internalBearing,
  leverSmall,
  drawnCup,
];
