<template lang="pug">
.topics-bar
  topic-segment(
    v-for="topic in topics",
    :key="topic.id",
    :topic="topic",
    :audio-duration="audioDuration",
    :is-active="topic.topic_id === (activeTopic && activeTopic.topic_id)"
    @click="$emit('pickTopic', topic)",
    @over="t => $emit('over', t)",
    @leave="t => $emit('leave', t)"
  )
</template>

<script>
import TopicSegment from './TopicSegment'

export default {
  components: { TopicSegment },
  props: {
    topics: { type: Array, required: true },
    audioDuration: { type: Number, required: true },
    activeTopic: { type: Object, default: null }
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
