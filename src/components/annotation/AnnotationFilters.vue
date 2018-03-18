<template lang="pug">
.annotation-filters
  h3.subtitle Filter Annotations
  .field
    label.label By message
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      placeholder="e.g. ..."
    )
  .field
    label.label By topic
    topic-option(
      v-for="topic in session.topics",
      :key="topic.id",
      :topic="topic",
      :selected="topics.includes(topic.topic_id)",
      :color-id="topic.topic_id"
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)"
    )
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)"
  )
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'
import TopicOption from '@/components/topic/TopicOption'
import SortField from '@/components/utils/SortField'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: { TopicOption, SortField },
  props: {
    session: { type: Object, required: true },
    query: { type: String, required: true },
    topics: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  methods: {
    selectTopic (topic) {
      this.$emit('update:topics', this.topics.concat([ topic.topic_id ]))
    },
    deselectTopic (topic) {
      this.$emit('update:topics', this.topics.filter(tId =>
        tId !== topic.topic_id
      ))
    },
    toggleTopic (topic) {
      console.log('toggle', topic)
    }
  }
}
</script>

<style lang="sass">

.topics-field
  .topic
    color: white
    border: none
    display: block

</style>
