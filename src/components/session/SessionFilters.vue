<template lang="pug">
.session-filters
  h3.subtitle Filter Gabbers
  .field
    label.label Search by name
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      placeholder="e.g. Ron Johnson"
    )
  .field
    label.label Filter by topics
    topic-option(
      v-for="topic in project.topics",
      :key="topic.id",
      :topic="topic",
      :selected="topics.includes(topic.id)",
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)"
    )
</template>

<script>
import TopicOption from '@/components/topic/TopicOption'

export default {
  components: { TopicOption },
  props: {
    project: { type: Object, required: true },
    query: { type: String, required: true },
    topics: { type: Array, required: true }
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
