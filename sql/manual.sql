ALTER TABLE article
  ADD COLUMN contentFilter integer DEFAULT 0,
  ADD COLUMN isAgeRestricted boolean DEFAULT false,
  ADD COLUMN ageRestrictionLevel integer DEFAULT 0,
  ADD COLUMN voiceOverKey text,
  ADD COLUMN sortingKey serial;

-- Category: add sortingKey
ALTER TABLE category
  ADD COLUMN sortingKey serial;

-- DidYouKnow: add ageRestrictionLevel and contentFilter
ALTER TABLE did_you_know
  ADD COLUMN ageRestrictionLevel integer DEFAULT 0,
  ADD COLUMN contentFilter integer DEFAULT 0;



ALTER TABLE help_center
  ADD COLUMN region text,
  ADD COLUMN subRegion text,
  ADD COLUMN isAvailableNationwide boolean,
  ADD COLUMN primaryAttributeId integer,
  ADD COLUMN otherAttributes text,
  ADD COLUMN isActive boolean DEFAULT false,
  ADD COLUMN sortingKey serial;


-- Quiz: add ageRestrictionLevel and contentFilter
ALTER TABLE quiz
  ADD COLUMN ageRestrictionLevel integer DEFAULT 0,
  ADD COLUMN contentFilter integer DEFAULT 0;

-- Subcategory: add sortingKey
ALTER TABLE subcategory
  ADD COLUMN sortingKey serial;