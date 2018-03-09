<template lang="pug">
.topics-bar
  topic-segment(
    v-for="topic in topics",
    :key="topic.id",
    :topic="topic",
    :audio-duration="audioDuration",
    @click="$emit('pickTopic', topic)"
  )
</template>

<script>
import TopicSegment from './TopicSegment'

export default {
  components: { TopicSegment },
  props: {
    topics: { type: Array, required: true },
    audioDuration: { type: Number, required: true }
  }
}
</script>

<style lang="sass">

.topics-bar
  display: flex
  font-size: 2rem
  border-radius: 0.1em
  overflow: hidden

</style>
