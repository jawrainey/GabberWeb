// import {REST_API} from '../../api/http-common'
import * as MUTATIONS from '@/const/mutations'
import { mergeIntoById } from './mergeIntoById'

const state = {
  sessions: [],
  annotations: [],
  project: null
}
const getters = {
  // PROJECT_SESSIONS: state => state.sessions,
  // SESSION_PROJECT: state => state.project
  
  sessionsForProject: state => projectId => state.sessions.filter(session =>
    session.project_id === projectId
  ),
  sessionById: state => id => state.sessions.find(s => s.id === id),
  annotationsForSession: state => sessionId => state.annotations.filter(annotation =>
    annotation.session_id === sessionId
  ),
  annotationById: state => id => state.annotations.find(a => a.id === id)
}

const mutations = {
  // SET_PROJECT_SESSIONS: (state, data) => { state.sessions = data },
  // SET_PROJECT: (state, data) => { state.project = data }
  
  [MUTATIONS.ADD_SESSIONS]: (state, sessions) => {
    mergeIntoById(state.sessions, sessions)
  },
  [MUTATIONS.ADD_ANNOTATIONS]: (state, annotations) => {
    mergeIntoById(state.annotations, annotations)
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
