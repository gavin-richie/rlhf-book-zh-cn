import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

export interface ChapterMeta {
  id: string;
  number: string;
  titleZh: string;
  titleEn: string;
  href: string;
  prev?: { id: string; title: string };
  next?: { id: string; title: string };
}

export const ALL_CHAPTERS: ChapterMeta[] = [
  { id: "ch01", number: "第 1 章", titleZh: "導論", titleEn: "Introduction", href: "/chapters/ch01" },
  { id: "ch02", number: "第 2 章", titleZh: "RLHF 簡史", titleEn: "A Tiny History of RLHF", href: "/chapters/ch02" },
  { id: "ch03", number: "第 3 章", titleZh: "訓練總覽", titleEn: "Training Overview", href: "/chapters/ch03" },
  { id: "ch04", number: "第 4 章", titleZh: "指令微調", titleEn: "Instruction Fine-Tuning", href: "/chapters/ch04" },
  { id: "ch05", number: "第 5 章", titleZh: "獎勵模型", titleEn: "Reward Modeling", href: "/chapters/ch05" },
  { id: "ch06", number: "第 6 章", titleZh: "強化學習", titleEn: "Reinforcement Learning", href: "/chapters/ch06" },
  { id: "ch07", number: "第 7 章", titleZh: "推理與推論時擴展", titleEn: "Reasoning & Inference-Time Scaling", href: "/chapters/ch07" },
  { id: "ch08", number: "第 8 章", titleZh: "直接對齊演算法", titleEn: "Direct-Alignment Algorithms", href: "/chapters/ch08" },
  { id: "ch09", number: "第 9 章", titleZh: "拒絕採樣", titleEn: "Rejection Sampling", href: "/chapters/ch09" },
  { id: "ch10", number: "第 10 章", titleZh: "偏好的本質", titleEn: "The Nature of Preferences", href: "/chapters/ch10" },
  { id: "ch11", number: "第 11 章", titleZh: "偏好資料", titleEn: "Preference Data", href: "/chapters/ch11" },
  { id: "ch12", number: "第 12 章", titleZh: "合成資料與蒸餾", titleEn: "Synthetic Data & Distillation", href: "/chapters/ch12" },
  { id: "ch13", number: "第 13 章", titleZh: "工具使用與函式呼叫", titleEn: "Tool Use & Function Calling", href: "/chapters/ch13" },
  { id: "ch14", number: "第 14 章", titleZh: "過度最佳化", titleEn: "Over-Optimization", href: "/chapters/ch14" },
  { id: "ch15", number: "第 15 章", titleZh: "正則化", titleEn: "Regularization", href: "/chapters/ch15" },
  { id: "ch16", number: "第 16 章", titleZh: "評估", titleEn: "Evaluation", href: "/chapters/ch16" },
  { id: "ch17", number: "第 17 章", titleZh: "打造模型性格與產品", titleEn: "Model Character & Products", href: "/chapters/ch17" },
  { id: "appa", number: "附錄 A", titleZh: "定義", titleEn: "Definitions", href: "/chapters/appa" },
  { id: "appb", number: "附錄 B", titleZh: "不只是「風格」", titleEn: 'Beyond "Just Style"', href: "/chapters/appb" },
  { id: "appc", number: "附錄 C", titleZh: "實務議題", titleEn: "Practical Issues", href: "/chapters/appc" },
  { id: "bibliography", number: "參考文獻", titleZh: "參考文獻", titleEn: "Bibliography", href: "/chapters/bibliography" },
];

for (let i = 0; i < ALL_CHAPTERS.length; i++) {
  if (i > 0) ALL_CHAPTERS[i].prev = { id: ALL_CHAPTERS[i - 1].id, title: `${ALL_CHAPTERS[i - 1].number} ${ALL_CHAPTERS[i - 1].titleZh}` };
  if (i < ALL_CHAPTERS.length - 1) ALL_CHAPTERS[i].next = { id: ALL_CHAPTERS[i + 1].id, title: `${ALL_CHAPTERS[i + 1].number} ${ALL_CHAPTERS[i + 1].titleZh}` };
}

const RAW_DIR = join(process.cwd(), "src/data/chapters-raw-zh-tw");

let bibCache: { html: string; entries: Map<number, string> } | null = null;

function cleanBibliographyMarkdown(md: string): string {
  md = md.replace(/\f/g, " ")
    .replace(/rlhfbook\.com\s*\d+/g, "");
  md = md.replace(/\s+(\[\d+\]\s+[A-Z])/g, "\n$1")
    .replace(/^(\[\d+\]\s+[A-Z])/gm, (m) => {
      const num = m.match(/\[(\d+)\]/)?.[1];
      if (!num) return m;
      const rest = m.replace(/\[\d+\]/, "").trim();
      return num + ". " + rest;
    });
  return md;
}

async function loadBibliography(): Promise<{ html: string; entries: Map<number, string> }> {
  if (bibCache) return bibCache;
  const raw = await readFile(join(RAW_DIR, "bibliography.html"), "utf8");
  const md = cleanBibliographyMarkdown(extractMarkdown(raw));

  const entries = new Map<number, string>();
  const entryRe = /^(\d+)\.\s+(.+?)$/gm;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(md)) !== null) {
    entries.set(Number(m[1]), m[2].trim());
  }
  marked.use(KatexRenderer({
    throwOnError: false,
    displayMode: true,
    nonStandard: true,
  }));
  const html = await marked.parse(md, { async: true });
  bibCache = { html: html as string, entries };
  return bibCache;
}

function wrapCitations(md: string, entries: Map<number, string>): string {
  return md.replace(/\[([\d]+)\]/g, (_match, numStr: string) => {
    const n = Number(numStr);
    const refText = entries.get(n);
    if (!refText) return _match;
    const safeTitle = refText.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/'/g, "\\'");
    return `<span class="citation"><a href="/chapters/bibliography#ref-${n}" title="${safeTitle}">[${numStr}]</a></span>`;
  });
}

function injectBibAnchors(html: string): string {
  let n = 0;
  return html.replace(/<li>/g, () => `<li id="ref-${++n}">`);
}

function extractMarkdown(html: string): string {
  const m = html.match(/<script[^>]*id="chapter-md"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return "";
  return m[1];
}

function getH2Headings(md: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const re = /^## (.+)$/gm;
  let match: RegExpExecArray | null;
  let counter = 0;
  while ((match = re.exec(md)) !== null) {
    const text = match[1].trim();
    const id = "sec-" + counter++;
    headings.push({ id, text });
  }
  return headings;
}

function injectHeadingIds(html: string, headings: { id: string; text: string }[]): string {
  let counter = 0;
  return html.replace(/<h2>([^<]+)<\/h2>/g, (_full, text: string) => {
    const h = headings[counter++];
    return `<h2 id="${h.id}">${text}</h2>`;
  });
}

function rewriteImages(html: string): string {
  return html.replaceAll('../webapp/assets/figures/', '/images/figures/')
             .replaceAll('../assets/figures/', '/images/figures/');
}

function preprocessMath(md: string): string {
  return md.replace(
    /(^|\n)[ \t]*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[ \t]*(?:\\tag\{[^}]+\})?[ \t]*(\n|$)/g,
    "$$\n\\begin{aligned}$2\\end{aligned}\n$$\n"
  );
}

export async function getChapterContent(id: string): Promise<{ html: string; toc: { id: string; text: string }[]; meta: ChapterMeta }> {
  const meta = ALL_CHAPTERS.find((c) => c.id === id);
  if (!meta) throw new Error(`Chapter not found: ${id}`);
  const raw = await readFile(join(RAW_DIR, id + ".html"), "utf8");
  let md = extractMarkdown(raw);
  if (!md) throw new Error(`No markdown found in chapter ${id}`);
  const toc = getH2Headings(md);
  if (id === "bibliography") {
    md = cleanBibliographyMarkdown(md);
  } else {
    try {
      const { entries } = await loadBibliography();
      md = wrapCitations(md, entries);
    } catch {
      // silently skip citation wrapping
    }
  }
  md = preprocessMath(md);
  marked.use(KatexRenderer({
    throwOnError: false,
    displayMode: true,
    nonStandard: true,
  }));
  const raw_html = await marked.parse(md, { async: true });
  let html = injectHeadingIds(rewriteImages(raw_html), toc);
  if (id === "bibliography") {
    html = injectBibAnchors(html);
  }
  return { html, toc, meta };
}

export function getChapterMeta(id: string): ChapterMeta | undefined {
  return ALL_CHAPTERS.find((c) => c.id === id);
}
