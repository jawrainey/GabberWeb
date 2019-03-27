<template lang="pug">
button.circle-button.button(@click="$emit('click')")
  fa.icon(:icon="icon")
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true }
  }
}
</script>

<style lang="sass" scoped>

.circle-button
  display: inline-flex
  justify-content: center
  flex-direction: column
  border-radius: 1.5em
  text-align: center
  vertical-align: middle
  width: 2.5em

  .icon
    transform: scale(0.7)

</style>
