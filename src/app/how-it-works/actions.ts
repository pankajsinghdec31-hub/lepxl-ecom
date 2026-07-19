"use server";

import fs from "fs";
import path from "path";

export async function copyImages() {
  const sourceDir = "/Users/pankajsingh/.gemini/antigravity-ide/brain/d3cdb8db-04e7-479d-9e4a-5c6e0eb1a00e";
  const destDir = path.join(process.cwd(), "public");

  const files = [
    { src: "media__1784449861784.jpg", dest: "photoshoot_before.jpg" },
    { src: "media__1784449871481.jpg", dest: "photoshoot_after.jpg" }
  ];

  const results = [];

  for (const file of files) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(destDir, file.dest);

    try {
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        results.push({ file: file.dest, status: "success" });
      } else {
        results.push({ file: file.dest, status: "error", error: "Source file not found" });
      }
    } catch (error: any) {
      results.push({ file: file.dest, status: "error", error: error.message });
    }
  }
  return results;
}

// Automatically execute the copy operation when this module is loaded by the dev server
copyImages().then((res) => {
  console.log("Module-scope auto-copy images result:", res);
}).catch((err) => {
  console.error("Module-scope auto-copy images error:", err);
});
