/**
 * Copy + media for the Sabrina Residences landing page.
 *
 * Two languages share one layout: the FA version is the site's native
 * Persian (RTL), the EN version falls back to the exact wording of the
 * landing-page spec (LTR). Switching re-runs the word-by-word reveal, so
 * the whole page performs itself again in the other language.
 *
 * Media: the seven Freewheel photographs in `src/assets/images`. They are
 * local files, so the page never waits on an outside CDN.
 */
import type { StaticImageData } from "next/image";

import cardHillside from "@/assets/images/quarry-conveyor.jpg";
import cardCourtyard from "@/assets/images/yarn-production.jpg";
import cardApartment from "@/assets/images/textile-mill.jpg";
import heroBuilding from "@/assets/images/food-processing.jpg";
import showreelGantry from "@/assets/images/conveyor-mill.jpg";

export type Lang = "fa" | "en";

export type NavItem = {
  /** in-page anchor or a real route on the site */
  href: string;
  label: string;
  /** the HOME pill carries the Lucide house icon */
  icon?: "house";
  /** true for links that navigate away from this page */
  route?: boolean;
};

export type Card = {
  image: StaticImageData;
  alt: string;
  index: string;
  title: string;
  area: string;
  price: string;
};

export type Copy = {
  dir: "rtl" | "ltr";
  brand: { name: string; sub: string };
  heroAlt: string;
  nav: NavItem[];
  menuLabel: string;
  closeLabel: string;
  signIn: { href: string; label: string };
  h1: readonly [string, string, string];
  tagline: readonly string[];
  explore: string;
  showreel: {
    badge: string;
    alt: string;
    barsLabel: string;
    caption: readonly string[];
  };
  latest: {
    eyebrow: string;
    heading: readonly [string, string, string];
    sub: string;
  };
  cards: readonly Card[];
};

export const HERO_IMAGE = heroBuilding;
export const SHOWREEL_IMAGE = showreelGantry;

export const COPY: Record<Lang, Copy> = {
  fa: {
    dir: "rtl",
    brand: { name: "SABRINA", sub: "RESIDENCES" },
    heroAlt: "نمای داخلی یکی از پروژه‌های سابرینا رزیدنس",
    nav: [
      { href: "#sabrina-top", label: "خانه", icon: "house" },
      { href: "#latest", label: "املاک" },
      { href: "/about", label: "مشاور", route: true },
      { href: "/contact", label: "همکاری", route: true },
    ],
    menuLabel: "منوی صفحه",
    closeLabel: "بستن منو",
    signIn: { href: "/contact", label: "ورود" },
    h1: ["SABRINA", "RESIDENCES", "HOUSE"],
    /* the Persian line is wider per character than Archivo, so the copy is
       kept short enough to sit beside the headline on a wide screen */
    tagline: [
      "کارشناسان املاکِ مطمئن",
      "برای مسیری روان‌تر و مطمئن‌تر",
      "در خرید، فروش و اجاره",
    ],
    explore: "مشاهدهٔ املاک",
    showreel: {
      badge: "Showreel",
      alt: "کارگاه یک پروژهٔ سابرینا رزیدنس",
      barsLabel: "پیشرفت نمایش",
      caption: ["خانه‌ای پیدا کن که", "با سبک زندگی‌ات هم‌سو باشد"],
    },
    latest: {
      eyebrow: "مجموعهٔ منتخب سابرینا",
      heading: ["OUR", "LATEST", "Houses"],
      sub: "منتخبی از تازه‌ترین خانه‌ها و پروژه‌های سابرینا؛ همراه با بازدید حضوری، مشاورهٔ تخصصی و بررسی اسناد پیش از امضا.",
    },
    cards: [
      {
        image: cardHillside,
        alt: "ویلای دره‌ای با دید کوه",
        index: "NO. 01 — LAVASAN",
        title: "ویلای دره‌ای با دید کوه",
        area: "۴۲۰ متر مربع",
        price: "۴٫۸ میلیارد",
      },
      {
        image: cardApartment,
        alt: "آپارتمان لوکس در طبقهٔ بالا",
        index: "NO. 02 — ZAFARANIEH",
        title: "آپارتمان لوکس، طبقهٔ بالا",
        area: "۲۱۰ متر مربع",
        price: "۶٫۲ میلیارد",
      },
      {
        image: cardCourtyard,
        alt: "خانهٔ حیاط‌دار بازسازی‌شده",
        index: "NO. 03 — KARAJ",
        title: "خانهٔ حیاط‌دار، بازسازی‌شده",
        area: "۳۵۰ متر مربع",
        price: "۳٫۱ میلیارد",
      },
    ],
  },

  en: {
    dir: "ltr",
    brand: { name: "SABRINA", sub: "RESIDENCES" },
    heroAlt: "Inside one of the Sabrina Residences projects",
    nav: [
      { href: "#sabrina-top", label: "Home", icon: "house" },
      { href: "#latest", label: "Properties" },
      { href: "/about", label: "Agent", route: true },
      { href: "/contact", label: "Partner", route: true },
    ],
    menuLabel: "Page menu",
    closeLabel: "Close menu",
    signIn: { href: "/contact", label: "Sign in" },
    h1: ["SABRINA", "RESIDENCES", "HOUSE"],
    tagline: [
      "Trusted real estate",
      "experts for a smoother, smarter",
      "property journey.",
    ],
    explore: "Explore properties",
    showreel: {
      badge: "Showreel",
      alt: "Inside one of the Sabrina Residences project sites",
      barsLabel: "Showreel progress",
      caption: ["Find a home that fits", "your lifestyle"],
    },
    latest: {
      eyebrow: "Sabrina Residences Collection",
      heading: ["OUR", "LATEST", "Houses"],
      sub: "A hand-picked row of new homes and projects, with private viewings, straight answers and paperwork checked before you sign.",
    },
    cards: [
      {
        image: cardHillside,
        alt: "Hillside villa with a mountain view",
        index: "NO. 01 — LAVASAN",
        title: "Hillside villa with a mountain view",
        area: "420 m²",
        price: "€480,000",
      },
      {
        image: cardApartment,
        alt: "Upper-floor luxury apartment",
        index: "NO. 02 — ZAFARANIEH",
        title: "Upper-floor luxury apartment",
        area: "210 m²",
        price: "€620,000",
      },
      {
        image: cardCourtyard,
        alt: "Restored house with a courtyard",
        index: "NO. 03 — KARAJ",
        title: "Restored house with a courtyard",
        area: "350 m²",
        price: "€310,000",
      },
    ],
  },
};

/** Word-reveal timings, straight from the spec (seconds). */
export const TIMING = {
  h1: { start: 0.55, step: 0.2, duration: 1 },
  tagline: { start: 1.15, step: 0.06, duration: 0.7 },
  explore: { start: 1.85, step: 0.06, duration: 0.8 },
  caption: { start: 2.15, step: 0.06, duration: 0.7 },
  latest: { start: 0, step: 0.15, duration: 0.9 },
  cards: [0.2, 0.35, 0.5],
} as const;
