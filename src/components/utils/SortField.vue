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
    label: { type: String, default: 'Sort by' },
    value: { type: String, required: true }
  },
  computed: {
    sortModes () {
      return [
        {
          value: 'newest',
          label: this.$t('comp.utils.sort_field.newest_label'),
          icon: 'star'
        },
        {
          value: 'oldest',
          label: this.$t('comp.utils.sort_field.oldest_label'),
          icon: 'clock'
        }
      ]
    }
  },
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
