-- 2024-06-01 Add data_source and external_id columns to properties table (if not exists)
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS data_source VARCHAR(50) DEFAULT 'rightmove_demo';

-- Ensure external_id column exists for linking Rightmove IDs
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS external_id VARCHAR(255) UNIQUE;
