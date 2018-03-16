<template lang="pug">
.topic-option(
  :class="classes",
  :style="styles",
  v-text="topic.text",
  @click="toggleSelf"
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

<style lang="css">
</style>
