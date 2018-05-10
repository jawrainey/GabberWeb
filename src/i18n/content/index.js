export default {
  privacy: {
    en: () => import(/* webpackChunkName: 'en' */ './privacy/en.md')
  },
  terms: {
    en: () => import(/* webpackChunkName: 'en' */ './terms/en.md')
  }
}
