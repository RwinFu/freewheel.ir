import { sql } from "drizzle-orm";

import { db } from "@/db";
import { catalogItems } from "@/db/schema";
import { RINGSPANN_SERIES } from "@/content/ringspann";

let ready: Promise<void> | null = null;

async function createTables() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id serial PRIMARY KEY,
      name text NOT NULL,
      phone text NOT NULL,
      email text,
      company text,
      part_number text,
      shaft text,
      power text,
      message text,
      source text NOT NULL DEFAULT 'contact',
      page_path text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at)`);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS catalog_items (
      id serial PRIMARY KEY,
      brand text NOT NULL,
      designation text NOT NULL,
      series_slug text NOT NULL,
      series_name text NOT NULL,
      bore_mm integer,
      torque_nm numeric(12,2),
      speed_inner integer,
      speed_outer integer,
      outer_diameter_mm integer,
      width_mm integer,
      weight_kg numeric(10,2),
      href text NOT NULL
    )
  `);
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS catalog_items_designation_idx ON catalog_items (designation)`,
  );
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS catalog_items_series_idx ON catalog_items (series_slug)`,
  );
}

async function seedCatalog() {
  const rows = RINGSPANN_SERIES.flatMap((series) =>
    series.sizes.map((size) => ({
      brand: "RINGSPANN",
      designation: size.designation,
      seriesSlug: series.slug,
      seriesName: `RINGSPANN ${series.designation}`,
      boreMm: size.bore,
      torqueNm: String(size.torqueNm),
      speedInner: size.speedInner,
      speedOuter: size.speedOuter,
      outerDiameterMm: size.outerDiameter,
      widthMm: size.width,
      weightKg: size.weightKg === null ? null : String(size.weightKg),
      href: `/ringspann/${series.slug}#${size.designation.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  );

  if (rows.length === 0) return;

  const existing = await db.select({ id: catalogItems.id }).from(catalogItems).limit(1);
  if (existing.length > 0) return;

  await db.insert(catalogItems).values(rows).onConflictDoNothing();
}

/**
 * جدول‌ها را در صورت نیاز می‌سازد و کاتالوگ را یک بار پر می‌کند.
 * در محیط build پایگاه داده همیشه در دسترس نیست، برای همین فقط از
 * مسیرهای API استفاده می‌شود.
 */
export function ensureDatabase(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await createTables();
      await seedCatalog();
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}
