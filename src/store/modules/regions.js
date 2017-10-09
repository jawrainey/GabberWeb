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
    // TODO: used inside AudioPlayer only
    isPlaying(state, option) { state.isPlaying = option; },
    // Required in Region.vue and AudioPlayer.vue because the selectedRegion can change
    // using next/prev, but also when a user clicks a track (region) in the playlist.
    setSelectedRegion(state, region) {
        // Autoplay when another region is selected in the playlist.
        // This means we cannot set the state of the selected region yet as
        // we need to compare the region with the previous selected.
        if (state.selectedRegion.id !== region.id) {
            state.isPlaying = true;
            AudioBus.$emit('DIFFERENT_REGION_SELECTED');
        }
        else {
            state.isPlaying = !state.isPlaying;
            AudioBus.$emit('SAME_REGION_SELECTED');
        }
        state.selectedRegion = state.regions.find(r => r.id === region.id);
    },
    prevFilteredRegion: function(state, filteredRegions) {
        if (filteredRegions.length <= 0) return;
        let index = filteredRegions.indexOf(state.selectedRegion);
        // We are at the start of the filtered list, so go around again
        if (index === 0) {
            state.selectedRegion = filteredRegions[filteredRegions.length - 1];
        }
        // The region does not exist, for example, if a filter was re-applied.
        else if (index === -1) {
            state.selectedRegion = filteredRegions[0];
        }
        else {
            state.selectedRegion = filteredRegions[index - 1];
        }
        AudioBus.$emit('DIFFERENT_REGION_SELECTED');
    },
    nextFilteredRegion: function(state, filteredRegions) {
        if (filteredRegions.length <= 0) return;
        let index = filteredRegions.indexOf(state.selectedRegion);
        // We are at the end of the filtered list OR the region does not exist
        if (index === (filteredRegions.length -1) || (index === -1)) {
            state.selectedRegion = filteredRegions[0];
        }
        else {
            state.selectedRegion = filteredRegions[index + 1];
        }
        AudioBus.$emit('DIFFERENT_REGION_SELECTED');
    }
};

export default {
    state,
    getters,
    mutations
}