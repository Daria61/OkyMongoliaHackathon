# Entity Comparison Report: entity vs entity_old

## Summary of Changes

This report compares the TypeORM entity files between the `entity` and `entity_old` directories and provides PostgreSQL 16 migration scripts for the differences.

## Files with Differences

### 1. Article.ts
**New columns added:**
- `contentFilter: number` (default: 0)
- `isAgeRestricted: boolean` (default: false, nullable)
- `ageRestrictionLevel: number` (default: 0)
- `voiceOverKey: string` (nullable)
- `sortingKey: number` (auto-increment)

### 2. Category.ts
**New columns added:**
- `sortingKey: number` (auto-increment)

### 3. DidYouKnow.ts
**New columns added:**
- `ageRestrictionLevel: number` (default: 0)
- `contentFilter: number` (default: 0)

### 4. HelpCenter.ts
**New columns added:**
- `region: string` (nullable)
- `subRegion: string` (nullable)
- `isAvailableNationwide: boolean`
- `primaryAttributeId: number`
- `otherAttributes: string` (nullable)
- `isActive: boolean` (default: false)
- `sortingKey: number` (auto-increment)

### 5. Quiz.ts
**New columns added:**
- `ageRestrictionLevel: number` (default: 0)
- `contentFilter: number` (default: 0)

### 6. Subcategory.ts
**New columns added:**
- `sortingKey: number` (auto-increment)

### 7. Survey.ts
**New columns added:**
- `ageRestrictionLevel: number` (default: 0)
- `contentFilter: number` (default: 0)

### 8. Video.ts
**Changes:**
- **Removed:** `parent_category: string`
- **Added:** `sortingKey: number` (auto-increment)

### 9. HelpCenterAttribute.ts
**New entity** (not present in entity_old):
- `id: number` (primary, auto-increment)
- `name: string`
- `emoji: string`
- `isActive: boolean`
- `lang: string`

## Files with No Differences

The following files are identical in both directories:
- About.ts
- AboutBanner.ts
- Analytics.ts
- AvatarMessages.ts
- Notification.ts
- OkyUser.ts
- PermanentNotification.ts
- PrivacyPolicy.ts
- Question.ts
- Suggestion.ts
- TermsAndConditions.ts
- User.ts

## Migration Script

The complete PostgreSQL 16 migration script has been generated as:
`sql/migration_entity_differences.sql`

## Key Patterns Observed

1. **Content Filtering & Age Restrictions**: Multiple entities now support content filtering and age-based restrictions (Article, DidYouKnow, Quiz, Survey)
2. **Sorting Functionality**: Several entities now have auto-incrementing sorting keys (Article, Category, HelpCenter, Subcategory, Video)
3. **Voice-over Support**: Article entity now supports voice-over functionality
4. **Enhanced Help Center**: Significant expansion of help center functionality with location and attribute support
5. **New Entity**: HelpCenterAttribute added for managing help center attributes
