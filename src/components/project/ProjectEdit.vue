<template lang="pug">
.project-edit-form
  .field
    label.label Name
    input.input(
      type="text",
      v-model="project.title",
      :disabled="disabled",
      placeholder="e.g. My Awesome Project"
    )
  .field
    label.label Description
    textarea.textarea(
      v-model="project.description",
      :disabled="disabled",
      placeholder="This project is ..."
    )
  .field
    label.label Privacy
    p.control
      span.select
        select(v-model="project.privacy")
          option(value="public", default) Public
          option(value="private", default) Private
  hr
  .field.is-grouped.is-grouped-right
    
    .control.is-expanded(v-if="isOwner && deletable")
      button.button.is-danger.is-rounded(@click="$emit('delete')", :disabled="disabled")
        .icon: fa(icon="trash")
        span Delete Project
        
    .control
      button.button.is-link.is-rounded(
        @click="cancel", :disabled="disabled"
      ) Cancel
    
    .control
      button.button.is-success.is-rounded(
        @click="submit", :disabled="!canSubmit"
      ) {{ action }}
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'

export default {
  mixins: [ ProjectPropMixin ],
  props: {
    disabled: { type: Boolean, required: true },
    deletable: { type: Boolean, default: false },
    action: { type: String, default: 'Save' }
  },
  computed: {
    canSubmit () {
      return !this.disabled &&
        this.project.title !== '' &&
        this.project.description !== ''
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      if (!this.canSubmit) return
      this.$emit('submit')
    }
  }
}
</script>

<style lang="css">
</style>
