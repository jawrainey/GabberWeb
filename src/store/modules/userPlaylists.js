const state = {
    userPlayLists: require('../../data/userPlaylists.json')
};

const getters = {
    userPlayLists: state => state.userPlayLists,
    // This maps to a v-model as a computed value
    selectedPlaylistsForRegion: (state, getters) => (regionID) => {
        return state.userPlayLists.filter(playlist => (
            playlist.regions.find(r => r.id === regionID)
        )).map(playlist => playlist.id);
    }
};

const mutations = {
    // TODO: these should be actions and located in the regions module?
    addRegionToPlaylist(state, payload) {
        // TODO: invoke REST API; if success, update local state, otherwise return errors.
        let playList = state.userPlayLists.find(playlist => playlist.id === payload.playlistID);
        playList.regions.push({'id': payload.regionID, 'length': 20});
    },
    removeRegionFromPlaylist(state, payload) {
        // TODO: invoke REST API; if success, update local state, otherwise return errors.
        let playList = state.userPlayLists.find(playlist => playlist.id === payload.playlistID);
        let isRegionInPlaylist = playList.regions.find(region => region.id === payload.regionID);
        let index = playList.regions.indexOf(isRegionInPlaylist);
        playList.regions.splice(index, 1);
    }
};

const actions = {
    createPlaylist({ commit, state }, payload) {
        // TODO: make a REST request to create a new playlist using payload.name
        state.userPlayLists.push({'id': Math.floor(Math.random() * 200), 'name': payload.name, 'regions': []})
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}