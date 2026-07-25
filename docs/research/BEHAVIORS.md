# Behaviors - rlhf-book-zh-tw

## Interaction Models

### TopBar
- **Model:** sticky (CSS position: sticky)
- **Sticky at:** top: 0, z-index: 50
- **Background:** color-mix(in srgb, var(--bg) 88%, transparent) + backdrop-filter: blur(10px)
- **No scroll-triggered changes** — appearance is constant

### HeroSection
- **Model:** static
- No animations, no scroll-driven effects

### Chapter Cards
- **Model:** hover
- **Default:** border-color var(--border), transform none, opacity 1
- **Hover:** border-color var(--accent), transform translateY(-3px), transform 0.15s ease
- **Disabled cards:** opacity 0.55
- **Badge:** absolute positioned at top-right corner of card

### GitHub Star Button
- **Model:** hover
- **Default:** border-color var(--border), color var(--fg)
- **Hover:** border-color var(--accent), color var(--accent)
- **Responsive:** at <=640px, hides .gh-label class

### Footer Links
- **Model:** hover
- All links get text-decoration: underline on hover

## Responsive Breakpoints

| Width | Behavior |
|-------|----------|
| > 900px | Full layout (no sidebar on landing page anyway) |
| <= 900px | Single column layout (for chapter pages — sidebar hides) |
| <= 640px | Topbar GitHub star hides label text |
| <= 250px | Chapter grid starts single column |

## No behaviors to note:
- No scroll-triggered animations
- No IntersectionObserver
- No tab/accordion switching
- No carousel
- No smooth scroll library
- No dark/light mode toggle button
- No parallax
- No skeleton loading states (static content)
