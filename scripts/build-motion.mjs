/**
 * Builds the motion media that ships with the site:
 *
 *   1. `spin`    — the freewheel itself, turning. Three concentric layers of the
 *                  top-down studio shot (outer ring, element cage, hub) are
 *                  rotated independently and re-composited frame by frame, so
 *                  the clip shows the real relationship: the hub races, the cage
 *                  drags behind at half speed, the outer ring stays put — then
 *                  all three converge and lock.
 *   2. `ambient` — slow push-ins over the plant photography, rendered as a
 *                  seamless loop (forward + reverse) so there is no jump.
 *
 * Everything is derived from stills already in `src/assets/images`; no stock
 * footage and no external host. Output lands in `public/media` and is committed,
 * because the site must keep working offline.
 *
 *   node scripts/build-motion.mjs            # both
 *   node scripts/build-motion.mjs spin
 *   node scripts/build-motion.mjs ambient
 */
import { spawn } from "node:child_process";
import { mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import sharp from "sharp";

const FFMPEG = ffmpegInstaller.path;
const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/media");
const TMP = path.join(ROOT, ".motion-tmp");

// ۲۴ فریم کافی است: حرکت آهسته و آرام است و حجم نصف می‌شود.
const FPS = 24;

/* ------------------------------------------------------------------ helpers */

async function human(file) {
  const s = await stat(file);
  return `${(s.size / 1024).toFixed(0)} KB`;
}

/** نوشتن فریم‌ها در ورودی ffmpeg با احترام به backpressure */
function frameWriter(stdin) {
  return async (buffer) => {
    if (!stdin.write(buffer)) {
      await new Promise((resolve) => stdin.once("drain", resolve));
    }
  };
}

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(FFMPEG, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => {
      err += String(d);
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}\n${err.slice(-1600)}`));
    });
  });
}

/**
 * یک خروجی ویدیویی از توالیِ PNG که با تابع `drawFrame` ساخته می‌شود.
 * دو نسخه ساخته می‌شود: WebM/VP9 برای حجم کم و MP4/H.264 برای سافاری و اشتراک‌گذاری.
 */
async function encodeSequence({ name, width, height, frames, drawFrame, crf = { vp9: 36, h264: 27 } }) {
  const webm = path.join(OUT, `${name}.webm`);
  const mp4 = path.join(OUT, `${name}.mp4`);

  const common = ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-"];
  const scale = `scale=${width}:${height}:flags=lanczos`;

  const jobs = [
    {
      file: webm,
      args: [
        ...common,
        "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(crf.vp9),
        "-row-mt", "1", "-cpu-used", "2", "-g", "60",
        "-vf", scale, "-an", "-pix_fmt", "yuv420p", webm,
      ],
      ext: "webm",
    },
    {
      file: mp4,
      args: [
        ...common,
        "-c:v", "libx264", "-preset", "slow", "-crf", String(crf.h264),
        "-profile:v", "high", "-movflags", "+faststart", "-g", "60",
        "-vf", scale, "-an", "-pix_fmt", "yuv420p", mp4,
      ],
      ext: "mp4",
    },
  ];

  // دو انکودر موازی، هر کدام توالی فریم خودش را می‌گیرد.
  await Promise.all(
    jobs.map(async (job) => {
      const child = spawn(FFMPEG, job.args, { stdio: ["pipe", "ignore", "pipe"] });
      let err = "";
      child.stderr.on("data", (d) => {
        err += String(d);
      });
      const closed = new Promise((resolve, reject) => {
        child.on("close", (code) =>
          code === 0 ? resolve() : reject(new Error(`${job.ext} exited ${code}\n${err.slice(-1200)}`)),
        );
      });
      const write = frameWriter(child.stdin);
      for (let i = 0; i < frames; i += 1) {
        await write(await drawFrame(i));
      }
      child.stdin.end();
      await closed;
    }),
  );

  return { webm, mp4 };
}

/** توالی فریم‌ها را به یک ویدیوی بی‌درز (رفت و برگشت) تبدیل می‌کند */
async function encodePingPong({ name, width, height, frames, drawFrame }) {
  const forward = path.join(TMP, `${name}-forward.mp4`);
  const webm = path.join(OUT, `${name}.webm`);
  const mp4 = path.join(OUT, `${name}.mp4`);

  // ابتدا فقط مسیر رفت، با کیفیت بالا و بدون فشرده‌سازی زیاد، برای عبور دوم.
  const child = spawn(
    FFMPEG,
    ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
      "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", forward],
    { stdio: ["pipe", "ignore", "pipe"] },
  );
  let err = "";
  child.stderr.on("data", (d) => {
    err += String(d);
  });
  const closed = new Promise((resolve, reject) => {
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`forward exited ${code}\n${err.slice(-1200)}`)),
    );
  });
  const write = frameWriter(child.stdin);
  for (let i = 0; i < frames; i += 1) await write(await drawFrame(i));
  child.stdin.end();
  await closed;

  const filter = "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]";
  const scale = `scale=${width}:${height}:flags=lanczos`;
  await Promise.all([
    run(["-y", "-i", forward, "-filter_complex", `${filter};[out]${scale}[s]`,
      "-map", "[s]", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "41",
      "-row-mt", "1", "-cpu-used", "2", "-g", "60", "-an", "-pix_fmt", "yuv420p", webm]),
    run(["-y", "-i", forward, "-filter_complex", `${filter};[out]${scale}[s]`,
      "-map", "[s]", "-c:v", "libx264", "-preset", "slow", "-crf", "29",
      "-profile:v", "high", "-movflags", "+faststart", "-g", "60", "-an",
      "-pix_fmt", "yuv420p", mp4]),
  ]);

  return { webm, mp4 };
}

/* ------------------------------------------------------------- the mechanism */

const SPIN_SIZE = 600; // بوم کار
const SPIN_SECONDS = 6;
const SPIN_FRAMES = SPIN_SECONDS * FPS;

/** سرعت زاویه‌ای هر حلقه در هر لحظه، درجه بر ثانیه — همان منطق AxisFreewheel */
function spinSpeed(t) {
  if (t < 2.4) return { hub: 300, race: 150, flange: 0 };
  if (t < 3.6) {
    const k = (t - 2.4) / 1.2;
    const ease = k * k * (3 - 2 * k);
    return {
      hub: 300 + (55 - 300) * ease,
      race: 150 + (55 - 150) * ease,
      flange: 0 + 55 * ease,
    };
  }
  return { hub: 55, race: 55, flange: 55 };
}

async function buildSpin() {
  const D = path.join(ROOT, "src/assets/images/part");
  const square = (file, cover = false) =>
    sharp(file)
      .resize(SPIN_SIZE, SPIN_SIZE, { fit: cover ? "cover" : "fill" })
      .png()
      .toBuffer();

  const [flangeSrc, raceSrc, hubSrc, bgSrc] = await Promise.all([
    square(path.join(D, "fw-axis-flange.webp")),
    square(path.join(D, "fw-axis-race.webp")),
    square(path.join(D, "fw-axis-hub.webp")),
    sharp(path.join(D, "fw-axis-backdrop.webp"))
      .resize(SPIN_SIZE, SPIN_SIZE, { fit: "cover" })
      .blur(18)
      .modulate({ brightness: 0.66, saturation: 0.85 })
      .png()
      .toBuffer(),
  ]);

  /** چرخاندن یک لایه و برگرداندن همان بوم مربع هم‌مرکز */
  async function layerRotated(src, degrees) {
    if (Math.abs(degrees % 360) < 0.001) return src;
    const spun = await sharp(src)
      .rotate(degrees, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer({ resolveWithObject: true });
    const left = Math.round((spun.info.width - SPIN_SIZE) / 2);
    const top = Math.round((spun.info.height - SPIN_SIZE) / 2);
    return sharp(spun.data)
      .extract({ left, top, width: SPIN_SIZE, height: SPIN_SIZE })
      .png()
      .toBuffer();
  }

  // زاویه‌ی تجمعی هر لایه در طول تایم‌لاین
  const angles = { hub: 0, race: 0, flange: 0 };
  const angleTable = [];
  for (let i = 0; i < SPIN_FRAMES; i += 1) {
    const t = i / FPS;
    const s = spinSpeed(t);
    angles.hub += s.hub / FPS;
    angles.race += s.race / FPS;
    angles.flange += s.flange / FPS;
    angleTable.push({ ...angles });
  }

  const drawFrame = async (i) => {
    const a = angleTable[i];
    const [f, r, h] = await Promise.all([
      layerRotated(flangeSrc, a.flange),
      layerRotated(raceSrc, a.race),
      layerRotated(hubSrc, a.hub),
    ]);
    return sharp(bgSrc)
      .composite([
        { input: f },
        { input: r },
        { input: h },
      ])
      .png()
      .toBuffer();
  };

  const encoded = await encodeSequence({
    name: "spin",
    width: 640,
    height: 640,
    frames: SPIN_FRAMES,
    drawFrame,
    crf: { vp9: 42, h264: 30 },
  });

  // پوستر: فریم حالت قفل، تا ویدیو قبل از پخش هم درست دیده شود
  await sharp(await drawFrame(Math.round(4.4 * FPS)))
    .resize(640, 640)
    .webp({ quality: 80 })
    .toFile(path.join(OUT, "spin-poster.webp"));

  // گیف سبک برای اشتراک‌گذاری در چت و پیام‌رسان
  await buildSpinGif(drawFrame);

  return encoded;
}

/** گیف کوچک‌تر از همان توالی، برای جایی که ویدیو پخش نمی‌شود */
async function buildSpinGif(drawFrame) {
  // ۲٫۴ ثانیه = یک دور کامل نوارها: هاب ۷۲۰° و قفس ۳۶۰°، پس گیف بی‌درز می‌چرخد.
  const GIF_FPS = 12;
  const gifFrames = Math.round(2.4 * GIF_FPS);
  const step = FPS / GIF_FPS;
  const paletteFile = path.join(TMP, "gif-palette.png");
  const framesDir = path.join(TMP, "gif");
  await mkdir(framesDir, { recursive: true });

  // ImageMagick برای کوانتیزه‌کردن گیف استفاده می‌شود؛ فریم‌ها با sharp کوچک می‌شوند.
  for (let i = 0; i < gifFrames; i += 1) {
    const frame = await drawFrame(Math.round(i * step));
    await sharp(frame)
      .resize(280, 280)
      .png()
      .toFile(path.join(framesDir, `f-${String(i).padStart(4, "0")}.png`));
  }

  await run(["-y", "-i", path.join(framesDir, "f-%04d.png"),
    "-vf", "palettegen=max_colors=64:stats_mode=diff", paletteFile]);

  await run(["-y", "-i", path.join(framesDir, "f-%04d.png"), "-i", paletteFile,
    "-lavfi", "paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle",
    "-loop", "0", path.join(OUT, "spin.gif")]);
}

/* --------------------------------------------------------------- the factory */

const AMBIENT = [
  { name: "conveyor", file: "conveyor-mill.jpg" },
  { name: "textile", file: "textile-mill.jpg" },
  { name: "food", file: "food-processing.jpg" },
  { name: "packaging", file: "packaging-line.jpg" },
  { name: "printing", file: "printing-press.jpg" },
  { name: "mining", file: "quarry-conveyor.jpg" },
];

/* --------------------------------------------------------------------- main */

async function main() {
  const target = process.argv[2] ?? "all";
  await mkdir(OUT, { recursive: true });
  await mkdir(TMP, { recursive: true });

  if (target === "all" || target === "spin") {
    console.log("spin …");
    const out = await buildSpin();
    console.log(`  spin.webm ${await human(out.webm)}`);
    console.log(`  spin.mp4  ${await human(out.mp4)}`);
    console.log(`  spin.gif  ${await human(path.join(OUT, "spin.gif"))}`);
    console.log(`  poster    ${await human(path.join(OUT, "spin-poster.webp"))}`);
  }

  if (target === "all" || target === "ambient") {
    for (const item of AMBIENT) {
      console.log(`${item.name} …`);
      const out = await buildAmbientFrame(item);
      console.log(`  ${item.name}.webm ${await human(out.webm)}`);
      console.log(`  ${item.name}.mp4  ${await human(out.mp4)}`);
    }
  }

  await rm(TMP, { recursive: true, force: true });
  console.log("done →", path.relative(ROOT, OUT));
}

/** ساخت یک ویدیوی محیطی (تا بتوانیم در حلقه‌ی اصلی پیشرفت را ببینیم) */
async function buildAmbientFrame(item) {
  const AMB_W = 1120;
  const AMB_H = 630;
  const AMB_FRAMES = 3 * FPS; // ۳ ثانیه رفت، بعد برگشت
  const src = path.join(ROOT, "src/assets/images", item.file);
  const base = await sharp(src)
    .resize(AMB_W * 2, AMB_H * 2, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.9 })
    .toBuffer();

  const drawFrame = async (i) => {
    const k = i / (AMB_FRAMES - 1);
    const ease = k * k * (3 - 2 * k);
    const zoom = 1 + 0.085 * ease;
    const w = Math.round(AMB_W / zoom);
    const h = Math.round(AMB_H / zoom);
    const left = Math.round((AMB_W - w) / 2 + (ease - 0.5) * w * 0.06);
    const top = Math.round((AMB_H - h) / 2 + (ease - 0.5) * h * 0.05);
    return sharp(base)
      .extract({
        left: Math.max(0, Math.min(AMB_W - w, left)),
        top: Math.max(0, Math.min(AMB_H - h, top)),
        width: w,
        height: h,
      })
      .toBuffer();
  };

  const out = await encodePingPong({
    name: item.name,
    width: AMB_W,
    height: AMB_H,
    frames: AMB_FRAMES,
    drawFrame,
  });

  await sharp(await drawFrame(0))
    .resize(1120, 630)
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${item.name}-poster.webp`));

  return out;
}

await main();
