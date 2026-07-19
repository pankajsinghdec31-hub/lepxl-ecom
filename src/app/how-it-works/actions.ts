"use server";

import fs from "fs";
import path from "path";

export async function copyImages() {
  const sourceDir = "/Users/pankajsingh/.gemini/antigravity-ide/brain/d3cdb8db-04e7-479d-9e4a-5c6e0eb1a00e";
  const currentSourceDir = "/Users/pankajsingh/.gemini/antigravity-ide/brain/5e135d74-db78-4109-a46b-49dc77622df5";
  const destDir = path.join(process.cwd(), "public");

  const files = [
    { src: "media__1784449861784.jpg", dest: "photoshoot_before.jpg" },
    { src: "media__1784449871481.jpg", dest: "photoshoot_after.jpg" },
    { src: "process_plan_mockup_1784451315243.png", dest: "process_plan_mockup.png" },
    { src: "process_build_mockup_1784451334454.png", dest: "process_build_mockup.png" },
    { src: "process_sales_mockup_1784451351354.png", dest: "process_sales_mockup.png" },
    { src: "media__1784452008262.png", dest: "experts_desktop.png" },
    { src: "media__1784452008135.png", dest: "experts_mobile.png" }
  ];

  const currentFiles = [
    { src: "media__1784469945601.png", dest: "ccavenue.png" },
    { src: "media__1784469974082.png", dest: "cashfree.png" },
    { src: "media__1784469993769.png", dest: "shadowfax.png" },
    { src: "media__1784469993777.png", dest: "ekart.png" },
    { src: "media__1784469993789.png", dest: "dtdc.png" }
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

  for (const file of currentFiles) {
    const srcPath = path.join(currentSourceDir, file.src);
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
