import { readFile } from "node:fs/promises";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

const raw = await readFile("E:/Disk/Work/CodeBase/WebStormProjects/rlhf-book/src/data/chapters-raw/ch03.html", "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

// Find the table section in raw markdown
const lines = md.split('\n');
let tableStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('| 面向')) {
    tableStart = i;
    break;
  }
}

if (tableStart >= 0) {
  console.log('=== Raw markdown table ===');
  for (let i = tableStart; i < Math.min(tableStart + 20, lines.length); i++) {
    console.log(lines[i]);
  }
}

// Render with katex
marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

const tableIdx = html.indexOf('<table');
if (tableIdx >= 0) {
  console.log('\n=== Rendered HTML table ===');
  console.log(html.slice(tableIdx, tableIdx + 2000));
} else {
  console.log('\nNo <table> tag found. Search for pipe content...');
  if (html.includes('標準 RL')) {
    const idx = html.indexOf('標準 RL');
    console.log('Context:', html.slice(Math.max(0, idx-300), idx+600));
  }
}
