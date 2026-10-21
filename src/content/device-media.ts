/**
 * قطعه‌ها و دستگاه‌های بدون پس‌زمینه.
 *
 * همه از `scripts/build-device.mjs` و `scripts/build-cutouts.mjs` می‌آیند:
 * رندر خام یا عکس استودیویی → حذف پس‌زمینه → برش تا لبه‌ی محتوا → WebP با آلفا.
 * چون پس‌زمینه ندارند، روی هر صحنه‌ای (تیره، شبکه‌ی فنی، گرادیان) می‌نشینند.
 */
export type Cutout = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
};

/** دستگاه کامل — موتور، کوپلینگ، گیربکس، فری‌ویل، پولی، درام */
export const DEVICE: Cutout = {
  src: "/cutouts/device.webp",
  width: 1038,
  height: 383,
  alt: "ایستگاه درایو نوار نقاله: موتور، کوپلینگ، گیربکس، فری‌ویل روی شفت و پولی",
  label: "دستگاه کامل",
};

/** همان دستگاه، بازشده — قطعه‌ها از هم جدا شده‌اند و فری‌ویل وسط است */
export const DEVICE_EXPLODED: Cutout = {
  src: "/cutouts/device-exploded.webp",
  width: 1427,
  height: 509,
  alt: "نمای بازشده‌ی دستگاه به ترتیب توان: موتور، کوپلینگ، گیربکس، فری‌ویل، پولی و درام",
  label: "نمای بازشده",
};

/** قطعه‌های تک، برای شناور شدن دور صحنه */
export const PART_CUTOUT: Record<string, Cutout> = {
  roller: {
    src: "/cutouts/roller.webp",
    width: 633,
    height: 692,
    alt: "فری‌ویل رولری کامل با حلقه‌ی بیرونی و راه‌کلید",
    label: "رولری",
  },
  sprag: {
    src: "/cutouts/sprag.webp",
    width: 1038,
    height: 561,
    alt: "قفس المان‌های اسپراگ بین دو حلقه",
    label: "اسپراگ",
  },
  backstop: {
    src: "/cutouts/backstop.webp",
    width: 1026,
    height: 680,
    alt: "بک‌استاپ با اهرم گشتاور روی حلقه‌ی بیرونی",
    label: "بک‌استاپ",
  },
  liftoff: {
    src: "/cutouts/liftoff.webp",
    width: 754,
    height: 676,
    alt: "فری‌ویل با لیفت‌آف هیدرودینامیک",
    label: "لیفت‌آف",
  },
};

/**
 * نقاط ارجاع. مختصات درصدی از خودِ قاب تصویر است (بعد از برش)،
 * پس نقطه‌ها دقیقاً روی قطعه می‌نشینند.
 */
export type Callout = {
  key: string;
  label: string;
  note: string;
  /** در نمای کامل */
  at: { x: number; y: number };
  /** در نمای بازشده */
  atExploded: { x: number; y: number };
  /** برچسب بالای نقطه یا زیر آن — برای اینکه برچسب‌ها روی هم نیفتند */
  place: "up" | "down";
  /** ردیف برچسب در نمای بازشده (۰ نزدیک، ۱ بالاتر) تا در یک ردیف شلوغ نشوند */
  tier?: 0 | 1;
  /** قطعه‌ی اصلی صحنه — تنها نقطه‌ای که رنگ تاکید دارد */
  hero?: boolean;
};

export const CALLOUTS: Callout[] = [
  {
    key: "motor",
    label: "الکتروموتور",
    note: "منبع توان",
    at: { x: 18.8, y: 62.7 },
    atExploded: { x: 14, y: 57 },
    place: "up",
    tier: 0,
  },
  {
    key: "coupling",
    label: "کوپلینگ",
    note: "انتقال بدون بازی",
    at: { x: 39, y: 53.3 },
    atExploded: { x: 31.2, y: 57 },
    place: "down",
    tier: 1,
  },
  {
    key: "gearbox",
    label: "گیربکس",
    note: "کاهش دور، افزایش گشتاور",
    at: { x: 53.7, y: 49.6 },
    atExploded: { x: 41, y: 57 },
    place: "up",
    tier: 0,
  },
  {
    key: "freewheel",
    label: "فری‌ویل",
    note: "بدون برق و سنسور",
    at: { x: 63.9, y: 60.6 },
    atExploded: { x: 60.1, y: 58 },
    place: "down",
    tier: 1,
    hero: true,
  },
  {
    key: "pulley",
    label: "پولی و درام",
    note: "خروجی به خط",
    at: { x: 77.6, y: 50.9 },
    atExploded: { x: 70.8, y: 57 },
    place: "up",
    tier: 0,
  },
];
