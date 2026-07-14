# Phases — 12M Shelf Life Inventory Tracking

> Current phase: **4 (Deployment)** — Project is live on GitHub Pages

---

## Phase 1: Foundation ✅ Done

**Goal:** Working counting app with PIN login and product selection

| Task | Status |
|------|--------|
| PIN login screen with numeric keypad | ✅ |
| Product catalog with search, letter jump, filter dropdown | ✅ |
| Count screen with production month (year + letter) selector | ✅ |
| Expiry month selector | ✅ |
| Stack calculator (products/layer × layers × stacks + loose) | ✅ |
| Numpad overlay for direct quantity entry | ✅ |
| Receive/Dispatch transaction logic | ✅ |
| Confirmation screen | ✅ |
| Inventory list (FEFO-sorted, grouped by product) | ✅ |
| 12M expiring products view with color-coded urgency | ✅ |
| Bottom navigation | ✅ |

## Phase 2: Admin Dashboard ✅ Done

**Goal:** Reports, analytics, and settings for managers

| Task | Status |
|------|--------|
| Desktop sidebar layout | ✅ |
| Stat cards (expiry buckets) | ✅ |
| Chart.js: Top products bar chart | ✅ |
| Chart.js: Stock by production month | ✅ |
| Chart.js: Expiry distribution doughnut | ✅ |
| 12M & 18M report table with filter buttons | ✅ |
| Full inventory table with FEFO highlighting | ✅ |
| Activity log with addition/subtraction filter | ✅ |
| Product CRUD (add/edit/delete) | ✅ |
| Settings: operator PINs, expiry years, prod years, warehouses | ✅ |
| CSV exports for all tables | ✅ |
| Drilldown modal on stat cards | ✅ |

## Phase 3: Supabase Sync ✅ Done

**Goal:** Cloud backup and cross-device data portability

| Task | Status |
|------|--------|
| Supabase project created (`ytirmuuchcxzlwethvsg`) | ✅ |
| SQL: Create tables (transactions, inventory, products, config, operators) | ✅ |
| SQL: RLS policies for public anon access | ✅ |
| SQL: DROP POLICY IF EXISTS for safe re-runs | ✅ |
| `syncManager.js` with offline-first sync logic | ✅ |
| Mark pending records, insert/upsert to Supabase, mark synced | ✅ |
| `saveLocal()` writes to localStorage + triggers sync | ✅ |
| Auto-sync on `navigator.onLine` event + initial sync on load | ✅ |
| Admin app: init syncManager and refresh on sync | ✅ |
| Clear Supabase data button in admin Settings | ✅ |
| Clear local data button in admin Settings | ✅ |

## Phase 4: Deployment ✅ Done

**Goal:** Live on GitHub Pages

| Task | Status |
|------|--------|
| Root `index.html` landing page with links to both apps | ✅ |
| Admin password gate (`9876`) | ✅ |
| Git repo initialized and pushed to GitHub | ✅ |
| GitHub Pages enabled (branch: main, root) | ✅ |
| Public URL: `https://Rezwan-ipe-062.github.io/12M-Inventory-Tracking/` | ✅ |

## Phase 5: Multi-Warehouse 🔲 Future

**Goal:** Warehouse-level filtering and inventory views

| Task | Status |
|------|--------|
| Warehouse column in transactions | 🔲 |
| Warehouse selector on operator app count screen | 🔲 |
| Warehouse-filtered dashboard stats | 🔲 |
| Per-warehouse inventory report | 🔲 |

## Phase 6: Barcode Scanning 🔲 Future

**Goal:** Camera-based product lookup for faster counting

| Task | Status |
|------|--------|
| Camera permission and barcode detection (html5-qrcode or similar) | 🔲 |
| Barcode→product mapping | 🔲 |
| Scan → auto-select product → go to count screen | 🔲 |

## Phase 7: User Roles & Audit 🔲 Future

**Goal:** Named operator sessions and full audit trail

| Task | Status |
|------|--------|
| Operator login shows name, not just PIN validation | 🔲 |
| Every transaction records operator name | 🔲 |
| Admin audit log with operator filter | 🔲 |
| Session timeout / auto-logout | 🔲 |
