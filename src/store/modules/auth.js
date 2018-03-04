import {REST_API} from '../../api/http-common'
import {router} from '../../router/index'

const state = {
  error: '',
  isLoggedIn: !!localStorage.getItem("GABBER_ACCESS_TOKEN")
}

const getters = {
  IS_LOGGED_IN: state => state.isLoggedIn,
  AUTH_ERROR: state => state.error,
  BEARER_TOKEN_OR_NULL: state => state.IS_LOGGED_IN ? state.BEARER_TOKEN : null,
  BEARER_TOKEN () {
    return {
      headers: { Authorization: 'Bearer '.concat(localStorage.getItem('GABBER_ACCESS_TOKEN')) }
    }
  }
}

const mutations = {
  IS_LOGGED_IN: (state, data) => (state.isLoggedIn = data),
  SET_AUTH_ERROR: (state, errorMessage) => (state.error = errorMessage),
  LOGIN: (state, data) => (state.isLoggedIn = true),
  LOGOUT: (state, data) => (state.isLoggedIn = false)
}

const actions = {
  REGISTER_USER: ({commit}, user) => {
    REST_API.post('/auth/register/', user)
      .then(response => {
        localStorage.setItem("GABBER_ACCESS_TOKEN", response.data.access_token)
        commit('LOGIN')
        router.push('/projects')
      })
      .catch(e => { commit('SET_AUTH_ERROR', e.response.data.message) })
  },
  LOGIN_USER: ({commit}, user) => {
    REST_API.post('/auth/login/', user)
      .then(response => {
        localStorage.setItem("GABBER_ACCESS_TOKEN", response.data.access_token)
        commit('LOGIN')
        router.push('/projects')
      })
      .catch(e => { commit('SET_AUTH_ERROR', e.response.data.message) })
  },
  LOGOUT_USER: ({commit}) => {
    localStorage.removeItem("GABBER_ACCESS_TOKEN");
    commit('LOGOUT')
    router.push('/')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
