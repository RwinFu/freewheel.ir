"""ساخت لایه‌های چرخان فری‌ویل از یک رندر روبه‌روی محور.

چرا: بخش «اصل کار» صفحه‌ی اول باید عکس واقعی قطعه باشد و هر بخش (حلقه‌ی
داخلی، المان‌های قفل‌کننده، حلقه‌ی بیرونی) جداگانه و با سرعت خودش بچرخد. بدون
این تفکیک، چرخاندن یک عکس تخت کل قطعه را یک‌جا می‌چرخاند و معنای مکانیکی ندارد.

روش: در نمای روبه‌روی محور، هر حلقه یک نوار شعاعی است. پس یک عکس می‌تواند به
چند لایه‌ی هم‌مرکز بریده شود:

1. مرکز و شعاع بیرونی قطعه با برازش دایره روی لبه‌های گرادیانی تصویر پیدا
   می‌شود (نه با حدس دستی)؛
2. مرزهای نوارها از پروفایل شعاعی روشنایی گرفته شده‌اند و در همان شکاف‌های
   تیره‌ی بین حلقه‌ها می‌افتند تا لبه‌ی برش دیده نشود
   (`BAND` و `BORE_CUT` پایین‌تر)؛
3. هر نوار با یک ماسک آلفای نرم (feather) جدا می‌شود؛ سوراخ شفت هم شفاف
   می‌شود تا قطعه واقعاً «توخالی» دیده شود؛
4. هر لایه در یک بوم مربعِ هم‌اندازه و هم‌مرکز ذخیره می‌شود، پس چرخاندن هر
   لایه حول مرکز خودش = چرخاندن همان حلقه حول محور قطعه.

خروجی: `src/assets/images/part/*.webp` (لایه‌ها) و نسخه‌ی جِی‌پی‌جی عکس‌ها،
برای کارت‌های «انواع رایج» و گالری صفحه‌ی اول.

نصب وابستگی‌ها (خارج از وابستگی‌های خود سایت):

    python3 -m venv .rendervenv && .rendervenv/bin/pip install numpy scipy pillow

رندرهای خام در `.renders/` نگه داشته می‌شوند (در گیت نیستند؛ هر بار می‌توان از
خروجی مدل تصویرساز دوباره ساخت).

    .rendervenv/bin/python scripts/build_freewheel_layers.py --renders .renders
"""

from __future__ import annotations

import argparse
import pathlib
import sys

import numpy as np
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
out_dir = root / "src" / "assets" / "images" / "part"

# --- هندسه‌ی نوارها، نسبت به شعاع بیرونی قطعه (R) ---------------------------
# فهرست: نام لایه، شعاع داخلی، شعاع بیرونی
BANDS: list[tuple[str, float, float]] = [
    ("hub", 0.3785, 0.5899),  # حلقه‌ی داخلی و توپی؛ تا لبه‌ی سوراخ شفت
    ("race", 0.5899, 0.7826),  # رینگ بیرونی + ردیف المان‌های قفل‌کننده
    ("flange", 0.7826, 0.992),  # فلنج بیرونی و لبه‌ی مونتاژ (۰٫۹۹۲ = حذف هاله‌ی لبه)
]
FEATHER = 0.006  # عرض نرم‌شدن لبه‌ها، نسبتی از R (≈۳ پیکسل در بوم نهایی)
CANVAS = 900  # اندازه‌ی ضلع بوم مربع لایه‌ها
MARGIN = 1.05  # بوم چند برابر R باشد (کمی جای اضافه تا لبه‌ی قطعه نبُرد)


def load_rgb(path: pathlib.Path) -> np.ndarray:
    with Image.open(path) as im:
        return np.asarray(im.convert("RGB"), dtype=np.float32)


def luminance(rgb: np.ndarray) -> np.ndarray:
    return rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)


def fit_axis(lum: np.ndarray) -> tuple[float, float, float]:
    """مرکز و شعاع بیرونی قطعه را با برازش دایره روی لبه‌های گرادیانی پیدا می‌کند.

    چرا RANSAC: بافت قطعه (المان‌ها، سوراخ پیچ‌ها، لبه‌ی برس‌خورده) هزاران لبه‌ی
    داخلی می‌سازد و برازش ساده به یکی از آن‌ها می‌چسبد. رأی‌گیری تصادفی روی
    سه‌نقطه‌ای‌ها همان دایره‌ی بیرونی را پیدا می‌کند، چون فقط آن یک دایره در
    تمام زوایا لبه دارد.
    """
    h, w = lum.shape
    gx = np.zeros_like(lum)
    gy = np.zeros_like(lum)
    gx[:, 1:-1] = lum[:, 2:] - lum[:, :-2]
    gy[1:-1, :] = lum[2:, :] - lum[:-2, :]
    grad = np.hypot(gx, gy)

    ys, xs = np.nonzero(grad > 40)
    # حاشیه‌ی تصویر حذف می‌شود؛ گرادیان نرم پس‌زمینه در لبه‌ها لبه‌ی جعلی می‌سازد
    inside = (ys > 12) & (ys < h - 12) & (xs > 12) & (xs < w - 12)
    pts = np.c_[xs[inside], ys[inside]].astype(np.float64)

    rng = np.random.default_rng(20261007)
    r_lo, r_hi = 0.35 * min(w, h), 0.55 * min(w, h)
    c_lo_x, c_hi_x = 0.3 * w, 0.7 * w
    c_lo_y, c_hi_y = 0.2 * h, 0.8 * h
    best: tuple[int, float, float, float] | None = None
    for _ in range(20000):
        (ax, ay), (bx, by), (cx_, cy_) = pts[rng.choice(len(pts), 3, replace=False)]
        d = 2 * (ax * (by - cy_) + bx * (cy_ - ay) + cx_ * (ay - by))
        if abs(d) < 1e-9:
            continue
        ux = ((ax**2 + ay**2) * (by - cy_) + (bx**2 + by**2) * (cy_ - ay) + (cx_**2 + cy_**2) * (ay - by)) / d
        uy = ((ax**2 + ay**2) * (cx_ - bx) + (bx**2 + by**2) * (ax - cx_) + (cx_**2 + cy_**2) * (bx - ax)) / d
        radius = float(np.hypot(ax - ux, ay - uy))
        if not (r_lo < radius < r_hi):
            continue
        if not (c_lo_x < ux < c_hi_x and c_lo_y < uy < c_hi_y):
            continue
        inliers = int((np.abs(np.hypot(pts[:, 0] - ux, pts[:, 1] - uy) - radius) < 1.6).sum())
        if best is None or inliers > best[0]:
            best = (inliers, float(ux), float(uy), radius)

    assert best is not None, "دایره‌ی قطعه پیدا نشد"
    _, cx, cy, radius = best
    # پالایش با سخت‌ترشدن تدریجی تلورانس: از دایره‌ی رأی‌گیری‌شده تا زیرپیکسل
    for tol in (1.6, 1.0, 0.6, 0.4):
        dist = np.abs(np.hypot(pts[:, 0] - cx, pts[:, 1] - cy) - radius)
        keep = pts[dist < tol]
        A = np.c_[2 * keep[:, 0], 2 * keep[:, 1], np.ones(len(keep))]
        b = (keep**2).sum(axis=1)
        sol, *_ = np.linalg.lstsq(A, b, rcond=None)
        cx, cy = float(sol[0]), float(sol[1])
        radius = float(np.sqrt(sol[2] + cx * cx + cy * cy))
    return cx, cy, radius


def smoothstep(edge0: np.ndarray, edge1: np.ndarray, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - edge0) / np.maximum(edge1 - edge0, 1e-6), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def square_crop(
    rgb: np.ndarray, cx: float, cy: float, radius: float, size: int = CANVAS
) -> tuple[Image.Image, float]:
    """برش مربعِ هم‌مرکز با قطعه و برگرداندن مقیاس (پیکسل خروجی به ازای پیکسل منبع)."""
    half = radius * MARGIN
    box = (
        int(round(cx - half)),
        int(round(cy - half)),
        int(round(cx + half)),
        int(round(cy + half)),
    )
    crop = Image.fromarray(rgb.astype(np.uint8), "RGB").crop(box)
    scale = size / crop.width
    return crop.resize((size, size), Image.LANCZOS), scale


def band_alpha(r_px: np.ndarray, lo: float, hi: float, r_outer: float) -> np.ndarray:
    f = max(FEATHER * r_outer, 1.2)
    inner = smoothstep(lo * r_outer - f, lo * r_outer + f, r_px)
    outer = 1.0 - smoothstep(hi * r_outer - f, hi * r_outer + f, r_px)
    return inner * outer


def write_layers(render: pathlib.Path) -> None:
    rgb = load_rgb(render)
    lum = luminance(rgb)
    cx, cy, radius = fit_axis(lum)
    h, w = lum.shape
    print(f"[{render.name}] مرکز ({cx:.1f}, {cy:.1f}) و شعاع {radius:.1f} پیکسل از کادر {w}×{h}")

    crop, scale = square_crop(rgb, cx, cy, radius)
    r_outer = radius * scale
    size = crop.width
    yy, xx = np.mgrid[0:size, 0:size]
    r_px = np.hypot(xx - size / 2, yy - size / 2)

    for name, lo, hi in BANDS:
        alpha = band_alpha(r_px, lo, hi, r_outer)
        rgba = crop.convert("RGBA")
        rgba.putalpha(Image.fromarray((alpha * 255).round().astype(np.uint8), "L"))
        target = out_dir / f"fw-axis-{name}.webp"
        rgba.save(target, "WEBP", quality=84, method=6)
        covered = float((alpha > 0.5).mean())
        print(f"  {target.name}: {target.stat().st_size // 1024} کیلوبایت، {covered * 100:.1f}% پوشش بوم")


def write_backdrop(render: pathlib.Path, size: int = 640) -> None:
    """پس‌زمینه‌ی استودیویی ثابت.

    لبه‌ی نرم‌شده‌ی هر نوار باید روی همان پیکسل‌های عکس اصلی بیفتد، وگرنه یک
    حلقه‌ی نازک روشن/تیره سر جای برش دیده می‌شود. پس همان عکس، بدون آلفا،
    پشت همه‌ی لایه‌ها می‌نشیند و سایه و گرادیان کف هم همراه خودش می‌آید. چون
    این تصویر بافت ندارد، با اندازه‌ی کوچک‌تر و کیفیت پایین‌تر هم تمیز می‌ماند.
    """
    rgb = load_rgb(render)
    cx, cy, radius = fit_axis(luminance(rgb))
    crop, _ = square_crop(rgb, cx, cy, radius, size=size)
    target = out_dir / "fw-axis-backdrop.webp"
    crop.save(target, "WEBP", quality=72, method=6)
    print(f"  {target.name}: {crop.width}×{crop.height}، {target.stat().st_size // 1024} کیلوبایت")


def write_photo(render: pathlib.Path, name: str, max_width: int = 1400, quality: int = 84) -> None:
    im = Image.open(render).convert("RGB")
    if im.width > max_width:
        im = im.resize((max_width, round(im.height * max_width / im.width)), Image.LANCZOS)
    target = out_dir / f"{name}.jpg"
    im.save(target, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {target.name}: {im.width}×{im.height}، {target.stat().st_size // 1024} کیلوبایت")


PHOTOS = [
    ("axis-freewheel", "fw-axis"),  # نمای روبه‌روی محور (منبع لایه‌ها)
    ("type-sprag", "type-sprag"),
    ("type-roller", "type-roller"),
    ("unit-backstop", "unit-backstop"),
    ("unit-sealed", "unit-sealed"),
    ("unit-sprag", "unit-sprag"),
]


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "--renders",
        type=pathlib.Path,
        default=root / ".renders",
        help="پوشه‌ی رندرهای خام PNG (پیش‌فرض: .renders/)",
    )
    parser.add_argument(
        "--only",
        choices=["all", "layers", "photos"],
        default="all",
        help="کدام بخش ساخته شود",
    )
    args = parser.parse_args(argv)

    out_dir.mkdir(parents=True, exist_ok=True)
    missing = [n for n, _ in PHOTOS if not (args.renders / f"{n}.png").exists()]
    if missing:
        print(f"رندرهای غایب در {args.renders}: {', '.join(missing)}", file=sys.stderr)
        return 1

    if args.only in ("all", "layers"):
        print("— لایه‌های چرخان —")
        write_layers(args.renders / "axis-freewheel.png")
        write_backdrop(args.renders / "axis-freewheel.png")

    if args.only in ("all", "photos"):
        print("— عکس‌های محصول —")
        for source_name, target_name in PHOTOS:
            write_photo(args.renders / f"{source_name}.png", target_name)

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
