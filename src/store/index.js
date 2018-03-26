/*
 * The vuex store the components use, implemented using modules
 */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import projects from './modules/projects'
import sessions from './modules/sessions'
import annotations from './modules/annotations'
import comments from './modules/comments'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    projects,
    sessions,
    annotations,
    comments
  }
})
