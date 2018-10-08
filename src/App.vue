<template lang="pug">
#app-wrapper
  dev-banner(v-if="isDevMode")
  coming-soon(v-if="isComingSoon")
  router-view(v-else-if="!apiInProgress")
</template>

<script>
import { ADD_SESSIONS, ADD_SESSIONS_RECOMMENDATIONS, LOGIN_USER, SET_SUPPORTED_LANGUAGES, SAVE_PROJECT } from './const/mutations'
import ApiWorkerMixin from './mixins/ApiWorker'
import ComingSoon from './views/base/ComingSoon'
import DevBanner from './views/base/DevBanner'
import { getConfig } from './mixins/Config'
import { AuthEvents } from '@/events'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { ComingSoon, DevBanner },
  computed: {
    isDevMode () { return getConfig('DEV_MODE') },
    isComingSoon () { return getConfig('COMING_SOON') }
  },
  created () {
    this.checkLogin()
    this.setSupportedLanguages()
    this.sessionsRecommendations()
    this.fetchAllProjects()
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchSessions)
  },
  methods: {
    async checkLogin () {
      this.startApiWork()

      let { meta, data } = await this.$api.getSelf()
      if (data) this.$store.commit(LOGIN_USER, data)

      this.endApiWork(meta)
    },
    async setSupportedLanguages () {
      if (this.$store.getters.availableLanguages.length > 0) return
      this.startApiWork()
      let { meta, data } = await this.$api.getSupportedLanguages()
      if (data) this.$store.commit(SET_SUPPORTED_LANGUAGES, data)
      this.endApiWork(meta)
    },
    async sessionsRecommendations () {
      if (this.$store.getters.sessionsRecommendations.length > 0) return
      this.startApiWork()
      let {meta, data} = await this.$api.getSessionsRecommendations()
      if (meta.success) {
        this.$store.commit(ADD_SESSIONS_RECOMMENDATIONS, data)
      }
      this.endApiWork(meta, this.$t('comp.project.project_pill.update_failed'))
    },
    async fetchAllProjects () {
      if (this.$store.getters.allProjects.length > 0) return
      this.startApiWork()
      let { meta, data } = await this.$api.listProjects()
      if (meta.success) {
        data.forEach(project => this.$store.commit(SAVE_PROJECT, project || []))
        this.fetchAllSessions()
      }
      this.endApiWork(meta)
    },
    async fetchAllSessions () {
      if (this.$store.getters.allSessions.length > 0) return
      let projects = this.$store.getters.allProjects
      projects.forEach(async project => {
        // Only request for the sessions if they exist
        if (project.sessions > 0) {
          let {meta, data} = await this.$api.getProjectSessions(project.id)
          if (meta.success) this.$store.commit(ADD_SESSIONS, data || [])
        }
      })
    }
  }
}
</script>

<style lang="sass">
@import "~sass/transitions"
@import "~bulma/bulma"
@import "~bulmaswatch/darkly/_overrides.scss"

@import "~sass/transitions"
@import "~sass/theme"

</style>
