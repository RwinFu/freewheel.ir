import { APPLICATIONS } from "@/content/applications";
import { BRANDS } from "@/content/brands";
import { RINGSPANN_SERIES } from "@/content/ringspann";

/**
 * دسته‌بندی محتوای سایت در یک جای واحد.
 *
 * چرا اینجا و نه داخل هر فایل محتوا: دسته‌بندی یک «دید» روی داده است، نه بخشی
 * از خودِ داده. با نگه‌داشتنش در یک ماژول، هم فهرست‌ها و هم صفحه‌های جزئیات و
 * هم ناوبری از یک تعریف مشترک استفاده می‌کنند و اگر عضوی از قلم بیفتد،
 * `assertComplete` در زمان build خطا می‌دهد نه در زمان اجرا پیش کاربر.
 *
 * هر دسته علاوه بر برچسب و توضیح، یک `icon` و یک `tone` دارد تا در چیپ‌های
 * فیلتر و برچسبِ روی کارت‌ها یک‌شکل و قابل تشخیص باشد.
 */

/** پالت لحن دسته‌ها؛ در `category-filter.tsx` به کلاس رنگی نگاشت می‌شود */
export type CategoryTone = "coral" | "mint" | "steel" | "ocean";

export type Category = {
  /** شناسه‌ی پایدار؛ در URL و کلید React استفاده می‌شود */
  id: string;
  label: string;
  /** توضیح یک‌خطی که زیر برچسب در فیلتر نشان داده می‌شود */
  hint: string;
  /** شناسه‌ی آیکن؛ در category-filter به آیکن lucide نگاشت می‌شود */
  icon: string;
  /** لحن رنگی دسته برای چیپ فعال و برچسب روی کارت */
  tone: CategoryTone;
};

/** برچسب «همه» که اول هر فهرست فیلتر می‌آید */
export const ALL_CATEGORY = {
  id: "all",
  label: "همه",
  hint: "بدون فیلتر",
  icon: "all",
  tone: "steel",
} as const satisfies Category;

/* ---------------- کاربردها: بر اساس وظیفه‌ی قطعه در ماشین ---------------- */

export const APPLICATION_CATEGORIES: Category[] = [
  {
    id: "backstop",
    label: "بک‌استاپ",
    hint: "جلوگیری از برگشت ناخواسته‌ی نوار و بار در توقف",
    icon: "lock",
    tone: "coral",
  },
  {
    id: "indexing",
    label: "ایندکسینگ و حرکت پله‌ای",
    hint: "تغذیه‌ی مرحله‌ای دقیق در ماشین‌های بسته‌بندی و پرکن",
    icon: "stack",
    tone: "mint",
  },
  {
    id: "overrunning",
    label: "اورانینگ و جداسازی",
    hint: "دو محرک روی یک شفت، کنترل کشش رول",
    icon: "split",
    tone: "steel",
  },
];

const APPLICATION_CATEGORY_BY_SLUG: Record<string, string> = {
  conveyor: "backstop",
  mining: "backstop",
  packaging: "indexing",
  food: "indexing",
  textile: "overrunning",
  printing: "overrunning",
};

/* ------------- سری‌های RINGSPANN: بر اساس شکل تأمین و نصب ------------- */

export const SERIES_CATEGORIES: Category[] = [
  {
    id: "basic",
    label: "پایه و داخلی",
    hint: "برای مونتاژ داخل محفظه یا توپی‌ای که خودتان می‌سازید",
    icon: "cog",
    tone: "steel",
  },
  {
    id: "sealed",
    label: "کامل و آب‌بندی‌شده",
    hint: "روغن‌پر و آماده‌ی نصب، بدون نیاز به طراحی محفظه",
    icon: "shield",
    tone: "mint",
  },
  {
    id: "lever",
    label: "بک‌استاپ با اهرم",
    hint: "اهرم گشتاور روی پایه‌ی ثابت؛ مخصوص نوار نقاله‌ی شیب‌دار",
    icon: "anchor",
    tone: "coral",
  },
  {
    id: "liftoff",
    label: "دور آزاد بالا و لیفت‌آف",
    hint: "سایش نزدیک به صفر در چرخش آزاد طولانی",
    icon: "wind",
    tone: "ocean",
  },
];

const SERIES_CATEGORY_BY_SLUG: Record<string, string> = {
  "fgr-r": "basic",
  fz: "basic",
  "bm-r": "sealed",
  fb: "sealed",
  frhn: "lever",
  "fa-fav": "lever",
  fkh: "liftoff",
};

/* ---------------- برندها: بر اساس شکل محصول و بازار ---------------- */

/*
 * RINGSPANN در صفحه‌ی برندها کارت جدا و بزرگ‌تری دارد و در شبکه‌ی فیلتر
 * نمی‌آید، پس دسته‌بندی فقط روی شش برند دیگر اعمال می‌شود. سؤال خریدار این
 * است: «قطعه‌ی من چه شکلی است و از چه خانواده‌ای جایگزین می‌شود؟» — کاپ
 * کشیده‌ی کوچک، بلبرینگ‌ساز جامع یا کلاچ انتقال قدرت خودرو.
 */
export const BRAND_CATEGORIES: Category[] = [
  {
    id: "drawn-cup",
    label: "کلاچ کاپ کشیده",
    hint: "فشرده و اقتصادی؛ خانواده‌ی HF/HFL و CSK",
    icon: "cup",
    tone: "steel",
  },
  {
    id: "bearing",
    label: "بلبرینگ‌ساز جامع",
    hint: "شبکه‌ی تأمین گسترده با عرضه‌ی متمرکز فری‌ویل",
    icon: "disc",
    tone: "mint",
  },
  {
    id: "drivetrain",
    label: "انتقال قدرت خودرو",
    hint: "فری‌ویل داخل مونتاژ؛ پولی آلترناتور و فلایویل",
    icon: "car",
    tone: "coral",
  },
];

const BRAND_CATEGORY_BY_SLUG: Record<string, string> = {
  ina: "drawn-cup",
  stieber: "drawn-cup",
  niko: "drawn-cup",
  skf: "bearing",
  koyo: "bearing",
  luk: "drivetrain",
};

/** شش برندی که در شبکه‌ی فیلتر صفحه‌ی `/brands` نشان داده می‌شوند */
export const FILTERABLE_BRANDS = BRANDS.filter((brand) => brand.slug !== "ringspann");

/* ---------------- توابع کمکی ---------------- */

function categoryOf(map: Record<string, string>, slug: string, kind: string): string {
  const id = map[slug];
  if (!id) throw new Error(`دسته‌بندی ${kind} برای «${slug}» تعریف نشده است`);
  return id;
}

export const applicationCategory = (slug: string) =>
  categoryOf(APPLICATION_CATEGORY_BY_SLUG, slug, "کاربرد");

export const seriesCategory = (slug: string) =>
  categoryOf(SERIES_CATEGORY_BY_SLUG, slug, "سری");

export const brandCategory = (slug: string) =>
  categoryOf(BRAND_CATEGORY_BY_SLUG, slug, "برند");

/** یافتن شیء دسته از روی شناسه؛ برای نمایش برچسب دسته روی کارت‌ها */
export function categoryById(categories: Category[], id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export type CountedCategory = Category & { count: number };

/** فهرست دسته‌ها به‌همراه تعداد عضو؛ «همه» اول می‌آید. */
export function withCounts(
  categories: Category[],
  slugs: string[],
  categoryOfSlug: (slug: string) => string,
): CountedCategory[] {
  const counts = new Map<string, number>();
  for (const slug of slugs) {
    const id = categoryOfSlug(slug);
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [
    { ...ALL_CATEGORY, count: slugs.length },
    ...categories.map((category) => ({ ...category, count: counts.get(category.id) ?? 0 })),
  ];
}

/*
 * اعتبارسنجی در زمان بارگذاری ماژول: اگر عضوی از فهرست محتوا بدون دسته بماند
 * یا دسته‌ای تعریف شود که هیچ عضوی ندارد، همین‌جا و در build مشخص می‌شود.
 */
function assertComplete(
  categories: Category[],
  slugs: string[],
  map: Record<string, string>,
  kind: string,
) {
  const ids = new Set(categories.map((category) => category.id));
  for (const slug of slugs) {
    if (!map[slug]) throw new Error(`دسته‌بندی ${kind} برای «${slug}» تعریف نشده است`);
    if (!ids.has(map[slug])) {
      throw new Error(`دسته‌ی «${map[slug]}» برای ${kind} «${slug}» در فهرست دسته‌ها نیست`);
    }
  }
  for (const id of ids) {
    if (!Object.values(map).includes(id)) {
      throw new Error(`دسته‌ی «${id}» در ${kind} هیچ عضوی ندارد`);
    }
  }
}

assertComplete(
  APPLICATION_CATEGORIES,
  APPLICATIONS.map((item) => item.slug),
  APPLICATION_CATEGORY_BY_SLUG,
  "کاربرد",
);
assertComplete(
  SERIES_CATEGORIES,
  RINGSPANN_SERIES.map((item) => item.slug),
  SERIES_CATEGORY_BY_SLUG,
  "سری",
);
assertComplete(
  BRAND_CATEGORIES,
  FILTERABLE_BRANDS.map((item) => item.slug),
  BRAND_CATEGORY_BY_SLUG,
  "برند",
);
