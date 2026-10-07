"""حذف پس‌زمینه‌ی تصاویر استودیویی فری‌ویل و خروجی PNG شفاف.

چرا: برای بخش «فری‌ویل‌های شناور» صفحه‌ی اول، بعضی تصویرها باید بدون قاب و بدون
پس‌زمینه روی سطح صفحه شناور باشند.

الگوریتم: پس‌زمینه‌ی این رندرها یکدست و تیل تیره است (کانال سبز/آبی بالاتر از قرمز
و روشنایی کم). پیکسل‌های هم‌امضا با این پس‌زمینه + پیکسل‌های خیلی تیره (سایه‌ی کف)
نامزد حذف می‌شوند؛ از بین مؤلفه‌های همبند، فقط آن‌هایی که به لبه‌ی تصویر وصل‌اند
حذف می‌شوند تا شکاف‌های تیره‌ی بین المان‌های قطعه (که به لبه وصل نیستند) حفظ
بمانند. در پایان لبه‌ی آلفا کمی فِدر می‌شود تا هاله نماند.

نصب وابستگی‌ها (خارج از وابستگی‌های خود سایت):
    python3 -m venv .bgvenv && .bgvenv/bin/pip install numpy scipy pillow

اجرا:
    .bgvenv/bin/python scripts/remove_bg.py fw-roller fw-sprag fw-backstop fw-liftoff
"""

import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

root = pathlib.Path(__file__).resolve().parent.parent
images = root / "src" / "assets" / "images"


def cut_background(img: Image.Image) -> Image.Image:
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    # پس‌زمینه «نرم» است (گرادیان صاف) اما هاله‌ی مینت روی فلز بافت برس‌خورده
    # دارد؛ با انحراف معیار محلی این دو را جدا می‌کنیم.
    mean = ndimage.uniform_filter(lum, size=5)
    sq = ndimage.uniform_filter(lum * lum, size=5)
    std = np.sqrt(np.clip(sq - mean * mean, 0, None))
    smooth = std < 6

    teal = (g > r + 4) & (b > r + 4) & (lum < 150) & smooth
    dark = lum < 45
    candidate = teal | dark

    labels, count = ndimage.label(candidate)
    if count == 0:
        return img.convert("RGBA")

    border = (
        set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    )
    border.discard(0)
    bg = np.isin(labels, sorted(border))

    # تیلِ بزرگ و محصور (مثل پس‌زمینه‌ی دیده‌شده از داخل سوراخ شفت) هم
    # پس‌زمینه است؛ شکاف‌های تیره‌ی خنثی بین المان‌ها کوچک‌تر و بی‌رنگ‌اند.
    sizes = np.concatenate(
        [[0.0], ndimage.sum_labels(candidate, labels, index=list(range(1, count + 1)))]
    )  # sizes[lab]
    teal_bg = []
    for lab in range(1, count + 1):
        if lab in border or sizes[lab] <= 800:
            continue
        mask = labels == lab
        if not bool(teal[mask].any()):
            continue
        if g[mask].mean() > r[mask].mean() + 4 and b[mask].mean() > r[mask].mean() + 4:
            teal_bg.append(lab)
    bg |= np.isin(labels, teal_bg)

    # یک پیکسل داخل لبه‌ی قطعه جویده شود تا حاشیه‌ی رنگی نماند
    bg = ndimage.binary_dilation(bg, iterations=1)

    alpha = np.where(bg, 0, 255).astype("uint8")

    # فقط بزرگ‌ترین مؤلفه‌ی مات بماند تا لکه‌ی بازتاب کف و پیکسل‌های پراکنده حذف شوند
    opaque = alpha > 128
    op_labels, op_count = ndimage.label(opaque)
    if op_count > 1:
        op_sizes = np.concatenate(
            [[0.0], ndimage.sum_labels(opaque, op_labels, index=list(range(1, op_count + 1)))]
        )  # op_sizes[lab]
        biggest = int(np.argmax(op_sizes))
        alpha[op_labels != biggest] = 0

    alpha_img = Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(1.0))

    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)

    # برش دورتادور قطعه تا PNG کوچک بماند و جای‌گذاری آسان شود
    bbox = Image.fromarray(alpha).getbbox()
    if bbox:
        rgba = rgba.crop(bbox)
    return rgba


for name in sys.argv[1:]:
    source = images / f"{name}.jpg"
    target = images / f"{name}.png"
    with Image.open(source) as im:
        out = cut_background(im)
    out.save(target, "PNG", optimize=True)
    print(f"{name}: {out.size} {out.mode} -> {target.name}")
