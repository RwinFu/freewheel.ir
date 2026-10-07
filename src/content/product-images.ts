import type { StaticImageData } from "next/image";

import fwBackstop from "@/assets/images/fw-backstop.jpg";
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

/** نوار گالری صفحه‌ی اول: خودِ قطعه از نمای نزدیک */
export const GALLERY: ProductImage[] = [
  {
    src: heroFreewheel,
    alt: "کلاچ یک‌طرفه‌ی فولادی با المان‌های قفل‌کننده بین دو حلقه",
    caption: "کلاچ یک‌طرفه",
    sub: "آزاد در یک جهت، قفل در جهت دیگر",
  },
  rollerBasic,
  spragHeavy,
  sealedComplete,
  backstopLever,
  internalBearing,
  liftoffPolished,
  leverSmall,
  drawnCup,
];
