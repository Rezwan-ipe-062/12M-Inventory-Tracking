-- Supabase SQL: Initialize tables for 12M Shelf Life Inventory Tracking
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/ytirmuuchcxzlwethvsg/sql/new)

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT,
  unit TEXT DEFAULT 'pcs',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_sku TEXT NOT NULL REFERENCES products(sku),
  type TEXT NOT NULL CHECK (type IN ('in', 'out')),
  quantity NUMERIC NOT NULL,
  batch_code TEXT,
  location TEXT,
  operator TEXT,
  notes TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Inventory table (current stock snapshot)
CREATE TABLE IF NOT EXISTS inventory (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_sku TEXT NOT NULL REFERENCES products(sku) UNIQUE,
  quantity NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Config table (app settings)
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Operators table
CREATE TABLE IF NOT EXISTS operators (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, for production)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;

-- Allow public access for anon key (since this is a simple tool, not multi-tenant)
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public read transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert transactions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update transactions" ON transactions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete transactions" ON transactions FOR DELETE USING (true);

CREATE POLICY "Allow public read inventory" ON inventory FOR SELECT USING (true);
CREATE POLICY "Allow public insert inventory" ON inventory FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update inventory" ON inventory FOR UPDATE USING (true);
CREATE POLICY "Allow public delete inventory" ON inventory FOR DELETE USING (true);

CREATE POLICY "Allow public read config" ON config FOR SELECT USING (true);
CREATE POLICY "Allow public insert config" ON config FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update config" ON config FOR UPDATE USING (true);
CREATE POLICY "Allow public delete config" ON config FOR DELETE USING (true);

CREATE POLICY "Allow public read operators" ON operators FOR SELECT USING (true);
CREATE POLICY "Allow public insert operators" ON operators FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update operators" ON operators FOR UPDATE USING (true);
CREATE POLICY "Allow public delete operators" ON operators FOR DELETE USING (true);