const state = {
    tags: require('../../data/tags.json'),
    selectedTags: []
};

const getters = {
    tags: state => state.tags,
    selectedTags: state => state.selectedTags,
    numRegionsPerTag: (state, getters) => (tag) => {
        // TODO: this currently does not account for cases or spelling
        return getters.filteredRegions.filter(r => r.tags.includes(tag)).length;
    }
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