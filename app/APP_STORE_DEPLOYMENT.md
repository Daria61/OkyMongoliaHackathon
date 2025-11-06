# App Store Deployment Guide for Oky Mongolia

## Prerequisites

1. **Apple Developer Account**
   - Active Apple Developer Program membership ($99/year)
   - Team ID (find it at https://developer.apple.com/account)

2. **EAS CLI Installation**
   ```bash
   npm install -g eas-cli
   ```

3. **Expo Account**
   - Sign up at https://expo.dev
   - Login: `eas login`

## Step-by-Step Deployment Process

### 1. Update Team ID in eas.json

Replace `YOUR_TEAM_ID` in `eas.json` with your actual Apple Team ID:
```json
"appleTeamId": "XXXXXXXXXX"
```

### 2. Configure App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Create a new app (if not already created):
   - Bundle ID: `com.oky.mn`
   - App Name: `Oky Mongolia`
   - SKU: `oky-mongolia`
   - Primary Language: Choose appropriate language

### 3. Build for Production

```bash
cd app
eas build --platform ios --profile production
```

This will:
- Build your app in the cloud
- Auto-increment the build number
- Create an `.ipa` file ready for App Store

**Note**: First time users need to:
```bash
eas build:configure
```

### 4. Submit to App Store

After the build completes successfully:

```bash
eas submit --platform ios --profile production
```

Or specify the build ID:
```bash
eas submit --platform ios --latest
```

### 5. Complete App Store Connect Setup

After submission, go to App Store Connect:

1. **App Information**
   - Privacy Policy URL
   - Category
   - Content Rights

2. **Pricing and Availability**
   - Select countries/regions
   - Set pricing (Free or Paid)

3. **App Version Information**
   - Screenshots (required sizes):
     - 6.7" display (iPhone 14 Pro Max): 1290 x 2796
     - 6.5" display (iPhone 11 Pro Max): 1242 x 2688
     - 5.5" display (iPhone 8 Plus): 1242 x 2208
   - App Preview videos (optional)
   - Description
   - Keywords
   - Support URL
   - Marketing URL (optional)

4. **Build**
   - Select the build you just submitted
   - Wait for processing (15-30 minutes)

5. **Age Rating**
   - Complete the questionnaire

6. **App Review Information**
   - Contact information
   - Demo account (if required)
   - Notes for reviewer

7. **Submit for Review**
   - Click "Submit for Review"
   - Review time: 1-3 days typically

## Alternative: Manual Build and Submit

If you prefer to build locally:

### Build Locally
```bash
cd app/ios
xcodebuild -workspace OkyMongolia.xcworkspace \
  -scheme OkyMongolia \
  -configuration Release \
  -archivePath build/OkyMongolia.xcarchive \
  archive
```

### Create IPA
```bash
xcodebuild -exportArchive \
  -archivePath build/OkyMongolia.xcarchive \
  -exportPath build \
  -exportOptionsPlist exportOptions.plist
```

### Upload with Transporter
1. Download Apple Transporter from Mac App Store
2. Open Transporter
3. Drag and drop the `.ipa` file
4. Click "Deliver"

## Quick Commands Reference

```bash
# Login to EAS
eas login

# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Cancel a build
eas build:cancel [BUILD_ID]

# Submit latest build
eas submit --platform ios --latest

# View submission status
eas submission:list

# Update app version
# Edit app.config.js: version and ios.buildNumber
```

## Troubleshooting

### Issue: Missing Provisioning Profile
**Solution**: EAS will automatically create and manage provisioning profiles. Ensure you're logged in with the correct Apple ID.

### Issue: Certificate Issues
**Solution**: 
```bash
eas credentials
```
Then select "iOS" → "Production" → "Manage"

### Issue: Build Fails
**Solution**: Check build logs:
```bash
eas build:view [BUILD_ID]
```

### Issue: App Store Connect Processing Stuck
**Solution**: Wait 30 minutes. If still stuck, contact Apple Support.

## Current Configuration

- **Bundle ID**: com.oky.mn
- **App Name**: Oky Mongolia
- **Current Version**: 1.2.1
- **Current Build Number**: 4
- **Apple ID**: gereltod.s@icloud.com
- **ASC App ID**: 6753663859

## Before Each Release

1. Update version in `app.config.js`:
   ```javascript
   "version": "1.2.2",  // Increment version
   "ios": {
     "buildNumber": "5"  // Or use autoIncrement
   }
   ```

2. Test thoroughly on TestFlight first:
   ```bash
   eas build --platform ios --profile preview
   ```

3. Create release notes

4. Prepare screenshots if UI changed

5. Update CHANGELOG.md

## Useful Links

- EAS Build Documentation: https://docs.expo.dev/build/introduction/
- EAS Submit Documentation: https://docs.expo.dev/submit/introduction/
- App Store Connect: https://appstoreconnect.apple.com
- Apple Developer Portal: https://developer.apple.com/account
- TestFlight: https://appstoreconnect.apple.com/apps/[YOUR_APP_ID]/testflight

## Notes

- Production builds take 15-30 minutes on EAS
- Auto-increment is enabled, so build number will increase automatically
- Keep your Apple credentials secure
- TestFlight can have up to 10,000 external testers
- App Store review typically takes 1-3 days
