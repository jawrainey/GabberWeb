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
  FETCH_ALL_PROJECTS: ({commit, getters}) => {
    REST_API.get('/projects/', getters.BEARER_TOKEN)
      .then(response => {
        commit('SET_MY_PROJECTS', response.data.personal)
        commit('SET_PUBLIC_PROJECTS', response.data.public)
      })
      .catch(_ => console.log(_))
  },
  FETCH_ALL_PUBLIC_PROJECTS: ({commit}) => {
    REST_API.get('/projects/public')
      .then(response => {
        commit('SET_MY_PROJECTS', [])
        commit('SET_PUBLIC_PROJECTS', response.data)
      })
      .catch(_ => console.log(_))
  },
  JOIN_PROJECT: ({commit, getters}, projectSlug) => {
    REST_API.post('/project/join/', {'slug': projectSlug}, getters.BEARER_TOKEN)
      .then(_ => {
        let projectToJoin = getters.PUBLIC_PROJECTS.filter(p => p.slug === projectSlug)
        let publicProjectsWithoutProjectToJoin = getters.PUBLIC_PROJECTS.filter(p => p.slug !== projectSlug)
        commit('SET_MY_PROJECTS', getters.MY_PROJECTS.concat(projectToJoin))
        commit('SET_PUBLIC_PROJECTS', publicProjectsWithoutProjectToJoin)
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