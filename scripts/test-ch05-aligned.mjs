import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

// Find aligned blocks in the output and show context
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('aligned')) {
    console.log(`--- L${i+1} ---`);
    console.log(lines[i].trim().slice(0, 300));
    // Also print nearby lines
    if (i > 0) console.log(`L${i}: ${lines[i-1].trim().slice(0, 200)}`);
    if (i < lines.length - 1) console.log(`L${i+2}: ${lines[i+1].trim().slice(0, 200)}`);
    console.log();
  }
}
