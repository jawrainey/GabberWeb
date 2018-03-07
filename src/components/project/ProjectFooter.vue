<template lang="pug">
.project-footer
  .buttons
    button.button.is-danger.is-rounded.is-small(
      @click="$emit('deleteProject')",
      :disabled="inProgress"
    )
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
