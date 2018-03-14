<template lang="pug">
.annotation-range(:style="styles")
  .left-bumper
  .background
  .right-bumper
</template>

<script>
export default {
  props: {
    audioDuration: { type: Number, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true }
  },
  computed: {
    styles () {
      let left = (this.start / this.audioDuration) * 100
      let right = 100 - ((this.end / this.audioDuration) * 100)
      return {
        left: `${left}%`, right: `${right}%`
      }
    }
  }
}
</script>

<style lang="sass">

$bumper-width: 8px

=is-bumper
  position: absolute
  top: 0
  bottom: 0
  width: $bumper-width
  background-color: $warning
  z-index: 1
  pointer-events: all
  cursor: col-resize
  border-radius: $bumper-width * 0.5

.annotation-range
  position: absolute
  top: 0
  bottom: 0
  z-index: 200
  pointer-events: none
  
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
