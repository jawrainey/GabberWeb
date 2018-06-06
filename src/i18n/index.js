import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ApiEn from './locales/api/en.yml'
import ViewsEn from './locales/view/en.yml'
import MiscEn from './locales/misc/en.yml'
import ComponentsEn from './locales/comp/en.yml'

import ViewsFr from './locales/view/fr.yml'
import MiscFr from './locales/misc/fr.yml'
import ComponentsFr from './locales/comp/fr.yml'

import ViewsIt from './locales/view/it.yml'
import MiscIt from './locales/misc/it.yml'
import ComponentsIt from './locales/comp/it.yml'

import ViewsRu from './locales/view/ru.yml'
import MiscRu from './locales/misc/ru.yml'
import ComponentsRu from './locales/comp/ru.yml'

Vue.use(VueI18n)

const messages = {
  en: {
    api: ApiEn,
    view: ViewsEn,
    misc: MiscEn,
    comp: ComponentsEn
  },
  fr: {
    api: ApiEn,
    view: ViewsFr,
    misc: MiscFr,
    comp: ComponentsFr
  },
  it: {
    api: ApiEn,
    view: ViewsIt,
    misc: MiscIt,
    comp: ComponentsIt
  },
  ru: {
    api: ApiEn,
    view: ViewsRu,
    misc: MiscRu,
    comp: ComponentsRu
  }
}

export const i18n = new VueI18n({
  locale: 'en',
  messages
})
