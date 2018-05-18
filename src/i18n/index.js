import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ApiEn from './locales/api/en.yml'
import ViewsEn from './locales/view/en.yml'
import MiscEn from './locales/misc/en.yml'
import ComponentsEn from './locales/comp/en.yml'

Vue.use(VueI18n)

const messages = {
  en: {
    api: ApiEn,
    view: ViewsEn,
    misc: MiscEn,
    comp: ComponentsEn
  }
}

export const i18n = new VueI18n({
  // locale: 'dev',
  locale: 'en',
  messages
})
