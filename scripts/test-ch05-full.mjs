import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

// Read ch05 raw markdown and show what aligned blocks look like BEFORE preprocessing
const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Find all aligned blocks in raw
const alignedMatches = md.match(/(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}([ \t]*(\n|$))/g);
console.log('=== Raw aligned blocks found by regex ===');
if (alignedMatches) {
  alignedMatches.forEach((a, i) => {
    console.log(`Block ${i+1}:`);
    console.log(JSON.stringify(a.slice(0, 150)));
  });
} else {
  console.log('None found');
}

// Now check: after preprocessMath, are they all wrapped?
function preprocessMath(md) {
  const before = md.split('\n').filter(l => l.includes('aligned')).length;
  md = md.replace(
    /(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[ \t]*(\n|$)/g,
    "$$\n\\begin{aligned}$2\\end{aligned}\n$$\n"
  );
  const after = md.split('\n').filter(l => l.includes('aligned') && !l.includes('$$')).length;
  return md;
}

md = preprocessMath(md);

// Now render
marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

// Check if there's visible raw aligned text in the HTML
const htmlLines = html.split('\n');
for (let i = 0; i < htmlLines.length; i++) {
  const l = htmlLines[i];
  // Check for raw aligned that's NOT inside a <annotation> tag
  if (l.includes('aligned') && !l.includes('katex') && !l.includes('<annotation')) {
    console.log(`\nL${i+1}: ${l.trim().slice(0, 200)}`);
  }
}

// Also check: is annotation text visible or hidden?
console.log('\n=== Check annotation rendering ===');
const annotationMatch = html.match(/<annotation[^>]*>([\s\S]*?)<\/annotation>/g);
if (annotationMatch) {
  // Check if the annotation contains visible raw LaTeX
  console.log('Annotations found:', annotationMatch.length);
  // The raw LaTeX in annotation should be hidden by CSS
  console.log('Sample annotation:', annotationMatch[0].slice(0, 100));
}

// Check if there are katex spans with aria-hidden that would hide the raw text
console.log('\n=== Check aria-hidden spans ===');
const ariaHidden = html.match(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g);
if (ariaHidden) {
  console.log('aria-hidden spans:', ariaHidden.length);
}
