import {AudioBus} from '../../AudioBus.js';

const state = {
    regions: require('../../data/regions.json'),
    // TODO: default properties that are required on the UI
    selectedRegion: {id: 1, topic: "", audio: {url: ""}, isPlaying: false}
};

const getters = {
    regions: function(state) {
        // The REST API does not account for the UI use-case.
        state.regions.forEach(function(region) { region.isPlaying = false; });
        return state.regions;
    },
    regionURL: state => state.selectedRegion.audio.url,
    selectedRegion: state => state.selectedRegion,
    isRegionPlaying: (state, getters) => (regionID) => {
        // TODO: HACK that requires the selectedRegion have content for the UI inside AudioPlayer.vue.
        if (state.selectedRegion.id === -1) return state.selectedRegion;
        // We must always work with filteredRegions
        if (state.selectedRegion.id && regionID === state.selectedRegion.id) {
            return getters.regions.find(r => r.id === regionID).isPlaying;
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
            state.regions.find(r => r.id === region.id).isPlaying = false;
            state.selectedRegion = state.regions.find(r => r.id === region.id);
            // TODO: this is bad, bad bad.
            state.selectedRegion = {id: region.id, isPlaying: false, topic: region.topic, audio: {url: region.audio.url}};
        }
        // When a region is re-selected the AudioPlayer must known about this change as well as the Region.
        // Emit here rather than emitting twice across these components as it is based on this selected feature.
        // Namely the play/pause functionality being invoked.
        AudioBus.$emit('AUDIO_PLAY', state.selectedRegion.isPlaying);
    }
};

export default {
    state,
    getters,
    mutations
}