<template lang="pug">
.session-filters
  h3.subtitle Filter Gabbers
  .field
    label.label Search by name
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      placeholder="e.g. My Cool Project"
    )
</template>

<script>
export default {
  props: {
    query: { type: String, required: true }
  }
}
</script>

<style lang="css">
</style>
