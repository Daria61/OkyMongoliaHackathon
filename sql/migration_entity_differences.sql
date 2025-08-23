-- PostgreSQL 16 Migration Script
-- Entity differences between entity_old and entity directories
-- Generated on 2025-08-22

-- Article: Add content filtering and voice-over features
ALTER TABLE article
  ADD contentFilter integer DEFAULT 0,
  ADD isAgeRestricted boolean DEFAULT false,
  ADD ageRestrictionLevel integer DEFAULT 0,
  ADD voiceOverKey text,
  ADD sortingKey serial;

-- Category: Add sorting functionality
ALTER TABLE category
  ADD sortingKey serial;

-- DidYouKnow: Add age restriction and content filtering
ALTER TABLE did_you_know
  ADD ageRestrictionLevel integer DEFAULT 0,
  ADD contentFilter integer DEFAULT 0;

-- HelpCenter: Add location, attributes, and availability features
ALTER TABLE help_center
  ADD region text,
  ADD subRegion text,
  ADD isAvailableNationwide boolean,
  ADD primaryAttributeId integer,
  ADD otherAttributes text,
  ADD isActive boolean DEFAULT false,
  ADD sortingKey serial;

-- Quiz: Add age restriction and content filtering
ALTER TABLE quiz
  ADD ageRestrictionLevel integer DEFAULT 0,
  ADD contentFilter integer DEFAULT 0;

-- Subcategory: Add sorting functionality
ALTER TABLE subcategory
  ADD sortingKey serial;

-- Survey: Add age restriction and content filtering
ALTER TABLE survey
  ADD ageRestrictionLevel integer DEFAULT 0,
  ADD contentFilter integer DEFAULT 0;

-- Video: Remove parent_category and add sorting functionality
ALTER TABLE video
  DROP COLUMN IF EXISTS parent_category;

ALTER TABLE video
  ADD sortingKey serial;

-- Create new table: HelpCenterAttribute (new entity not in old version)
CREATE TABLE IF NOT EXISTS help_center_attribute (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  emoji text NOT NULL,
  isActive boolean NOT NULL,
  lang text NOT NULL
);

-- Add comments for documentation
COMMENT ON TABLE help_center_attribute IS 'Attributes for help centers - new entity added';
COMMENT ON COLUMN article.contentFilter IS 'Content filtering level (0 = no filter)';
COMMENT ON COLUMN article.isAgeRestricted IS 'Whether content has age restrictions';
COMMENT ON COLUMN article.ageRestrictionLevel IS 'Age restriction level (0 = no restriction)';
COMMENT ON COLUMN article.voiceOverKey IS 'Key for voice-over audio file';
COMMENT ON COLUMN article.sortingKey IS 'Auto-increment key for sorting';
