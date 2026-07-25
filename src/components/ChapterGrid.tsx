import Link from "next/link";
import type { Chapter } from "@/types";

const chapters: Chapter[] = [
  { id: "ch01", href: "/chapters/ch01.html", number: "第 1 章", titleZh: "導論", titleEn: "Introduction", description: "RLHF 是什麼、為何誕生、三步驟流程與後訓練的整體直覺。" },
  { id: "ch02", href: "/chapters/ch02.html", number: "第 2 章", titleZh: "RLHF 簡史", titleEn: "A Tiny History of RLHF", description: "從偏好式 RL 的起源、語言模型時代，到 ChatGPT 之後的爆發。" },
  { id: "ch03", href: "/chapters/ch03.html", number: "第 3 章", titleZh: "訓練總覽", titleEn: "Training Overview", description: "問題形式化、RL 設定的調整，與 InstructGPT／Tülu 3／DeepSeek R1 的經典配方。" },
  { id: "ch04", href: "/chapters/ch04.html", number: "第 4 章", titleZh: "指令微調", titleEn: "Instruction Fine-Tuning", description: "聊天模板、指令資料的最佳實務與實作細節。" },
  { id: "ch05", href: "/chapters/ch05.html", number: "第 5 章", titleZh: "獎勵模型", titleEn: "Reward Modeling", description: "Bradley-Terry 模型、架構與實作、ORM／PRM 與 LLM-as-a-judge。" },
  { id: "ch06", href: "/chapters/ch06.html", number: "第 6 章", titleZh: "強化學習", titleEn: "Reinforcement Learning", description: "策略梯度推導、REINFORCE／PPO／GRPO 全家族與實作要點。" },
  { id: "ch07", href: "/chapters/ch07.html", number: "第 7 章", titleZh: "推理與推論時擴展", titleEn: "Reasoning & Inference-Time Scaling", description: "RLVR 的角色、推理模型的起源與訓練慣例。" },
  { id: "ch08", href: "/chapters/ch08.html", number: "第 8 章", titleZh: "直接對齊演算法", titleEn: "Direct-Alignment Algorithms", description: "DPO 的原理與完整推導、數值疑慮與線上／離線之辨。" },
  { id: "ch09", href: "/chapters/ch09.html", number: "第 9 章", titleZh: "拒絕採樣", titleEn: "Rejection Sampling", description: "生成、評分、微調的逐步流程與 Best-of-N 採樣。" },
  { id: "ch10", href: "/chapters/ch10.html", number: "第 10 章", titleZh: "偏好的本質", titleEn: "The Nature of Preferences", description: "從經濟學、哲學到最適控制：偏好與效用的跨領域根源。" },
  { id: "ch11", href: "/chapters/ch11.html", number: "第 11 章", titleZh: "偏好資料", titleEn: "Preference Data", description: "標註介面、排序與評分、資料來源與偏誤陷阱。" },
  { id: "ch12", href: "/chapters/ch12.html", number: "第 12 章", titleZh: "合成資料與蒸餾", titleEn: "Synthetic Data & Distillation", description: "蒸餾、on-policy 師生訓練、AI 回饋與憲法式 AI。" },
  { id: "ch13", href: "/chapters/ch13.html", number: "第 13 章", titleZh: "工具使用與函式呼叫", titleEn: "Tool Use & Function Calling", description: "工具呼叫的生成交織、多步驟推理與 MCP。" },
  { id: "ch14", href: "/chapters/ch14.html", number: "第 14 章", titleZh: "過度最佳化", titleEn: "Over-Optimization", description: "Goodhart 定律、代理目標的質性與量化失控。" },
  { id: "ch15", href: "/chapters/ch15.html", number: "第 15 章", titleZh: "正則化", titleEn: "Regularization", description: "KL 懲罰、隱性正則化，與「SFT 記憶、RL 泛化」。" },
  { id: "ch16", href: "/chapters/ch16.html", number: "第 16 章", titleZh: "評估", titleEn: "Evaluation", description: "提示格式、外部評比為何不可靠、污染與工具鏈。" },
  { id: "ch17", href: "/chapters/ch17.html", number: "第 17 章", titleZh: "打造模型性格與產品", titleEn: "Model Character & Products", description: "性格訓練、persona 向量、模型規格與產品週期。" },
];

const appendices: Chapter[] = [
  { id: "appa", href: "/chapters/appa.html", number: "附錄 A", titleZh: "定義", titleEn: "Definitions", description: "全書使用的符號、定義與延伸詞彙表。" },
  { id: "appb", href: "/chapters/appb.html", number: "附錄 B", titleZh: "不只是「風格」", titleEn: 'Beyond "Just Style"', description: "為何風格是溝通的載體，以及話多的平衡。" },
  { id: "appc", href: "/chapters/appc.html", number: "附錄 C", titleZh: "實務議題", titleEn: "Practical Issues", description: "後訓練的運算成本、評估變異與異常任務辨識。" },
  { id: "bibliography", href: "/chapters/bibliography.html", number: "參考文獻", titleZh: "參考文獻", titleEn: "Bibliography", description: "全書引用文獻（保留原文）。" },
];

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link
      href={chapter.href}
      className="relative flex flex-col gap-[0.3rem] p-[1.1rem_1.2rem_1rem] bg-[var(--panel)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow)] transition-transform duration-150 border-[var(--border)] hover:-translate-y-[3px] hover:border-[var(--accent)] no-underline"
    >
      <span className="absolute top-[0.9rem] right-[0.9rem] text-[0.68rem] text-[var(--accent)] bg-[var(--accent-soft)] rounded-full font-semibold px-[0.6rem] py-[0.15rem]">
        互動實驗
      </span>
      <span className="font-serif text-[0.78rem] text-[var(--accent)] font-bold tracking-[0.08em]">
        {chapter.number}
      </span>
      <span className="font-serif text-[1.12rem] font-bold text-[var(--fg)] leading-[1.5]">
        {chapter.titleZh}
      </span>
      <span className="text-[0.78rem] text-[var(--fg-muted)]">{chapter.titleEn}</span>
      <span className="text-[0.82rem] text-[var(--fg-muted)] leading-[1.7] mt-[0.3rem]">
        {chapter.description}
      </span>
    </Link>
  );
}

export default function ChapterGrid() {
  return (
    <section className="max-w-[1120px] mx-auto px-[1.2rem] pb-[4.5rem]">
      <h2 className="font-serif text-[1.3rem] my-[2.4rem] mb-[1rem] text-[var(--fg)]">
        章節
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[1rem]">
        {chapters.map((ch) => (
          <ChapterCard key={ch.id} chapter={ch} />
        ))}
      </div>

      <h2 className="font-serif text-[1.3rem] my-[2.4rem] mb-[1rem] text-[var(--fg)]">
        附錄與文獻
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[1rem]">
        {appendices.map((ch) => (
          <ChapterCard key={ch.id} chapter={ch} />
        ))}
      </div>
    </section>
  );
}
