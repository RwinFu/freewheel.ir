"""حذف پس‌زمینه با GrabCut الگوریتم OpenCV."""

import pathlib
import sys

import cv2
import numpy as np
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
images = root / "src" / "assets" / "images"


def remove_background_grabcut(img: Image.Image) -> Image.Image:
    """حذف پس‌زمینه با GrabCut."""
    # تبدیل به numpy array (BGR برای OpenCV)
    rgb = np.asarray(img.convert("RGB"))
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    
    h, w = bgr.shape[:2]
    
    # ماسک اولیه (همه پس‌زمینه)
    mask = np.zeros((h, w), np.uint8)
    
    # مدل‌های GrabCut
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)
    
    # مستطیل دور قطعه (مرکز تصویر)
    # فرض می‌کنیم قطعه در مرکز تصویره
    rect = (w//8, h//8, 3*w//4, 3*h//4)
    
    # اجرای GrabCut
    cv2.grabCut(bgr, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
    
    # ساخت آلفا: قطعه=255، پس‌زمینه=0
    alpha = np.where((mask == 2) | (mask == 0), 0, 255).astype(np.uint8)
    
    # ساخت تصویر RGBA
    result = Image.fromarray(rgb, "RGB")
    result.putalpha(Image.fromarray(alpha, "L"))
    
    # Crop حاشیه‌های شفاف
    alpha_arr = np.asarray(result)[..., 3]
    if alpha_arr.max() > 0:
        bbox = Image.fromarray(alpha_arr).getbbox()
        if bbox:
            pad = 5
            bbox = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(w, bbox[2] + pad),
                min(h, bbox[3] + pad),
            )
            result = result.crop(bbox)
    
    return result


def main(names: list[str]) -> None:
    for name in names:
        source = images / f"{name}.jpg"
        target = images / f"{name}.png"
        if not source.exists():
            print(f"❌ {source} پیدا نشد")
            continue
        
        with Image.open(source) as im:
            out = remove_background_grabcut(im)
        out.save(target, "PNG", optimize=True)
        
        # Verify
        with Image.open(target) as verify:
            arr = np.asarray(verify)
            alpha = arr[..., 3]
            total = alpha.size
            transparent = np.sum(alpha == 0)
            opaque = np.sum(alpha == 255)
            print(f"✅ {name}: {out.size} -> {transparent/total*100:.1f}% transparent, {opaque/total*100:.1f}% opaque")


if __name__ == "__main__":
    main(sys.argv[1:])
