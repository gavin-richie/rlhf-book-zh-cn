import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch03.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Find $$ blocks in original
const lines = md.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$$') && lines[i].trim().startsWith('$$')) {
    console.log('L' + (i+1) + ':', JSON.stringify(lines[i].trim().slice(0, 120)));
  }
}

// Now test marked-katex-extension output
marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });
const htmlLines = html.split('\n');
for (let i = 0; i < htmlLines.length; i++) {
  const l = htmlLines[i];
  if (l.includes('katex') || l.includes('semantics') || l.includes('mtable') || l.includes('tag')) {
    console.log('HTML L' + (i+1) + ':', l.trim().slice(0, 200));
  }
  // Check if raw LaTeX still appears
  if (l.includes('\\frac') || l.includes('\\pi(') || l.includes('\\tau')) {
    console.log('RAW_LATEX L' + (i+1) + ':', l.trim().slice(0, 200));
  }
}
