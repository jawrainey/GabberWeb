<template lang="pug">
.action-box
  .columns.is-centered
    .column.is-two-thirds
      .box
        section.section
          h3.is-size-3.has-text-grey-light.has-text-centered
            | {{ title }}
          slot(name="content")
          template(v-if="$slots.action")
            hr
            .buttons.is-centered
              slot(name="action")
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }
  }
}
</script>

<style lang="css">
</style>
