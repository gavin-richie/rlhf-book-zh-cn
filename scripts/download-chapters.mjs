// Download all chapter HTML files from the original site
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = "https://apps.twinkleai.tw/rlhf-book-zh-tw/chapters/";
const OUT = "E:/Disk/Work/CodeBase/WebStormProjects/rlhf-book/src/data/chapters-raw";

const chapters = [
  { id: "ch01", file: "ch01.html", title: "導論", titleEn: "Introduction", number: "第 1 章" },
  { id: "ch02", file: "ch02.html", title: "RLHF 簡史", titleEn: "A Tiny History of RLHF", number: "第 2 章" },
  { id: "ch03", file: "ch03.html", title: "訓練總覽", titleEn: "Training Overview", number: "第 3 章" },
  { id: "ch04", file: "ch04.html", title: "指令微調", titleEn: "Instruction Fine-Tuning", number: "第 4 章" },
  { id: "ch05", file: "ch05.html", title: "獎勵模型", titleEn: "Reward Modeling", number: "第 5 章" },
  { id: "ch06", file: "ch06.html", title: "強化學習", titleEn: "Reinforcement Learning", number: "第 6 章" },
  { id: "ch07", file: "ch07.html", title: "推理與推論時擴展", titleEn: "Reasoning & Inference-Time Scaling", number: "第 7 章" },
  { id: "ch08", file: "ch08.html", title: "直接對齊演算法", titleEn: "Direct-Alignment Algorithms", number: "第 8 章" },
  { id: "ch09", file: "ch09.html", title: "拒絕採樣", titleEn: "Rejection Sampling", number: "第 9 章" },
  { id: "ch10", file: "ch10.html", title: "偏好的本質", titleEn: "The Nature of Preferences", number: "第 10 章" },
  { id: "ch11", file: "ch11.html", title: "偏好資料", titleEn: "Preference Data", number: "第 11 章" },
  { id: "ch12", file: "ch12.html", title: "合成資料與蒸餾", titleEn: "Synthetic Data & Distillation", number: "第 12 章" },
  { id: "ch13", file: "ch13.html", title: "工具使用與函式呼叫", titleEn: "Tool Use & Function Calling", number: "第 13 章" },
  { id: "ch14", file: "ch14.html", title: "過度最佳化", titleEn: "Over-Optimization", number: "第 14 章" },
  { id: "ch15", file: "ch15.html", title: "正則化", titleEn: "Regularization", number: "第 15 章" },
  { id: "ch16", file: "ch16.html", title: "評估", titleEn: "Evaluation", number: "第 16 章" },
  { id: "ch17", file: "ch17.html", title: "打造模型性格與產品", titleEn: "Model Character & Products", number: "第 17 章" },
  { id: "appa", file: "appa.html", title: "定義", titleEn: "Definitions", number: "附錄 A" },
  { id: "appb", file: "appb.html", title: "不只是「風格」", titleEn: 'Beyond "Just Style"', number: "附錄 B" },
  { id: "appc", file: "appc.html", title: "實務議題", titleEn: "Practical Issues", number: "附錄 C" },
  { id: "bibliography", file: "bibliography.html", title: "參考文獻", titleEn: "Bibliography", number: "參考文獻" },
];

await mkdir(OUT, { recursive: true });

const fetchOne = async (ch) => {
  const url = BASE + ch.file;
  console.log("Fetching", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const html = await res.text();
  const outPath = join(OUT, ch.id + ".html");
  await writeFile(outPath, html, "utf8");
  console.log("  →", outPath, html.length, "bytes");
};

const batch = 4;
for (let i = 0; i < chapters.length; i += batch) {
  await Promise.all(chapters.slice(i, i + batch).map(fetchOne));
}
console.log("Done.");