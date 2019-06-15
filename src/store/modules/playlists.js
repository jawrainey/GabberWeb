import * as MUTATIONS from '@/const/mutations'
import Vue from 'vue'

const state = {
  allPlaylists: []
}

const getters = {
  allPlaylists: state => state.allPlaylists || [],
  playlistById: state => id => state.allPlaylists.find(pl => pl.id === id)
}

const mutations = {
  [MUTATIONS.SET_PLAYLISTS]: (state, playlists) => (state.allPlaylists = playlists),
  [MUTATIONS.SAVE_PLAYLIST]: (state, playlist) => {
    let existing = state.allPlaylists.find(p => p.id === playlist.id)
    if (existing) {
      Object.assign(existing, playlist)
    } else {
      state.allPlaylists.unshift(playlist)
    }
  },
  [MUTATIONS.DELETE_PLAYLIST]: (state, playlistId) => {
    state.allPlaylists = state.allPlaylists.filter(p => p.id !== playlistId)
  },
  [MUTATIONS.LOGOUT_USER]: (state) => Vue.set(state, 'allPlaylists', [])
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
