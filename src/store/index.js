import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tags: require('../data/tags.json'),
        selectedTags: []
    },
    getters: {
        tags(state) {
            return state.tags;
        }
    },
    mutations: {
        setSelectedTags(state, selectedTags) {
            state.selectedTags = selectedTags;
        }
    }
});