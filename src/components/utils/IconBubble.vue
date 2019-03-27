<template lang="pug">
span.icon-bubble(:class="classes", :style="styles")
  fa(:icon="icon", fixed-width)
  transition(name="grow")
    span.sub-icon(v-if="$slots.default")
      slot
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

export default {
  mixins: [ ColorGeneratorMixin ],
  props: {
    icon: { type: [String, Array], required: false },
    colorId: { type: Number, required: true },
    padRight: { type: Boolean, default: false }
  },
  computed: {
    classes () {
      return { 'is-padded-right': this.padRight }
    },
    styles () {
      return { 'background-color': this.colorFromId(this.colorId) }
    }
  }
}
</script>

<style lang="sass" scoped>

=bubble
  display: inline-flex
  justify-content: center
  align-items: center
  width: 2em
  height: 2em
  border-radius: 1em

.icon-bubble
  +bubble
  vertical-align: middle
  color: white
  position: relative

  &.is-padded-right
    margin-right: 0.3em

  > .sub-icon
    +bubble
    position: absolute
    color: $grey-dark
    background-color: $white
    font-size: 0.45em
    right: -1px
    bottom: -1px
    box-shadow: 0 0 1px $grey-dark

</style>
