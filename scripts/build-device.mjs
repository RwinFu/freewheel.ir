/**
 * ساخت «دستگاه» شفاف — موتور، کوپلینگ، گیربکس، فری‌ویل و پولی، بدون پس‌زمینه.
 *
 * دو رندر در `.renders/` داریم و هر کدام روش برش خودش را می‌خواهد:
 *
 * - `device-station-b`  پس‌زمینه‌ی یکنواخت دارد → flood-fill از لبه‌ها
 * - `device-exploded-b` پس‌زمینه‌ی وینیت دارد و مرز دقیق ندارد →
 *   ماسک بیضیِ نرم که مثل نورافکن روی صفحه می‌نشیند
 *
 * خروجی: `public/cutouts/*.webp` با آلفا.
 *
 *   node scripts/build-device.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/cutouts");

const RENDERS = [
  { src: ".renders/device-station-b.png", name: "device", matte: "flood", dark: 33 },
  { src: ".renders/device-exploded-b.png", name: "device-exploded", matte: "ellipse", dark: 70 },
];

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** روشنایی یک پیکسل از بافر RGBA */
function lumAt(data, width, x, y) {
  const i = (y * width + x) * 4;
  return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
}

/**
 * ماسک پس‌زمینه با flood-fill از لبه‌ها.
 * پس‌زمینه‌ی استودیویی یک توده‌ی تاریکِ متصل است؛ بدنه‌ی دستگاه روشن‌تر است و
 * راهی برای رسیدن به آن از بیرون وجود ندارد.
 */
function floodMask(data, width, height, dark) {
  const background = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const push = (x, y) => {
    const index = y * width + x;
    if (background[index] || lumAt(data, width, x, y) >= dark) return;
    background[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = (index - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i += 1) alpha[i] = background[i] ? 0 : 255;
  return alpha;
}

/** ماسک بیضیِ نرم، برای رندری که پس‌زمینه‌ی وینیت دارد */
function ellipseMask(width, height) {
  const alpha = Buffer.alloc(width * height);
  const cx = width / 2;
  const cy = height * 0.44;
  const rx = width * 0.54;
  const ry = height * 0.34;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
      alpha[y * width + x] = Math.round(255 * (1 - smoothstep(0.8, 1, d)));
    }
  }
  return alpha;
}

/** جزیره‌های ریز آلفا (لکه و غبار) را پاک می‌کند */
function removeSmallIslands(mask, stride, width, height, minPixels) {
  const visited = new Uint8Array(width * height);
  const stack = new Int32Array(width * height);
  const members = new Int32Array(width * height);

  for (let start = 0; start < width * height; start += 1) {
    if (visited[start] || mask[start * stride] < 18) continue;

    let top = 0;
    let count = 0;
    stack[top++] = start;
    visited[start] = 1;

    while (top > 0) {
      const index = stack[--top];
      members[count++] = index;
      const x = index % width;
      const y = (index - x) / width;

      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const next = ny * width + nx;
        if (visited[next] || mask[next * stride] < 18) continue;
        visited[next] = 1;
        stack[top++] = next;
      }
    }

    if (count < minPixels) {
      for (let i = 0; i < count; i += 1) mask[members[i] * stride] = 0;
    }
  }
}

async function build({ src, name, matte, dark }) {
  const source = sharp(path.join(ROOT, src)).ensureAlpha();
  const { width, height } = await source.metadata();
  const { data } = await source.raw().toBuffer({ resolveWithObject: true });

  const alpha =
    matte === "ellipse" ? ellipseMask(width, height) : floodMask(data, width, height, dark);

  // نرم‌کردن لبه. توجه: sharp خروجی raw را سه‌کاناله می‌دهد، پس گام از info خوانده می‌شود.
  const blurred = await sharp(alpha, { raw: { width, height, channels: 1 } })
    .blur(1.2)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mask = blurred.data;
  const stride = blurred.info.channels;

  removeSmallIslands(mask, stride, width, height, Math.round(width * height * 0.0015));

  const grade = matte === "ellipse";
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i += 1) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    if (grade) {
      // ۱۸٪ به سبزِ تیره‌ی پالت صفحه نزدیک می‌شود تا لبه‌ی ماسک دیده نشود
      rgba[i * 4] = Math.round(r * 0.82 + 11 * 0.18);
      rgba[i * 4 + 1] = Math.round(g * 0.82 + 26 * 0.18);
      rgba[i * 4 + 2] = Math.round(b * 0.82 + 18 * 0.18);
    } else {
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
    }
    rgba[i * 4 + 3] = mask[i * stride];
  }

  const cut = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 4 })
    .extend({
      top: 24,
      bottom: 24,
      left: 24,
      right: 24,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 88, alphaQuality: 95, effort: 6 })
    .toFile(path.join(OUT, `${name}.webp`));

  console.log(`${name.padEnd(16)} ${cut.width}×${cut.height}  ${(cut.size / 1024).toFixed(0)} KB`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const render of RENDERS) await build(render);
}

await main();
