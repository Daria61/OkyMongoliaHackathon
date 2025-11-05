import { analytics } from './firebase'

/**
 * Safe analytics logger that prevents crashes if Firebase is not initialized
 */
export const safeAnalytics = {
  logEvent: (eventName: string, params?: Record<string, any>) => {
    try {
      analytics?.().logEvent(eventName, params)
    } catch (error) {
      console.warn(`⚠️ Analytics logging failed for event "${eventName}":`, error)
    }
  },

  logScreenView: (params: { screen_name: string; screen_class: string }) => {
    try {
      analytics?.().logScreenView(params)
    } catch (error) {
      console.warn('⚠️ Analytics screen view logging failed:', error)
    }
  },

  logAppOpen: async () => {
    try {
      if (analytics && typeof analytics === 'function') {
        const analyticsInstance = analytics()
        if (analyticsInstance && typeof analyticsInstance.logAppOpen === 'function') {
          await analyticsInstance.logAppOpen()
        }
      }
    } catch (error) {
      console.warn('⚠️ Analytics app open logging failed:', error)
    }
  },
}
