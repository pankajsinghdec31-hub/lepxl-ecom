import fs from "fs";
import path from "path";

const STORES = [
  { name: "kishoriju", url: "https://kishoriju.com/" },
  { name: "kalpveda", url: "https://kalpveda.co.in/" },
  { name: "highskycoffee", url: "https://highskycoffee.com/" },
  { name: "vaaniveda", url: "https://www.vaaniveda.com/" },
  { name: "styleora", url: "https://styleora.in/" },
  { name: "miktoksiliving", url: "https://www.miktoksiliving.com/" },
  { name: "krustoz", url: "https://krustoz.com/" },
  { name: "irayaalthea", url: "https://irayaalthea.com/" }
];

const OUT_DIR = path.resolve("./public/stores");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
}

async function fetchScreenshot(store) {
  const destPath = path.join(OUT_DIR, `${store.name}.png`);
  console.log(`Processing ${store.name} (${store.url})...`);

  // Try microlink first
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(store.url)}&screenshot=true&meta=false&waitForTimeout=2000`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.status === "success" && data.data?.screenshot?.url) {
      console.log(`Downloading from microlink for ${store.name}...`);
      await downloadImage(data.data.screenshot.url, destPath);
      console.log(`✓ Saved ${store.name}.png via Microlink`);
      return;
    }
  } catch (err) {
    console.warn(`Microlink failed for ${store.name}: ${err.message}`);
  }

  // Fallback to thum.io
  try {
    console.log(`Trying thum.io fallback for ${store.name}...`);
    const thumUrl = `https://image.thum.io/get/width/1280/crop/800/${store.url}`;
    await downloadImage(thumUrl, destPath);
    console.log(`✓ Saved ${store.name}.png via Thum.io`);
  } catch (err) {
    console.error(`Failed to capture ${store.name}: ${err.message}`);
  }
}

async function run() {
  for (const store of STORES) {
    await fetchScreenshot(store);
    // short delay to be nice to API
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log("All screenshots processed!");
}

run();
