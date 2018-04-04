<template lang="pug">
section.consent-form
  .has-text-centered
    .hero-body
      h1.title Gabber Consent
      h2.subtitle You've been asked to provide consent for a Gabber you were in
  
  .field
    label.label 1. This is the recording that was made
    .box
      audio-player(:session="session")
  
  .field
    label.label 2. This is the project the Gabber was about
    project-pill(:project="project", readonly)
  
  .field
    label.label 3. These are your consent options
    .box.consent-control.is-size-5
      label
        input(type="radio", v-model="updatedConsent", value="none")
        strong None
        span – Only the people in this conversation will be able to hear this recording.
      label(v-if="project.privacy === 'private'")
        input(type="radio", v-model="updatedConsent", value="private")
        strong Private
        span – Only people who are members of the project can find or listen to this recording.
      label
        input(type="radio", v-model="updatedConsent", value="public")
        strong Public
        span – Anyone on Gabber can discover and listen to this audio
  
  .field
    label.label 4. What this means
    .user-appearance-field
      .columns
        .column
          label-value(label="How you appear")
            member-bubble.is-size-4(
              v-if="updatedConsent !== 'none'", :member="user", use-id
            )
            blockquote.blockquote(v-else)
              | You will not show up in Gabber
        .column
          label-value(label="Who has access")
            ol: li(v-for="person in whoHasAccess", v-text="person")
  
  .field
    .buttons.is-centered
      button.button.is-success.is-medium(
        @click="onSubmit", :disabled="updatedConsent && disabled"
      ) Submit Consent
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
    whoHasAccess () {
      let consent = this.updatedConsent || this.consent
      let people = [
        'The interviewer',
        'Participants in this conversation'
      ]
      if (consent === 'none') return people
      people.push('Members of this project')
      if (consent === 'private') return people
      people.push('Anyone on Gabber')
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
