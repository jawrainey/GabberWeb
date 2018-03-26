<template lang="pug">
loading-full-layout(
  v-if="sessions.length === 0 && (apiInProgress || apiErrors.length > 0)",
  loading-message="Fetching Project's Gabbers",
  :is-loading="apiInProgress",
  :errors="apiErrors",
  :back-route="projectListRoute"
)
full-layout.session-list-view(v-else-if="project")
  session-filters(
    slot="left",
    :project="project",
    :sessions="sessions",
    :query.sync="query",
    :topics.sync="filterTopics",
    :members.sync="filterMembers",
    :sortMode.sync="sortMode"
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
    action-box(v-if="filteredSessions.length === 0", title="No gabbers")
      p.is-size-5(slot="content")
        span(v-if="sessions.length === 0") There are no gabbers available right now, why not record one in the app?
        span(v-else) No gabbers matched your query, try tweaking it using in the sidebar.
  project-info-sidebar(
    slot="right",
    :project="project"
  )
</template>

<script>
import { ADD_SESSIONS, SAVE_PROJECT } from '@/const/mutations'
import { PROJECT_LIST_ROUTE, SESSION_DETAIL_ROUTE } from '@/const/routes'
import { AuthEvents } from '@/events'

import ApiWorkerMixin from '@/mixins/ApiWorker'
import FiltersMixin from '@/mixins/Filters'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import BoxLayout from '@/layouts/BoxLayout'

import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'
import ActionBox from '@/components/utils/ActionBox'

import ProjectInfoSidebar from '@/components/project/ProjectInfoSidebar'
import SessionPill from '@/components/session/SessionPill'
import SessionFilters from '@/components/session/SessionFilters'

export default {
  mixins: [ ApiWorkerMixin, FiltersMixin ],
  components: {
    FullLayout, LoadingFullLayout, BoxLayout, Breadcrumbs, ActionBox, Message, SessionPill, SessionFilters, ProjectInfoSidebar
  },
  data: () => ({
    query: '',
    filterTopics: [],
    filterMembers: [],
    sortMode: 'newest'
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
      return this.sessions.filter(session => {
        let queryValues = [
          session.creator.fullname, ...session.participants.map(p => p.fullname)
        ]
        let topicIds = session.topics.map(t => t.topic_id)
        let participantIds = [
          ...session.participants.map(p => p.user_id), session.creator.user_id
        ]
        
        return this.queryFilter(this.query, queryValues) &&
          this.idListAndFilter(this.filterTopics, topicIds) &&
          this.idListAndFilter(this.filterMembers, participantIds)
      }).sort(this.modelSorter(this.sortMode))
    }
  },
  watch: {
    '$route.params.project_id' () { this.fetchSessions() }
  },
  mounted () {
    this.fetchSessions()
    AuthEvents.$on('logout', this.fetchSessions)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchSessions)
  },
  methods: {
    async fetchSessions () {
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
