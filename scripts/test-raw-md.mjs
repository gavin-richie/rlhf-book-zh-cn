import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch03.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Show what the raw markdown looks like for a block equation
const lines = md.split('\n');
let inBlock = false;
let start = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('$$') && !l.includes('katex')) {
    inBlock = true;
    start = i;
  }
  if (inBlock) {
    console.log(`L${i+1}: ${l.slice(0, 120)}`);
    if (i > start + 5) break;
  }
}
