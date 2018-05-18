<template lang="pug">
section.section.has-text-centered
  h1.title {{ label || $t('comp.utils.loading.default_label') }}
  p
    fa(icon="circle-notch", spin, size="4x")
</template>

<script>
export default {
  props: {
    label: { type: String, default: null }
  }
}
</script>

<style lang="css">
</style>
