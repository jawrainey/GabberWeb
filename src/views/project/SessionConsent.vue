<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0",
  loading-message="Fetching Consent Info",
  :is-loading="apiInProgress",
  :errors="apiErrors"
)
box-layout(v-else-if="hasSubmitted")
  section.section
    h1.title Consent submitted
    h2.subtitle Your consent has been submitted
    message.is-info(
      title="Success",
      value="Thank your for submitting your consent for this Gabber, you can now view and start annotating it."
    )
    hr
    .buttons.is-centered
      router-link.button.is-success.is-medium(:to="sessionRoute")
        span View Session
        span.icon: fa(icon="chevron-right")
full-layout(v-else-if="project && user")
  div(slot="left")
    template(v-if="user")
      h3.subtitle Your information
      .field
        blockquote.blockquote This is the only personal information we will store about your conversation and it will never be made public.
      label-value(label="Name", :value="user.fullname")
      label-value(label="Email", :value="user.email")
    
  section.consent-view(slot="main")
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
      label.label 3. This is how you'll appear
      .user-appearance-field
        transition(name="fade", mode="out-in")
          p.is-size-4(v-if="consent !== 'none'")
            member-bubble(:member="user", use-id)
          blockquote.blockquote.is-size-5(v-else)
            | You will not show up in Gabber around this session
    
    .field
      label.label 4. These are your consent options
      .box.consent-control.is-size-5
        label
          input(type="radio", v-model="consent", value="none")
          strong None
          span – You will be removed from the project and only the other participants can listen.
        label(v-if="project.privacy === 'private'")
          input(type="radio", v-model="consent", value="private")
          strong Private
          span – Only members of the project can see or listen to the recording.
        label
          input(type="radio", v-model="consent", value="public")
          strong Public
          span – Anyone on Gabber can discover and listen to the audio
    
    .field
      .buttons.is-centered
        button.button.is-success.is-medium(@click="submit", :disabled="apiInProgress")
          | Submit Consent
    
  session-info-sidebar(slot="right", :session="session")
</template>

<script>
import { SESSION_DETAIL_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'

import FullLayout from '@/layouts/FullLayout'
import BoxLayout from '@/layouts/BoxLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import Loading from '@/components/utils/Loading'
import Message from '@/components/utils/Message'
import LabelValue from '@/components/utils/LabelValue'
import MemberBubble from '@/components/utils/MemberBubble'

import ProjectPill from '@/components/project/ProjectPill'
import AudioPlayer from '@/components/audio/AudioPlayer'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { FullLayout, BoxLayout, LoadingFullLayout, Loading, Message, ProjectPill, AudioPlayer, SessionInfoSidebar, LabelValue, MemberBubble },
  data: () => ({
    project: null,
    session: null,
    user: null,
    consent: null,
    hasSubmitted: false
  }),
  computed: {
    sessionRoute () {
      let params = { project_id: this.project.id, session_id: this.session.id }
      return { name: SESSION_DETAIL_ROUTE, params }
    }
  },
  watch: {
    '$route.params.token' (newToken) {
      this.fetchConsent(newToken)
    },
    'consent' (newConsent) {
      if (!this.project || !this.user) return
      
      // Filter out our injected user
      this.project.members = this.project.members.filter(m =>
        m.user_id !== this.user.id
      )
      if (newConsent !== 'none') {
        this.project.members.push({
          role: 'user',
          user_id: this.user.id
        })
      }
    }
  },
  mounted () {
    this.fetchConsent(this.$route.params.token)
  },
  methods: {
    async fetchConsent (token) {
      this.startApiWork()
      
      let { meta, data } = await this.$api.getConsent(token)
      
      if (meta.success) {
        // ['project', 'user', 'session', 'consent'].forEach(key => {
        //   this[key] = data[key]
        // })
        
        // const copy = (from, keys, to) => keys.forEach(k => (to[k] = from[k]))
        // copy(data, ['project', 'user', 'session', 'consent'], this)
        
        this.project = data.project
        this.user = data.user
        this.session = data.session
        this.consent = data.consent
      }
      
      this.endApiWork(meta, 'Invalid consent token')
    },
    async submit () {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta } = await this.$api.sendConsent(
        this.$route.params.token, this.consent
      )
      
      if (meta.success) {
        this.hasSubmitted = true
      }
      
      this.endApiWork()
    }
  }
}
</script>

<style lang="sass">

.consent-view
  
  .field
    margin-bottom: 2em
    > .label
      font-size: $size-5
    > .label + *
      margin-left: 1em
  
  .consent-control
    > label
      display: block
      > strong
        padding: 0 0.3em

</style>