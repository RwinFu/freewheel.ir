import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db, hasDatabase } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDatabase) {
    return NextResponse.json({
      status: "ok",
      database: "not-configured",
      search: "catalog",
    });
  }

  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up", search: "database" });
  } catch {
    return NextResponse.json({ status: "ok", database: "down", search: "catalog" });
  }
}
