const state = {
    topics: require('../../data/topics.json'),
    selectedTopics: []
};

const getters = {
    topics: state => state.topics,
    selectedTopics: state => state.selectedTopics,
    numRegionsPerTopic: (state, getters) => (topic) => {
        return getters.filteredRegions.includes(r => r.topic === topic).length;
    }
};

const mutations = {
    setSelectedTopics(state, selectedTopics) {
        state.selectedTopics = selectedTopics;
    }
};

export default {
    state,
    getters,
    mutations
}