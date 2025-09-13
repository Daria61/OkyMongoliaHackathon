# Android Release APK Build Guide

This guide shows how to build a signed release APK for the OKY Mongolia app.

## Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **Java Development Kit (JDK)** (v11 or higher)
- **Android Studio** (latest version)
- **Android SDK** (API level 24+)

### Installation Steps

1. **Install Node.js**
   ```bash
   # Download from https://nodejs.org/ or use package manager
   # macOS with Homebrew:
   brew install node
   ```

2. **Install Java JDK**
   ```bash
   # macOS with Homebrew:
   brew install openjdk@11
   ```

3. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install Android SDK through Android Studio
   - Set up environment variables:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/tools/bin
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

## Build Process

### 1. Install Dependencies
```bash
cd /path/to/oky-new/app
npm install --legacy-peer-deps
```

### 2. Configure Keystore
The keystore is already configured in `android/gradle.properties`:
```
OKY_UPLOAD_STORE_FILE=../keystore/okymn.keystore
OKY_UPLOAD_KEY_ALIAS=okymn
OKY_UPLOAD_STORE_PASSWORD=okymn2020
OKY_UPLOAD_KEY_PASSWORD=okymn2020
```

### 3. Build Release APK
```bash
cd android
./gradlew clean assembleRelease
```

### 4. Find the APK
The signed APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Build Commands Summary

```bash
# Navigate to app directory
cd /path/to/oky-new/app

# Install dependencies
npm install --legacy-peer-deps

# Navigate to android directory
cd android

# Clean and build release APK
./gradlew clean assembleRelease
```

## Troubleshooting

### Common Issues

1. **Dependency conflicts**: Use `--legacy-peer-deps` flag with npm install
2. **Keystore not found**: Ensure keystore file exists at `app/keystore/okymn.keystore`
3. **Android SDK not found**: Set ANDROID_HOME environment variable
4. **Build fails**: Try cleaning first with `./gradlew clean`

### Build Output
- **Success**: `BUILD SUCCESSFUL` message
- **APK Location**: `android/app/build/outputs/apk/release/app-release.apk`
- **Signing**: APK is signed with the provided keystore credentials

## Notes
- The build process takes approximately 2-3 minutes
- The APK is ready for distribution or installation on Android devices
- Keystore credentials are configured for production signing
