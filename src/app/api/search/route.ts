import { and, asc, eq, ilike, or, type SQL } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { catalogItems } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ ok: true, items: [] });
  }

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
        outerDiameterMm: catalogItems.outerDiameterMm,
        href: catalogItems.href,
      })
      .from(catalogItems)
      .where(and(...filters))
      .orderBy(asc(catalogItems.boreMm))
      .limit(12);

    return NextResponse.json({ ok: true, items: rows });
  } catch {
    return NextResponse.json(
      { ok: false, items: [], error: "جستجو در دسترس نیست." },
      { status: 500 },
    );
  }
}
