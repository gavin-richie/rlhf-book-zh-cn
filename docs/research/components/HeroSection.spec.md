# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/apps.twinkleai.tw/desktop-full.png`
- **Interaction model:** static

## Structure
```html
<section class="hero">
  <span class="eyebrow">繁體中文全譯本 · 互動版</span>
  <h1>從人類回饋中強化學習<br/>Reinforcement Learning from Human Feedback</h1>
  <p class="sub">Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論...</p>
  <div class="meta">
    <span><b>17</b>章節</span>
    <span><b>3</b>附錄</span>
    <span><b>49</b>插圖</span>
    <span><b>20</b>互動實驗</span>
    <a class="gh-star">...</a>
  </div>
</section>
```

## Computed Styles

### .hero
- max-width: 1120px
- margin: 0px auto
- padding: 4rem 1.2rem 2.4rem

### .eyebrow
- color: var(--accent)
- font-weight: 600
- letter-spacing: 0.18em
- font-size: 0.8rem

### h1
- font-family: var(--serif)
- font-size: clamp(1.9rem, 4.5vw, 3rem)
- line-height: 1.35
- margin: 0.5rem 0px 0.8rem

### .sub
- color: var(--fg-muted)
- max-width: 42rem

### .meta
- display: flex
- flex-wrap: wrap
- gap: 1.6rem
- margin-top: 1.6rem
- font-size: 0.85rem
- color: var(--fg-muted)

### .meta b
- color: var(--fg)
- font-size: 1.15rem
- display: block
- font-family: var(--serif)

### .meta a
- color: var(--fg-muted)
- hover: color var(--accent)

## Text Content (verbatim)
- Eyebrow: `繁體中文全譯本 · 互動版`
- H1: `從人類回饋中強化學習\nReinforcement Learning from Human Feedback`
- Sub: `Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論：從指令微調、獎勵模型，到 PPO／GRPO、DPO、拒絕採樣與推理模型。每一章都附有互動實驗，邊玩邊懂核心概念。`
- Meta: `17 章節`, `3 附錄`, `49 插圖`, `20 互動實驗`
- GitHub link: `172 GitHub ★`

## Responsive Behavior
- **Desktop:** h1 uses clamp sizing, meta in flex-wrap row
- **Mobile:** h1 contracts via clamp, meta items wrap naturally
