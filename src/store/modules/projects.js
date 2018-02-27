import {REST_API} from '../../api/http-common'

const state = {
  projects: []
}
const getters = {
  PROJECTS: state => state.projects
}

const mutations = {
  SET_PROJECTS: (state, data) => state.projects = data
}

const actions = {
  FETCH_ALL_PROJECTS: ({commit}) => {
    REST_API.get('/projects/')
      .then(response => commit('SET_PROJECTS', response.data))
      .catch(_ => console.log(_))
  },
  JOIN_PROJECT: ({commit}, projectSlug) => {
    REST_API.post('/project/join/' + projectSlug)
      .then(response => true)
      .catch(_ => false)
  },
  CREATE_PROJECT: ({}) => {},
  EDIT_PROJECT: ({}) => {},
  EDIT_TOPICS: ({}) => {}
}

export default {
  state,
  getters,
  mutations,
  actions
}