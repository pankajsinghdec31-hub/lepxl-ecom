const fs = require('fs');
const https = require('https');

const url = 'https://higgsfield.ai/';
const outputFilePath = './higgsfield.html';

console.log("Fetching " + url + "...");
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync(outputFilePath, data);
    console.log("Saved to " + outputFilePath + " (" + data.length + " bytes)");
    
    // Now let's parse the structure!
    console.log("\n=== PARSING SECTIONS ===");
    const sectionRegex = /<section([^>]*?)>([\s\S]*?)<\/section>/gi;
    let sectionCount = 0;
    let match;
    while ((match = sectionRegex.exec(data)) !== null && sectionCount < 15) {
      sectionCount++;
      const attrs = match[1];
      const inner = match[2];
      
      const classMatch = attrs.match(/class="([^"]*?)"/i);
      const className = classMatch ? classMatch[1] : '';
      
      const idMatch = attrs.match(/id="([^"]*?)"/i);
      const idName = idMatch ? idMatch[1] : '';
      
      console.log(`\n--- Section ${sectionCount} (id="${idName}", class="${className}") ---`);
      
      // Find headings
      const hRegex = /<(h1|h2|h3|h4|h5)([^>]*?)>([\s\S]*?)<\/\1>/gi;
      let hMatch;
      const headings = [];
      while ((hMatch = hRegex.exec(inner)) !== null) {
        headings.push(`${hMatch[1]}: "${hMatch[3].replace(/<[^>]*>/g, '').trim().substring(0, 150)}"`);
      }
      if (headings.length > 0) {
        console.log("  Headings:", headings);
      }
      
      // Find primary links / buttons
      const btnRegex = /<(button|a)([^>]*?)>([\s\S]*?)<\/\1>/gi;
      let btnMatch;
      const buttons = [];
      while ((btnMatch = btnRegex.exec(inner)) !== null && buttons.length < 5) {
        const text = btnMatch[3].replace(/<[^>]*>/g, '').trim();
        if (text) {
          buttons.push(`${btnMatch[1]}: "${text.substring(0, 50)}"`);
        }
      }
      if (buttons.length > 0) {
        console.log("  Buttons/Links:", buttons);
      }
      
      // Look for video and images
      const mediaRegex = /<(video|img)([^>]*?)>/gi;
      let mediaMatch;
      let mediaCount = 0;
      while ((mediaMatch = mediaRegex.exec(inner)) !== null) {
        mediaCount++;
      }
      if (mediaCount > 0) {
        console.log(`  Media elements: ${mediaCount}`);
      }
    }
  });
}).on('error', (err) => {
  console.error("Error: " + err.message);
});
