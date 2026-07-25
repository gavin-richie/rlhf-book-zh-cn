import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch03.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

function preprocessMath(md) {
  return md.replace(
    /(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[ \t]*(\n|$)/g,
    "$$\n\\begin{aligned}$2\\end{aligned}\n$$\n"
  );
}

md = preprocessMath(md);

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

// Check for double rendering
const katexCount = (html.match(/katex/g) || []).length;
const linesWithKatexDisplay = html.split('\n').filter(l => l.includes('katex-display'));

console.log('Total katex mentions:', katexCount);
console.log('Lines with katex-display:', linesWithKatexDisplay.length);
console.log();

// Look at first few katex lines
let issues = 0;
for (const l of linesWithKatexDisplay.slice(0, 5)) {
  console.log('LINE:', l.trim().slice(0, 300));
  // Check if raw LaTeX is embedded inside katex span
  if (l.includes('katex-mathml') && (l.includes('\\begin') || l.includes('\\frac'))) {
    issues++;
  }
}
console.log();
console.log('Potential double-render issues:', issues);
