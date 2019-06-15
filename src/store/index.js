/*
 * The vuex store the components use, implemented using modules
 */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import projects from './modules/projects'
import playlists from './modules/playlists'
import sessions from './modules/sessions'
import annotations from './modules/annotations'
import comments from './modules/comments'
import languages from './modules/languages'
import recommendations from './modules/recommendations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    languages,
    auth,
    projects,
    playlists,
    sessions,
    annotations,
    comments,
    recommendations
  }
})
