import * as MUTATIONS from '@/const/mutations'
import Vue from 'vue'

const state = {
  allProjects: []
}

const getters = {
  personalProjects: (state, getters) => state.allProjects.filter(proj =>
    proj.creator.user_id === getters.currentUserId ||
    proj.members.some(member => member.user_id === getters.currentUserId)
  ),
  publicProjects: (state, getters) => state.allProjects.filter(proj =>
    !getters.personalProjects.includes(proj)
  ),
  projectById: state => id => state.allProjects.find(p => p.id === id)
}

const mutations = {
  [MUTATIONS.SET_PROJECTS]: (state, projects) => (state.allProjects = projects),
  [MUTATIONS.SAVE_PROJECT]: (state, project) => {
    let existing = state.allProjects.find(p => p.id === project.id)
    if (existing) {
      Object.assign(existing, project)
    } else {
      state.allProjects.push(project)
    }
  },
  [MUTATIONS.DELETE_PROJECT]: (state, projectId) => {
    state.allProjects = state.allProjects.filter(p => p.id !== projectId)
  },
  [MUTATIONS.EDIT_MEMBER_ON_PROJECT]: (state, { projectId, member }) => {
    let project = state.allProjects.find(p => p.id === projectId)
    if (!project) return
    let existing = project.members.find(m => m.user_id === member.user_id)
    Object.assign(existing, member)
  },
  [MUTATIONS.ADD_MEMBER_TO_PROJECT]: (state, { projectId, member }) => {
    let project = state.allProjects.find(p => p.id === projectId)
    if (!project) return
    project.members.push(member)
  },
  [MUTATIONS.REMOVE_MEMBER_FROM_PROJECT]: (state, { projectId, memberId }) => {
    let project = state.allProjects.find(p => p.id === projectId)
    if (!project) return
    project.members = project.members.filter(m => m.id !== memberId)
  },
  [MUTATIONS.LOGOUT_USER]: (state) => Vue.set(state, 'allProjects', [])
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
