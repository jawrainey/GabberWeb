<template lang="pug">
.modal(:class="{ 'is-active': this.isActive }")
  .modal-background(@click="$emit('cancel')")
  .modal-card
    header.modal-card-head
      p.modal-card-title {{ title }}
      button.delete(@click="$emit('cancel')")
    section.modal-card-body
      .field
        label.label
          | {{$t('comp.playlist.create.form.name.title')}}
        input.input.is-small(
          v-model="playlist.name",
          :placeholder="$t('comp.playlist.create.form.name.placeholder')")
      .field
        label.label
          | {{$t('comp.playlist.create.form.description.title')}}
      .control.is-expanded
        textarea.textarea.is-small(
          v-model="playlist.description",
          :placeholder="$t('comp.playlist.create.form.description.placeholder')",
          rows="2")
    footer.modal-card-foot.align-right
      .buttons
        button.button.is-primary.is-rounded(@click="$emit('cancel')")
          span {{ $t('comp.playlist.create.form.buttons.cancel') }}
        button.button.is-primary.is-rounded(@click="$emit('submit')", :disabled="!canSubmit")
          span {{ action }}
</template>

<script>
/* Emitted Events:

@cancel ~ When the modal is cancelled by clicking outside the modal or the cancel button
@submit ~ When the modal is submitted
*/

export default {
  props: {
    title: { type: String, required: true },
    action: { type: String, required: true },
    playlist: { type: Object, required: true },
    isActive: { type: Boolean, default: false }
  },
  computed: {
    canSubmit () {
      if (!this.playlist.description && !this.playlist.name) return
      return (this.playlist.description.length >= 10 && this.playlist.name.length >= 10)
    }
  }
}
</script>

<style lang="sass" scoped>
  .align-right
    justify-content: flex-end
  .modal
    z-index: 101
</style>
