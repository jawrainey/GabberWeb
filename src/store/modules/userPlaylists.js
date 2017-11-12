import {GABBER_API} from '../../api/http-common';

const state = {
    userPlayLists: []
};

const getters = {
    userPlayLists: state => state.userPlayLists,
    currentPlaylist: (state, getters) => (playlistID) => {
        let filteredPlaylist = state.userPlayLists.filter(playlist => playlist.id === parseInt(playlistID));
        return (filteredPlaylist.length <= 0) ? [] : filteredPlaylist[0];
    },
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
    FETCH_USER_REGIONS_FOR_PLAYLIST_BY_ID: ({commit}, payload) => {
        // Switching between view when regions exist, and none are returned
        // from the server would otherwise result in viewing the previous set.
        commit('regionsLoaded', false);
        // TODO: the only difference between this and FETCH_REGIONS_BY_PROJECT is the endpoint
        let endpoint = '/users/' + payload.userID + '/playlists/' + payload.playlistID + '/regions';
        GABBER_API.get(endpoint)
            .then(
                response => {
                    if (response.data.length > 0) {
                        commit('SET_REGIONS', response.data);
                        commit('regionsLoaded', true);
                        commit('SET_SELECTED_AS_FIRST_REGION');
                    }
                    else {
                        commit('regionsLoadedMessage', "No regions found for this project...");
                    }
                }
            )
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
    },
    // TODO: abstract this to its own module?
    ADD_NOTE_TO_REGION_IN_PLAYLIST({commit}, payload) {
        let endpoint = '/users/' + payload.userID + '/playlists/' + payload.playlistID +
            '/region/' + payload.regionID + '/note';

        GABBER_API.post(endpoint, {'note': payload.note})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}