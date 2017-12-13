import {REST_API} from '../../api/http-common'

const state = {
  tags: [],
  selectedTags: []
}

const getters = {
  tags: state => state.tags,
  selectedTags: state => state.selectedTags,
  numRegionsPerTag: (state, getters) => (tag) => {
    // TODO: this currently does not account for cases or spelling
    return getters.filteredRegions.filter(r => r.tags.includes(tag)).length
  }
}

const mutations = {
  setSelectedTags: (state, selectedTags) => (state.selectedTags = selectedTags),
  SET_TAGS: (state, data) => (state.tags = data.codebook)
}

const actions = {
  FETCH_TAGS: ({commit}, projectID) => {
    REST_API.get('/project/' + projectID)
            .then(response => commit('SET_TAGS', response.data))
            .catch(error => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
