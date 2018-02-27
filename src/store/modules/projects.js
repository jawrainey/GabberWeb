import {REST_API} from '../../api/http-common'

const state = {
  my_projects: [],
  public_projects: []
}
const getters = {
  MY_PROJECTS: state => state.my_projects,
  PUBLIC_PROJECTS: state => state.public_projects
}

const mutations = {
  SET_MY_PROJECTS: (state, projects) => state.my_projects = projects,
  SET_PUBLIC_PROJECTS: (state, projects) => state.public_projects = projects
}

const actions = {
  FETCH_ALL_PROJECTS: ({commit}) => {
    REST_API.get('/projects/')
      .then(response => {
        commit('SET_MY_PROJECTS', response.data.personal)
        commit('SET_PUBLIC_PROJECTS', response.data.public)
      })
      .catch(_ => console.log(_))
  },
  JOIN_PROJECT: ({commit, getters}, projectSlug) => {
    REST_API.post('/project/join/' + projectSlug)
      .then(response => {
        commit('SET_MY_PROJECTS', getters.MY_PROJECTS.concat(getters.PUBLIC_PROJECTS.filter(p => p.slug === projectSlug)))
        commit('SET_PUBLIC_PROJECTS', getters.PUBLIC_PROJECTS.filter(p => p.slug !== projectSlug))
      })
      .catch(_ => {})
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