<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0",
  :loading-message="$t('view.project.session_consent.loading_title')",
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
      h3.subtitle {{$t('view.project.session_consent.info_title')}}
      .field
        blockquote.blockquote {{$t('view.project.session_consent.privacy_body')}}
      label-value(
        :label="$t('view.project.session_consent.info_name_label')",
        :value="user.fullname"
      )
      label-value(
        :label="$t('view.project.session_consent.info_email_label')",
        :value="user.email"
      )
  
  template(slot="mobileLeft")
    span.icon: fa(icon="user")
    span {{$t('view.project.session_consent.mobile_info_title')}}

  session-info-sidebar(slot="right", :session="session", :project="project")

  template(slot="mobileRight")
    span.icon: fa(icon="microphone")
    span {{$t('view.project.session_consent.title')}}
  
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
      
      this.endApiWork(meta, this.$t('view.project.session_consent.failed_body'))
    },
    async submit (consent) {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta } = await this.$api.sendConsent(
        this.$route.params.token, consent
      )
      
      this.hasSubmitted = meta.success
      
      this.endApiWork(meta, this.$t('view.project.session_consent.failed_body'))
    }
  }
}
</script>

<style lang="sass">
</style>
