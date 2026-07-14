# Memory — 12M Shelf Life Inventory Tracking

> Auto-updated after each session. Tracks what was completed and which files were modified.

---

## Session: Project initialization (Jul 14, 2026)

### Completed
- Initial UI overhaul: Syngenta brand theme, dark mode, Chart.js charts, empty states
- Bug fix: `loadFromStorage()` fallback in operator app
- Admin dashboard with full reports, charts, settings
- Supabase project created, tables designed, SQL scripts written
- syncManager.js with offline-first sync logic
- Supabase integration in both apps
- Admin password gate (`9876`)
- GitHub repo initialized and pushed
- GitHub Pages enabled and verified live

### Files Created/Modified
- `operator-app/app.js` — Added syncManager integration (syncToStorage, init, onSync)
- `operator-app/index.html` — Added supabase-js CDN + syncManager.js script
- `operator-app/syncManager.js` — New: offline-first sync utility
- `admin-app/admin-panel.html` — Added supabase-js CDN, syncManager.js, password gate, danger zone buttons
- `admin-app/admin-app.js` — Added password auth, syncManager init, clearLocalData/clearSupabaseData
- `index.html` — Root landing page with app links
- `supabase sql codes/init_tables.sql` — All 5 tables + RLS policies with safe drop
- `supabase sql codes/clear_all_data.sql` — Wipe script for testing
- `.md files/PRD.md` — Product requirements
- `.md files/Architecture.md` — Architecture, flow, structure
- `.md files/Rules.md` — Coding rules and boundaries
- `.md files/Phases.md` — Phase breakdown
- `.md files/Design.md` — Design system

### Session: FEFO rules & .md files (Jul 14, 2026)

### Completed
- Created all 6 `.md` files (PRD, Architecture, Rules, Phases, Design, Memory)
- Added Inventory Display Rules (FEFO) to Rules.md — filter, sort, group, and highlight logic documented

### Files Modified
- `.md files/Rules.md` — Added section 6: Inventory Display Rules (filter, sort, group, FEFO highlight)

### Session: Bug fixes (Jul 14, 2026)

### Completed
- Bug 1 — Added `window.addEventListener('storage', ...)` in admin-app.js to auto-refresh admin dashboards when operator saves data in another tab
- Bug 2 — Fixed FEFO highlight logic: changed from adjacent `<` comparison to running-min bottom-up traversal (`>` against minimum of all later batches) in both operator-app/app.js and admin-app/admin-app.js
- Bug 3 — Changed `const OPERATOR_CONFIG` to `getConfig()` getter function in operator-app/app.js so count screen always reads fresh config from localStorage
- Updated Rules.md FEFO section to document the corrected highlight logic

### Files Modified
- `.md files/Rules.md` — Updated FEFO highlight rules
- `operator-app/app.js` — Fixed FEFO loop (lines 612-620), changed `const OPERATOR_CONFIG` to `getConfig()` getter
- `admin-app/admin-app.js` — Fixed FEFO loop, added storage event listener for cross-tab sync

### Next Planned
- Phase 5: Multi-warehouse filtering
- Phase 6: Barcode scanning
- Phase 7: User roles & audit trail

### Session: Bug fix round — Default 1234, config merge, cross-device sync (Jul 14, 2026)

#### Completed
- **Bug 1 — Default 1234 PIN still works**: Removed all 3 hardcoded fallbacks that re-created Default 1234 operator. `loadOperatorConfig()` no longer returns 1234 when config is empty. `validatePin()` no longer has `|| [{name:"Default", pin:"1234"}]`. `renderOperatorPinList()` no longer re-creates Default when list is empty.
- **Bug 2 — Warehouse dropdown empty**: `loadConfig()` in admin-app and `loadOperatorConfig()` in app.js now merge missing fields from DEFAULT_CONFIG — ensures `warehouses` always populated even for old saved configs.
- **Bug 3 — Config not syncing cross-device**: Added `saveConfig()` pushes config to Supabase `config` table on every save. Added `syncManager.pullConfig()` to pull config from Supabase on init. Both admin and operator apps call `pullConfig()` before `pullFromSupabase()` in their init sequence.
- **Bug 4 — Operator name not shown**: Header now shows `"Sojib · Chittagong"` format in the `.wh-indicator` badge.
- **Bug 5 — Cross-device sync missing**: Operator init now calls `pullFromSupabase()` then `loadFromStorage()` so remote transactions appear on login.
- **Bug 6 — Can't remove last operator PIN**: Removed the `length <= 1` guard in `removeOperatorPin()`.
- **Bug 7 — FEFO highlight logic**: Changed from adjacent `<` comparison to running-min bottom-up traversal (`>` against minimum of all later batches).

#### Files Modified
- `operator-app/app.js` — Removed 1234 fallbacks, added getConfig(), warehouse scoping, config merge, operator name in header, pullConfig + pullFromSupabase in init
- `operator-app/syncManager.js` — Added `pullConfig()` method
- `admin-app/admin-app.js` — Default 1234 removal, config merge, saveConfig pushes to Supabase, init pulls config
- `admin-app/admin-panel.html` — Warehouse dropdown in add-operator form
- `favicon.svg` — New 12M brand icon
- `manifest.json` — New PWA manifest
- `supabase-schema.sql` — Updated default config insert (empty operatorPins, warehouses field)

#### Known Issues
- Config sync depends on Supabase connectivity — if offline, operator uses local config only
- Old inventory records (created before warehouse field) are orphaned — won't match warehouse-scoped queries
