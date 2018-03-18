<template lang="pug">
.session-filters
  h3.subtitle Filter Gabbers
  .field
    label.label By name
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      placeholder="e.g. Ron Johnson"
    )
  .field
    label.label By topics
    topic-option(
      v-for="topic in project.topics",
      :key="topic.id",
      :topic="topic",
      :selected="topics.includes(topic.id)",
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)"
    )
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)"
  )
</template>

<script>
import TopicOption from '@/components/topic/TopicOption'
import SortField from '@/components/utils/SortField'

export default {
  components: { TopicOption, SortField },
  props: {
    project: { type: Object, required: true },
    query: { type: String, required: true },
    topics: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  methods: {
    selectTopic (topic) {
      this.$emit('update:topics', this.topics.concat([ topic.id ]))
    },
    deselectTopic (topic) {
      this.$emit('update:topics', this.topics.filter(tId =>
        tId !== topic.id)
      )
    }
  }
}
</script>

<style lang="sass">
</style>
