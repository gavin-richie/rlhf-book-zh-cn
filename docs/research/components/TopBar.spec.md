# TopBar Specification

## Overview
- **Target file:** `src/components/TopBar.tsx`
- **Screenshot:** `docs/design-references/apps.twinkleai.tw/desktop-full.png`
- **Interaction model:** static/sticky

## Structure
```html
<nav class="topbar">
  <a class="brand">RLHF<span>繁體中文全譯本 · 互動版</span></a>
  <div class="topbar-right">
    <div class="chapnav"><span class="chapnav-current">...</span></div>
    <a class="gh-star" href="...">
      <span class="star-ico">★</span>
      <span class="gh-label">GitHub ★</span>
      <span class="gh-count">172</span>
    </a>
  </div>
</nav>
```

## Computed Styles

### .topbar
- position: sticky
- top: 0
- z-index: 50
- display: flex
- align-items: center
- justify-content: space-between
- gap: 1rem
- padding: 0.65rem 1.2rem
- background: color-mix(in srgb, var(--bg) 88%, transparent)
- backdrop-filter: blur(10px)
- border-bottom: 1px solid var(--border)

### .brand
- font-family: var(--serif)
- font-weight: 700
- font-size: 1.05rem
- color: var(--fg)
- white-space: nowrap
- hover: color var(--accent), no underline

### .brand span
- margin-left: 0.55rem
- font-family: var(--sans)
- font-weight: 400
- font-size: 0.8rem
- color: var(--fg-muted)

### .gh-star
- display: inline-flex
- align-items: center
- gap: 0.45rem
- padding: 0.3rem 0.8rem
- border: 1px solid var(--border)
- border-radius: 99px
- background: var(--panel)
- color: var(--fg)
- font-size: 0.8rem
- font-weight: 600
- white-space: nowrap
- hover: border-color var(--accent), color var(--accent)

### .gh-star .gh-label
- (hidden at <=640px)

### .gh-star .gh-count
- font-weight: 700
- background: var(--panel-2)
- border-radius: 99px
- padding: 0px 0.5rem
- min-width: 1.4em
- text-align: center

## Assets
- No images needed
- GitHub icon: Unicode ★ character

## Responsive Behavior
- **Desktop (1440px):** Full bar with label visible
- **<= 640px:** gh-label hidden, padding reduced
