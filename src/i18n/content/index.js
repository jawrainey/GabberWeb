export default {
  privacy: {
    en: () => import(/* webpackChunkName: 'en' */ './privacy/en.md'),
    es: () => import(/* webpackChunkName: 'es' */ './privacy/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './privacy/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './privacy/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './privacy/en.md')
  },
  terms: {
    en: () => import(/* webpackChunkName: 'en' */ './terms/en.md'),
    es: () => import(/* webpackChunkName: 'es' */ './terms/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './terms/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './terms/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './terms/en.md')
  },
  registered: {
    en: () => import(/* webpackChunkName: 'en' */ './registered/en.md'),
    es: () => import(/* webpackChunkName: 'es' */ './registered/es.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './registered/fr.md'),
    it: () => import(/* webpackChunkName: 'it' */ './registered/it.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './registered/ru.md')
  },
  research: {
    en: () => import(/* webpackChunkName: 'en' */ './research/en.md'),
    es: () => import(/* webpackChunkName: 'es' */ './research/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './research/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './research/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './research/en.md')
  },
  cookies: {
    en: () => import(/* webpackChunkName: 'en' */ './cookies/en.md'),
    es: () => import(/* webpackChunkName: 'es' */ './cookies/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './cookies/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './cookies/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './cookies/en.md')
  }
}
