<template lang="pug">
button.button(@click="$emit('click')", :disabled="disabled")
  span.icon(v-if="icon")
    fa(:icon="icon")
  span(v-if="title", v-text="title")
  slot(v-else)
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    title: { type: String, default: null }
  }
}
</script>

<style lang="css">
</style>
