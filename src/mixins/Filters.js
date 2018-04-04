/*
 * A mixin for components that want to perform filtering of api models
 * - A util to create a regex to query with
 * - A method to filter by topics
 * - A method to filter by a string query
 * - A method to filter annotations by their topic using the start/end times
 * - A method to sort models by a sort mode (newest|oldest)
 */

export default {
  methods: {
    queryRegex (query) {
      return new RegExp(query, 'gi')
    },
    queryFilter (query, strings) {
      if (query === '') return true
      let regex = this.queryRegex(query)
      return strings.some(str => regex.test(str))
    },
    idListAndFilter (filterIds, ids) {
      return filterIds.length === 0 ||
        filterIds.every(id => ids.includes(id))
    },
    idListOrFilter (filterIds, ids) {
      return filterIds.length === 0 ||
        ids.some(id => filterIds.includes(id))
    },
    modelSorter (mode) {
      return (a, b) => {
        return mode === 'newest'
          ? new Date(a.created_on) - new Date(b.created_on)
          : new Date(b.created_on) - new Date(a.created_on)
      }
    },
    annotationTopicFilters (filterIds, annotation) {
      if (filterIds.length === 0) return true
      for (let topic of filterIds) {
        if (annotation.start_interval >= topic.start_interval && annotation.start_interval < topic.end_interval) {
          return true
        }
      }
      return false
    }
  }
}
