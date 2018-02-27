import {REST_API} from '../../api/http-common'

const state = {
  sessions: [],
  project: null
}
const getters = {
  PROJECT_SESSIONS: state => state.sessions,
  SESSION_PROJECT: state => state.project
}

const mutations = {
  SET_PROJECT_SESSIONS: (state, data) => state.sessions = data,
  SET_PROJECT: (state, data) => state.project = data
}

const actions = {
  FETCH_PROJECT_SESSIONS: ({commit}, projectName) => {
    REST_API.get('/project/' + projectName + '/sessions/')
      .then(response => commit('SET_PROJECT_SESSIONS', response.data.data))
      .catch(_ => {})
  },
  FETCH_PROJECT: ({commit}, projectSlug) => {
    REST_API.get('/projectBySlug/' + projectSlug + '/')
      .then(response => commit('SET_PROJECT', response.data.data))
      .catch(_ => {})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
