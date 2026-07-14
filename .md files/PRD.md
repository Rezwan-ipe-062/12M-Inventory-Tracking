# Product Requirements Document — 12M Shelf Life Inventory Tracking

## 1. Overview

An offline-first inventory tracking system for Syngenta Bangladesh warehouse operators and managers. Tracks products with 12-month shelf life across multiple warehouses using batch codes (production month + expiry month), enabling FEFO (First Expiry First Out) inventory management.

## 2. Target Users

| Persona | Role | Device | Key Needs |
|---------|------|--------|-----------|
| Warehouse Operator | Floor staff counting inventory | Mobile/tablet (touch) | Fast PIN login, quick product selection, batch/month entry, receive/dispatch |
| Admin/Manager | Supervisor, supply chain | Desktop/laptop | Expiry analytics, inventory reports, activity log, settings, CSV exports |

## 3. Features

### Operator App (Mobile-First)
- **PIN Login** — 4-digit PIN per operator, configurable from admin settings
- **Product Catalog** — Alphabetical list with search, letter-jump navigation, filter by product name
- **Count Screen** — Select production month (year + letter), expiry month, enter quantity
- **Stack Calculator** — Products/layer × layers × stacks + loose = total packs
- **Receive / Dispatch** — Save transactions with batch and expiry info
- **Confirmation** — Visual feedback after each save
- **Bottom Navigation** — Count screen, 12M expiring view, full inventory list (FEFO sorted)
- **12M Expiry View** — Products expiring ≤12 months, color-coded (≤3mo red, 4-6mo orange, 7-12mo yellow)

### Admin Dashboard (Desktop)
- **Stat Cards** — Expiring ≤3mo / 4-6mo / 7-12mo / 13-18mo counts
- **Charts** — Top products bar chart, stock by production month, expiry distribution doughnut (Chart.js)
- **12M & 18M Report** — Filterable table, export to CSV
- **Inventory Table** — FEFO-highlighted rows, search, export
- **Activity Log** — All transactions with date/product/type/quantity, filterable
- **Product Management** — CRUD for product catalog
- **Settings** — Operator PINs, expiry/production year ranges, warehouses
- **Admin Password Gate** — Simple `9876` session-based lock
- **Danger Zone** — Reset config, clear local data, clear Supabase data

### Sync & Data
- **Offline-First** — All data saved to `localStorage['operator-data']` immediately
- **Supabase Cloud Sync** — Background sync via `syncManager.js` when online
- **SQL Tables** — `transactions`, `inventory`, `products`, `config`, `operators`
- **RLS Public Policies** — Simple open access for anon key (single-tenant tool)

## 4. Non-Goals (Future)

- Barcode/QR scanning (planned Phase 6)
- Multi-tenant user authentication
- Real-time multi-device sync (manual refresh for now)
- Service worker / PWA install
- Native mobile app
