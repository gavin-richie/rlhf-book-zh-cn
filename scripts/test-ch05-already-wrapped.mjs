import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// The aligned blocks are already inside $$ delimiters
// But \begin{aligned}...\end{aligned} inside need $ delimiters for marked-katex-extension block rule
// Let's test: wrap \begin{aligned}...\end{aligned} in $ (single $) when inside $$
// Actually the issue is that marked-katex-extension block rule needs $$ on its own line,
// but inside $$ there's \begin{aligned} which it can't parse

function preprocessMath(md) {
  // Match $$ blocks that contain \begin{aligned}...\end{aligned}
  // and replace the content so aligned is properly delimited
  // The block rule in marked-katex expects $$ on its own line with content between

  // Try: find $$\n...\begin{aligned}...\end{aligned}\n...$$
  // and check if they render properly without modification

  // Actually the simplest fix: the aligned blocks are already inside $$
  // marked-katex-extension should handle them if we let $$...$$ through unchanged
  // Let's just remove $$ wrapping attempts and see what happens

  // First, let's see if there are aligned blocks NOT inside $$
  const lines = md.split('\n');
  let insideDollar = false;
  let alignedOutside = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '$$') {
      insideDollar = !insideDollar;
    }
    if (lines[i].includes('\\begin{aligned}') && !insideDollar) {
      alignedOutside.push(i + 1);
    }
  }
  console.log('Aligned blocks outside $$:', alignedOutside);

  // Now test: do the aligned blocks inside $$ work with just $$...$$ pass-through?
  // Let's just not preprocess at all and see the output
  return md;
}

const unmodified = preprocessMath(md);
console.log('Preprocessed length:', unmodified.length, '=== Original length:', md.length);

import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(unmodified, { async: true });

// Check for raw aligned blocks left in output
const rawAligned = html.match(/\\begin\{aligned\}/g);
console.log('\nRaw aligned blocks remaining:', rawAligned ? rawAligned.length : 0);

const blockCount = (html.match(/katex-display/g) || []).length;
console.log('Block math rendered:', blockCount);
