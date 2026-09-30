import type { Metadata } from "next";

import { SabrinaLanding } from "@/components/sabrina/landing";

export const metadata: Metadata = {
  title: { absolute: "سابرینا رزیدنس | خانه‌های منتخب، انتخاب مطمئن" },
  description:
    "سابرینا رزیدنس: مجموعه‌ای منتخب از خانه‌ها و پروژه‌های تازه، همراه با کارشناسان املاک قابل اعتماد برای مسیری روان‌تر در خرید، فروش و اجاره.",
  alternates: { canonical: "/sabrina" },
  openGraph: {
    title: "سابرینا رزیدنس | خانه‌های منتخب",
    description:
      "مجموعه‌ای منتخب از خانه‌ها و پروژه‌های تازه، با مشاورهٔ تخصصی املاک.",
    url: "/sabrina",
    type: "website",
  },
};

export default function SabrinaPage() {
  return <SabrinaLanding />;
}
