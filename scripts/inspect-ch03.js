const fs = require('fs');
const raw = fs.readFileSync('src/data/chapters-raw/ch03.html', 'utf8');
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
const md = m ? m[1] : '';

// Look for $$ or backtick patterns
const lines = md.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('$$') || line.includes('\\begin') || line.includes('\\frac') || line.includes('\\pi')) {
    console.log('L' + (i+1) + ':', line.trim().slice(0, 160));
  }
}
