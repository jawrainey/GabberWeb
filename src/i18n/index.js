import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ApiEn from './locales/api/en.yml'
import ViewsEn from './locales/views/en.yml'

Vue.use(VueI18n)

const messages = {
  en: {
    api: ApiEn,
    view: ViewsEn
  }
}

export const i18n = new VueI18n({
  locale: 'dev',
  // locale: 'en',
  messages
})
