<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0",
  loading-message="Fetching Consent Info",
  :is-loading="apiInProgress",
  :errors="apiErrors"
)
consent-success(
  v-else-if="hasSubmitted",
  :project="project",
  :session="session",
  :user="user"
)
full-layout(v-else-if="project && user && consent")
  div(slot="left")
    template(v-if="user")
      h3.subtitle Your information
      .field
        blockquote.blockquote This is the only personal information we will store about your conversation and it will never be made public.
      label-value(label="Name", :value="user.fullname")
      label-value(label="Email", :value="user.email")
  
  template(slot="mobileLeft")
    span.icon: fa(icon="user")
    span Your info
  
  session-info-sidebar(slot="right", :session="session")
  
  template(slot="mobileRight")
    span.icon: fa(icon="microphone")
    span Gabber info
  
  consent-form(
    slot="main",
    :session="session",
    :project="project",
    :user="user",
    :consent="consent",
    :disabled="apiInProgress",
    @submit="submit"
  )
</template>

<script>
import { SESSION_DETAIL_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import LabelValue from '@/components/utils/LabelValue'

import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'

import ConsentForm from '@/components/consent/ConsentForm'
import ConsentSuccess from '@/components/consent/ConsentSuccess'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { FullLayout, LoadingFullLayout, SessionInfoSidebar, LabelValue, ConsentForm, ConsentSuccess },
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
        this.project = data.project
        this.user = data.user
        this.session = data.session
        this.consent = data.consent
      }
      
      this.endApiWork(meta, 'Invalid consent token')
    },
    async submit (consent) {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta } = await this.$api.sendConsent(
        this.$route.params.token, consent
      )
      
      this.hasSubmitted = meta.success
      
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass">
</style>
