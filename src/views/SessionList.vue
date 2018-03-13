<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0",
  loading-message="Fetching Project's Gabbers",
  :is-loading="apiInProgress",
  :errors="apiErrors",
  :back-route="projectListRoute"
)
full-layout.session-list-view(v-else-if="project")
  session-filters(
    slot="left",
    :query.sync="query"
  )
  template(slot="main")
    breadcrumbs
    h1.title.is-1 Gabbers
    session-pill(
      v-for="session in filteredSessions",
      :key="session.id",
      :session="session",
      @view="viewSession"
    )
  project-info-sidebar(
    slot="right",
    :project="project"
  )
</template>

<script>
import { ADD_SESSIONS, SAVE_PROJECT } from '@/const/mutations'
import { PROJECT_LIST_ROUTE, SESSION_DETAIL_ROUTE } from '@/const/routes'

import ApiWorkerMixin from '@/mixins/ApiWorker'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import BoxLayout from '@/layouts/BoxLayout'

import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'

import ProjectInfoSidebar from '@/components/project/ProjectInfoSidebar'
import SessionPill from '@/components/session/SessionPill'
import SessionFilters from '@/components/session/SessionFilters'

export default {
  mixins: [ ApiWorkerMixin ],
  components: {
    FullLayout, LoadingFullLayout, BoxLayout, Breadcrumbs, Message, SessionPill, SessionFilters, ProjectInfoSidebar
  },
  data: () => ({
    query: ''
  }),
  computed: {
    projectListRoute () {
      return { name: PROJECT_LIST_ROUTE }
    },
    projectId () {
      return parseInt(this.$route.params.project_id)
    },
    project () {
      return this.$store.getters.projectById(
        parseInt(this.$route.params.project_id)
      )
    },
    sessions () {
      if (!this.project) return []
      return this.$store.getters.sessionsForProject(this.projectId)
    },
    filteredSessions () {
      let regex = new RegExp(this.query, 'gi')
      return this.sessions.filter(session =>
        session.creator.fullname.match(regex) ||
        session.participants.some(participant => participant.fullname.match(regex))
      )
    }
  },
  watch: {
    '$route.params.project_id' () { this.fetchData() }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.startApiWork()
      
      let [ projectRes, sessionsRes ] = await Promise.all([
        this.$api.getProject(this.projectId),
        this.$api.getProjectSessions(this.projectId)
      ])
      
      let meta = this.mergeMetaBlocks(projectRes.meta, sessionsRes.meta)
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, projectRes.data)
        this.$store.commit(ADD_SESSIONS, sessionsRes.data || [])
      }
      
      this.endApiWork(meta, 'Project Not Found')
    },
    viewSession (session) {
      const params = { project_id: this.project.id, session_id: session.id }
      this.$router.push({ name: SESSION_DETAIL_ROUTE, params })
    }
  }
}
</script>

<style lang="sass" scoped>

.session-list-view
  .main
    max-width: $desktop

</style>
