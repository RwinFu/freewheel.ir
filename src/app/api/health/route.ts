import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up" });
  } catch {
    return NextResponse.json({ status: "ok", database: "down" });
  }
}
