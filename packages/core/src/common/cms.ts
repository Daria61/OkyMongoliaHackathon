// tslint:disable:no-var-requires
// export const cmsTranslations = {
//   en: require('./translations/en.json'),
//   fr: require('./translations/fr.json'),
//   pt: require('./translations/pt.json'),
//   ru: require('./translations/ru.json'),
//   es: require('./translations/es.json'),
// }

export const cmsLanguages = [
  {
    name: 'English',
    locale: 'en',
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
