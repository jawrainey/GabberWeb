import {REST_API} from '../../api/http-common'

const state = {
  regions: [],
  selectedRegion: {
    'id': -1,
    'length': -1,
    'codes': [],
    'interview': {
      'id': -1,
      'topic': '',
      'url': ''
    }
  }
}

const getters = {
  regions: state => state.regions,
  regionURL: state => state.selectedRegion.interview.url,
  selectedRegion: state => state.selectedRegion,
  filteredRegions: function (state, getters) {
    let regions = state.regions
    let selectedTags = getters.selectedTags
    let selectedTopics = getters.selectedTopics

    if (selectedTopics.length > 0 && selectedTags.length > 0) {
            // Returning early to not apply other filters
      return regions.filter(
                r => selectedTopics.includes(r.interview.topic) &&
                    r.tags.some(tag => selectedTags.includes(tag))
            )
    }
    let filterRegions = regions

    if (selectedTopics.length > 0) {
      filterRegions = regions.filter(r => selectedTopics.includes(r.interview.topic))
    }

    if (selectedTags.length > 0) {
            // This is currently OR (i.e. some) and should be AND instead;
      filterRegions = regions.filter(r => r.tags.some(tag => selectedTags.includes(tag)))
    }
    return filterRegions
  }
}

const mutations = {
  SET_REGIONS: (state, data) => (state.regions = data),
  SET_SELECTED_AS_FIRST_REGION: (state) => (state.selectedRegion = state.regions[0]),
  SET_SELECTED_REGION: (state, region) => (state.selectedRegion = region)
}

const actions = {
    // Required in Region.vue and AudioPlayer.vue because the selectedRegion can change
    // using next/prev, but also when a user clicks a track (region) in the playlist.
  SET_SELECTED_REGION: ({dispatch, commit, state}, region) => {
        // Autoplay when another region is selected in the playlist.
        // This means we cannot set the state of the selected region yet as
        // we need to compare the region with the previous selected.
    if (state.selectedRegion.id !== region.id) {
      dispatch('TRACK_CHANGED', region)
    } else {
      dispatch('PLAYPAUSE_AUDIO', region)
    }
    commit('SET_SELECTED_REGION', state.regions.find(r => r.id === region.id))
  },
  PREV_REGION: ({dispatch}, filteredRegions) => {
    if (filteredRegions.length <= 0) return
    let index = filteredRegions.indexOf(state.selectedRegion)
        // We are at the start of the filtered list, so go around again
    if (index === 0) {
      state.selectedRegion = filteredRegions[filteredRegions.length - 1]
    } else if (index === -1) {
      // The region does not exist, for example, if a filter was re-applied.
      state.selectedRegion = filteredRegions[0]
    } else {
      state.selectedRegion = filteredRegions[index - 1]
    }
    dispatch('TRACK_CHANGED', state.selectedRegion)
  },
  NEXT_REGION: ({dispatch}, filteredRegions) => {
    if (filteredRegions.length <= 0) return
    let index = filteredRegions.indexOf(state.selectedRegion)
        // We are at the end of the filtered list OR the region does not exist
    if (index === (filteredRegions.length - 1) || (index === -1)) {
      state.selectedRegion = filteredRegions[0]
    } else {
      state.selectedRegion = filteredRegions[index + 1]
    }
    dispatch('TRACK_CHANGED', state.selectedRegion)
  },
  FETCH_REGIONS_BY_PROJECT: ({commit}, projectID) => {
        // Reset between requests as an error may occur or no results found;
    commit('regionsLoaded', false)

    REST_API.get('/project/' + projectID + '/regions/')
            .then(
                response => {
                  if (response.data.length > 0) {
                    commit('SET_REGIONS', response.data)
                    commit('regionsLoaded', true)
                    commit('SET_SELECTED_AS_FIRST_REGION')
                  } else {
                    commit('regionsLoadedMessage', 'No regions found for this project...')
                  }
                }
            )
            .catch(error => {
              commit('regionsLoadedMessage', 'Something went wrong.')
            })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
