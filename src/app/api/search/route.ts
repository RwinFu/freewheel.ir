import { and, asc, eq, ilike, or, type SQL } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db, hasDatabase } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { catalogItems } from "@/db/schema";
import { searchCatalog, type CatalogEntry } from "@/lib/catalog";
import { allowRequest } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// جست‌وجو ارزان‌تر است ولی باز هم ربات نباید بتواند دیتابیس را خسته کند
const RATE_LIMIT = 120;
const RATE_WINDOW_MS = 60 * 1000;
const MAX_QUERY_LENGTH = 120;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  return `search:${ip}`;
}

export async function GET(request: Request) {
  const rate = allowRequest(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "تعداد درخواست‌ها زیاد شد؛ کمی بعد دوباره امتحان کنید." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const query =
    new URL(request.url).searchParams.get("q")?.trim().slice(0, MAX_QUERY_LENGTH) ?? "";

  if (query.length < 2) {
    return NextResponse.json({ ok: true, items: [], source: "catalog" });
  }

  // مسیر اول: پایگاه داده (اگر تنظیم شده و جواب بدهد).
  if (hasDatabase) {
    try {
      await ensureDatabase();
      const pattern = `%${query}%`;
      const numericQuery = Number(query);
      const textMatch = or(
        ilike(catalogItems.designation, pattern),
        ilike(catalogItems.seriesName, pattern),
        ilike(catalogItems.seriesSlug, pattern),
      );
      const numberMatch = Number.isFinite(numericQuery)
        ? eq(catalogItems.boreMm, Math.round(numericQuery))
        : undefined;
      const filters: SQL[] = [or(textMatch, numberMatch) as SQL];

      const rows = await db
        .select({
          designation: catalogItems.designation,
          seriesName: catalogItems.seriesName,
          seriesSlug: catalogItems.seriesSlug,
          boreMm: catalogItems.boreMm,
          torqueNm: catalogItems.torqueNm,
          speedInner: catalogItems.speedInner,
          speedOuter: catalogItems.speedOuter,
          outerDiameterMm: catalogItems.outerDiameterMm,
          widthMm: catalogItems.widthMm,
          weightKg: catalogItems.weightKg,
          href: catalogItems.href,
        })
        .from(catalogItems)
        .where(and(...filters))
        .orderBy(asc(catalogItems.boreMm))
        .limit(12);

      if (rows.length > 0) {
        const items: CatalogEntry[] = rows.map((row) => ({
          brand: "RINGSPANN",
          designation: row.designation,
          seriesName: row.seriesName,
          seriesSlug: row.seriesSlug,
          boreMm: row.boreMm,
          torqueNm: row.torqueNm === null ? null : Number(row.torqueNm),
          speedInner: row.speedInner,
          speedOuter: row.speedOuter,
          outerDiameterMm: row.outerDiameterMm,
          widthMm: row.widthMm,
          weightKg: row.weightKg === null ? null : Number(row.weightKg),
          href: row.href,
        }));
        return NextResponse.json({ ok: true, items, source: "database" });
      }
    } catch {
      // پایگاه داده در دسترس نیست؛ با کاتالوگ ایستا ادامه می‌دهیم.
    }
  }

  // مسیر دوم: کاتالوگ ایستای سایت — همیشه در دسترس.
  return NextResponse.json({ ok: true, items: searchCatalog(query), source: "catalog" });
}
