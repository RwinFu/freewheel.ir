// محدودکننده‌ی نرخ درون‌حافظه‌ای برای APIهای حساس (ثبت استعلام، جست‌وجو).
// برای استقرار تک‌نمونه‌ای روی VPS کافی است و بدون وابستگی تازه کار می‌کند؛
// اگر روزی چند نمونه‌ی موازی اجرا شد، باید نسخه‌ی اشتراکی (مثل Redis) جایگزین شود.

type Bucket = { count: number; resetAt: number };

type RateResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

const globalForRateLimit = globalThis as typeof globalThis & {
  __freewheelRateLimit?: Map<string, Bucket>;
};

// مثل الگوی pool دیتابیس، نقشه روی globalThis می‌ماند تا در HMR حالت dev
// شمارنده‌ها از نو ساخته نشوند.
const buckets = (globalForRateLimit.__freewheelRateLimit ??= new Map());

const MAX_KEYS = 10_000;

function sweepExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}

/**
 * یک سهمیه از پنجره‌ی زمانی برمی‌دارد. اگر سقف پُر باشد، `retryAfterSeconds`
 * برای هدر Retry-After برمی‌گرداند.
 */
export function allowRequest(
  key: string,
  limit: number,
  windowMs: number,
): RateResult {
  const now = Date.now();
  if (buckets.size > MAX_KEYS) sweepExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  bucket.count += 1;
  return { allowed: true };
}
