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
    .column.is-narrow
      button.button.is-success(@click="submit", :disabled="!canSubmit") Create
</template>

<script>
import TemporalMixin from '@/mixins/Temporal'

/* Emitted Events

@submit -> When the user changed the position of their annotation

*/

export default {
  mixins: [ TemporalMixin ],
  props: {
    annotation: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    audioProgress: { type: Number, required: true }
  },
  computed: {
    canSubmit () { return !this.disabled && this.annotation.content !== '' }
  },
  methods: {
    replayFromPosition () {
      this.$emit('position', this.annotation.start_interval)
    },
    resetPositionToNow () {
      let pos = Math.round(this.audioProgress)
      
      this.annotation.start_interval = pos
      this.annotation.end_interval = pos + 1
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="sass">
.annotation-edit
</style>
