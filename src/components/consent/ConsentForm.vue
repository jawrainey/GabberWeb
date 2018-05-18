<template lang="pug">
section.consent-form
  .has-text-centered
    .hero-body
      h1.title {{$t('comp.consent.consent_form.title')}}
      h2.subtitle {{$t('comp.consent.consent_form.subtitle')}}

  .field
    label.label {{$t('comp.consent.consent_form.session_title')}}
    .box
      audio-player(:session="session")
  
  .field
    label.label {{$t('comp.consent.consent_form.project_title')}}
    project-pill(:project="project", readonly)
  
  .field
    label.label {{$t('comp.consent.consent_form.perms_title')}}
    .box.consent-control.is-size-5
      label
        input(type="radio", v-model="updatedConsent", value="none")
        strong {{$t('comp.consent.consent_form.hidden_title')}}
        span {{$t('comp.consent.consent_form.hidden_body')}}
      label(v-if="project.privacy === 'private'")
        input(type="radio", v-model="updatedConsent", value="private")
        strong {{$t('comp.consent.consent_form.private_title')}}
        span {{$t('comp.consent.consent_form.private_body')}}
      label
        input(type="radio", v-model="updatedConsent", value="public")
        strong {{$t('comp.consent.consent_form.public_title')}}
        span {{$t('comp.consent.consent_form.public_body')}}
  
  .field
    label.label {{$t('comp.consent.consent_form.review_title')}}
    .user-appearance-field
      .columns
        .column
          label-value(:label="$t('comp.consent.consent_form.appearance_label')")
            member-bubble.is-size-4(
              v-if="updatedConsent !== 'none'", :member="user", use-id
            )
            blockquote.blockquote(v-else)
              | {{$t('comp.consent.consent_form.no_show')}}
        .column
          label-value(:label="$t('comp.consent.consent_form.access_label')")
            ol: li(v-for="person in whoHasAccess", v-text="person")
  
  .field
    .buttons.is-centered
      button.button.is-success.is-medium(
        @click="onSubmit", :disabled="updatedConsent && disabled"
      ) {{$t('comp.consent.consent_form.submit_action')}}
</template>

<script>
import LabelValue from '@/components/utils/LabelValue'
import MemberBubble from '@/components/member/MemberBubble'

import ProjectPill from '@/components/project/ProjectPill'
import AudioPlayer from '@/components/audio/AudioPlayer'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'

/* Emitted Events

@submit (consent) -> When the submits consent for the session

*/

export default {
  components: { LabelValue, MemberBubble, ProjectPill, AudioPlayer, SessionInfoSidebar },
  props: {
    project: { type: Object, required: true },
    session: { type: Object, required: true },
    user: { type: Object, required: true },
    consent: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    updatedConsent: ''
  }),
  watch: {
    updatedConsent (newValue) {
      if (!this.project || !this.user) return
      
      // Filter out our injected user
      this.project.members = this.project.members.filter(m =>
        m.user_id !== this.user.id
      )
      if (newValue !== 'none') {
        this.project.members.push({
          role: 'user',
          user_id: this.user.id
        })
      }
    }
  },
  computed: {
    // TODO: ...
    whoHasAccess () {
      let consent = this.updatedConsent || this.consent
      let people = [
        this.$t('comp.consent.consent_form.people.interviewer'),
        this.$t('comp.consent.consent_form.people.participant')
      ]
      if (consent === 'none') return people
      people.push(this.$t('comp.consent.consent_form.people.member'))
      if (consent === 'private') return people
      people.push(this.$t('comp.consent.consent_form.people.public'))
      return people
    }
  },
  mounted () {
    this.updatedConsent = this.consent
  },
  methods: {
    onChange (e) {
      this.updatedConsent = e.target.value
    },
    onSubmit (e) {
      this.$emit('submit', this.updatedConsent)
    }
  }
}
</script>

<style lang="sass">

.consent-form
  .field
    margin-bottom: 2em
    > .label
      font-size: $size-5
    
    +desktop
      > .label + *
        margin-left: 1em
  
  .consent-control
    > label
      display: block
      > strong
        padding: 0 0.3em
  
  .user-appearance-field
    ol li
      margin-left: 1em

</style>
