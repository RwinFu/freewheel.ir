/**
 * برش قطعه از پس‌زمینه — نسخه‌ی تمیز و آماده‌ی استفاده روی هر زمینه‌ای.
 *
 * فایل‌های PNG موجود در `src/assets/images` آلفا دارند، ولی لبه‌شان از پس‌زمینه‌ی
 * روشن آلوده شده: یک هاله‌ی نازک روشن دور قطعه می‌ماند که روی زمینه‌ی تیره
 * دیده می‌شود. این اسکریپت:
 *
 *   1. کانال آلفا را نرم می‌کند (حذف نویز لبه)
 *   2. رنگ لبه را از آلفا «کم‌آمیزی معکوس» می‌کند تا هاله برود
 *   3. حاشیه‌ی شفاف اضافی را می‌برد و کمی تنفس می‌گذارد
 *   4. خروجی WebP با آلفا می‌دهد (کوچک‌تر از PNG، بدون افت دیده‌شدنی)
 *
 *   node scripts/build-cutouts.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src/assets/images");
const OUT = path.join(ROOT, "public/cutouts");

/** قطعه‌هایی که می‌خواهیم به‌صورت جدا روی صحنه شناور باشند */
const PARTS = [
  { file: "fw-roller.png", name: "roller" },
  { file: "fw-sprag.png", name: "sprag" },
  { file: "fw-backstop.png", name: "backstop" },
  { file: "fw-liftoff.png", name: "liftoff" },
];

/** رنگ تقریبی پس‌زمینه‌ای که آلفا از آن بریده شده — برای حذف هاله */
const BG = [236, 234, 226];

async function human(file) {
  const s = await stat(file);
  return `${(s.size / 1024).toFixed(0)} KB`;
}

/**
 * حذف هاله‌ی پس‌زمینه از لبه‌های نیمه‌شفاف.
 * برای هر پیکسل: F = (C − (1−a)·B) / a — رنگ واقعی قطعه بازیابی می‌شود.
 */
function defringe(data, width, height) {
  const out = Buffer.from(data);
  for (let i = 0; i < width * height; i += 1) {
    const a = out[i * 4 + 3] / 255;
    if (a <= 0.02) {
      out[i * 4 + 3] = 0;
      continue;
    }
    if (a > 0.985) continue; // پیکسل کاملاً مات؛ لبه نیست
    for (let c = 0; c < 3; c += 1) {
      const value = (out[i * 4 + c] - (1 - a) * BG[c]) / a;
      out[i * 4 + c] = Math.max(0, Math.min(255, Math.round(value)));
    }
  }
  return out;
}

async function buildPart({ file, name }) {
  const input = path.join(SRC, file);
  const raw = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = raw.info;

  const cleaned =
    channels === 4
      ? defringe(raw.data, width, height)
      : raw.data; // نباید پیش بیاید، ولی امن است

  // کوچک‌کردن با پیش‌ضرب آلفا تا لبه دوباره آلوده نشود
  const resized = await sharp(cleaned, { raw: { width, height, channels: 4 } })
    .resize({ width: 1200, withoutEnlargement: true, kernel: "lanczos3" })
    .png()
    .toBuffer();

  // بریدن حاشیه‌ی خالی + کمی تنفس
  const trimmed = await sharp(resized)
    .trim({ threshold: 8 })
    .extend({
      top: 18,
      bottom: 18,
      left: 18,
      right: 18,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 86, alphaQuality: 92, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));

  return { name, width: trimmed.width, height: trimmed.height };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const part of PARTS) {
    const info = await buildPart(part);
    const file = path.join(OUT, `${part.name}.webp`);
    console.log(
      `${part.name.padEnd(9)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)} ${await human(file)}`,
    );
  }
  console.log("done →", path.relative(ROOT, OUT));
}

await main();
