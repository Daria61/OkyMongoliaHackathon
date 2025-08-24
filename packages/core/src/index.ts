export * from './api'
export * from './mappers'
export * from './common'

// Missing exports that were in the deleted common directory
export type Locale = 'en' | 'mn'
export const defaultLocale: Locale = 'en'

// Re-export from countries and provinces (these will need to be copied from resources)
export const countries = {} // TODO: Copy from resources/translations/countries.ts
export const provinces = [] // TODO: Copy from resources/translations/provinces.ts

// CMS language exports
export const cmsLanguages = {
  en: {
    en: 'English (global)',
    mn: 'Монгол',
  },
  mn: {
    en: 'English (global)',
    mn: 'Монгол',
  },
}

export const cmsLocales = cmsLanguages
