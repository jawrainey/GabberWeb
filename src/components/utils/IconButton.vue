<template lang="pug">
button.button(@click="$emit('click')", :disabled="disabled")
  span.icon(v-if="icon")
    fa(:icon="icon")
  span
    slot
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="css">
</style>
