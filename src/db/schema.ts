import {
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** درخواست قیمت / تماس: فرم‌های سایت این‌جا ذخیره می‌شوند. */
export const inquiries = pgTable(
  "inquiries",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    company: text("company"),
    partNumber: text("part_number"),
    shaft: text("shaft"),
    power: text("power"),
    message: text("message"),
    source: text("source").notNull().default("contact"),
    pagePath: text("page_path"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("inquiries_created_at_idx").on(table.createdAt)],
);

/** اندیس جستجوی کاتالوگ؛ از داده‌ی کاتالوگ RINGSPANN پر می‌شود. */
export const catalogItems = pgTable(
  "catalog_items",
  {
    id: serial("id").primaryKey(),
    brand: text("brand").notNull(),
    designation: text("designation").notNull(),
    seriesSlug: text("series_slug").notNull(),
    seriesName: text("series_name").notNull(),
    boreMm: integer("bore_mm"),
    torqueNm: numeric("torque_nm", { precision: 12, scale: 2 }),
    speedInner: integer("speed_inner"),
    speedOuter: integer("speed_outer"),
    outerDiameterMm: integer("outer_diameter_mm"),
    widthMm: integer("width_mm"),
    weightKg: numeric("weight_kg", { precision: 10, scale: 2 }),
    href: text("href").notNull(),
  },
  (table) => [
    index("catalog_items_designation_idx").on(table.designation),
    index("catalog_items_series_idx").on(table.seriesSlug),
  ],
);

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type CatalogItem = typeof catalogItems.$inferSelect;
