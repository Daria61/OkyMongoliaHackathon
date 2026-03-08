# Running the Oky Project

This guide walks you through running the Oky period tracker app on your local machine for development and testing.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start (TL;DR)](#quick-start-tldr)
- [Detailed Setup](#detailed-setup)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, install these tools on your system:

| Tool | Version | Purpose | Download Link |
|------|---------|---------|---------------|
| **Node.js** | LTS (18.x or later) | JavaScript runtime | [nodejs.org](https://nodejs.org/en) |
| **Yarn** | 1.22.x | Package manager | [yarnpkg.com](https://classic.yarnpkg.com/en/docs/install) |
| **Docker Desktop** | Latest | Backend services | [docker.com](https://www.docker.com/products/docker-desktop) |
| **Git** | Latest | Version control | Usually pre-installed |

**Optional (for mobile development):**
- **Android Studio** - For Android development/emulator
- **Xcode** - For iOS development (macOS only)
- **Expo Go app** - For testing on physical devices

---

## Quick Start (TL;DR)

For experienced developers who want to get started quickly:

```bash
# 1. Clone and install
git clone https://github.com/Oky-period-tracker/periodtracker.git
cd periodtracker
yarn && cd app && yarn && cd ..

# 2. Configure environment
yarn copy-config
yarn modules

# 3. Set up Firebase (required - see section 1.5 below)
# Place Firebase config files in:
# - app/src/resources/google-services.json
# - app/src/resources/GoogleService-Info.plist
# - packages/cms/firebase-config.json

# 4. Start backend
docker-compose build
yarn dev

# 5. Run database migrations (in another terminal)
# Go to http://localhost:8080 and run SQL from sql/create-tables.sql

# 6. Start mobile app (in another terminal)
yarn dev:app
# For Android emulator, also run: yarn reverse:all-ports
```

---

## Detailed Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Oky-period-tracker/periodtracker.git
cd periodtracker
```

**What this does:** Downloads the project code to your computer.

---

### Step 2: Install Dependencies

Install all project dependencies:

```bash
# Install root and workspace dependencies
yarn

# Install mobile app dependencies separately
cd app
yarn
cd ..
```

**What this does:** Downloads all the code libraries the project needs.

⏱️ **Expected time:** 5-10 minutes depending on your internet speed.

---

### Step 3: Configure Environment Variables

Set up configuration files from templates:

```bash
yarn copy-config
```

**What this does:** Creates `.env` files in `app/`, `packages/api/`, and `packages/cms/` from template files.

**Want to customize?** See the `.env.example` files in each directory for detailed configuration options.

---

### Step 4: Download Submodules and Setup Resources

The project uses Git submodules for assets and translations:

```bash
yarn modules
```

**What this does:**
- Downloads translation files and assets stored in separate repositories
- Creates a symlink from `app/src/resources` to the root `resources/` directory
- Sets up the `packages/core/src/common` placeholder directory

⚠️ **Note:** If this fails, you may need to configure Git submodule access. See [troubleshooting](#git-submodules-fail-to-download).

---

### Step 5: Set Up Firebase (Required)

Oky requires Firebase for push notifications and analytics. You'll need to:

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com/)

2. **Download configuration files:**
   - **For Android:** Download `google-services.json`
     - Go to Project Settings → General → Your Android App
     - Click "Download google-services.json"
     - Place in: `app/src/resources/google-services.json`

   - **For iOS:** Download `GoogleService-Info.plist`
     - Go to Project Settings → General → Your iOS App
     - Click "Download GoogleService-Info.plist"
     - Place in: `app/src/resources/GoogleService-Info.plist`

   - **For CMS:** Download service account key
     - Go to Project Settings → Service Accounts
     - Click "Generate new private key"
     - Rename to `firebase-config.json`
     - Place in: `packages/cms/firebase-config.json`

📚 **Need more help?** See the [Firebase Setup Guide](./docs/setup.md#firebase) for detailed instructions.

---

### Step 6: Build Docker Images

Build the Docker containers for backend services:

```bash
docker-compose build
```

**What this does:** Creates Docker containers for the API, CMS, and PostgreSQL database.

⏱️ **Expected time:** 5-10 minutes (first time only).

---

## Running the Application

### Start the Backend Services

In your terminal, run:

```bash
yarn dev
```

**What this starts:**
- 🗄️ **PostgreSQL Database** (internal port 5432)
- 🚀 **API Server** → [http://localhost:3000](http://localhost:3000)
- 📝 **CMS** → [http://localhost:5000](http://localhost:5000)
- 🛠️ **Adminer** (Database UI) → [http://localhost:8080](http://localhost:8080)

✅ **Success indicator:** You should see logs from all services without errors.

⚠️ **Keep this terminal open** - stopping it will shut down all backend services.

---

### Run Database Migrations

The database starts empty and needs to be set up manually.

**Step 1: Access Adminer**

1. Open [http://localhost:8080](http://localhost:8080) in your browser
2. You'll see a database login screen

**Step 2: Login to the Database**

Enter these credentials:

| Field | Value |
|-------|-------|
| **System** | PostgreSQL |
| **Server** | postgres |
| **Username** | periodtracker |
| **Password** | periodtracker |
| **Database** | periodtracker |

Click **Login**.

**Step 3: Run SQL Commands**

1. Click on **SQL command** in the left sidebar
2. Open `sql/create-tables.sql` in your code editor
3. **Copy all the SQL** from that file
4. **Paste it** into the SQL command box in Adminer
5. Click **Execute**

**Step 4: Run Migration Files**

Repeat the process for each file in the `sql/` directory (in order):
- `1695772800000-create-video-table.sql`
- `1701781248594-update-oky-user-table.sql`
- `1705982678530-alter-video-table.sql`
- `1709716115361-add-sort-column.sql`
- And any other migration files...

**Step 5: Create CMS Admin User (Optional)**

To access the CMS, you'll need an admin user. Run this SQL in Adminer:

```sql
-- Replace 'your_username' and 'your_password' with your desired credentials
INSERT INTO cms_user (username, password)
VALUES ('admin', 'temporary_password');
```

⚠️ **Security Note:** Change this password immediately after first login!

📚 **For more details:** See [docs/start_project.md](./docs/start_project.md#run-a-manual-migration)

---

### Start the Mobile App

**Open a new terminal** (keep the backend running in the other one) and run:

```bash
yarn dev:app
```

**What this does:** Starts the Expo development server.

You'll see a QR code and several options:

```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

**To run the app:**
- **Android Emulator:** Press `a` (requires Android Studio)
- **iOS Simulator:** Press `i` (requires Xcode, macOS only)
- **Physical Device:** Scan the QR code with Expo Go app
- **Web Browser:** Press `w`

---

### Android Emulator: Port Forwarding (Important!)

If you're using an Android emulator, it can't access `localhost` directly. You need to forward ports:

**In a new terminal, run:**

```bash
yarn reverse:all-ports
```

**What this does:** Makes `localhost:3000` and `localhost:5000` accessible to the emulator.

⚠️ **When to run this:**
- After starting the emulator
- If the app can't connect to the API

**Alternative:** Edit `app/.env` and change:
```bash
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000
EXPO_PUBLIC_API_BASE_CMS_URL=http://10.0.2.2:5000
```

---

## Troubleshooting

### Backend won't start

**Problem:** `docker-compose` not found or errors when running `yarn dev`

**Solutions:**
1. ✅ Make sure Docker Desktop is **running** (check system tray/menu bar)
2. ✅ Try `docker --version` - if it fails, reinstall Docker Desktop
3. ✅ Try stopping all containers: `docker-compose down` then `yarn dev` again

---

### Docker build fails with "Cannot find module" error

**Problem:** `docker-compose build` fails with errors like:
```
error TS2307: Cannot find module './common' or its corresponding type declarations
```
Or:
```
ERROR: failed to solve: process ... did not complete successfully
```

**Solutions:**
1. ✅ This issue has been fixed in the repository
2. ✅ If you still see this error, make sure you have the latest version:
   ```bash
   git pull origin main
   ```
3. ✅ Try a clean build:
   ```bash
   docker-compose down
   docker system prune -a  # Warning: removes all unused Docker images
   docker-compose build
   ```

---

### Database connection fails

**Problem:** API can't connect to database

**Solutions:**
1. ✅ Check if PostgreSQL container is running: `docker ps`
2. ✅ Verify credentials in `packages/api/.env` match `packages/cms/.env`
3. ✅ Restart Docker: `docker-compose down && docker-compose up`

---

### Mobile app can't connect to API

**Problem:** App shows network errors or "Cannot connect to server"

**Solutions:**

**For Android Emulator:**
1. ✅ Run `yarn reverse:all-ports`
2. ✅ Or use `10.0.2.2` instead of `localhost` in `app/.env`

**For Physical Device:**
1. ✅ Make sure device and computer are on the **same WiFi network**
2. ✅ Change `app/.env` to use your computer's IP address:
   ```bash
   # Find your IP: Windows: ipconfig | Mac/Linux: ifconfig
   EXPO_PUBLIC_API_BASE_URL=http://192.168.1.XXX:3000
   ```
3. ✅ Restart the app: `yarn dev:app`

**For iOS Simulator:**
1. ✅ `localhost` should work automatically
2. ✅ If not, restart the simulator

---

### Yarn install fails

**Problem:** Errors during `yarn` installation

**Solutions:**
1. ✅ Clear cache: `yarn cache clean`
2. ✅ Delete node_modules: `yarn rm` (from project root)
3. ✅ Reinstall: `yarn`
4. ✅ Check Node.js version: `node --version` (should be 18.x or higher)

---

### Git submodules fail to download

**Problem:** `yarn modules` fails with authentication error or "No such file or directory" error

**Solutions:**
1. ✅ Check if you have access to the submodule repositories
2. ✅ Try manual clone:
   ```bash
   git submodule update --init --recursive
   ```
3. ✅ Check `bin/modules/urls.sh` exists (created by `yarn copy-config`)
4. ✅ If error mentions `app/src/resources/eas.json`, try:
   ```bash
   yarn copy-eas
   ```
   This copies the EAS configuration to the correct location.
5. ✅ If `yarn modules` completes but app shows "Unable to resolve ../resources/redux":
   ```bash
   # Manually create the symlink
   cd app/src
   ln -s ../../resources resources
   cd ../..
   ```

---

### Unable to resolve "../resources/redux" or similar import errors

**Problem:** App fails with errors like:
```
Unable to resolve "../resources/redux" from "src/redux/store.ts"
Error: ENOENT: no such file or directory, open './src/resources/assets/app/favicon.png'
```

**Solutions:**
1. ✅ Run `yarn modules` to set up the resources symlink automatically
2. ✅ If `yarn modules` doesn't fix it, manually create the symlink:
   ```bash
   cd app/src
   ln -s ../../resources resources
   cd ../..
   ```
3. ✅ Verify the symlink exists:
   ```bash
   ls -la app/src/resources
   # Should show: resources -> ../../resources
   ```
4. ✅ Restart the Metro bundler:
   ```bash
   # Stop the current dev server (Ctrl+C)
   yarn dev:app
   ```

---

### Expo/Metro bundler issues

**Problem:** App won't start or shows bundler errors

**Solutions:**
1. ✅ Clear Metro cache:
   ```bash
   cd app
   yarn start -c  # -c flag clears cache
   ```
2. ✅ Clear watchman cache (macOS/Linux):
   ```bash
   watchman watch-del-all
   ```
3. ✅ Reinstall app dependencies:
   ```bash
   cd app
   rm -rf node_modules
   yarn
   ```

---

### CMS won't login

**Problem:** Can't access CMS at localhost:5000

**Solutions:**
1. ✅ Make sure you created an admin user (see database migration steps above)
2. ✅ Check CMS logs in the terminal running `yarn dev`
3. ✅ Verify `packages/cms/.env` has correct `PASSPORT_SECRET`
4. ✅ Check browser console for errors (F12)

---

### Port already in use

**Problem:** Error: "Port 3000/5000/8080 is already in use"

**Solutions:**
1. ✅ Stop any running instances: `docker-compose down`
2. ✅ Find what's using the port (Mac/Linux):
   ```bash
   lsof -i :3000  # or :5000, :8080
   ```
3. ✅ Find what's using the port (Windows):
   ```powershell
   netstat -ano | findstr :3000
   ```
4. ✅ Kill the process or change ports in `.env` files

---

## Next Steps

Once everything is running:

1. 📱 **Test the mobile app** - Create an account and explore features
2. 📝 **Access the CMS** - Visit [http://localhost:5000](http://localhost:5000) to manage content
3. 🗄️ **Explore the database** - Use Adminer at [http://localhost:8080](http://localhost:8080)
4. 🧪 **Run tests** - Execute `yarn test` to run the test suite
5. 📚 **Read the docs** - Check the `/docs` folder for more information

---

## Useful Commands

```bash
# Stop all services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f api    # API logs
docker-compose logs -f cms    # CMS logs
docker-compose logs -f postgres  # Database logs

# Clean everything and start fresh
yarn rm              # Remove all node_modules
yarn                 # Reinstall
docker-compose down -v  # Remove containers and volumes
docker-compose build    # Rebuild
yarn dev             # Start again
```

---

## Getting Help

- 📖 **Documentation:** Check the `/docs` folder
- 🐛 **Issues:** Report problems on GitHub
- 💬 **Community:** Join the Slack/Discord channel (see main README)
- 📋 **Contributing:** See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Happy coding! 🎉**
