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
    firebaseApp = firebase.initializeApp()
  }
} catch (e) {
  console.warn('Firebase initialization failed:', e)
}

let analytics:
  | ReactNativeFirebase.FirebaseModuleWithStatics<
      FirebaseAnalyticsTypes.Module,
      FirebaseAnalyticsTypes.Statics
    >
  | undefined

try {
  if (!isExpoGo) {
    analytics = require('@react-native-firebase/analytics').default
  }
} catch (e) {
  //
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
  if (!isExpoGo) {
    messaging = require('@react-native-firebase/messaging').default
  }
} catch (e) {
  //
}

export { analytics, messaging, firebaseApp }
