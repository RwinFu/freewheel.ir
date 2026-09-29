import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Latin digits, grouped — for part numbers and codes. */
export function num(n: number) {
  return n.toLocaleString('en-US')
}

/** Persian digits, grouped — for anything a Persian reader scans as prose. */
export function faNum(n: number) {
  return n.toLocaleString('fa-IR')
}

/**
 * Technical values are read column-wise, so they stay in Latin digits
 * with thin grouping. A spec table that mixes `۱٬۰۰۰` and `1,000` in
 * the same row looks like a typo; picking one convention and holding it
 * is what makes the table scannable.
 */
export function spec(n: number, unit?: string) {
  const s = n.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return unit ? `${s} ${unit}` : s
}
