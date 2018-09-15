<template lang="pug">
loading-full-layout(
  v-if="sessions.length === 0 && (apiInProgress || apiErrors.length > 0)",
  :loading-message="$t('view.project.session_list.loading_title')",
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
    :societies.sync="filterSocieties",
    :ages.sync="filterAges",
    :languages.sync="filterLanguages",
    :genders.sync="filterGender",
    :roles.sync="filterRoles",
    :topics.sync="filterTopics",
    :members.sync="filterMembers",
    :sortMode.sync="sortMode"
  )

  template(slot="mobileLeft")
    span.icon: fa(icon="filter")
    span {{$t('view.project.session_list.mobile_filter_title')}}

  template(slot="main")
    h1.title.is-1 {{$t('view.project.session_list.title')}} ({{ filteredSessions.length }})
    session-pill(
      v-for="session in filteredSessions",
      :key="session.id",
      :session="session",
      @view="viewSession"
    )
    action-box(v-if="filteredSessions.length === 0", title="No gabbers")
      p.is-size-5(slot="content")
        span(v-if="sessions.length === 0") {{$t('view.project.session_list.no_sessions')}}
        span(v-else) {{$t('view.project.session_list.no_filtered_sessions')}}

  project-info-sidebar(
    slot="right",
    :project="project",
    :sessions="sessions"
  )

  template(slot="mobileRight")
    span.icon: fa(icon="info")
    span {{$t('view.project.session_list.mobile_project_title')}}
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
    filterGender: [],
    filterSocieties: [],
    filterAges: [],
    filterLanguages: [],
    filterRoles: [],
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

        let genderIds = session.participants.map(p => p.gender)
        let societyIds = session.participants.map(p => p.society)
        let filterIds = session.participants.map(p => p.age)
        let roleIds = session.participants.map(p => p.m_role)

        return this.queryFilter(this.query, queryValues) &&
          this.idListOrFilter(this.filterTopics, topicIds) &&
          this.idListOrFilter(this.filterMembers, participantIds) &&
          this.idListOrFilter(this.filterGender, genderIds) &&
          this.idListOrFilter(this.filterSocieties, societyIds) &&
          this.idListOrFilter(this.filterAges, filterIds) &&
          this.idListOrFilter(this.filterRoles, roleIds) &&
          (this.filterLanguages.length === 0 || this.filterLanguages.includes(session.lang_id))
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

      this.endApiWork(meta, this.$t('view.project.session_list.not_found'))
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
