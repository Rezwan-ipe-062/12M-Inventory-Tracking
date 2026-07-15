# Rules — 12M Shelf Life Inventory Tracking

> These rules govern all AI-assisted development on this project. Follow them unless explicitly overridden in a task prompt.

---

## 1. What to Use

| Category | Allowed | 
|----------|---------|
| **HTML** | Semantic HTML5, responsive meta tags |
| **CSS** | Vanilla CSS with custom properties, `prefers-color-scheme` for dark mode |
| **JavaScript** | Vanilla ES6+ (no TypeScript, no transpilation) |
| **Charts** | Chart.js 4 (loaded via CDN) |
| **Cloud** | Supabase JS SDK v2 (loaded via CDN `@supabase/supabase-js@2`) |
| **Storage** | `localStorage` for primary data, Supabase for cloud sync |
| **Session** | `sessionStorage` for admin password gate |
| **Fonts** | Inter (Google Fonts CDN) |
| **Hosting** | GitHub Pages (static, no server) |

## 2. What to Avoid

- ❌ No React, Vue, Angular, Svelte, or any frontend framework
- ❌ No npm, node_modules, build steps, bundlers (webpack, vite, etc.)
- ❌ No TypeScript — keep pure `.js` files
- ❌ No service workers (for now)
- ❌ No authentication backend — PIN and password are client-side only
- ❌ No real-time subscriptions or WebSockets
- ❌ No Supabase service_role key on the client — anon key only

## 3. Data Architecture Rules

- **Offline-first is the golden rule.** All user actions must work without internet.
- `localStorage['operator-data']` is the single source of truth. Supabase is a sync target.
- `syncManager.saveLocal(key, data)` must be called on every save, never direct `localStorage.setItem` for operator data.
- Never show a loading spinner or error toast for sync failures — log to console and move on.
- Sync is best-effort background. Mark new records as `sync_status='pending'`, sync when online, mark `'synced'` on success.
- Admin app reads from the same `localStorage` key (`operator-data`) — both apps share data via the browser's localStorage.

## 4. Error Handling

- Every `localStorage.getItem` / `.setItem` must be wrapped in try-catch
- Every Supabase API call must have `.catch()` with console.warn only — never block the user
- Admin login: wrong password shows inline error message, clears input, no alert()
- All user-facing confirmations use `confirm()` dialogs for destructive actions (delete product, clear data, etc.)
- Fallback: if `window.supabase` or `window.syncManager` is unavailable, degrade gracefully (localStorage-only mode)

## 5. Code Style

- No semicolons (follow existing pattern — the codebase doesn't use them)
- Single quotes for strings
- `var` is used in syncManager.js (for CDN compatibility); use `const`/`let` everywhere else
- Function declarations use `function name() {}` (not arrow expressions for top-level functions)
- Event listeners use `addEventListener` or `onclick` properties (both are used)
- CSS uses custom properties for theming, class-based selectors, no Tailwind

## 6. Inventory Display Rules (FEFO)

These rules apply to **both** the operator app (`renderInventoryList`) and the admin app (`renderInventory`). The logic must always be identical.

### Filter
- Search matches `product` name and `packSize` (operator) or `code`/production month (admin) — case-insensitive, uses `.toLowerCase().includes()`
- Empty state shows different messages: "No results found" when search is active, vs a prompt to start counting when no data exists

### Sort Order (strict)
All rows are sorted by three keys in this exact order:
1. Product name — alphabetical (`localeCompare`)
2. Pack size — alphabetical (`localeCompare`)
3. Production month — year digit first, then month letter (operator uses `parseInt(a[0])` then `a[1].localeCompare(b[1])`; admin uses `localeCompare` directly)

### Grouping
- Rows are grouped by `product + packSize` — each product+pack combination is a group
- Each group starts with a bold group header row spanning all columns showing the product name and pack size
- Group headers are **not** highlighted under any condition

### FEFO Highlight (per group)
For each group **independently** (i.e., Amistar 50ml is a separate group from Amistar 100ml, which is separate from Karate 50ml):

1. Batches within the group are sorted by production month ascending (oldest first)
2. Starting from the second-to-last row up to the first, check each row against all later rows: if a row's quantity exceeds the minimum quantity of any row after it, highlight it
3. Implementation: run a pointer `r` from `group.length-2` to `0`; keep a `runningMin` starting from the last row's quantity. If `group[r].qty > runningMin`, highlight `group[r]`. Then update `runningMin = Math.min(runningMin, group[r].qty)`.
4. This catches FEFO violations: older stock has not been consumed, while newer stock was consumed instead
5. Operator app uses CSS class `row-fefo-highlight` (defined in `style.css`)
6. Admin app uses inline `background:#FEF3C7` — if moving to CSS later, use same class for consistency

## 7. Config Persistence & Sync

- Config (`shelf-life-config`) is stored in `localStorage` and synced to Supabase `config` table on every admin save
- `syncManager.pullConfig()` pulls config from Supabase on both admin and operator init
- If Supabase is offline, the local `localStorage` config is used as fallback
- `loadConfig()` (admin) and `loadOperatorConfig()` (operator) both merge missing fields from defaults

## 8. AI Boundaries

- Do not refactor the app architecture (e.g., don't suggest converting to React)
- Do not add build tools or package managers
- Do not modify the `syncManager.js` core sync logic without explicit user request — it's designed to be simple and reliable
- Do not add external authentication (OAuth, Supabase Auth) — the simple PIN/password gate is intentional
- Preserve dark mode support — all new UI elements must work in both light and dark themes
- Preserve mobile-first responsive design for the operator app
- When adding features, prefer appending to existing files over creating new ones
