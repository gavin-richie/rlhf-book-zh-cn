// Download all figures referenced in the chapter markdown
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { glob } from "node:fs/promises";

const RAW = "E:/Disk/Work/CodeBase/WebStormProjects/rlhf-book/src/data/chapters-raw";
const OUT = "E:/Disk/Work/CodeBase/WebStormProjects/rlhf-book/public/images/figures";

await mkdir(OUT, { recursive: true });

const { readdirSync } = await import("node:fs");
const files = readdirSync(RAW);

const urls = new Set();
for (const f of files) {
  const html = await readFile(join(RAW, f), "utf8");
  // Match markdown image syntax: ![...](../webapp/assets/figures/... or ![...](../assets/figures/...
  const re = /!\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const path = m[1];
    if (path.includes("assets/figures/")) {
      const filename = path.split("/").pop();
      urls.add("https://apps.twinkleai.tw/rlhf-book-zh-tw/assets/figures/" + filename);
    }
  }
}

console.log("Found", urls.size, "unique figure URLs");

const download = async (url) => {
  const filename = url.split("/").pop();
  const outPath = join(OUT, filename);
  console.log("Downloading", url);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.log("  Failed:", res.status);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    console.log("  →", filename, buf.length, "bytes");
  } catch (e) {
    console.log("  Error:", e.message);
  }
};

const arr = [...urls];
const batch = 4;
for (let i = 0; i < arr.length; i += batch) {
  await Promise.all(arr.slice(i, i + batch).map(download));
}
console.log("Done.");