import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import filterByTags from './modules/filterByTags'
import filterByTopics from './modules/filterByTopics'
import regions from './modules/regions'
import userPlaylists from './modules/userPlaylists'
import audioplayer from './modules/audioplayer'
import sessions from './modules/sessions'
import projects from './modules/projects'
import auth from './modules/auth'
import comments from './modules/comments'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    audioplayer,
    auth,
    ui,
    filterByTags,
    filterByTopics,
    regions,
    userPlaylists,
    sessions,
    projects,
    comments
  }
})
