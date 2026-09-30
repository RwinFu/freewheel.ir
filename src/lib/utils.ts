import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ۶۸۰۰۰ → 68,000 — اعداد فنی با ارقام لاتین و tabular-nums */
export function num(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

export function mm(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return `${num(value)}`;
}

export function anchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
