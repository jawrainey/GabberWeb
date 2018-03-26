<template lang="pug">
.topic-option.is-block(
  :class="classes",
  :style="styles",
  @click="toggleSelection",
  v-text="topic.text"
)
</template>

<script>
import SelectableMixin from '@/mixins/Selectable'
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

export default {
  mixins: [ SelectableMixin, ColorGeneratorMixin ],
  props: {
    topic: { type: Object, required: true },
    colorId: { type: Number, default: null }
  },
  computed: {
    classes () {
      return { ...this.selectionClass, 'is-colored': this.colorId !== null }
    },
    styles () {
      let style = { }
      if (this.colorId && this.selected) {
        style['background-color'] = this.colorFromId(this.colorId)
      }
      if (this.colorId) {
        style['border-right'] = `2em solid ${this.colorFromId(this.colorId)}`
      }
      return style
    }
  }
}
</script>

<style lang="sass">

.topic-option
  border-radius: 4px
  padding: 0.4em 0.8em
  margin-bottom: 0.5em
  cursor: pointer
  transition: margin $transition, background-color $transition
  user-select: none
  
  &.is-selected
    background-color: $primary
    margin-left: 0.3em
  
  &:not(.is-selected)
    background-color: $grey
  
  &:hover:not(.is-selected)
    opacity: 0.9

</style>
