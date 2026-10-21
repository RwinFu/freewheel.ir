"""حذف پس‌زمینه‌ی تصاویر استودیویی فری‌ویل - نسخه‌ی v4.

مشکل v3: سایه‌ی نرم زیر قطعه به‌عنوان بخشی از قطعه باقی می‌ماند چون:
- سایه به‌صورت پیکسل‌های خاکستری (نه شفاف) در PNG ذخیره شده
- آلفا=255 برای همه‌ی پیکسل‌ها (کاملاً مات)

راه‌حل v4: تشخیص سایه با ویژگی‌های رنگی:
1. پیکسل‌های خاکستری (R≈G≈B) در پایین تصویر
2. روشنایی بین 150-250 (نه سفید خالص، نه تیره مثل قطعه)
3. متصل به لبه‌ی پایینی یا زیر توده‌ی اصلی قطعه
"""

import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

root = pathlib.Path(__file__).resolve().parent.parent
images = root / "src" / "assets" / "images"


def detect_background(rgb: np.ndarray) -> np.ndarray:
    """تشخیص پس‌زمینه با flood fill از گوشه‌ها."""
    h, w = rgb.shape[:2]
    
    corners = []
    margin = 8
    for y in range(margin):
        for x in range(w):
            corners.append(rgb[y, x])
        for x in range(w):
            corners.append(rgb[h-1-y, x])
    for x in range(margin):
        for y in range(h):
            corners.append(rgb[y, x])
            corners.append(rgb[y, w-1-x])
    
    corners = np.array(corners)
    bg_mean = corners.mean(axis=0)
    bg_std = corners.std(axis=0) + 5
    
    diff = np.abs(rgb.astype(np.float32) - bg_mean)
    bg_mask = (diff < bg_std * 2.5).all(axis=-1)
    
    visited = np.zeros((h, w), dtype=bool)
    stack = [(0, 0), (0, w-1), (h-1, 0), (h-1, w-1)]
    
    while stack:
        y, x = stack.pop()
        if visited[y, x] or not bg_mask[y, x]:
            continue
        visited[y, x] = True
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                stack.append((ny, nx))
    
    return visited


def detect_shadow(rgb: np.ndarray, bg_mask: np.ndarray) -> np.ndarray:
    """تشخیص سایه‌ی پایینی با ویژگی‌های رنگی."""
    h, w = rgb.shape[:2]
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    
    # پیکسل‌های خاکستری: R، G، B نزدیک به هم
    max_channel = np.maximum(np.maximum(r, g), b)
    min_channel = np.minimum(np.minimum(r, g), b)
    is_gray = (max_channel - min_channel) < 15
    
    # روشنایی متوسط
    lum = (r + g + b) / 3.0
    
    # سایه: خاکستری + روشنایی 150-250 (نه سفید خالص، نه تیره)
    is_shadow_color = is_gray & (lum > 150) & (lum < 250)
    
    # فقط در نیمه‌ی پایینی تصویر
    shadow_zone = np.zeros((h, w), dtype=bool)
    shadow_zone[h//2:, :] = True
    
    shadow = is_shadow_color & shadow_zone & ~bg_mask
    
    # پیدا کردن مؤلفه‌های متصل
    labels, count = ndimage.label(shadow)
    if count == 0:
        return np.zeros((h, w), dtype=bool)
    
    # فقط مؤلفه‌هایی که به لبه‌ی پایینی وصلن یا خیلی بزرگن
    shadow_labels = []
    for lab in range(1, count + 1):
        mask = labels == lab
        # چک کن آیا به لبه‌ی پایینی وصله
        touches_bottom = mask[-1, :].any()
        # یا اندازه‌اش بزرگه
        size = mask.sum()
        if touches_bottom or size > 1000:
            shadow_labels.append(lab)
    
    if not shadow_labels:
        return np.zeros((h, w), dtype=bool)
    
    return np.isin(labels, shadow_labels)


def remove_background(img: Image.Image) -> Image.Image:
    """حذف پس‌زمینه و سایه با الگوریتم v4."""
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    h, w = rgb.shape[:2]
    
    # تشخیص پس‌زمینه
    bg_mask = detect_background(rgb)
    
    # تشخیص سایه
    shadow_mask = detect_shadow(rgb, bg_mask)
    
    # پس‌زمینه نهایی = پس‌زمینه + سایه
    final_bg = bg_mask | shadow_mask
    
    # ساخت ماسک قطعه
    object_mask = ~final_bg
    
    # ساخت آلفا با feather
    alpha_float = object_mask.astype(np.float32)
    
    eroded = ndimage.binary_erosion(object_mask, iterations=1)
    dilated = ndimage.binary_dilation(object_mask, iterations=1)
    edge_zone = dilated & ~eroded
    
    dist_outside = ndimage.distance_transform_edt(~object_mask)
    dist_inside = ndimage.distance_transform_edt(object_mask)
    
    alpha_float = np.where(
        object_mask,
        np.where(edge_zone, 0.5 + 0.5 * dist_inside / max(dist_inside.max(), 1), 1.0),
        np.where(edge_zone, 0.5 * (1 - dist_outside / max(dist_outside.max(), 1)), 0.0),
    )
    alpha = np.clip(alpha_float * 255, 0, 255).astype(np.uint8)
    
    alpha_img = Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(1.0))
    
    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    
    # defringe
    rgba_array = np.asarray(rgba, dtype=np.float32)
    alpha_norm = rgba_array[..., 3] / 255.0
    
    bg_color = np.array([255, 255, 255], dtype=np.float32)
    
    edge_pixels = (alpha_norm > 0.15) & (alpha_norm < 0.85)
    
    if edge_pixels.any():
        for c in range(3):
            corrected = (rgba_array[..., c] - (1 - alpha_norm) * bg_color[c]) / np.maximum(alpha_norm, 0.01)
            original = rgba_array[..., c].copy()
            rgba_array[..., c] = original
            rgba_array[edge_pixels, c] = np.clip(corrected[edge_pixels], 0, 255)
    
    rgba_array[..., 0:3] = np.clip(rgba_array[..., 0:3], 0, 255)
    rgba = Image.fromarray(rgba_array.astype(np.uint8), "RGBA")
    
    # Crop حاشیه‌های شفاف
    alpha_final = np.asarray(rgba)[..., 3]
    if alpha_final.max() > 0:
        bbox = Image.fromarray(alpha_final).getbbox()
        if bbox:
            pad = 5
            bbox = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(w, bbox[2] + pad),
                min(h, bbox[3] + pad),
            )
            rgba = rgba.crop(bbox)
    
    return rgba


def main(names: list[str]) -> None:
    for name in names:
        source = images / f"{name}.jpg"
        target = images / f"{name}.png"
        if not source.exists():
            print(f"❌ {source} پیدا نشد")
            continue
        
        with Image.open(source) as im:
            out = remove_background(im)
        out.save(target, "PNG", optimize=True)
        print(f"✅ {name}: {out.size} -> {target.name}")


if __name__ == "__main__":
    main(sys.argv[1:])
