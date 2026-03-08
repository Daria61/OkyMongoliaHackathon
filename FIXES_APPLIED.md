# Fixes Applied to Oky Project

This document summarizes the issues that were fixed to make the project buildable and runnable.

## Date: March 4, 2026

---

## Issue 1: `yarn modules` Failed with Missing File Error

### Problem
Running `yarn modules` resulted in:
```
cp: app/src/resources/eas.json: No such file or directory
error Command failed with exit code 1.
```

### Root Cause
The script `bin/setup/eas.sh` was trying to copy from `app/src/resources/eas.json`, but:
- The `app/src/resources/` directory doesn't exist
- The actual file is located at `resources/eas.json` (in the project root)

### Fix Applied
Updated `bin/setup/eas.sh` to:
1. Look for the file in the correct location (`resources/eas.json` or `eas.json`)
2. Copy it to `app/eas.json`
3. Provide helpful error messages if the file is not found

### Files Modified
- `bin/setup/eas.sh` - Fixed the source path and added error handling

---

## Issue 2: `docker-compose build` Failed with Missing Base Image

### Problem
Running `docker-compose build` resulted in:
```
ERROR [api internal] load metadata for docker.io/oky/base:latest
```

### Root Cause
The Docker setup had several issues:
1. The API Dockerfile (`packages/api/Dockerfile`) was trying to use a custom base image `oky/base` that needed to be built separately
2. Docker was trying to pull `oky/base` from Docker Hub instead of building it locally
3. The build context in `docker-compose.yml` was incorrect (pointing to `packages/api/.` instead of the root)

### Fix Applied
1. **Rewrote `packages/api/Dockerfile`**:
   - Made it self-contained like the CMS Dockerfile
   - Uses multi-stage build pattern
   - No longer depends on external `oky/base` image
   - Builds from the project root context

2. **Updated `docker-compose.yml`**:
   - Removed the `base` service (no longer needed)
   - Changed build context for API and CMS to `.` (project root)
   - Added explicit `dockerfile` parameter pointing to the correct Dockerfile location
   - Changed dependencies from `base` to `postgres`

3. **Updated `docker-compose.override.yml`**:
   - Fixed build context to match the main compose file
   - Added core package volume mount (needed for development)
   - Ensured proper volume configuration for hot-reloading

### Files Modified
- `packages/api/Dockerfile` - Complete rewrite using multi-stage build
- `docker-compose.yml` - Fixed build context and removed base image dependency
- `docker-compose.override.yml` - Updated to match new build context

---

## Issue 3: TypeScript Compilation Error in Core Package

### Problem
Docker build failed during TypeScript compilation:
```
error TS2307: Cannot find module './common' or its corresponding type declarations
```

### Root Cause
The `packages/core/src/index.ts` file was trying to export from a `./common` module that doesn't exist in the repository. It appears this directory was deleted at some point, and the developers left TODO comments indicating the exports were moved inline.

### Fix Applied
Commented out the problematic export line in `packages/core/src/index.ts`:
```typescript
// export * from './common' // COMMENTED OUT: common directory missing
```

The necessary exports (Locale, defaultLocale, countries, provinces, cmsLanguages) are already defined inline in the index.ts file.

### Files Modified
- `packages/core/src/index.ts` - Commented out the missing './common' export

---

## Issue 4: Mobile App "Unable to Resolve Resources" Error

### Problem
When running `yarn dev:app`, the app failed with errors:
```
Unable to resolve "../resources/redux" from "src/redux/store.ts"
Error: ENOENT: no such file or directory, open './src/resources/assets/app/favicon.png'
```

### Root Cause
The mobile app imports resources from `../resources/` (expecting `app/src/resources/`), but:
1. The `resources` git submodule is disabled in `bin/modules/urls.sh` (commented out with "Disabled for use main repo")
2. The resources exist in the root `resources/` directory instead
3. The app code expects them at `app/src/resources/`
4. No symlink was created to bridge this gap

### Fix Applied
1. **Created symlink** from `app/src/resources` to root `resources/` directory:
   ```bash
   cd app/src && ln -s ../../resources resources
   ```

2. **Updated `bin/modules/pull.sh`** to automatically:
   - Create the symlink if it doesn't exist
   - Create the `packages/core/src/common` placeholder directory
   - Handle cases where submodule URLs are disabled/commented out
   - Provide better error messages and fallbacks

3. **Created `packages/core/src/common/index.ts`** as a placeholder with necessary exports (Locale, countries, provinces, cmsLanguages)

4. **Re-enabled the export** in `packages/core/src/index.ts` to export from './common'

### Files Modified
- `app/src/resources` - Created symlink to `../../resources`
- `packages/core/src/common/index.ts` - Created placeholder with exports
- `packages/core/src/index.ts` - Re-enabled './common' export
- `bin/modules/pull.sh` - Enhanced to auto-create symlink and common directory

---

## Documentation Improvements

### New Files Created
1. **`.env.example`** (root) - Complete reference for all environment variables
2. **`app/.env.example`** - Mobile app configuration guide
3. **`packages/api/.env.example`** - Backend API configuration guide
4. **`packages/cms/.env.example`** - CMS configuration guide
5. **`CLAUDE.md`** - Comprehensive guide for AI assistants working on this project
6. **`FIXES_APPLIED.md`** (this file) - Documentation of all fixes

### Files Updated
1. **`RUN_PROJECT.md`** - Complete rewrite with:
   - Better structure and table of contents
   - Quick start section for experienced developers
   - Step-by-step detailed setup instructions
   - Comprehensive troubleshooting section (8+ common issues)
   - Visual indicators and expected time estimates
   - Platform-specific instructions (Android/iOS/Windows/Mac)

---

## Verification

All fixes have been tested and verified:

✅ `yarn copy-eas` - Works correctly
✅ `yarn modules` - Completes without errors, creates symlink and common directory
✅ `docker-compose build` - Builds both API and CMS successfully
✅ Core package compilation - `yarn run compile` succeeds
✅ Resources accessible - `app/src/resources` symlink works correctly
✅ App imports - `import { config } from '../resources/redux'` resolves successfully

---

## Next Steps for Developers

After pulling these changes:

1. **Clean any existing Docker builds:**
   ```bash
   docker-compose down
   docker system prune -a  # Optional: removes all unused Docker images
   ```

2. **Run the setup:**
   ```bash
   yarn copy-config
   yarn modules
   docker-compose build
   ```

3. **Start development:**
   ```bash
   yarn dev  # Start backend
   yarn dev:app  # In another terminal, start mobile app
   ```

---

## Notes

- The `version` field in `docker-compose.yml` is marked as obsolete by Docker Compose v2+ but doesn't affect functionality
- Some peer dependency warnings in yarn are expected and don't affect the build
- The Firebase configuration files still need to be added manually (see RUN_PROJECT.md for instructions)

---

## Summary

All critical issues preventing the project from building and running have been resolved. The project now:
- ✅ Builds successfully with Docker
- ✅ Has proper environment configuration examples
- ✅ Has comprehensive documentation
- ✅ Has troubleshooting guides for common issues
