import enTranslations from './translations/en.json';
import mnTranslations from './translations/mn.json';
import frTranslations from './translations/fr.json';
import ptTranslations from './translations/pt.json';
import ruTranslations from './translations/ru.json';
import esTranslations from './translations/es.json';

export const cmsTranslations = {
  en: enTranslations,
  mn: mnTranslations,
  fr: frTranslations,
  pt: ptTranslations,
  ru: ruTranslations,
  es: esTranslations,
}

export const cmsLanguages = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: 'Mongolia',
    locale: 'mn',
  },
  {
    name: 'Français',
    locale: 'fr',
  },
  {
    name: 'Português',
    locale: 'pt',
  },
  {
    name: 'Русский',
    locale: 'ru',
  },
  {
    name: 'Español',
    locale: 'es',
  },
]

export const cmsLocales = cmsLanguages.map((lang) => lang.locale)
