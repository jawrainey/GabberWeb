<template lang="pug">
section.section.has-text-centered
  h1.title {{ label }}
  p
    fa(icon="circle-notch", spin, size="4x")
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Fetching info' }
  }
}
</script>

<style lang="css">
</style>
