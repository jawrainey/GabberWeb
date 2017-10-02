const state = {
    tags: require('../../data/tags.json'),
    selectedTags: []
};

const getters = {
    tags: state => state.tags,
    selectedTags: state => state.selectedTags
};

const mutations = {
    setSelectedTags(state, selectedTags) {
        state.selectedTags = selectedTags;
    }
};

export default {
    state,
    getters,
    mutations
}