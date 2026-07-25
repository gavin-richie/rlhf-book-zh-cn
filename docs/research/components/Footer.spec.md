# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Screenshot:** `docs/design-references/apps.twinkleai.tw/desktop-full.png`
- **Interaction model:** static (links have hover states)

## Structure
```html
<footer class="foot">
  本站為
  <a href="https://github.com/ai-twinkle">Twinkle AI Community</a>
  （台灣）的
  非官方社群翻譯
  （unofficial community translation），已獲原作者知悉（
  <a href="https://github.com/natolambert/rlhf-book/issues/472">rlhf-book#472</a>
  ）· 譯自 Nathan Lambert,《Reinforcement Learning from Human Feedback》（
  <a href="https://rlhfbook.com/">rlhfbook.com</a>
  ，2026-07-01 版）· 依
  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant">CC BY-NC-SA 4.0</a>
  授權翻譯，僅供學習研究、不得作商業用途 · 支持原作者請購買
  <a href="https://rlhfbook.com/">實體書</a>
  ·
  <a href="https://github.com/ai-twinkle/rlhf-book-zh-tw">GitHub 原始碼</a>
</footer>
```

## Computed Styles

### .foot
- max-width: 1120px
- margin: 0px auto
- padding: 0px 1.2rem 3rem
- color: var(--fg-muted)
- font-size: 0.78rem

## Text Content (verbatim)
```
本站為 Twinkle AI Community（台灣）的非官方社群翻譯（unofficial community translation），已獲原作者知悉（rlhf-book#472）· 譯自 Nathan Lambert,《Reinforcement Learning from Human Feedback》（rlhfbook.com，2026-07-01 版）· 依 CC BY-NC-SA 4.0 授權翻譯，僅供學習研究、不得作商業用途 · 支持原作者請購買實體書 · GitHub 原始碼
```

## Responsive Behavior
- Same on all breakpoints
