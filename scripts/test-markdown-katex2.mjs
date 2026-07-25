import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch03.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

// Check lines with both katex AND raw latex
const htmlLines = html.split('\n');
for (let i = 0; i < htmlLines.length; i++) {
  const l = htmlLines[i];
  if (l.includes('katex-display')) {
    // Print a snippet of the line
    console.log('HTML L' + (i+1) + ':', l.trim().slice(0, 300));
    console.log();
  }
}
