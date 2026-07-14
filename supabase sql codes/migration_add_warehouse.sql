-- Migration: Add warehouse column to transactions and inventory tables
-- Run this in Supabase SQL Editor

-- 1. Add warehouse column to transactions
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS warehouse TEXT DEFAULT '';

-- 2. Add warehouse column to inventory
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS warehouse TEXT DEFAULT '';

-- 3. Update inventory UNIQUE constraint to include warehouse
-- Drop old constraint first, then create new one with warehouse
ALTER TABLE inventory DROP CONSTRAINT IF EXISTS inventory_product_pack_size_production_month_key;
ALTER TABLE inventory ADD UNIQUE (product, pack_size, production_month, warehouse);
