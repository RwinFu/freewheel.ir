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
 */

export type Category = {
  /** شناسه‌ی پایدار؛ در URL و کلید React استفاده می‌شود */
  id: string;
  label: string;
  /** توضیح یک‌خطی که زیر برچسب در فیلتر نشان داده می‌شود */
  hint: string;
};

/** برچسب «همه» که اول هر فهرست فیلتر می‌آید */
export const ALL_CATEGORY = { id: "all", label: "همه", hint: "بدون فیلتر" } as const;

/* ---------------- کاربردها: بر اساس وظیفه‌ی قطعه در ماشین ---------------- */

export const APPLICATION_CATEGORIES: Category[] = [
  {
    id: "backstop",
    label: "بک‌استاپ",
    hint: "گرفتن برگشت ناخواسته‌ی بار",
  },
  {
    id: "indexing",
    label: "حرکت پله‌ای",
    hint: "ایندکسینگ و تغذیه‌ی مرحله‌ای",
  },
  {
    id: "overrunning",
    label: "جداسازی و اورانینگ",
    hint: "دو محرک روی یک شفت، کنترل کشش",
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

/* ---------------- سری‌های RINGSPANN: بر اساس شکل تأمین ---------------- */

export const SERIES_CATEGORIES: Category[] = [
  {
    id: "bare",
    label: "پایه و داخلی",
    hint: "نیاز به محفظه یا بلبرینگ شما دارد",
  },
  {
    id: "complete",
    label: "کامل و آماده‌ی نصب",
    hint: "با بلبرینگ و محفظه‌ی بسته‌شده",
  },
  {
    id: "special",
    label: "کارکرد خاص",
    hint: "بک‌استاپ سنگین و لیفت‌آف",
  },
];

const SERIES_CATEGORY_BY_SLUG: Record<string, string> = {
  "fgr-r": "bare",
  fz: "bare",
  "bm-r": "complete",
  fb: "complete",
  "fa-fav": "complete",
  frhn: "special",
  fkh: "special",
};

/* ---------------- برندها: بر اساس نزدیکی به برنامه‌ی RINGSPANN ---------- */

/*
 * RINGSPANN در صفحه‌ی برندها کارت جدا و بزرگ‌تری دارد و در شبکه‌ی فیلتر
 * نمی‌آید، پس دسته‌بندی فقط روی شش برند دیگر اعمال می‌شود. سؤال واقعی خریدار
 * این است: «به‌جای RINGSPANN چه چیزی جایگزین می‌شود؟» و جواب آن برندهای
 * آلمانیِ هم‌خانواده است.
 */
export const BRAND_CATEGORIES: Category[] = [
  {
    id: "german",
    label: "جایگزین آلمانی",
    hint: "هم‌خانواده و سازگار با ابعاد RINGSPANN",
  },
  {
    id: "other",
    label: "سایر برندها",
    hint: "سوئد، ژاپن و اروپا",
  },
];

const BRAND_CATEGORY_BY_SLUG: Record<string, string> = {
  ina: "german",
  stieber: "german",
  luk: "german",
  skf: "other",
  koyo: "other",
  niko: "other",
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
