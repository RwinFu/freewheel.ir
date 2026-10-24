// .next/standalone همه‌چیز را به‌صورت خودکار ندارد؛ این اسکریپت دو بخش
// لازم برای اجرای واقعی سرور را کنار آن کپی می‌کند:
//   • public/                 → .next/standalone/public
//   • .next/static            → .next/standalone/.next/static
// بعد از آن، پوشه‌ی .next/standalone به‌تنهایی روی VPS قابل اجراست:
//   node .next/standalone/server.js
import { cpSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(path.join(standalone, "server.js"))) {
  console.error(
    "خروجی standalone پیدا نشد؛ اول `npm run build` را اجرا کنید " +
      "(پیکربندی `output: \"standalone\"` در حالت معمولی فعال است).",
  );
  process.exit(1);
}

cpSync(path.join(root, "public"), path.join(standalone, "public"), {
  recursive: true,
});
cpSync(
  path.join(root, ".next", "static"),
  path.join(standalone, ".next", "static"),
  { recursive: true },
);

// متغیرهای زمان اجرا (مثل DATABASE_URL): سرور standalone فایل env را
// از پوشه‌ی خودش می‌خواند، نه ریشه‌ی پروژه — اگر وجود دارد کپی می‌کنیم.
// (این فایل در .gitignore است و فقط روی سرور ساخته/کپی می‌شود.)
if (existsSync(path.join(root, ".env.local"))) {
  cpSync(path.join(root, ".env.local"), path.join(standalone, ".env.local"));
}

console.log("نسخه‌ی آماده‌ی استقرار در .next/standalone کامل شد.");
