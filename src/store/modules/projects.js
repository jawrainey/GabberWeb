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
  UPDATE_MY_PROJECT_BY_INDEX: (state, data) => state.my_projects[data.index] = data.project,
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
  // TODO: fetching all after adding a project seems quite backwards...
  CREATE_PROJECT: ({dispatch, getters}, payload) => {
    return REST_API.post('/project/create/', payload, getters.BEARER_TOKEN)
      .then(_ => dispatch('FETCH_ALL_PROJECTS'))
      .catch(e => { throw e.response.data.message })
  },
  UPDATE_PROJECT: ({commit, getters}, payload) => {
    return REST_API.post('/project/edit/', payload, getters.BEARER_TOKEN)
      .then((response) => {
        let index = getters.MY_PROJECTS.findIndex(p => p.id === response.data.project.id)
        commit('UPDATE_MY_PROJECT_BY_INDEX', {'project': response.data.project, 'index': index})
      })
      .catch(e => { throw e.response.data.message })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}