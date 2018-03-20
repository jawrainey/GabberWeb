
export default {
  methods: {
    queryRegex (query) {
      return new RegExp(query, 'gi')
    },
    topicsFilter (filterIds, ids) {
      return filterIds.length === 0 ||
        ids.some(id => filterIds.includes(id))
    },
    queryFilter (query, strings) {
      if (query === '') return true
      let regex = this.queryRegex(query)
      return strings.some(str => regex.test(str))
    },
    modelSorter (mode) {
      return (a, b) => {
        if (mode === 'newest') {
          return a.created_on < b.created_on
        } else {
          return a.created_on > b.created_on
        }
      }
    },
    annotationTopicFilters (filterIds, annotation) {
      if (filterIds.length === 0) return true
      for (let topic of filterIds) {
        if (annotation.start_interval >= topic.start_interval && annotation.start_interval < topic.end_interval) {
          return true
        }
      }
    }
  }
}
