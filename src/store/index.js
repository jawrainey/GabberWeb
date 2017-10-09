import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import filterByTags from './modules/filterByTags'
import filterByTopics from './modules/filterByTopics'
import regions from './modules/regions'
import userPlaylists from './modules/userPlaylists'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        ui,
        filterByTags,
        filterByTopics,
        regions,
        userPlaylists
    }
});