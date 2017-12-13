import {REST_API} from '../../api/http-common'

const state = {
  topics: [],
  selectedTopics: []
}

const getters = {
  topics: state => state.topics,
  selectedTopics: state => state.selectedTopics,
  numRegionsPerTopic: (state, getters) => (topic) => {
    return getters.filteredRegions.filter(r => r.interview.topic === topic).length
  }
}

const mutations = {
  setSelectedTopics (state, selectedTopics) {
    state.selectedTopics = selectedTopics
  },
  SET_TOPICS: (state, data) => {
    state.topics = data.prompts.map(item => item['prompt'])
  }
}

const actions = {
    // TODO: this shares MASSIVE overlap with filterByTags AND
    // it hits the same endpoint ... bad times.
  FETCH_TOPICS: ({commit}, projectID) => {
    REST_API.get('/project/' + projectID)
            .then(response => commit('SET_TOPICS', response.data))
            .catch(error => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
