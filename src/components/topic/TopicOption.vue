<template lang="pug">
.topic-option.is-block(
  :class="classes",
  :style="styles",
  @click="toggleSelf",
  v-text="topic.text"
)
</template>

<script>
export default {
  props: {
    topic: { type: Object, required: true },
    selected: { type: Boolean, default: false }
  },
  computed: {
    classes () {
      return { 'is-selected': this.selected }
    },
    styles () {
      return { }
    }
  },
  methods: {
    toggleSelf () {
      this.$emit(this.selected ? 'deselect' : 'select')
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
  transition: margin $transition
  
  &.is-selected
    background-color: $primary
  
  &:not(.is-selected)
    background-color: $grey
  
  &:hover, &.is-selected
    margin-left: 0.5em

</style>
