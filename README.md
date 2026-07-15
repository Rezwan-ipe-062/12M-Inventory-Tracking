# 12-Month Shelf Life Inventory Tracking System

Digital inventory tracking for Syngenta Bangladesh — two static web apps sharing a Supabase backend.

## System Architecture

```
Admin App (desktop dashboard)    ←→ Supabase ←→    Operator App (mobile PWA)
  admin-app/                                          operator-app/
```

- **Admin App** — manager dashboard: charts, inventory tables, 12-month reports, product/operator config
- **Operator App** — mobile PWA for warehouse staff: scan products, record receipts/dispatches, track expiry
- **Supabase** (PostgreSQL) — cloud sync layer; all data shared in real time between apps

## Prerequisites

- A [Supabase](https://supabase.com) project (free tier is sufficient)
- Static file hosting (Netlify, Vercel, GitHub Pages, any web server — no build step required)
- Modern browser (Chrome/Firefox/Safari on desktop + mobile)

## Setup

### 1. Create Supabase Tables

1. Log in to your Supabase dashboard
2. Open the **SQL Editor**
3. Paste the contents of `supabase-schema.sql`
4. Click **Run**

This creates three tables (`transactions`, `inventory`, `config`) with Row Level Security and the `clear_all_data_rpc()` function.

### 2. Configure Supabase Credentials

Both apps already have the Supabase URL and anon key hardcoded in:
- `admin-app/admin-app.js` — `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- `operator-app/client.js` — same constants

If you fork to a new Supabase project, update these four values.

### 3. Deploy the Apps

Both apps are **pure static files** — no build step, no package managers needed.

| App | Folder | How to Deploy |
|-----|--------|--------------|
| **Admin** | `admin-app/` | Upload to any static host. Open `admin-panel.html` in browser. |
| **Operator** | `operator-app/` | Upload to any static host. Open `index.html` on mobile. Can also run from local file server. |

**Quick deploy options:**
- **Netlify:** Drag the project folder to [https://app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages:** Push to repo → enable Pages from `main` root
- **Any web server:** Copy `admin-app/` and `operator-app/` to your web root

### 4. Initial Configuration

1. Open Admin App → Settings tab
2. **Operator PINs:** Add real operator names and 4-digit PINs (default: `1234` for "Default")
3. **Products tab:** Verify the 69 SKUs are loaded. Click **Sync Products** to push to Supabase
4. **Password:** Default admin password is `9876`

### 5. Test the Pilot

1. Open Operator App on a mobile device
2. Enter PIN `1234`
3. Select a product and record a receipt or dispatch
4. Open Admin App → Dashboard — data should appear within seconds
5. Try multi-operator: open Operator App on two devices, same warehouse → quantities sum on dashboard

## Default Credentials

| Role | Credential |
|------|-----------|
| Admin password | `9876` (change in Settings) |
| Operator PIN | `1234` (for "Default" operator — change before going live) |

## Supabase Project

- **Project URL:** `https://ytirmuuchcxzlwethvsg.supabase.co`
- **Anon Key:** (hardcoded in `admin-app.js` and `client.js`)

## Project Structure

```
├── admin-app/              # Admin dashboard (desktop)
│   ├── admin-panel.html    # Main HTML
│   ├── admin-app.js        # All logic + charts
│   ├── admin-style.css     # Styling
│   └── ...
├── operator-app/           # Operator mobile PWA
│   ├── index.html          # Main HTML
│   ├── app.js              # App logic
│   ├── products.js         # Product catalog (69 SKUs)
│   ├── syncManager.js      # Supabase sync engine
│   ├── client.js           # Supabase client init
│   ├── style.css           # Styling
│   └── manifest.json       # PWA manifest
├── supabase-schema.sql     # Run this against your Supabase project
├── PROJECT_REQUIREMENTS.md # Full system design document
└── MEMORY.md               # Development history
```

## License

Internal — Syngenta Bangladesh
