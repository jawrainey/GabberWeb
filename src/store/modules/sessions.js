// import {REST_API} from '../../api/http-common'
import * as MUTATIONS from '@/const/mutations'

const state = {
  sessions: [],
  project: null
}
const getters = {
  // PROJECT_SESSIONS: state => state.sessions,
  // SESSION_PROJECT: state => state.project
  
  sessionsForProject: state => id => state.sessions.filter(session =>
    session.projectId === id
  )
}

const mutations = {
  // SET_PROJECT_SESSIONS: (state, data) => { state.sessions = data },
  // SET_PROJECT: (state, data) => { state.project = data }
  
  [MUTATIONS.ADD_SESSIONS]: (state, sessions) => {
    // NOTE: expecting them to have a projectId set
    state.sessions = state.sessions.concat(sessions)
  }
}

const actions = {
  // FETCH_PROJECT_SESSIONS: ({commit, getters}, projectID) => {
  //   REST_API.get('/projects/' + projectID + '/sessions/', getters.BEARER_TOKEN_OR_NULL)
  //     .then(response => commit('SET_PROJECT_SESSIONS', response.data))
  //     .catch(_ => {})
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
