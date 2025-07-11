import { AppTranslations } from '../../../types'
import { Locale } from '../'

import { en } from './en'
import { mn } from './mn'

export const appTranslations: Record<Locale, AppTranslations> = {
  en,
  mn,
}

export const availableAppLocales = Object.keys(appTranslations) as Locale[]
