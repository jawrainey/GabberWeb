import * as MUTATIONS from '@/const/mutations'
import { mergeIntoById } from '../utils'

const state = {
  sessions: [],
  annotations: [],
  recommendations: [],
  project: null
}

const getters = {
  sessionsForProject: state => projectId => state.sessions.filter(session =>
    session.project_id === projectId
  ),
  sessionById: state => id => state.sessions.find(s => s.id === id),
  allSessions: state => state.sessions || [],
  numSessions: (state, getters) => {
    if (getters.allProjects.length === 0) return 0
    return getters.allProjects.map(p => p.sessions).reduce((a, b) => a + b)
  }
}

const mutations = {
  [MUTATIONS.ADD_SESSIONS]: (state, sessions) => {
    mergeIntoById(state.sessions, sessions)
  },
  [MUTATIONS.LOGOUT_USER]: (state) => {
    state.sessions = []
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
