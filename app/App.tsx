import 'react-native-get-random-values'
import * as React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Background } from './src/components/Background'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useOrientationLock } from './src/hooks/useOrientationLock'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { EncyclopediaProvider } from './src/screens/EncyclopediaScreen/EncyclopediaContext'
import { ResponsiveProvider } from './src/contexts/ResponsiveContext'
import { PredictionProvider } from './src/contexts/PredictionProvider'
import { AuthProvider } from './src/contexts/AuthContext'
import { LoadingProvider } from './src/contexts/LoadingProvider'
import { StatusBar, ErrorUtils } from 'react-native'
import { safeAnalytics } from './src/services/analyticsLogger'
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated'
import { SoundProvider } from './src/contexts/SoundProvider'
import { ErrorBoundary } from './src/components/ErrorBoundary'

// Set up global error handler
if (ErrorUtils) {
  const defaultHandler = ErrorUtils.getGlobalHandler()
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('❌ Global Error Handler:', error)
    console.error('❌ Is Fatal:', isFatal)
    if (defaultHandler) {
      defaultHandler(error, isFatal)
    }
  })
}

// Handle unhandled promise rejections
const handleUnhandledRejection = (event: any) => {
  console.error('❌ Unhandled Promise Rejection:', event?.reason || event)
}

if (typeof global !== 'undefined') {
  // @ts-ignore - global.onunhandledrejection is not typed in React Native
  if (!global.onunhandledrejection) {
    // @ts-ignore
    global.onunhandledrejection = handleUnhandledRejection
  }
}

function App() {
  useOrientationLock()

  React.useEffect(() => {
    // Safely log app open with proper error handling
    safeAnalytics.logAppOpen()
  }, [])

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ReducedMotionConfig mode={ReduceMotion.Never} />
        <GestureHandlerRootView>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider>
                <PredictionProvider>
                  <ResponsiveProvider>
                    <SoundProvider>
                      <EncyclopediaProvider>
                        <Background>
                          <LoadingProvider>
                            <StatusBar hidden />
                            <RootNavigator />
                          </LoadingProvider>
                        </Background>
                      </EncyclopediaProvider>
                    </SoundProvider>
                  </ResponsiveProvider>
                </PredictionProvider>
              </AuthProvider>
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  )
}

export default App
