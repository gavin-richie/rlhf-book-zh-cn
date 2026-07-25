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

// Split into lines and analyze each line
const lines = html.split('\n');
console.log('Total lines:', lines.length);

// Find lines with katex-display (block math)
let blockMathCount = 0;
let blockMathWithAnnotation = 0;
for (const l of lines) {
  if (l.includes('katex-display')) {
    blockMathCount++;
    if (l.includes('<annotation')) {
      blockMathWithAnnotation++;
    }
  }
}
console.log('Block math lines:', blockMathCount);
console.log('  with annotation tag:', blockMathWithAnnotation);

// Check the annotation content - is raw LaTeX visible?
console.log('\n=== Sample annotation lines ===');
for (const l of lines) {
  if (l.includes('<annotation') && l.includes('application/x-tex')) {
    console.log(l.trim().slice(0, 300));
  }
}

// Check for raw latex NOT inside any katex or math element
console.log('\n=== Raw latex OUTSIDE katex? ===');
let outsideCount = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('\\') && !l.includes('katex') && !l.includes('<math') && !l.includes('annotation') && !l.includes('katex-mathml')) {
    // Check if it has actual latex commands
    if (/\\[a-zA-Z]/.test(l) && !l.includes('style="') && !l.includes('class="')) {
      outsideCount++;
      if (outsideCount <= 10) {
        console.log(`L${i+1}: ${l.trim().slice(0, 200)}`);
      }
    }
  }
}
console.log('Total lines with raw latex outside katex:', outsideCount);

// Now check: after preprocess, what does a chapter with aligned blocks look like?
console.log('\n=== Check aligned blocks ===');
for (const l of lines) {
  if (l.includes('aligned')) {
    console.log(l.trim().slice(0, 200));
  }
}
