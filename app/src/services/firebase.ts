/* eslint-disable @typescript-eslint/no-var-requires */
import { ReactNativeFirebase } from '@react-native-firebase/app'
import { FirebaseAnalyticsTypes } from '@react-native-firebase/analytics'
// TODO: Crashlytics disabled - import commented out to resolve app crash issues
// import { FirebaseCrashlyticsTypes } from '@react-native-firebase/crashlytics'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import Constants from 'expo-constants'

// Don't use firebase with ExpoGo, causes a crash on iOS
const isExpoGo = Constants?.executionEnvironment === 'storeClient'

// Initialize Firebase
let firebaseApp: ReactNativeFirebase.FirebaseApp | undefined

try {
  if (!isExpoGo) {
    const firebase = require('@react-native-firebase/app').default

    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp({
        // Firebase will automatically use google-services.json for Android
        // and GoogleService-Info.plist for iOS
      })
      console.log('✅ Firebase initialized successfully')
    } else {
      firebaseApp = firebase.app()
      console.log('✅ Firebase app already exists')
    }
  } else {
    console.log('⚠️ Running in Expo Go - Firebase disabled')
  }
} catch (e) {
  console.error('❌ Firebase initialization failed:', e)
}

let analytics:
  | ReactNativeFirebase.FirebaseModuleWithStatics<
      FirebaseAnalyticsTypes.Module,
      FirebaseAnalyticsTypes.Statics
    >
  | undefined

try {
  if (!isExpoGo && firebaseApp) {
    analytics = require('@react-native-firebase/analytics').default
    console.log('✅ Firebase Analytics initialized successfully')
  }
} catch (e) {
  console.warn('⚠️ Firebase Analytics initialization failed:', e)
}

// TODO: Crashlytics disabled - code commented out to resolve app crash issues
// let crashlytics:
//   | ReactNativeFirebase.FirebaseModuleWithStatics<
//       FirebaseCrashlyticsTypes.Module,
//       FirebaseCrashlyticsTypes.Statics
//     >
//   | undefined

// try {
//   if (!isExpoGo) {
//     crashlytics = require('@react-native-firebase/crashlytics').default
//     // Enable this to check crashlytics is working or not
//     // crashlytics?.().crash();
//   }
// } catch (e) {
//   //
// }

let messaging:
  | ReactNativeFirebase.FirebaseModuleWithStatics<
      FirebaseMessagingTypes.Module,
      FirebaseMessagingTypes.Statics
    >
  | undefined

try {
  if (!isExpoGo && firebaseApp) {
    messaging = require('@react-native-firebase/messaging').default
    console.log('✅ Firebase Messaging initialized successfully')
  }
} catch (e) {
  console.warn('⚠️ Firebase Messaging initialization failed:', e)
}

export { analytics, messaging, firebaseApp }
