import os
from PIL import Image

def resize_images(folder, max_size=1600):
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                path = os.path.join(root, file)
                try:
                    size = os.path.getsize(path)
                    if size > 1024 * 1024:
                        print(f"Opening {path}...")
                        img = Image.open(path)
                        # Fallback for old PIL versions
                        resample_filter = getattr(Image, 'Resampling', Image).LANCZOS if hasattr(getattr(Image, 'Resampling', None), 'LANCZOS') else getattr(Image, 'LANCZOS', Image.ANTIALIAS)
                        img.thumbnail((max_size, max_size), resample_filter)
                        if img.mode in ("RGBA", "P"): img = img.convert("RGB")
                        print(f"Saving {path}...")
                        img.save(path, "JPEG", quality=80, optimize=True)
                except Exception as e:
                    print(f"Error processing {path}: {e}")

resize_images('public/gallery')
print("Done!")
