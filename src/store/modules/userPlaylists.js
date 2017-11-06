import {GABBER_API} from '../../api/http-common';

const state = {
    userPlayLists: []
};

const getters = {
    userPlayLists: state => state.userPlayLists,
    // This maps to a v-model as a computed value
    selectedPlaylistsForRegion: (state, getters) => (region_id) => {
        return state.userPlayLists.filter(playlist =>
            playlist.regions.find(r => r.region_id === region_id)
        ).map(playlist => playlist.id);
    }
};

const mutations = {
    SET_PLAYLISTS: (state, data) => state.userPlayLists = data,
    ADD_PLAYLIST: (state, playList) => state.userPlayLists.push(playList),
    ADD_REGION_TO_PLAYLIST: (state, region) => {
        let playlist = state.userPlayLists.find(playlist => playlist.id === region.playlist_id);
        playlist.regions.push(region);
    },
    REMOVE_REGION_FROM_PLAYLIST: (state, regionToRemove) => {
        let playList = state.userPlayLists.find(playlist => playlist.id === regionToRemove.playlistID);
        let isRegionInPlaylist = playList.regions.find(region => region.region_id === regionToRemove.regionID);
        let index = playList.regions.indexOf(isRegionInPlaylist);
        playList.regions.splice(index, 1);
    }
};

const actions = {
    FETCH_USER_PLAYLISTS: ({commit}, userID) =>  {
        GABBER_API.get('/users/' + userID + '/playlists')
            .then(response => commit('SET_PLAYLISTS', response.data))
            .catch(error => console.log(error))
    },
    CREATE_NEW_PLAYLIST: ({commit}, payload) => {
        GABBER_API.post('/users/' + payload.userID + '/playlists', {'title': payload.name})
            .then(response => commit('ADD_PLAYLIST', response.data))
            .catch(error => console.log(error));
    },
    ADD_REGION_TO_PLAYLIST: ({commit}, payload) => {
        let endpoint = '/users/' + payload.userID + '/playlists/' + payload.playlistID + '/regions';
        GABBER_API.post(endpoint, {'regionID': payload.regionID})
            .then(response => commit('ADD_REGION_TO_PLAYLIST', response.data))
            .catch(error => console.log(error));
    },
    REMOVE_REGION_FROM_PLAYLIST({commit}, payload) {
        let endpoint = '/users/' + payload.userID + '/playlists/' + payload.playlistID + '/regions';
        GABBER_API.delete(endpoint, {data: {'regionID': payload.regionID}})
            .then(() => commit('REMOVE_REGION_FROM_PLAYLIST', payload))
            .catch(error => console.log(error));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}