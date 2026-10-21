"""حذف پس‌زمینه‌ی تصاویر استودیویی فری‌ویل - نسخه‌ی v3.

اصلاحات نسبت به v2:
- تشخیص بهتر سایه‌ی پایینی با threshold روشنایی
- حذف سایه‌های نرم که به قطعه وصلن ولی تیره‌ترن
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


def remove_background(img: Image.Image) -> Image.Image:
    """حذف پس‌زمینه با الگوریتم بهبودیافته v3."""
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    h, w = rgb.shape[:2]
    
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    
    # تشخیص پس‌زمینه
    bg_mask = detect_background(rgb)
    
    # پیدا کردن پایین‌ترین پیکسل غیرپس‌زمینه
    non_bg_rows = np.where(~bg_mask.any(axis=1))[0]
    if len(non_bg_rows) == 0:
        return img.convert("RGBA")
    
    object_bottom = non_bg_rows.max()
    
    # تشخیص سایه‌ی پایینی: پیکسل‌های تیره زیر object_bottom
    # که به پس‌زمینه وصلن یا خیلی تیره‌اند
    shadow_mask = np.zeros((h, w), dtype=bool)
    
    # ناحیه‌ی سایه: از object_bottom تا پایین
    shadow_zone = np.zeros((h, w), dtype=bool)
    shadow_zone[object_bottom:, :] = True
    
    # سایه: تیره‌تر از آستانه و در ناحیه‌ی سایه
    is_dark = lum < 180  # آستانه‌ی بالاتر برای تشخیص سایه‌ی نرم
    shadow = shadow_zone & is_dark & ~bg_mask
    
    # تمام مؤلفه‌های متصل در این ناحیه رو حذف کن
    labels, count = ndimage.label(shadow)
    if count > 0:
        shadow_labels = []
        for lab in range(1, count + 1):
            mask = labels == lab
            size = mask.sum()
            if size < (h * w * 0.15):
                shadow_labels.append(lab)
        if shadow_labels:
            shadow_mask = np.isin(labels, shadow_labels)
    
    # پس‌زمینه نهایی
    final_bg = bg_mask | shadow_mask
    
    # ساخت ماسک باینری قطعه
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
    
    alpha_img = Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(1.0))
    
    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    
    # defringe فقط روی لبه‌های واقعی
    rgba_array = np.asarray(rgba, dtype=np.float32)
    alpha_norm = rgba_array[..., 3] / 255.0
    
    bg_color = np.array([255, 255, 255], dtype=np.float32)  # پس‌زمینه سفید
    
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
