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

// Find lines with katex-mathml that also contain raw LaTeX
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('katex-mathml')) {
    // Check if raw LaTeX commands exist inside the math element
    // This could be the MML_CX fallback text
    if (l.includes('\\begin{aligned}') || (l.includes('\\frac') && l.includes('katex-mathml'))) {
      console.log(`--- L${i+1} ---`);
      console.log(l.trim().slice(0, 500));
      console.log();
    }
  }
}

// Also check: are there lines with raw latex that are NOT inside katex spans?
console.log('\n=== Checking for raw latex outside katex ===');
// Look for lines with $...$ or $$...$$ that aren't part of katex output
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if ((l.includes('$') || l.includes('$$')) && !l.includes('katex') && !l.includes('<math')) {
    // Only show if it looks like actual math content
    if (l.includes('\\') || /\d\s*[,=<>]+\s*\\\w/.test(l)) {
      console.log(`L${i+1}: ${l.trim().slice(0, 200)}`);
    }
  }
}

console.log('\n=== Total lines:', lines.length, '===');
