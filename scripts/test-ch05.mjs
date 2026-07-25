import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

// Test with a chapter that has aligned blocks (e.g., ch05)
const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

function preprocessMath(md) {
  return md.replace(
    /(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[ \t]*(\n|$)/g,
    "$$\n\\begin{aligned}$2\\end{aligned}\n$$\n"
  );
}

md = preprocessMath(md);

// Check aligned blocks in raw markdown
const alignedInRaw = md.match(/\\begin\{aligned\}[\s\S]*?\\end\{aligned\}/g);
console.log('Aligned blocks in raw markdown:', alignedInRaw ? alignedInRaw.length : 0);
if (alignedInRaw) {
  console.log('Sample aligned block preview:');
  console.log(alignedInRaw[0].slice(0, 100));
  console.log('...');
}

// Check aligned blocks after preprocess
const alignedAfterPreprocess = md.match(/\$\$[\s\S]*?\\begin\{aligned\}[\s\S]*?\$\$/g);
console.log('\nAligned blocks wrapped in $$:', alignedAfterPreprocess ? alignedAfterPreprocess.length : 0);

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

const katexCount = (html.match(/katex/g) || []).length;
const blockCount = (html.match(/katex-display/g) || []).length;
console.log('\n=== ch05 output ===');
console.log('Total katex mentions:', katexCount);
console.log('Block math (katex-display):', blockCount);

// Check for double rendering
const lines = html.split('\n');
let doubleRender = 0;
for (const l of lines) {
  // A line with both katex HTML AND raw annotation-like content that's NOT inside a tag
  if (l.includes('katex-display') && l.includes('katex-mathml')) {
    // Check if annotation text leaks outside the math tag
    const mathMatch = l.match(/<annotation[^>]*>([\s\S]*?)<\/annotation>/g);
    if (mathMatch && mathMatch.some(a => a.includes('\\\\'))) {
      doubleRender++;
    }
  }
}
console.log('Potential double-render lines:', doubleRender);

// Check for raw aligned blocks that failed to render
const rawAlignedInHtml = html.match(/\\begin\{aligned\}[\s\S]*?\\end\{aligned\}/g);
console.log('Raw aligned blocks left in HTML:', rawAlignedInHtml ? rawAlignedInHtml.length : 0);
