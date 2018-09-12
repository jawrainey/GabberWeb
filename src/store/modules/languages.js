import * as MUTATIONS from '../../const/mutations'

const state = {
  availableLocales: null
}

const getters = {
  availableLanguages: state => state.availableLocales
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
