import os
import shutil

desktop = "/Users/pankajsingh/Desktop"
dest_dir = "/Users/pankajsingh/Desktop/lepxl ecom/public/review_images"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

files = os.listdir(desktop)
copied = []
for f in files:
    if f.startswith("Screenshot") and "2026-07-17" in f:
        src_path = os.path.join(desktop, f)
        # Clean name: remove special space character and make lowercase
        clean_name = f.replace(" ", " ").replace(" ", "_").lower()
        dst_path = os.path.join(dest_dir, clean_name)
        shutil.copy(src_path, dst_path)
        copied.append((f, clean_name))

print("Copied files:")
for c in copied:
    print(f"  {c[0]} -> {c[1]}")
