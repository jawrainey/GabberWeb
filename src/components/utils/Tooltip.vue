<template lang="pug">
.tooltip-wrapper(:style="{ display }")
  slot
  .tooltip(v-text="tip")
</template>

<script>
export default {
  props: {
    tip: { type: String, required: true },
    display: { type: String, default: 'inline-block' }
  }
}
</script>

<style lang="sass">

.tooltip-wrapper
  position: relative
  
  &:not(:hover) .tooltip
    display: none

  &:hover .tooltip
    position: absolute
    bottom: 100%
    left: 50%
    transform: translate(-50%, -.5rem)
    white-space: nowrap
    background: black
    color: white
    padding: 0.2em 0.4em
    border-radius: 0.2em
    z-index: 100
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1)

</style>
