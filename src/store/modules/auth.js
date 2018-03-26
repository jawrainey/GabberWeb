import * as MUTATIONS from '../../const/mutations'

const state = {
  currentUser: null,
  returnRoute: null
}

const getters = {
  currentUser: state => state.currentUser,
  currentUserId: state => (state.currentUser && state.currentUser.id) || null,
  returnRoute: state => state.returnRoute
}

const mutations = {
  [MUTATIONS.LOGIN_USER]: (state, data) => (state.currentUser = data),
  [MUTATIONS.LOGOUT_USER]: (state) => (state.currentUser = null),
  [MUTATIONS.LOGIN_RETURN_ROUTE]: (state, route) => (state.returnRoute = route)
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
