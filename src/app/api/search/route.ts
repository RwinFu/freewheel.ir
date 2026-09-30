import { and, asc, eq, ilike, or, type SQL } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db, hasDatabase } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { catalogItems } from "@/db/schema";
import { searchCatalog, type CatalogEntry } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

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
