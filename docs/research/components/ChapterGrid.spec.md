# ChapterGrid Specification

## Overview
- **Target file:** `src/components/ChapterGrid.tsx`
- **Screenshot:** `docs/design-references/apps.twinkleai.tw/desktop-full.png`
- **Interaction model:** hover (card hover)

## Structure
```html
<section class="grid-wrap">
  <h2>章節</h2>
  <div class="chapter-grid">
    <a class="card" href="...">
      <span class="badge">互動實驗</span>
      <span class="no">第 1 章</span>
      <span class="zh">導論</span>
      <span class="en">Introduction</span>
      <span class="desc">RLHF 是什麼、為何誕生、三步驟流程與後訓練的整體直覺。</span>
    </a>
    <!-- 17 similar cards -->
  </div>
</section>
```

## Computed Styles

### .grid-wrap
- max-width: 1120px
- margin: 0px auto
- padding: 0px 1.2rem 4.5rem

### .grid-wrap h2
- font-family: var(--serif)
- font-size: 1.3rem
- margin: 2.4rem 0px 1rem

### .chapter-grid
- display: grid
- grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
- gap: 1rem

### .card
- position: relative
- display: flex
- flex-direction: column
- gap: 0.3rem
- padding: 1.1rem 1.2rem 1rem
- background: var(--panel)
- border: 1px solid var(--border)
- border-radius: 14px
- box-shadow: var(--shadow)
- transition: transform 0.15s, border-color 0.15s

### a.card:hover
- transform: translateY(-3px)
- border-color: var(--accent)
- text-decoration: none

### .card .no
- font-family: var(--serif)
- font-size: 0.78rem
- color: var(--accent)
- font-weight: 700
- letter-spacing: 0.08em

### .card .zh
- font-family: var(--serif)
- font-size: 1.12rem
- font-weight: 700
- color: var(--fg)
- line-height: 1.5

### .card .en
- font-size: 0.78rem
- color: var(--fg-muted)

### .card .desc
- font-size: 0.82rem
- color: var(--fg-muted)
- line-height: 1.7
- margin-top: 0.3rem

### .card .badge
- position: absolute
- top: 0.9rem
- right: 0.9rem
- font-size: 0.68rem
- color: var(--accent)
- background: var(--accent-soft)
- border-radius: 99px
- padding: 0.15rem 0.6rem
- font-weight: 600

### .card.disabled
- opacity: 0.55

## Content Data (all 17 chapters)

```ts
interface Chapter {
  id: string;
  href: string;
  number: string;
  titleZh: string;
  titleEn: string;
  description: string;
}

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
```

## Additional Sections (after chapters)

### Appendices Section
```h2>附錄與文獻</h2>
```
```ts
const appendices: Chapter[] = [
  { id: "appa", href: "/chapters/appa.html", number: "附錄 A", titleZh: "定義", titleEn: "Definitions", description: "全書使用的符號、定義與延伸詞彙表。" },
  { id: "appb", href: "/chapters/appb.html", number: "附錄 B", titleZh: "不只是「風格」", titleEn: 'Beyond "Just Style"', description: "為何風格是溝通的載體，以及話多的平衡。" },
  { id: "appc", href: "/chapters/appc.html", number: "附錄 C", titleZh: "實務議題", titleEn: "Practical Issues", description: "後訓練的運算成本、評估變異與異常任務辨識。" },
  { id: "bibliography", href: "/chapters/bibliography.html", number: "參考文獻", titleEn: "Bibliography", description: "全書引用文獻（保留原文）。" },
];
```

## Assets
- No images needed
