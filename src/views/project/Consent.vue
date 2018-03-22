<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0",
  loading-message="Fetching Consent Info",
  :is-loading="apiInProgress",
  :errors="apiErrors"
)
full-layout.consent-view(v-else-if="project && user")
  pre(slot="left") {{ user }}
  section(slot="main")
    .has-text-centered
      .hero-body
        h1.title Gabber Consent
        h2.subtitle You've been asked to provide consent for a Gabber you were in
    
    .field
      label.label 1. This is the project you were involved in
      project-pill(:project="project", readonly)
    
    .field
      label.label 2. This is the conversation that took place
      .box
        audio-player(:session="session")
    
    .field
      label.label 3. Here are your consent options
</template>

<script>
// import { PROJECT_LIST_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import Loading from '@/components/utils/Loading'
import Message from '@/components/utils/Message'

import ProjectPill from '@/components/project/ProjectPill'
import AudioPlayer from '@/components/audio/AudioPlayer'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { FullLayout, LoadingFullLayout, Loading, Message, ProjectPill, AudioPlayer },
  data: () => ({
    project: null,
    session: null,
    user: null
  }),
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
      }
      
      this.endApiWork(meta, 'Invalid consent token')
    }
  }
}
</script>

<style lang="sass">

.consent-view
  
  .field
    margin-bottom: 3em
    
    .label
      font-size: $size-5
    
    .label + *
      margin-left: 1em

</style>
