<template lang="pug">
.project-edit-form
  .columns
    .column
      .field
        label.label {{$t('comp.project.project_edit.name_field.label')}}
        input.input(
          type="text",
          v-model.trim="project.title",
          :disabled="disabled",
          :placeholder="$t('comp.project.project_edit.name_field.label')"
        )
      .field
        label.label {{$t('comp.project.project_edit.info_field.label')}}
        textarea.textarea(
          v-model.trim="project.description",
          :disabled="disabled",
          :placeholder="$t('comp.project.project_edit.info_field.placeholder')"
        )
      .field
        label.label {{ $t('comp.project.project_edit.org_field.label') }}
        p {{ project.organisation }}
        .control
          span.select
            select(v-model="project.organisation.id")
              option(value="null")
                | {{ $t('comp.project.project_edit.org_field.options.individual') }}
              option(value="1")
                | {{ $t('comp.project.project_edit.org_field.options.ifrc') }}
              option(value="2")
                | {{ $t('comp.project.project_edit.org_field.options.fl') }}
              option(value="3")
                | {{ $t('comp.project.project_edit.org_field.options.other') }}
          .help
            b: a(href="mailto:admin@gabber.audio")
              |  {{ $t('comp.project.project_edit.contact.before_link') }}
            |  {{ $t('comp.project.project_edit.contact.after_link') }}
      .field
        label.label {{$t('comp.project.project_edit.perms_field.label')}}
        .control(v-if="!project.id || understoodPrivacy")
          span.select
            select(v-model="project.privacy", :disabled="disabled")
              option(value="public", default)
                | {{$t('comp.project.project_edit.perms_field.public')}}
              option(value="private", default)
                | {{$t('comp.project.project_edit.perms_field.private')}}
          .help {{ privacyMessage }}
        .message.is-warning(v-else)
          .message-header: p {{$t('comp.project.project_edit.perms_warn.title')}}
          .message-body
            p {{$t('comp.project.project_edit.perms_warn.body')}}
            .buttons.is-right
              button.button.is-warning(
                @click="understoodPrivacy = true",
                v-text="$t('comp.project.project_edit.perms_warn.action')"
              )
    .column
      topic-list-edit(
        v-model="project.topics",
        :is-editing="!!project.id"
      )
  hr
  .field.is-grouped.is-grouped-right
    
    .control.is-expanded(v-if="isOwner && deletable")
      button.button.is-danger.is-rounded(@click="$emit('delete')", :disabled="disabled")
        .icon: fa(icon="trash")
        
    .control
      button.button.is-link.is-rounded(
        @click="cancel",
        :disabled="disabled"
      ) {{$t('comp.project.project_edit.cancel_action')}}
    
    .control
      button.button.is-success.is-rounded(
        @click="submit",
        :disabled="!canSubmit"
      ) {{ action || $t('comp.project.project_edit.default_submit_action') }}
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'
import TopicListEdit from '@/components/topic/TopicListEdit'

/* Emitted Events:

@delete () -> when the user wants to delete the project
@cancel () -> when the user wants to cancel editing
@submit () -> when the user wants to submit changes

*/

export default {
  mixins: [ ProjectPropMixin ],
  components: { TopicListEdit },
  props: {
    disabled: { type: Boolean, required: true },
    deletable: { type: Boolean, default: false },
    action: { type: String, default: null }
  },
  data: () => ({
    understoodPrivacy: false
  }),
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
        ? this.$t('comp.project.project_edit.private_body')
        : this.$t('comp.project.project_edit.public_body')
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
