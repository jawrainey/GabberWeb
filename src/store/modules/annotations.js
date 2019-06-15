import * as MUTATIONS from '@/const/mutations'
import { mergeIntoById } from '../utils'

const state = {
  annotations: []
}

const getters = {
  annotations: state => state.annotations,
  annotationsForSession: state => sessionId => state.annotations.filter(annotation =>
    annotation.session_id === sessionId
  ),
  annotationById: state => id => state.annotations.find(a => a.id === id)
}

const mutations = {
  [MUTATIONS.ADD_ANNOTATIONS]: (state, annotations) => {
    mergeIntoById(state.annotations, annotations)
  },
  [MUTATIONS.REMOVE_ANNOTATION]: (state, annotationId) => {
    state.annotations = state.annotations.filter(a => a.id !== annotationId)
  },
  [MUTATIONS.LOGOUT_USER]: (state) => {
    state.annotations = []
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
