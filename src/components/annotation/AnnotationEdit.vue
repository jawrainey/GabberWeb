<template lang="pug">
.annotation-edit
  label.label Annotation – {{ annotation.start_interval | duration }} → {{ annotation.end_interval | duration }}
  .columns.is-narrow
    .column
      .field
        textarea.textarea(
          type="text",
          v-model="annotation.content",
          :disabled="disabled",
          placeholder="I think that ...",
          rows="2"
        )
    .column.is-narrow.has-text-right
      button.button.is-success(@click="submit", :disabled="!canSubmit") Create
</template>

<script>

/* Emitted Events

@submit -> When the user changed the position of their annotation

*/

export default {
  props: {
    annotation: { type: Object, required: true },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    canSubmit () { return !this.disabled && this.annotation.content !== '' }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="sass">
</style>
