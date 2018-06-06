export default {
  privacy: {
    en: () => import(/* webpackChunkName: 'en' */ './privacy/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './privacy/en.md')
  },
  terms: {
    en: () => import(/* webpackChunkName: 'en' */ './terms/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './terms/en.md')
  },
  registered: {
    en: () => import(/* webpackChunkName: 'en' */ './registered/en.md'),
    ru: () => import(/* webpackChunkName: 'ru' */ './registered/ru.md')
  }
}
