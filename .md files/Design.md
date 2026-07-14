# Design — 12M Shelf Life Inventory Tracking

## 1. Brand

**Syngenta** — Global agrochemical company. The design follows Syngenta's brand identity: clean, professional, agricultural green.

## 2. Color System

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#00843D` | Buttons, headers, brand elements |
| `--primary-dark` | `#005A2B` | Gradients, hover states, dark backgrounds |
| `--primary-light` | `#E6F4EC` | Subtle backgrounds, hover fills |

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F8FAFC` | Card/panel background |
| `--text` | `#1F2933` | Primary text |
| `--text-secondary` | `#52616B` | Secondary text |
| `--text-muted` | `#7B8794` | Muted labels |
| `--border` | `#D9E2EC` | Borders, dividers |
| `--table-header` | `#EFF6F2` | Table header row |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#1a1d23` | Page background |
| `--surface` | `#24272e` | Card/panel background |
| `--text` | `#e8eaed` | Primary text |
| `--text-secondary` | `#9aa0a6` | Secondary text |
| `--text-muted` | `#6b7280` | Muted labels |
| `--border` | `#383b42` | Borders, dividers |
| `--table-header` | `#1e2d26` | Table header row |

### Expiry Status Colors
| Level | Hex | Meaning |
|-------|-----|---------|
| Critical | `#DC2626` | ≤3 months to expiry |
| Warning | `#F97316` | 4-6 months to expiry |
| Notice | `#d97706` | 7-12 months to expiry |
| Distant | `#2563EB` | 13-18 months to expiry |
| Normal | `#16A34A` | >18 months or no expiry concern |

## 3. Typography

| Property | Value |
|----------|-------|
| **Primary font** | `Inter` (Google Fonts) |
| **Fallback** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| **Weights used** | 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold) |
| **Base size** | 16px |
| **Scale** | `12px, 13px, 14px, 16px, 20px, 22px, 24px` |

## 4. Layout

### Operator App (Mobile-First)
- Full-screen screens with `class="screen active"` toggle
- Bottom navigation with 3 tabs: Count, 12M, Inventory
- PIN login: centered card with 4-digit dot display + numpad grid
- Product list: scrollable, letter separators, alpha jump sidebar
- Count screen: stacked sections with clear separation

### Admin App (Desktop)
- Fixed left sidebar (240px) with navigation links
- Scrollable main content area
- Top bar with page title, warehouse chips, and clock
- Cards: stat grid (2×2), charts (3-column responsive grid)
- Tables: full-width with sticky headers

## 5. Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| ≤480px | Mobile phones (operator app) |
| 481-768px | Tablets |
| 769-1024px | Small desktop |
| >1024px | Full desktop (admin app) |

## 6. Dark Mode

Enabled automatically via `prefers-color-scheme: dark` media query. All CSS uses custom properties — add new UI elements with `var(--text)`, `var(--bg)`, etc. to inherit dark mode support.

## 7. Icons

Inline SVG icons throughout. Uses simple geometric SVGs (boxes, lines, arrows) — no icon library dependency.
