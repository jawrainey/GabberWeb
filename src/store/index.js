import Vue from 'vue'
import Vuex from 'vuex'
import filterByTags from './modules/filterByTags.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        filterByTags
    }
});