import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ViewsAr from './locales/view/ar.yml'
import MiscAr from './locales/misc/ar.yml'
import ComponentsAr from './locales/comp/ar.yml'

import ApiEn from './locales/api/en.yml'
import ViewsEn from './locales/view/en.yml'
import MiscEn from './locales/misc/en.yml'
import ComponentsEn from './locales/comp/en.yml'

import ViewsEs from './locales/view/es.yml'
import MiscEs from './locales/misc/es.yml'
import ComponentsEs from './locales/comp/es.yml'

import ViewsFr from './locales/view/fr.yml'
import MiscFr from './locales/misc/fr.yml'
import ComponentsFr from './locales/comp/fr.yml'

Vue.use(VueI18n)

const messages = {
  ar: {
    api: ApiEn,
    view: ViewsAr,
    misc: MiscAr,
    comp: ComponentsAr
  },
  en: {
    api: ApiEn,
    view: ViewsEn,
    misc: MiscEn,
    comp: ComponentsEn
  },
  es: {
    api: ApiEn,
    view: ViewsEs,
    misc: MiscEs,
    comp: ComponentsEs
  },
  fr: {
    api: ApiEn,
    view: ViewsFr,
    misc: MiscFr,
    comp: ComponentsFr
  }
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
