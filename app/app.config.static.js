export default {
  "expo": {
    "name": "Oky Mongolia",
    "slug": "periodtracker",
    "version": "1.0.0",
    "orientation": "default",
    "icon": "./src/resources/assets/app/icon.jpg",
    "splash": {
      "image": "./src/resources/assets/app/splash.jpg",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "bundleIdentifier": "com.oky.mn",
      "buildNumber": "1",
      "supportsTablet": true,
      "deploymentTarget": "12.0",
      "infoPlist": {
        "UIBackgroundModes": ["fetch", "remote-notification"],
        "NSCameraUsageDescription": "This app uses camera for profile photos",
        "NSPhotoLibraryUsageDescription": "This app accesses photo library for profile photos"
      },
      "entitlements": {
        "aps-environment": "production"
      },
      "config": {
        "googleServicesFile": "./GoogleService-Info.plist"
      }
    },
    "android": {
      "package": "com.oky.mn",
      "versionCode": 80,
      "supportsTablet": true,
      "permissions": ["INTERNET"]
    },
    "web": {
      "favicon": "./src/resources/assets/app/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "84a3f142-9683-4947-805c-45bb8d5e7ffa"
      }
    },
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "useLegacyPackaging": true,
            "enableShrinkResourcesInReleaseBuilds": true,
            "enableProguardInReleaseBuilds": true,
            "manifest": {
              "application": {
                "meta-data": [
                  {
                    "android:name": "com.google.firebase.messaging.default_notification_channel_id",
                    "tools:replace": "android:value",
                    "android:value": "default"
                  },
                  {
                    "android:name": "com.google.firebase.messaging.default_notification_color",
                    "tools:replace": "android:resource",
                    "android:resource": "@color/notification_icon_color"
                  }
                ]
              }
            }
          }
        }
      ],
      "expo-localization",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}


