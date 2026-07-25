# Design Tokens - rlhf-book-zh-tw

## Colors (Light Mode)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#faf9f6` | Page background |
| `--panel` | `#ffffff` | Card/background panels |
| `--panel-2` | `#f3f1ec` | Secondary panels, inputs |
| `--fg` | `#23272e` | Primary text |
| `--fg-muted` | `#6b7280` | Muted text |
| `--border` | `#e4e1da` | Borders, dividers |
| `--accent` | `#0f766e` | Accent color (buttons, links, highlights) |
| `--accent-soft` | `rgba(15, 118, 110, .10)` | Soft accent backgrounds |
| `--accent-2` | `#b45309` | Secondary accent (GitHub star icon) |
| `--link` | `#0e7490` | Hyperlink color |
| `--code-bg` | `#f0eee9` | Code block background |

## Shadows
| Token | Value |
|-------|-------|
| `--shadow` | `0 1px 3px rgba(30, 30, 28, .07), 0 8px 24px rgba(30, 30, 28, .06)` |

## Typography
| Token | Value |
|-------|-------|
| `--serif` | `"Noto Serif TC", "Songti TC", "PMingLiU", Georgia, serif` |
| `--sans` | `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif` |
| `--mono` | `"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace` |
| body size | `16.5px`, line-height `1.9` |
| h1 | `clamp(1.9rem, 4.5vw, 3rem)`, line-height `1.35` (hero), `1.9rem/1.4` (prose) |
| h2 | `1.45rem/1.5` |
| h3 | `1.15rem` |
| h4 | `1rem` |

## Spacing & Layout
| Token | Value |
|-------|-------|
| `--radius` | `12px` |
| card border-radius | `14px` |
| max-width | `1120px` |
| layout gap | `2.2rem` |
| padding base | `1.2rem` |
| chapter-grid gap | `1rem` |

## Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| `> 900px` | Sidebar visible (230px grid) |
| `<= 900px` | Single column, sidebar hidden |
| `<= 640px` | GitHub star hides label |
| `>= 250px` | Chapter grid columns |

## Dark Mode
`prefers-color-scheme: dark` overrides:
- `--bg: #14161a`, `--panel: #1c1f24`, `--panel-2: #22262c`, `--fg: #e6e4e0`, `--fg-muted: #9aa1ab`, `--border: #31353c`, `--accent: #2dd4bf`, `--accent-soft: rgba(45, 212, 191, .12)`, `--accent-2: #fbbf24`, `--link: #67c3d8`, `--code-bg: #23272e`

## Transitions
- Card hover: `transition: transform 0.15s, border-color 0.15s`
- All links: underline on hover (text-decoration)
