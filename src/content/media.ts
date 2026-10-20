/**
 * رسانه‌های متحرک سایت — ویدیو و گیف.
 *
 * همه‌ی این فایل‌ها از عکس‌های خود پروژه ساخته شده‌اند
 * (`scripts/build-motion.mjs`) و محلی سرو می‌شوند؛ هیچ میزبان بیرونی لازم نیست.
 *
 * هر مدیا سه شکل دارد:
 * - `webm`  VP9 — سبک‌ترین، مرورگرهای مدرن
 * - `mp4`   H.264 — سافاری و اشتراک‌گذاری
 * - `gif`   فقط برای قطعه؛ جایی که ویدیو پخش نمی‌شود
 * و یک `poster` که قبل از پخش و در حالت کاهش حرکت دیده می‌شود.
 */

export type MotionMedia = {
  /** کلید یکتا برای ارجاع از کامپوننت‌ها */
  key: string;
  title: string;
  caption: string;
  webm: string;
  mp4: string;
  poster: string;
  gif?: string;
  width: number;
  height: number;
  /** ویدیوی بی‌درز (رفت و برگشت) یا قطعه‌ای که یک چرخه‌ی کامل دارد */
  loop: boolean;
};

export const SPIN_FILM: MotionMedia = {
  key: "spin",
  title: "چرخش آزاد و قفل",
  caption:
    "سه حلقه‌ی فری‌ویل: حلقه‌ی داخلی می‌چرخد، قفس المان‌ها با نصف سرعت دنبالش می‌آید و حلقه‌ی بیرونی ساکن است؛ در پایان هر سه یکی می‌شوند — همان لحظه‌ی انتقال گشتاور.",
  webm: "/media/spin.webm",
  mp4: "/media/spin.mp4",
  poster: "/media/spin-poster.webp",
  gif: "/media/spin.gif",
  width: 640,
  height: 640,
  loop: true,
};

/** فیلم‌های محیطی خط تولید — هر کدام یک پوش‌این آهسته و بی‌درز */
export const PLANT_FILMS: Record<string, MotionMedia> = {
  conveyor: {
    key: "conveyor",
    title: "نوار نقاله و بک‌استاپ",
    caption: "ایستگاه محرک نوار نقاله در کارخانه؛ جایی که برگشت بار باید گرفته شود.",
    webm: "/media/conveyor.webm",
    mp4: "/media/conveyor.mp4",
    poster: "/media/conveyor-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
  textile: {
    key: "textile",
    title: "نساجی و ریسندگی",
    caption: "ماشین ریسندگی؛ کشش نخ باید حفظ شود ولی برگشت ممنوع است.",
    webm: "/media/textile.webm",
    mp4: "/media/textile.mp4",
    poster: "/media/textile-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
  food: {
    key: "food",
    title: "صنایع غذایی",
    caption: "خط فرآوری مواد غذایی با نوار نقاله‌های پله‌ای.",
    webm: "/media/food.webm",
    mp4: "/media/food.mp4",
    poster: "/media/food-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
  packaging: {
    key: "packaging",
    title: "بسته‌بندی و پالتیزه",
    caption: "حرکت مرحله‌ای و تکرارپذیر ماشین‌های بسته‌بندی.",
    webm: "/media/packaging.webm",
    mp4: "/media/packaging.mp4",
    poster: "/media/packaging-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
  printing: {
    key: "printing",
    title: "چاپ و ماشین‌های رول",
    caption: "غلتک‌های چاپ؛ ایندکسینگ دقیق بدون فرمان الکتریکی.",
    webm: "/media/printing.webm",
    mp4: "/media/printing.mp4",
    poster: "/media/printing-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
  mining: {
    key: "mining",
    title: "معدن و نوار شیب‌دار",
    caption: "نوار نقاله‌ی شیب‌دار معدن؛ سنگین‌ترین حالت بک‌استاپ.",
    webm: "/media/mining.webm",
    mp4: "/media/mining.mp4",
    poster: "/media/mining-poster.webp",
    width: 1120,
    height: 630,
    loop: true,
  },
};

/** نگاشت اسلاگ کاربرد به فیلم متناظر */
export const APPLICATION_FILM: Record<string, MotionMedia> = PLANT_FILMS;

export const ALL_FILMS: MotionMedia[] = [SPIN_FILM, ...Object.values(PLANT_FILMS)];
