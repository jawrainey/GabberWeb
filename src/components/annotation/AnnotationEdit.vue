<template lang="pug">
.annotation-edit
  .columns
    //- .column.is-narrow
      label.label Position
      .field.has-addons
        .control
          input.input(
            type="text",
            v-model="position",
            :disabled="disabled",
            :style="{ width: '92px' }",
            readonly
          )
        .control
          button.button.is-success(@click="replayFromPosition")
            .icon: fa(icon="step-backward")
    .column
      label.label Annotation
      .field
        textarea.textarea(
          type="text",
          v-model="annotation.content",
          :disabled="disabled",
          placeholder="I think that ...",
          rows="2"
        )
    .column.is-narrow
      label.label &nbsp;
      button.button.is-success(@click="submit", :disabled="disabled") Create
</template>

<script>
import TemporalMixin from '@/mixins/Temporal'

/* Emitted Events

@position (time) -> When the user changed the position of their annotation

*/

export default {
  mixins: [ TemporalMixin ],
  props: {
    annotation: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    audioProgress: { type: Number, required: true }
  },
  computed: {
    position: {
      get () {
        return this.formatDuration(this.annotation.start_interval)
      },
      set (p) {
        this.$emit('position', p)
        this.annotation.start_interval = p
        this.annotation.end_interval = p + 1
      }
    }
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
