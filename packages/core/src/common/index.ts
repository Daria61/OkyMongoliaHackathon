// Placeholder for common module
// This directory should be populated by git submodule
// For now, exports are handled in ../index.ts

export type Locale = 'en' | 'mn' | 'id'
export const defaultLocale: Locale = 'en'

// Placeholder exports - these should come from submodule
export const countries = {}
export const provinces = []
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
