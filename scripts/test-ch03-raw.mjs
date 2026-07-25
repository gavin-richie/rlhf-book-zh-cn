import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

const raw = await readFile(join(process.cwd(), "src/data/chapters-raw/ch03.html"), "utf8");
const m = raw.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
let md = m ? m[1] : '';

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });

// Save first 3000 chars to inspect
console.log(html.slice(0, 5000));
