<template lang="pug">
.annotation-edit
  label.label {{$t('comp.annotation.annotation_edit.label', { start, end })}}
  .columns.is-narrow
    .column
      .field
        textarea.textarea(
          type="text",
          v-model="annotation.content",
          :disabled="disabled",
          :placeholder="$t('comp.annotation.annotation_edit.placeholder')",
          rows="2"
        )
    .column.is-narrow.has-text-right
      button.button.is-success(@click="submit", :disabled="!canSubmit")
        | {{$t('comp.annotation.annotation_edit.create_action')}}
</template>

<script>
import { formatDuration } from '@/mixins/Temporal'

/* Emitted Events

@submit -> When the user changed the position of their annotation

*/

export default {
  props: {
    annotation: { type: Object, required: true },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    canSubmit () { return !this.disabled && this.annotation.content !== '' },
    start () { return formatDuration(this.annotation.start_interval) },
    end () { return formatDuration(this.annotation.end_interval) }
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
