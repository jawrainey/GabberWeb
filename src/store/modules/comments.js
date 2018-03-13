import * as MUTATIONS from '@/const/mutations'
import { mergeIntoById } from './mergeIntoById'

const state = {
  comments: []
}

const getters = {
  commentsForAnnotation: state => (annotationId) =>
    state.comments.filter(comment =>
      comment.annotation_id === annotationId && comment.parent_id === null
    ),
  commentChildren: state => parentId =>
    state.comments.filter(comment => comment.parent_id === parentId),
  commentById: state => id => state.comments.find(c => c.id === id)
}

const mutations = {
  [MUTATIONS.ADD_COMMENTS]: (state, comments) => {
    mergeIntoById(state.comments, comments)
  },
  [MUTATIONS.REMOVE_COMMENT]: (state, id) => {
    state.comments = state.comments.filter(c => c.id !== id)
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
