# Architecture — 12M Shelf Life Inventory Tracking

## 1. App Flow

```
Login (PIN) → Product List (search/filter/jump) → Count Screen
                                                      ├─ Production Month (year + letter)
                                                      ├─ Expiry Month (month + year)
                                                      ├─ Quantity (numpad or stack calculator)
                                                      └─ Receive / Dispatch → Confirm
                                                   
Bottom Nav: [Count] [12M Expiring] [Inventory List]
```

## 2. Data Flow

```
User Action → app.js (state) → syncToStorage()
                                  ├─ syncManager.saveLocal('operator-data', data)
                                  │     ├─ Mark new records as sync_status='pending'
                                  │     └─ Write to localStorage
                                  │
                                  └─ (if online) → syncManager.syncAll()
                                        ├─ INSERT pending transactions → Supabase
                                        ├─ UPSERT pending inventory → Supabase
                                        └─ Mark all as sync_status='synced'
```

```
Admin reads: localStorage.getItem('operator-data') ← same key written by operator app
                     ↓
             renderDashboard(), render12M(), renderInventory(), renderActivity()

Config flow:
  Admin saves settings → saveConfig() → localStorage + upsert to Supabase `config` table
  Operator loads app → init → pullConfig() from Supabase → merge into localStorage
```

## 3. Data Storage Architecture

```
┌─────────────────────────────────────────────┐
│            localStorage (Primary)           │
│  ┌───────────────────────────────────────┐  │
│  │ operator-data (JSON)                  │  │
│  │  ├─ transactions[]                    │  │
│  │  │  { product, packSize, production,  │  │
│  │  │    expiry, qty, type, sync_status }│  │
│  │  └─ inventory[]                       │  │
│  │     { product, packSize, production,  │  │
│  │       expiry, qty, sync_status }      │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │ shelf-life-config (JSON)              │  │
│  │  ├─ operatorPins[]                    │  │
│  │  ├─ expiryYears {start, end}          │  │
│  │  ├─ prodYears {start, end}            │  │
│  │  └─ warehouses[]                      │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
         │ (when online)
         ▼
┌─────────────────────────────────────────────┐
│    Supabase (Cloud Backup)                  │
│  tables: transactions, inventory, products, │
│          config, operators                  │
│  RLS: public read/write (anon key)          │
└─────────────────────────────────────────────┘
```

## 4. Folder & File Structure

```
/
├── index.html                         # Landing page (link to both apps)
├── .gitignore
├── .md files/                         # Project documentation
│   ├── PRD.md
│   ├── Architecture.md
│   ├── Rules.md
│   ├── Phases.md
│   ├── Design.md
│   └── Memory.md
│
├── operator-app/                      # Mobile counting app
│   ├── index.html                     # Main HTML (all screens)
│   ├── app.js                         # App logic (841 lines)
│   ├── style.css                      # Mobile styles + dark mode
│   ├── products.js                    # Product catalog data
│   └── syncManager.js                 # Offline-first Supabase sync
│
├── admin-app/                         # Admin dashboard
│   ├── admin-panel.html               # Dashboard HTML + all screens
│   ├── admin-app.js                   # Dashboard logic (909 lines)
│   └── admin-style.css                # Desktop sidebar styles
│
├── supabase sql codes/                # Database scripts
│   ├── init_tables.sql                # Create tables + RLS policies
│   └── clear_all_data.sql             # Wipe all rows for testing
│
└── reference-data/                    # Input files (analysis, photos, exports)
```

## 5. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Vanilla HTML/CSS/JS | Zero build step, works anywhere, easy to modify |
| Charts | Chart.js 4 (CDN) | Lightweight, no build step |
| Cloud DB | Supabase (PostgreSQL) | Free tier, REST API, simple anon key access |
| Sync | Custom syncManager.js | Offline-first, localStorage primary |
| Hosting | GitHub Pages | Free static hosting, direct deploy from repo |
| Auth | PIN (operator) / Password (admin) | Simple session-based, no backend needed |
