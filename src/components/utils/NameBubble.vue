<template lang="pug">
span.name-bubble(:class="classes", :style="styles")
  span.initials {{ initials }}
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'
import Tooltip from '@/components/utils/Tooltip'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: { Tooltip },
  props: {
    name: { type: String, required: true },
    colorId: { type: Number, default: null },
    padded: { type: Boolean, default: false }
  },
  computed: {
    classes () {
      return { 'is-padded': this.padded, themed: typeof this.colorId !== 'number' }
    },
    styles () {
      if (typeof this.colorId !== 'number') return {}
      return { 'background-color': this.colorFromId(this.colorId) }
    },
    initials () {
      let segments = this.name.trim().split(' ').map(s => s[0])
        
      switch (segments.length) {
        case 0: return '?'
        case 1: return segments[0]
        default: return segments[0] + segments[segments.length - 1]
      }
    }
  }
}
</script>

<style lang="sass">

.name-bubble
  display: inline-flex
  justify-content: center
  flex-direction: column
  width: 2em
  height: 2em
  border-radius: 1em
  text-align: center
  text-transform: capitalize
  vertical-align: middle
  
  .initials
    font-size: 0.8em
    font-weight: bold
  
  &.is-padded
    margin-right: 0.3em
    &:not(:last-child)
      margin-bottom: 0.3em
  
  color: white
  
  @each $name, $pair in $colors
    &.themed.is-#{$name}
      background-color: nth($pair, 1)
      color: nth($pair, 2)

</style>
