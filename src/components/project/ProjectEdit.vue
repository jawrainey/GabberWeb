<template lang="pug">
.project-edit-form
  .columns
    .column
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
        .control
          span.select
            select(v-model="project.privacy", :disabled="disabled")
              option(value="public", default) Public
              option(value="private", default) Private
          .help {{ privacyMessage }}
    .column
      topic-list-edit(v-model="project.topics", :is-editing="!!project.id")
  hr
  .field.is-grouped.is-grouped-right
    
    .control.is-expanded(v-if="isOwner && deletable")
      button.button.is-danger.is-rounded(@click="$emit('delete')", :disabled="disabled")
        .icon: fa(icon="trash")
        span Delete Project
        
    .control
      button.button.is-link.is-rounded(
        @click="cancel",
        :disabled="disabled"
      ) Cancel
    
    .control
      button.button.is-success.is-rounded(
        @click="submit",
        :disabled="!canSubmit"
      ) {{ action }}
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'
import TopicListEdit from '@/components/topic/TopicListEdit'

export default {
  mixins: [ ProjectPropMixin ],
  components: { TopicListEdit },
  props: {
    disabled: { type: Boolean, required: true },
    deletable: { type: Boolean, default: false },
    action: { type: String, default: 'Save' }
  },
  computed: {
    canSubmit () {
      return !this.disabled &&
        this.project.title !== '' &&
        this.project.description !== '' &&
        this.project.topics.length > 0 &&
        this.project.topics.some(p => p.is_active !== 0)
    },
    privacyMessage () {
      return this.project.privacy === 'private'
        ? 'Only you and invited participants will see your project'
        : 'Anyone on Gabber will see and be able to join your project'
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

<style lang="sass">
</style>
