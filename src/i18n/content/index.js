export default {
  privacy: {
    en: () => import(/* webpackChunkName: 'en' */ './privacy/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './privacy/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './privacy/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './privacy/en.md')
  },
  terms: {
    en: () => import(/* webpackChunkName: 'en' */ './terms/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './terms/en.md'),
    it: () => import(/* webpackChunkName: 'it' */ './terms/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './terms/en.md')
  },
  registered: {
    en: () => import(/* webpackChunkName: 'en' */ './registered/en.md'),
    fr: () => import(/* webpackChunkName: 'fr' */ './registered/fr.md'),
    it: () => import(/* webpackChunkName: 'it' */ './registered/it.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './registered/ru.md')
  }
}
