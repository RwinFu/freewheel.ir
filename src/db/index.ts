import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim();

/** بدون DATABASE_URL هیچ کوئری‌ای زده نمی‌شود؛ APIها مسیر جایگزین دارند. */
export const hasDatabase = Boolean(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    // بدون این دو، یک آدرس دیتابیس اشتباه، درخواست را دقیقه‌ها معلق نگه می‌دارد.
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30_000,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// خطای یک کلاینت بی‌کار نباید پروسه‌ی سرور را بیندازد.
pool.on("error", () => {});

export const db = drizzle(pool);
