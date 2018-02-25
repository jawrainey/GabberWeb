import {REST_API} from '../../api/http-common'

const state = {
  sessions: []
}
const getters = {
  PROJECT_SESSIONS: state => state.sessions
}

const mutations = {
  SET_PROJECT_SESSIONS: (state, data) => state.sessions = data
}

const actions = {
  FETCH_PROJECT_SESSIONS: ({commit}, projectName) => {
    REST_API.get('/project/' + projectName + '/sessions/')
      .then(response => commit('SET_PROJECT_SESSIONS', response.data.data))
      .catch(_ => console.log(_))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
