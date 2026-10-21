"""حذف پس‌زمینه‌ی تصاویر استودیویی فری‌ویل - نسخه‌ی v5.

استراتژی جدید: سایه‌ها همیشه زیر قطعه‌اند، نه داخل آن.

مراحل:
1. تشخیص پس‌زمینه (flood fill از گوشه‌ها)
2. پیدا کردن پایین‌ترین نقطه‌ی قطعه (پیکسل‌های تیره/غیرخاکستری)
3. حذف پیکسل‌های خاکستری فقط در زیر آن خط
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
    margin = 10
    for y in range(margin):
        for x in range(0, w, 5):  # نمونه‌برداری سریع‌تر
            corners.append(rgb[y, x])
    for y in range(h - margin, h):
        for x in range(0, w, 5):
            corners.append(rgb[y, x])
    for x in range(margin):
        for y in range(0, h, 5):
            corners.append(rgb[y, x])
    for x in range(w - margin, w):
        for y in range(0, h, 5):
            corners.append(rgb[y, x])
    
    corners = np.array(corners)
    bg_mean = corners.mean(axis=0)
    bg_std = corners.std(axis=0) + 8
    
    diff = np.abs(rgb.astype(np.float32) - bg_mean)
    bg_mask = (diff < bg_std * 2.0).all(axis=-1)
    
    # Morphological cleanup
    bg_mask = ndimage.binary_opening(bg_mask, iterations=1)
    
    # Flood fill از گوشه‌ها
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


def find_object_bottom(rgb: np.ndarray, bg_mask: np.ndarray) -> int:
    """پیدا کردن پایین‌ترین نقطه‌ی واقعی قطعه.

    قطعه = پیکسل‌هایی که نه پس‌زمینه‌اند و نه خاکستری روشن (سایه).
    """
    h, w = rgb.shape[:2]
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    
    # پیکسل‌های غیرپس‌زمینه
    not_bg = ~bg_mask
    
    # پیکسل‌های خاکستری روشن (احتمالاً سایه)
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    is_light_gray = (max_c - min_c) < 12  # خاکستری
    is_bright = max_c > 200  # روشن
    
    # قطعه واقعی = غیرپس‌زمینه و (تیره یا رنگی)
    is_object = not_bg & ~(is_light_gray & is_bright)
    
    # پیدا کردن پایین‌ترین ردیف با پیکسل قطعه
    rows_with_object = np.where(is_object.any(axis=1))[0]
    if len(rows_with_object) == 0:
        return h  # fallback
    
    return rows_with_object.max()


def remove_shadow_below(rgb: np.ndarray, bg_mask: np.ndarray, object_bottom: int) -> np.ndarray:
    """حذف سایه‌های زیر قطعه."""
    h, w = rgb.shape[:2]
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    
    # ناحیه‌ی زیر قطعه
    below_zone = np.zeros((h, w), dtype=bool)
    below_zone[object_bottom:, :] = True
    
    # پیکسل‌های خاکستری در این ناحیه
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    is_gray = (max_c - min_c) < 15
    is_bright = max_c > 180
    
    shadow = below_zone & is_gray & is_bright & ~bg_mask
    
    # مؤلفه‌های متصل
    labels, count = ndimage.label(shadow)
    if count == 0:
        return np.zeros((h, w), dtype=bool)
    
    shadow_labels = []
    for lab in range(1, count + 1):
        mask = labels == lab
        size = mask.sum()
        # حذف مؤلفه‌های خیلی بزرگ (احتمالاً بخشی از قطعه‌اند)
        if size < (h * w * 0.1):
            shadow_labels.append(lab)
    
    if not shadow_labels:
        return np.zeros((h, w), dtype=bool)
    
    return np.isin(labels, shadow_labels)


def remove_background(img: Image.Image) -> Image.Image:
    """حذف پس‌زمینه و سایه با الگوریتم v5."""
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    h, w = rgb.shape[:2]
    
    # مرحله 1: تشخیص پس‌زمینه
    bg_mask = detect_background(rgb)
    
    # مرحله 2: پیدا کردن پایین قطعه
    obj_bottom = find_object_bottom(rgb, bg_mask)
    
    # مرحله 3: حذف سایه‌های زیر قطعه
    shadow_mask = remove_shadow_below(rgb, bg_mask, obj_bottom)
    
    # پس‌زمینه نهایی
    final_bg = bg_mask | shadow_mask
    
    # ساخت ماسک قطعه
    object_mask = ~final_bg
    
    # ساخت آلفا با feather ملایم
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
    
    alpha_img = Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(1.5))
    
    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    
    # Crop حاشیه‌های شفاف
    alpha_final = np.asarray(rgba)[..., 3]
    if alpha_final.max() > 0:
        bbox = Image.fromarray(alpha_final).getbbox()
        if bbox:
            pad = 3
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
