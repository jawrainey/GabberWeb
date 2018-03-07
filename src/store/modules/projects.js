import {REST_API} from '@/api/http-common'
import * as MUTATIONS from '@/const/mutations'

const state = {
  // my_projects: [],
  // public_projects: [],
  
  allProjects: []
}
const getters = {
  // MY_PROJECTS: state => state.my_projects,
  // PUBLIC_PROJECTS: state => state.public_projects,
  
  personalProjects: (state, getters) => state.allProjects.filter(proj =>
    // proj.creator.id === getters.currentUser.id
    !proj.isProjectPublic
  ),
  publicProjects: (state, getters) => state.allProjects.filter(proj =>
    proj.isProjectPublic && proj.creator.id !== getters.currentUser.id
  )
}

const mutations = {
  // SET_MY_PROJECTS: (state, projects) => (state.my_projects = projects),
  // UPDATE_MY_PROJECT_BY_INDEX: (state, data) => (state.my_projects[data.index] = data.project),
  // SET_PUBLIC_PROJECTS: (state, projects) => (state.public_projects = projects),
  
  [MUTATIONS.SET_PROJECTS]: (state, projects) => (state.allProjects = projects)
}

const actions = {
  FETCH_ALL_PROJECTS: ({commit, getters}) => {
    REST_API.get('/projects/', getters.BEARER_TOKEN_OR_NULL)
      .then(response => {
        commit('SET_MY_PROJECTS', response.data.personal || [])
        commit('SET_PUBLIC_PROJECTS', response.data.public)
      })
      .catch(_ => console.log(_))
  },
  FETCH_PROJECT: ({commit}, projectID) => {
    REST_API.get('/projects/' + projectID + '/')
      .then(response => commit('SET_PROJECT', response.data))
      .catch(_ => {})
  },
  JOIN_PROJECT: ({commit, getters}, projectID) => {
    REST_API.post('/projects/' + +projectID + '/membership/', {}, getters.BEARER_TOKEN)
      .then(_ => {
        let projectToJoin = getters.PUBLIC_PROJECTS.filter(p => p.id === projectID)
        let publicProjectsWithoutProjectToJoin = getters.PUBLIC_PROJECTS.filter(p => p.id !== projectID)
        commit('SET_MY_PROJECTS', getters.MY_PROJECTS.concat(projectToJoin))
        commit('SET_PUBLIC_PROJECTS', publicProjectsWithoutProjectToJoin)
      })
      .catch(_ => {})
  },
  // TODO: fetching all after adding a project seems quite backwards...
  CREATE_PROJECT: ({dispatch, getters}, payload) => {
    return REST_API.post('/projects/', payload, getters.BEARER_TOKEN)
      .then(_ => dispatch('FETCH_ALL_PROJECTS'))
      .catch(e => { throw e.response.data.message })
  },
  UPDATE_PROJECT: ({commit, getters}, payload) => {
    return REST_API.put('/projects/' + payload.projectID + '/', payload, getters.BEARER_TOKEN)
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
