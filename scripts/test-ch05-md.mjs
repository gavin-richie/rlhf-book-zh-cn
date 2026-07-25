import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Find all occurrences of aligned in the markdown
const lines = md.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('aligned')) {
    console.log(`L${i+1}: |${lines[i].slice(0, 120)}|`);
  }
}
