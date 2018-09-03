<template lang="pug">
.project-edit-form
  .columns
    .column.is-half
      .field
        label.label {{$t('comp.project.project_edit.name_field.label')}}
          input.input(
          type="text",
          v-model.trim="project.title",
          :disabled="disabled",
          :placeholder="$t('comp.project.project_edit.name_field.label')"
          )
      .field
        label.label {{$t('comp.project.project_edit.photo_field.label')}}
        p.is-italic.is-size-7 {{$t('comp.project.project_edit.photo_field.instructions')}}
        br
        .columns
          .column.is-one-quarter
            input.file-input.is-invisible(type='file', ref="fileInput", @change="assignImageAsBase64")
            figure.image.pointer
              img.project-photo.is-rounded(:src="project.image", @click="showPicker")
            p#instructions.label.is-size-7.is-italic.has-text-centered.has-text-weight-light {{$t('comp.project.project_edit.photo_field.upload')}}

          .column.is-three-quarters.no-left-pad
            .field.has-addons.search
              .control.is-expanded(:class="{'is-loading': this.loading }")
                input.input(v-model="keywords", @keyup.enter="doSearch", :placeholder="$t('comp.project.project_edit.photo_field.search.placeholder')")
              .control
                a.button.is-info.icon.pointer: fa(icon="search", @click="doSearch")
            .images-container(v-if="photos.length > 0")
              figure.image.image-card.pointer(v-for="photo in photos")
                img.project-photo.is-rounded(crossOrigin="Anonymous", :src="photo", @click="assignPhoto")
            p.search-error(v-else-if="noresults") {{$t('comp.project.project_edit.photo_field.search.no_results')}}
      .field
        label.label {{$t('comp.project.project_edit.info_field.label')}}
        textarea.textarea(
          v-model.trim="project.description",
          :disabled="disabled",
          :placeholder="$t('comp.project.project_edit.info_field.placeholder')"
        )
      .field
        label.label {{ $t('comp.project.project_edit.org_field.label') }}
        .control
          span.select
            select(v-model="project.organisation.id")
              option(:value="0")
                | {{ $t('comp.project.project_edit.org_field.options.individual') }}
              option(:value="1")
                | {{ $t('comp.project.project_edit.org_field.options.ifrc') }}
              option(:value="2")
                | {{ $t('comp.project.project_edit.org_field.options.fl') }}
              option(:value="3")
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
import Unsplash, { toJson } from 'unsplash-js'
import { getConfig } from '../../mixins/Config'

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
    understoodPrivacy: false,
    keywords: '',
    previousSearch: '',
    loading: false,
    noresults: false,
    photos: []
  }),
  computed: {
    canSubmit () {
      return !this.disabled &&
        this.project.image !== '' &&
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
    assignPhoto (img) {
      let photo = img.path[0]
      let canvas = document.createElement('canvas')
      canvas.width = photo.naturalWidth
      canvas.height = photo.naturalHeight
      canvas.getContext('2d').drawImage(photo, 0, 0)
      this.project.image = canvas.toDataURL('image/png')
    },
    async doSearch () {
      if (this.previousSearch !== this.keywords) {
        this.loading = true
        const unsplash = new Unsplash({
          applicationId: getConfig('UNSPLASH_APP_ID'),
          secret: getConfig('UNSPLASH_SECRET'),
          callbackUrl: 'https://api.unsplash.com/search/photos'
        })

        this.photos = []

        unsplash.search.photos(this.keywords, 1)
          .then(toJson)
          .then(data => {
            this.photos = data.results.map(a => a.urls.thumb)
            this.loading = false
            this.noresults = this.photos.length <= 0
          })
        this.previousSearch = this.keywords
      }
    },
    showPicker () {
      this.$refs.fileInput.click()
    },
    assignImageAsBase64 (ev) {
      const reader = new FileReader()
      reader.onload = e => { this.project.image = e.target.result }
      reader.readAsDataURL(ev.target.files[0])
    },
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
  +desktop
    .no-left-pad
      padding-left: 0 !important

  .search
    margin-bottom: 0 !important

    .search-error
      margin-top: .5em !important

  .images-container
    display: flex
    flex-wrap: nowrap
    overflow-x: auto

    .image-card
      flex: 0 0 auto
      padding: .5em

      .project-photo
        height: 64px !important
        width: 64px !important
        
  +mobile
    .project-photo
      margin: 0 auto

  .pointer
    cursor: pointer

  #photo-instructions
    display: flex
    align-items: center
    text-align: center
</style>
