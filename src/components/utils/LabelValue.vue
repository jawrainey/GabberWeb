<template lang="pug">
.label-value
  p.label {{ label }}
  p.value(v-if="value !== null") {{ value }}
  .value(v-else): slot
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: null }
  }
}
</script>

<style lang="sass" scoped>

.label-value
  margin-bottom: 1em

  > .label
    font-size: 0.9em
    color: $grey-light
    font-weight: normal
    margin-bottom: 0
    text-transform: uppercase

  @each $name, $pair in $colors
    &.is-#{$name} >.value
      color: nth($pair, 1)

</style>
