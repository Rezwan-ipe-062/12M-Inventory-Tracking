-- Paste this entire SQL into the Supabase SQL Editor (https://supabase.com/dashboard/project/ytirmuuchcxzlwethvsg/sql/new)
-- Then click "Run" to create all tables.

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pack_size TEXT NOT NULL DEFAULT '',
  prefix TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name, pack_size)
);

CREATE TABLE IF NOT EXISTS operators (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL,
  warehouse TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  product TEXT NOT NULL,
  pack_size TEXT NOT NULL DEFAULT '',
  production_month TEXT NOT NULL DEFAULT '',
  expiry_month TEXT DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('receive', 'dispatch')),
  operator_name TEXT DEFAULT '',
  warehouse TEXT DEFAULT '',
  client_timestamp TEXT DEFAULT '',
  client_date TEXT DEFAULT '',
  sync_status TEXT DEFAULT 'synced',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory (
  id BIGSERIAL PRIMARY KEY,
  product TEXT NOT NULL,
  pack_size TEXT NOT NULL DEFAULT '',
  production_month TEXT NOT NULL DEFAULT '',
  expiry_month TEXT DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 0,
  warehouse TEXT DEFAULT '',
  operator_name TEXT DEFAULT '',
  sync_status TEXT DEFAULT 'synced',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product, pack_size, production_month, warehouse)
);

CREATE TABLE IF NOT EXISTS config (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}'
);

INSERT INTO config (key, value) VALUES ('shelf-life-config', '{"operatorPins":[{"name":"Default","pin":"1234"}],"expiryYears":{"start":2025,"end":2030},"prodYears":{"start":5,"end":6},"warehouses":["Chittagong","Gazipur","Jessore","Bogura"]}') ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security (open access with anon key — locked to your Supabase project)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon users (since your app manages auth internally)
CREATE POLICY "Allow anon all" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all" ON operators FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all" ON inventory FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all" ON config FOR ALL USING (true) WITH CHECK (true);
