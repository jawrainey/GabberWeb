<template lang="pug">
.topic-segment(:style="style", @click="$emit('click', $event)")
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

export default {
  mixins: [ ColorGeneratorMixin ],
  props: {
    topic: { type: Object, required: true },
    audioDuration: { type: Number, required: true }
  },
  computed: {
    duration () { return this.topic.end - this.topic.start },
    style () {
      return {
        'background-color': this.colorFromId(this.topic.id),
        'width': `${this.duration / this.audioDuration * 100}%`
      }
    }
  }
}
</script>

<style lang="sass">

.topic-segment
  height: 1em
  cursor: pointer

</style>
