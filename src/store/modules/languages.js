import * as MUTATIONS from '../../const/mutations'

const state = {
  availableLocales: null
}

const getters = {
  availableLanguages: state => state.availableLocales,
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
