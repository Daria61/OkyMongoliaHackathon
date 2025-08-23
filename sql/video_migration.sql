-- PostgreSQL 16 Migration Script for Video Table
-- Changes from entity_old/Video.ts to entity/Video.ts
-- Generated on 2025-08-22

-- Video table migration
-- Remove parent_category column and add sortingKey

-- Step 1: Remove the parent_category column (if it exists)
ALTER TABLE video 
DROP COLUMN IF EXISTS parent_category;

-- Step 2: Add sortingKey column with auto-increment
ALTER TABLE video 
ADD COLUMN sortingKey SERIAL;

-- Add comment for documentation
COMMENT ON COLUMN video.sortingKey IS 'Auto-increment key for sorting videos';

-- Optional: If you want to populate sortingKey with existing order based on date_created
-- UPDATE video SET sortingKey = row_number() OVER (ORDER BY date_created);

-- Verify the changes (optional - comment out in production)
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'video' 
-- ORDER BY ordinal_position;
