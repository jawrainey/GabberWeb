<template lang="pug">
.topic-segment(
  :class="classes",
  :style="styles",
  @click="$emit('click', $event)",
  @mouseover="onMouseover",
  @mouseleave="onMouseleave"
)
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

export default {
  mixins: [ ColorGeneratorMixin ],
  props: {
    isActive: { type: Boolean, default: false },
    topic: { type: Object, required: true },
    audioDuration: { type: Number, required: true }
  },
  computed: {
    duration () { return this.topic.end_interval - this.topic.start_interval },
    classes () {
      return { 'is-active': this.isActive }
    },
    styles () {
      return {
        'background-color': this.colorFromId(this.topic.id),
        'flex': this.duration
      }
    }
  },
  methods: {
    onMouseover () {
      this.$emit('over', this.topic)
    },
    onMouseleave () {
      this.$emit('leave', this.topic)
    }
  }
}
</script>

<style lang="sass">

.topic-segment
  height: 1em
  cursor: pointer
  transition: border-bottom-width 0.3s
  border-bottom: 0px solid rgba(0, 0, 0, 0.15)
  
  &.is-active
    border-bottom-width: 0.25em

</style>
