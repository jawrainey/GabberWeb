<template lang="pug">
.annotation-filters
  h3.subtitle Filter Annotations
  .field.topics-field.is-grouped.is-grouped-multiline
    //- .topic(v-for="topic, index in session.topics")
      label.label
        input.checkbox(
          type="checkbox",
          :value="index",
          v-model="session.topics"
        )
        span {{ index + 1 }}. {{ topic.text }}
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

export default {
  mixins: [ ColorGeneratorMixin ],
  props: {
    session: { type: Object, required: true }
  },
  methods: {
    topicClasses (topic) {
      return {
        'background-color': this.colorFromId(topic.id),
        color: 'white'
      }
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
