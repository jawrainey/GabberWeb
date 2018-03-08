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
  ),
  sessionById: state => id => state.sessions.find(s => s.id === id)
}

const mutations = {
  // SET_PROJECT_SESSIONS: (state, data) => { state.sessions = data },
  // SET_PROJECT: (state, data) => { state.project = data }
  
  [MUTATIONS.ADD_SESSIONS]: (state, sessions) => {
    // NOTE: expecting them to have a projectId set
    sessions.forEach(newSession => {
      let index = state.sessions.findIndex(s => s.id === newSession.id)
      if (index !== -1) state.sessions[index] = newSession
      else state.sessions.push(newSession)
    })
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
