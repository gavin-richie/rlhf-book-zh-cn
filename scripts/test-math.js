const fs = require('fs');

const raw = fs.readFileSync('src/data/chapters-raw/ch06.html', 'utf8');
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
const md = m ? m[1] : '';

// Show the aligned block structure
const alignedMatches = md.match(/\\begin\{aligned\}[\s\S]{0,500}\\end\{aligned\}/g);
if (alignedMatches) {
  console.log('Found', alignedMatches.length, 'aligned blocks');
  console.log('First aligned block:');
  console.log(alignedMatches[0].slice(0, 300));
  console.log('---');
}

// Look for patterns right before aligned blocks
const lines = md.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('\\begin{aligned}')) {
    console.log('L' + (i+1) + ':', lines[i].trim().slice(0, 80));
    console.log('  L' + i + ':', lines[i-1] ? lines[i-1].trim().slice(0, 80) : '(none)');
    console.log('  L' + (i+2) + ':', lines[i+1] ? lines[i+1].trim().slice(0, 80) : '(none)');
    console.log();
  }
}

// Check the exact raw text before first aligned block
console.log('Raw text around first aligned:');
const firstAlign = md.indexOf('\\begin{aligned}');
console.log(md.slice(Math.max(0, firstAlign - 100), firstAlign + 200));
