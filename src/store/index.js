import Vue from 'vue'
import Vuex from 'vuex'
import filterByTags from './modules/filterByTags'
import filterByTopics from './modules/filterByTopics'
import regions from './modules/regions'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        filterByTags,
        filterByTopics,
        regions
    }
});