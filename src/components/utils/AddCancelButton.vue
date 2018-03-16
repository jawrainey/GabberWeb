<template lang="pug">
button.button.add-cancel-button.is-circle.no-focus-effects(
  @click="$emit('click', $event)",
  :class="toggled ? 'is-danger' : 'is-success'",
  :disabled="disabled"
)
  .icon
    fa(icon="plus")
</template>

<script>
export default {
  props: {
    toggled: { type: Boolean, required: true },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="sass">

.add-cancel-button
  transition: transform $transition, background-color $transition
  transform: rotate(0deg)
  
  &.is-danger
    transform: rotate(45deg)
  
  .icon *
    transform: scale(1.2)
    transform-origin: center

</style>
