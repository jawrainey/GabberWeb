import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ApiEn from './locales/api/en.yml'

Vue.use(VueI18n)

const messages = {
  en: { api: ApiEn }
}

export const i18n = new VueI18n({
  locale: 'en',
  messages
})
