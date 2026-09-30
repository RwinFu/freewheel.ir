import { NextResponse } from "next/server";

import { db, hasDatabase } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { inquiries } from "@/db/schema";
import { SHOPS } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  partNumber?: string;
  shaft?: string;
  power?: string;
  message?: string;
  source?: string;
  pagePath?: string;
};

function clean(value: unknown, max = 400): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "نام را کامل بنویسید." }, { status: 422 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, error: "شماره تماس معتبر نیست." },
      { status: 422 },
    );
  }

  // بدون پایگاه داده، فرم نمی‌تواند چیزی ذخیره کند؛ به‌جای خطای مبهم،
  // مسیر جایگزین (فروشگاه آنلاین) را به کاربر نشان می‌دهیم.
  if (!hasDatabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "ثبت آنلاین درخواست در حال حاضر فعال نیست. استعلام قیمت را از فروشگاه آنلاین بفرستید؛ برای سایزبندی هم می‌توانید تلفنی تماس بگیرید.",
        fallback: { label: SHOPS.bearing.label, url: SHOPS.bearing.url },
      },
      { status: 503 },
    );
  }

  try {
    await ensureDatabase();
    const [row] = await db
      .insert(inquiries)
      .values({
        name,
        phone,
        email: clean(body.email, 160) || null,
        company: clean(body.company, 160) || null,
        partNumber: clean(body.partNumber, 120) || null,
        shaft: clean(body.shaft, 80) || null,
        power: clean(body.power, 80) || null,
        message: message || null,
        source: clean(body.source, 40) || "contact",
        pagePath: clean(body.pagePath, 200) || null,
      })
      .returning({ id: inquiries.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید یا استعلام را از فروشگاه آنلاین بفرستید.",
        fallback: { label: SHOPS.bearing.label, url: SHOPS.bearing.url },
      },
      { status: 503 },
    );
  }
}
