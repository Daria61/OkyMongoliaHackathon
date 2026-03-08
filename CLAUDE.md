# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oky is a period tracker mobile app designed with girls' input for ages 10-19. It's a monorepo containing:
- **React Native mobile app** (Expo) with offline-first architecture
- **Backend API** (Express.js with TypeORM)
- **CMS** for content management
- **Shared core library** with prediction engine and common utilities

The project uses Yarn Workspaces with packages in `packages/` directory and the mobile app in `app/`.

## Essential Commands

### Initial Setup
```bash
# Install all dependencies
yarn

# Install app dependencies separately
cd app && yarn && cd ..

# Copy environment config from templates
yarn copy-config

# Download git submodules (assets and translations)
yarn modules

# Build Docker images
docker-compose build
```

### Development Workflow

**Backend Development:**
```bash
# Start backend services (API, CMS, database, Adminer)
yarn dev

# Services will be available at:
# - API: http://localhost:3000
# - CMS: http://localhost:5000
# - Adminer (DB management): http://localhost:8080
```

**Database Management:**
After starting `yarn dev`, manually run migrations:
1. Go to http://localhost:8080
2. Login with: System=PostgreSQL, Server=postgres, User=periodtracker, Password=periodtracker, Database=periodtracker
3. Execute SQL from `sql/create-tables.sql` followed by migration files in `sql/` directory

**Mobile App Development:**
```bash
# Start Expo dev server
yarn dev:app

# For Android emulator - reverse ports for API access
yarn reverse:all-ports
# Or individually: adb reverse tcp:3000 tcp:3000 && adb reverse tcp:5000 tcp:5000
```

### Testing
```bash
# Run all tests (workspace packages + app)
yarn test

# Test individual packages
yarn test:prediction-engine  # Core prediction logic
yarn test:saga               # Redux sagas
yarn test:app                # Mobile app

# Run tests for specific package
cd packages/api && yarn test
cd packages/cms && yarn test
cd packages/core && yarn test
```

### Code Quality
```bash
# Lint all workspaces
yarn lint

# Format code
yarn format

# TypeScript check in app
cd app && yarn ts:check
```

### Building
```bash
# Clean and compile all packages
yarn clean
yarn compile

# Build specific packages
yarn workspace @oky/core compile
yarn workspace @oky/api compile
```

### Cleanup
```bash
# Remove all node_modules
yarn rm

# Full reinstall
yarn reinstall

# Clean Docker
yarn rm:docker
```

### Utility Scripts
```bash
# Generate SQL from current schema
yarn generate-sql

# Fetch content from CMS
yarn fetch-content

# Manage database sync feature
yarn database-sync:enable
yarn database-sync:disable
```

## Architecture

### Monorepo Structure
- **`app/`** - React Native mobile application (Expo)
- **`packages/api/`** - Backend API using Express.js, routing-controllers, TypeORM
- **`packages/cms/`** - Content Management System using Express.js, EJS, Passport.js
- **`packages/core/`** - Shared library (prediction engine, mappers, common utilities)
- **`sql/`** - Database schema and migrations
- **`bin/`** - Shell scripts for setup and modules management

### Mobile App Architecture (`app/src/`)

**State Management:**
- Redux with Redux Saga for side effects
- Redux Persist with encryption for local data storage
- Encrypted using `redux-persist-transform-encrypt`
- Key directories:
  - `redux/actions/` - Action creators
  - `redux/reducers/` - State reducers (app, auth, content, answers, analytics, helpCenter, prediction)
  - `redux/sagas/` - Saga middleware (auth, content, analytics, app, smartPrediction)
  - `redux/store.ts` - Store configuration with persistence and encryption

**Core Modules:**
- `prediction/` - Period prediction engine using simple moving average
  - `PredictionEngine.ts` - Main prediction logic
  - `PredictionState.ts` - State management for predictions
  - Uses circular buffers for averaging cycle/period lengths
  - Import via `import { predictor } from '@oky/core'`
- `navigation/` - React Navigation stacks
- `screens/` - Screen components organized by feature
- `components/` - Reusable UI components
- `core/api/` - API client configuration

**Key Features:**
- Offline-first design with local data storage
- Firebase for push notifications and analytics
- Passcode protection for privacy
- Multi-language support (translations in `resources/translations/`)

### Backend API Architecture (`packages/api/src/`)

Follows domain-driven design:
- **`application/`** - Application services and business logic
- **`domain/`** - Domain entities and services
- **`infrastructure/`** - Database repositories, migrations
- **`interfaces/api/`** - Controllers and middlewares

Uses:
- `routing-controllers` for declarative routing
- TypeORM for database operations
- JWT for authentication
- TypeDI for dependency injection

### CMS Architecture (`packages/cms/src/`)

- **`controller/`** - Express controllers
- **`entity/`** - TypeORM entities
- **`views/`** - EJS templates
- Uses Passport.js with cookie-session for authentication
- Multer for file uploads

### Shared Core (`packages/core/src/`)

- **`api/`** - Shared API types and interfaces
- **`common/`** - Common utilities
- **`mappers/`** - Data transformation logic
- Prediction engine used by mobile app

## Database Schema

Key tables:
- `oky_user` - User accounts (hashed credentials, demographics)
- `app_event` - Analytics event log
- `article` - Encyclopedia content
- `category` - Article categories
- `quiz` - Quiz questions/answers
- `survey` - User surveys
- `help_center` - Help center locations and contacts
- `video` - Video content

## Testing Guidelines

- **App tests:** Use Jest with React Native Testing Library
- **API/CMS tests:** Use Jest with `--forceExit --coverage --verbose --detectOpenHandles`
- **Core tests:** Focus on prediction engine logic
- Test files in `__tests__/` directories
- Jest config files in each package root

## Development Notes

### Environment Configuration
The project uses `.env` files for configuration. Two options:

**Option 1: Quick Setup (Recommended)**
```bash
yarn copy-config  # Copies from .env.dist templates
```

**Option 2: Manual Setup**
Copy `.env.example` files to `.env` and customize:
- Root: `.env.example` → `.env` (reference only)
- App: `app/.env.example` → `app/.env`
- API: `packages/api/.env.example` → `packages/api/.env`
- CMS: `packages/cms/.env.example` → `packages/cms/.env`

The `.env.example` files contain detailed comments explaining each variable.

**Important Environment Variables:**
- `APPLICATION_SECRET` / `PASSPORT_SECRET`: Change in production!
- `DATABASE_SYNCHRONIZE`: Must be `false` in production (always use migrations)
- `EXPO_PUBLIC_API_BASE_URL`: Use `http://localhost:3000` for local dev
- For Android emulator: Run `yarn reverse:all-ports` or use `http://10.0.2.2:3000`

### Firebase Setup Required
You must configure Firebase and place these files:
- `app/src/resources/google-services.json` (Android)
- `app/src/resources/GoogleService-Info.plist` (iOS)
- `packages/cms/firebase-config.json` (CMS)

Get these from Firebase Console → Project Settings → Service Accounts

### Git Submodules
The project uses submodules for translations and assets:
- Run `yarn modules` to pull/update
- Run `yarn modules:checkout` to checkout specific branches

### Port Forwarding for Android Emulator
When testing the app on Android emulator, backend services run on localhost but emulator needs port reversal:
```bash
yarn reverse:all-ports
```

### Prediction Engine Usage
The period tracker uses a prediction engine with simple moving average:
- Tracks current cycle and history
- Uses circular buffers (size 6) for averaging
- Key methods: `predictDay()`, `calculateStatusForDateRange()`, `userInputDispatch()`
- See `app/src/prediction/README.md` for detailed API

### Docker Services
When running `yarn dev`:
- Postgres database on port 5432
- API on port 3000
- CMS on port 5000
- Adminer on port 8080

### Linting and Formatting
- TSLint configured for TypeScript (older packages)
- ESLint configured for app (newer)
- Prettier for code formatting
- Husky pre-commit hooks run lint-staged

### Working with Workspaces
```bash
# Run command in specific workspace
yarn workspace @oky/core <command>
yarn workspace @oky/api <command>
yarn workspace @oky/cms <command>

# Run command in all workspaces
yarn workspaces run <command>
```

## Common Workflows

### Adding a New Feature to Mobile App
1. Create Redux actions in `app/src/redux/actions/`
2. Add reducer logic in `app/src/redux/reducers/`
3. Implement saga for side effects in `app/src/redux/sagas/`
4. Create screen/component in `app/src/screens/` or `app/src/components/`
5. Update navigation in `app/src/navigation/`
6. Add tests in component `__tests__/`

### Adding a New API Endpoint
1. Create controller in `packages/api/src/interfaces/api/controllers/`
2. Add business logic in `packages/api/src/application/`
3. Create/update domain entities in `packages/api/src/domain/`
4. Update TypeORM entities if database changes needed
5. Write migration SQL in `sql/` directory
6. Add tests in `__tests__/`

### Adding Database Migration
1. Create new SQL file in `sql/` with timestamp prefix: `[timestamp]-description.sql`
2. Run migration manually through Adminer
3. Update TypeORM entities if needed

### Running Single Test File
```bash
# In app
cd app && jest path/to/test.test.ts

# In packages
cd packages/api && NODE_PATH=./src jest path/to/test.test.ts
```
