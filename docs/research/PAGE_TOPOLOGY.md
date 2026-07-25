# Page Topology - rlhf-book-zh-tw

## Layout Architecture
- **Max width:** 1120px, centered
- **Scroll behavior:** native smooth scroll (`scroll-behavior: smooth`)
- **No smooth scroll library** (no Lenis/Locomotive)
- **No dark/light toggle** — uses `prefers-color-scheme` CSS media query

## Sections (top to bottom)

### 1. TopBar (sticky, z-index: 50)
- Sticky at top with backdrop-filter blur(10px) and 88% bg opacity
- Content: brand name (left) | chapter nav + GitHub star button (right)
- Interaction model: static/sticky

### 2. HeroSection
- Eyebrow text (uppercase-ish, accent color)
- H1 title (serif, clamp sizing)
- Subtitle (muted color, max-width 42rem)
- Meta stats (author, GitHub stars, chapter counts)
- GitHub star CTA button
- Interaction model: static

### 3. ChapterGrid
- Section heading "章節" (h2, serif)
- Grid of chapter cards (auto-fill minmax(250px, 1fr))
- Each card: chapter number, Chinese title, English title, description, "互動實驗" badge
- Interaction model: hover (card translateY(-3px) + border-color change)

### 4. Footer (.foot)
- Copyright text, attribution, license info, links
- Interaction model: static (links have hover states)

## No sidebar on landing page
- The landing page (index) has no sidebar — only chapter detail pages have a .sidebar with .toc
- Landing page is a simple centered layout
