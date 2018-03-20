<template lang="pug">
.field.sorting-field
  label.label {{ label }}
  .buttons.has-addons
    button.button.no-focus-effects.is-small(
      v-for="mode in sortModes",
      @click="setMode(mode)",
      :class="modeClasses(mode)"
    )
      span.icon(v-if="mode.icon")
        fa(:icon="mode.icon")
      span(v-if="mode.label", v-text="mode.label")
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Sort By' },
    value: { type: String, required: true }
  },
  data: () => ({
    sortModes: [
      { value: 'newest', label: 'Newest First', _icon: 'sort-numeric-down' },
      { value: 'oldest', label: 'Oldest First', _icon: 'sort-numeric-up' }
    ]
  }),
  methods: {
    modeClasses (mode) {
      return {
        'is-primary': mode.value === this.value,
        'is-selected': mode.value === this.value
      }
    },
    setMode (mode) {
      this.$emit('input', mode.value)
    }
  }
}
</script>

<style lang="css">
</style>
