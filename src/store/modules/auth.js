import {REST_API} from '../../api/http-common'

const state = {
  user: null
}

const getters = {
  USER: state => state.user
}

const mutations = {
  SET_USER: (state, user) => (state.user = user)
}

const actions = {
  SET_USER: ({commit}) => {
    REST_API.get('/usertoken')
            .then(response => commit('SET_USER', response.data))
            .catch(error => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
