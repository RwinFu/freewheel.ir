import type { StaticImageData } from "next/image";

import heroFreewheel from "@/assets/images/hero-ringspann-fxm.webp";
import fwBackstop from "@/assets/images/fw-backstop.webp";
import fwDrawnCup from "@/assets/images/fw-drawncup.webp";
import fwInternal from "@/assets/images/fw-internal.webp";
import fwLeverSmall from "@/assets/images/fw-lever-small.webp";
import fwLiftoff from "@/assets/images/fw-liftoff.webp";
import fwRoller from "@/assets/images/fw-roller.webp";
import fwSealed from "@/assets/images/fw-sealed.webp";
import fwSprag from "@/assets/images/fw-sprag.webp";
import fwCompactSprag from "@/assets/images/fw-compact-sprag.webp";
import fwLiftoffCentrifugal from "@/assets/images/fw-liftoff-centrifugal.webp";
import fwMiniatureSprag from "@/assets/images/fw-miniature-sprag.webp";
import axis from "@/assets/images/part/fw-axis.webp";
import typeRoller from "@/assets/images/part/type-roller.webp";
import typeSprag from "@/assets/images/part/type-sprag.webp";
import unitBackstop from "@/assets/images/part/unit-backstop.webp";
import unitSealed from "@/assets/images/part/unit-sealed.webp";
import unitSprag from "@/assets/images/part/unit-sprag.webp";
import conveyorMill from "@/assets/images/conveyor-mill.webp";
import packagingLine from "@/assets/images/packaging-line.webp";
import quarryConveyor from "@/assets/images/quarry-conveyor.webp";
import textileMill from "@/assets/images/textile-mill.webp";

/**
 * تصاویر صفحه‌ی اصلی، از مجموعه‌ی موجود در `src/assets/images`.
 *
 * قبلاً این بخش از چند تصویر مفهومیِ تولیدشده در `public/images` استفاده
 * می‌کرد؛ آن‌ها جای عکس محصول را می‌گرفتند و حس «رندر تزئینی» می‌دادند. حالا
 * همه‌ی قاب‌ها یا عکس استودیویی خودِ قطعه‌اند یا عکس واقعی خط تولید، تا همان
 * چیزی دیده شود که کاربر در کارخانه می‌بیند.
 */
export type HomeStill = {
  src: StaticImageData;
  alt: string;
};

export const HOME_STILL = {
  hero: {
    src: heroFreewheel,
    alt: "فری‌ویل صنعتی در نمای استودیویی؛ حلقه‌ی بیرونی، قفس المان‌ها و حلقه‌ی داخلی",
  },
  identity: {
    src: typeSprag,
    alt: "نمای ماکرو از داخل فری‌ویل: ردیف المان‌های گوه‌ای فولادی و فنرها بین دو حلقه",
  },
  /** کاربردها — عکس واقعی خط تولید */
  conveyor: {
    src: conveyorMill,
    alt: "ایستگاه محرک نوار نقاله در کارخانه با موتور، گیربکس و کوپلینگ",
  },
  textile: {
    src: textileMill,
    alt: "ماشین ریسندگی و تولید نخ در کارخانه‌ی نساجی",
  },
  packaging: {
    src: packagingLine,
    alt: "خط بسته‌بندی صنعتی با نوار نقاله و ماشین‌های مرحله‌ای",
  },
  quarry: {
    src: quarryConveyor,
    alt: "نوار نقاله‌ی شیب‌دار در معدن سنگ و شن",
  },
  /** خانواده‌ی محصول — عکس استودیویی */
  familyRoller: {
    src: fwRoller,
    alt: "فری‌ویل رولری کامل با حلقه‌ی بیرونی و راه‌کلید",
  },
  familyBackstop: {
    src: fwBackstop,
    alt: "بک‌استاپ با اهرم گشتاور بسته‌شده به حلقه‌ی بیرونی",
  },
  familyIndexing: {
    src: fwLeverSmall,
    alt: "فری‌ویل اقتصادی با اهرم و بوش برای حرکت پله‌ای",
  },
  /** حالت‌های کارکرد */
  lifeOff: {
    src: fwLiftoff,
    alt: "فری‌ویل صیقل‌خورده با لیفت‌آف هیدرودینامیک برای دور آزاد بالا",
  },
  drawnCup: {
    src: fwDrawnCup,
    alt: "کلاچ کاپ کشیده با رولرهای سوزنی و فنر",
  },
  sealed: {
    src: fwSealed,
    alt: "فری‌ویل آب‌بندی‌شده و روغن‌پر با کلید روی حلقه‌ی خارجی",
  },
  internal: {
    src: fwInternal,
    alt: "فری‌ویل داخلی هم‌اندازه‌ی بلبرینگ با المان اسپراگ",
  },
  /** ریشه‌ها — دو نمای کامل */
  rootsA: {
    src: unitSprag,
    alt: "مجموعه‌ی کامل فری‌ویل رینگی اسپراگ با قفس و المان‌ها",
  },
  rootsB: {
    src: unitBackstop,
    alt: "بک‌استاپ کامل روی شفت با اهرم گشتاور",
  },
  /** نوار افقی — 7 کارت */
  panoAxis: {
    src: axis,
    alt: "فری‌ویل از روبه‌روی محور با حلقه‌ی پیچ‌دار و قفس المان‌ها",
  },
  panoRoller: {
    src: typeRoller,
    alt: "نمای نزدیک رولرها و فنرها در دهانه‌ی گوه‌ای فری‌ویل",
  },
  panoSealed: {
    src: unitSealed,
    alt: "فری‌ویل آب‌بندی‌شده با محفظه‌ی بسته و درپوش",
  },
  panoSprag: {
    src: fwSprag,
    alt: "فری‌ویل سنگین اسپراگ در نمای سه‌چهارم روی زمینه‌ی تیره",
  },
  panoLiftoff: {
    src: fwLiftoff,
    alt: "فری‌ویل لیفت‌آف هیدرودینامیک برای دور آزاد بالا",
  },
  panoDrawnCup: {
    src: fwDrawnCup,
    alt: "کلاچ کاپ کشیده با رولرهای سوزنی",
  },
  panoInternal: {
    src: fwInternal,
    alt: "فری‌ویل داخلی هم‌اندازه‌ی بلبرینگ",
  },
} as const satisfies Record<string, HomeStill>;
