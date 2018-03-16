import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import sessions from './modules/sessions'
import projects from './modules/projects'
import comments from './modules/comments'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { auth, sessions, projects, comments }
})
