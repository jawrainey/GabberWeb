<template lang="pug">
loading-full-layout(
  v-if="isLoading || errors.length > 0"
  loading-message="Fetching Gabber Session",
  :is-loading="isLoading",
  :errors="errors",
  :back-route="sessionListRoute"
)
full-layout(v-else)
  annotation-filters(
    slot="left"
  )
  .main(slot="main")
    breadcrumbs
    h1.title {{session.creator.name}}'s Gabber
    audio-player(:session="session")
    pre {{session}}
  session-info-sidebar(
    slot="right",
    :session="session"
  )
</template>

<script>

import { ADD_SESSIONS } from '@/const/mutations'
import { SESSION_LIST_ROUTE } from '@/const/routes'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import Breadcrumbs from '@/components/utils/Breadcrumbs'

import AnnotationFilters from '@/components/annotation/AnnotationFilters'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'
import AudioPlayer from '@/components/audio/AudioPlayer2'

export default {
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, AnnotationFilters, SessionInfoSidebar, AudioPlayer
  },
  data: () => ({
    errors: [],
    isLoading: true
  }),
  mounted () {
    this.fetchGabber()
  },
  watch: {
    '$route.params.session_id' () {
      this.fetchGabber()
    }
  },
  computed: {
    sessionListRoute () { return { name: SESSION_LIST_ROUTE } },
    sessionId () { return this.$route.params.session_id },
    session () { return this.$store.getters.sessionById(this.sessionId) }
  },
  methods: {
    async fetchGabber () {
      this.errors = []
      this.loading = true
      
      let { meta, data } = await this.$api.getSession(this.sessionId)
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(ADD_SESSIONS, [ data ])
      } else if (this.errors.length === 0) {
        this.errors.push('Gabber not found')
      }
      
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass">
</style>
