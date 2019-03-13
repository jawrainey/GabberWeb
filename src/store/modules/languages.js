import * as MUTATIONS from '../../const/mutations'
import { i18n } from '../../i18n'

const state = {
  availableLocales: null
}

const getters = {
  availableLanguages: state => state.availableLocales,
  // TODO: current locale should be based on users preference?!
  currentLocale: state => state.availableLocales.find(l => l.code === i18n.locale),
  languageById: state => id => state.availableLocales.find(l => l.id === id)
}

const mutations = {
  [MUTATIONS.SET_SUPPORTED_LANGUAGES]: (state, data) => (state.availableLocales = data)
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
