import {AudioBus} from '../../AudioBus.js';

const state = {
    regions: require('../../data/regions.json'),
    // TODO: default properties that are required on the UI
    selectedRegion: {
        id: 1,
        topic: "Pretend region one",
        tags: [
            "faith",
            "hope"
        ],
        audio: {
            length: 60,
            url: "https://gabber.audio/protected/1505293291.mp4"
        }
    },
    isPlaying: false
};

const getters = {
    regions: state => state.regions,
    regionURL: state => state.selectedRegion.audio.url,
    isAudioPlaying: state => state.isPlaying,
    selectedRegion: state => state.selectedRegion,
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
        if (state.selectedRegion.id !== region.id) {
            state.isPlaying = true;
        }
        else {
            state.isPlaying = !state.isPlaying;
        }
        state.selectedRegion = state.regions.find(r => r.id === region.id);
        AudioBus.$emit('AUDIO_PLAY', state.isPlaying);
    }
};

export default {
    state,
    getters,
    mutations
}