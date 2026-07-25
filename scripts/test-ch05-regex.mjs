import { readFile } from "node:fs/promises";
import { join } from "node:path";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch05.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Show lines around the aligned blocks
const lines = md.split('\n');
for (let i = 38; i <= 58; i++) {
  console.log(`L${i}: |${lines[i] || ''}|`);
}

// Now test the regex
const beforePreprocess = md;
console.log('\n=== Testing preprocess regex ===');
const matches = md.match(/(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[ \t]*(\n|$)/g);
console.log('Matches:', matches ? matches.length : 0);
if (matches) {
  matches.forEach((a, i) => console.log(`Match ${i+1}:`, JSON.stringify(a.slice(0, 80))));
}

// Try a simpler regex
const simpleMatches = md.match(/\\begin\{aligned\}/g);
console.log('\nSimple aligned count:', simpleMatches ? simpleMatches.length : 0);

// The issue: after \end{aligned} there's a tag, not a newline
// Let's see the actual content
if (matches) {
  const first = matches[0];
  console.log('\nFirst match length:', first.length);
  console.log('Full first match:');
  console.log(first);
}
