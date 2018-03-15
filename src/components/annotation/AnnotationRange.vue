<template lang="pug">
.annotation-range(:style="styles", :class="classes")
  draggable.left-bumper(@move="leftMoved", :disabled="disabled")
  .background
  draggable.right-bumper(@move="rightMoved", :disabled="disabled")
</template>

<script>
import Draggable from './Draggable'

export default {
  components: { Draggable },
  props: {
    audioDuration: { type: Number, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    styles () {
      let left = (this.start / this.audioDuration) * 100
      let right = 100 - ((this.end / this.audioDuration) * 100)
      return {
        left: `${left}%`, right: `${right}%`
      }
    },
    classes () {
      return { 'is-disabled': this.disabled }
    }
  },
  methods: {
    leftMoved (change) {
      this.$emit('change', change, 0)
    },
    rightMoved (change) {
      this.$emit('change', 0, change)
    }
  }
}
</script>

<style lang="sass">

$bumper-width: 14px

=is-bumper
  position: absolute
  top: 0
  bottom: 0
  width: $bumper-width
  background-color: $warning
  z-index: 1
  pointer-events: all
  border-radius: $bumper-width * 0.33

.annotation-range
  position: absolute
  top: 0
  bottom: 0
  z-index: 200
  pointer-events: none
  
  &.is-disabled
    opacity: 0.6
  
  .background
    background: transparentize($primary, 0.7)
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
  
  .left-bumper
    +is-bumper
    left: $bumper-width * -0.5
  
  .right-bumper
    +is-bumper
    right: $bumper-width * -0.5

</style>
