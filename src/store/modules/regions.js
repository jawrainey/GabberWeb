const state = {
    regions: require('../../data/regions.json'),
    selectedRegion: {}
};

const getters = {
    // This should only ever be used in filteredRegions below
    regions: function(state) {
        // The REST API does not account for the UI use-case.
        state.regions.forEach(function(region) { region.isPlaying = false; });
        return state.regions;
    },
    selectedRegion: state => state.selectedRegion,
    isRegionPlaying: (state, getters) => (regionID) => {
        // We must always work with filteredRegions
        if (regionID === state.selectedRegion.id) {
            return getters.filteredRegions.find(r => r.id === regionID).isPlaying;
        }
    },
    filteredRegions: function(state, getters) {
        let regions = state.regions;
        let selectedTags = getters.selectedTags;
        let selectedTopics = getters.selectedTopics;

        if (selectedTopics.length > 0 && selectedTags.length > 0) {
            // Returning early to not apply other filters
            return regions.filter(
                r => selectedTopics.includes(r.topic) &&
                    r.tags.some(tag => selectedTags.includes(tag))
            )
        }
        let filterRegions = regions;

        if (selectedTopics.length > 0) {
            filterRegions = regions.filter(r => selectedTopics.includes(r.topic))
        }

        if (selectedTags.length > 0) {
            // This is currently OR (i.e. some) and should be AND instead;
            filterRegions = regions.filter(r => r.tags.some(tag => selectedTags.includes(tag)))
        }
        return filterRegions;
    }
};

const mutations = {
    setSelectedRegion(state, region) {
        // The region was first selected OR a different region was selected from the one currently playing
        if (!state.selectedRegion.isPlaying || (state.selectedRegion.isPlaying && state.selectedRegion.id !== region.id)) {
            state.selectedRegion = state.regions.find(r => r.id === region.id);
            state.selectedRegion.isPlaying = true;
        }
        // The same was selected when it was being played.
        else if (state.selectedRegion.isPlaying && state.selectedRegion.id === region.id) {
            // If I update isPlaying in selectedRegion/region the UI does not update! Same problem when using Vue.set
            state.selectedRegion = {topic: region.topic, audio: {url: region.audio.url}};
        }
    }
};

export default {
    state,
    getters,
    mutations
}