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
  SET_PROJECT_SESSIONS: (state, data) => { state.sessions = data },
  SET_PROJECT: (state, data) => { state.project = data }
}

const actions = {
  FETCH_PROJECT_SESSIONS: ({commit, getters}, projectID) => {
    REST_API.get('/projects/' + projectID + '/sessions/', getters.BEARER_TOKEN_OR_NULL)
      .then(response => commit('SET_PROJECT_SESSIONS', response.data))
      .catch(_ => {})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
