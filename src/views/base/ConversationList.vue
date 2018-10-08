<template lang="pug">

full-layout.session-list-view(v-else-if="sessions")
  session-filters(
    slot="left",
    :sessions="sessions",
    :query.sync="query",
    :societies.sync="filterSocieties",
    :ages.sync="filterAges",
    :languages.sync="filterLanguages",
    :genders.sync="filterGender",
    :roles.sync="filterRoles",
    :topics.sync="filterTopics",
    :members.sync="filterMembers",
    :themes.sync="filterThemes",
    :sortMode.sync="sortMode"
  )

  template(slot="mobileLeft")
    span.icon: fa(icon="filter")
    span {{$t('view.project.session_list.mobile_filter_title')}}

  template(slot="main")
    h1.title.is-1.is-inline.is-size-4-mobile {{ sessionsCount }} {{$t('view.project.session_list.title')}}
    | &nbsp;
    br.is-hidden-tablet
    span.subtitle.margin-top.is-italic.is-inline.is-size-6-mobile(v-if="isLoading") {{$t('view.project.session_list.loading_title')}}
    .columns.is-multiline.add-padding
      session-pill.column.is-half.is-45(
        v-for="session in filteredSessions",
        :key="session.id",
        :session="session",
        @view="viewSession"
      )
    action-box(v-if="filteredSessions.length === 0 && !isLoading", title="")
      p.is-size-5(slot="content")
        span(v-if="sessionsCount === 0") {{$t('view.project.session_list.no_sessions')}}
        span(v-else) {{$t('view.project.session_list.no_filtered_sessions')}}

</template>

<script>
import { ADD_SESSIONS, SAVE_PROJECT } from '@/const/mutations'
import { HOME_ROUTE, SESSION_DETAIL_ROUTE } from '@/const/routes'
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
    filterThemes: [],
    sortMode: 'newest'
  }),
  computed: {
    isLoading () {
      return (this.apiInProgress || this.apiErrors.length > 0)
    },
    homeRoute () {
      return { name: HOME_ROUTE }
    },
    sessions () {
      return this.$store.getters.allSessions
    },
    sessionsCount () {
      return this.filteredSessions ? this.filteredSessions.length : 0
    },
    filteredSessions () {
      return this.sessions.filter(session => {
        let queryValues = [
          session.creator.fullname, ...session.participants.map(p => p.fullname)
        ]

        let genderIds = session.participants.map(p => p.gender)
        let societyIds = session.participants.map(p => p.society)
        let filterIds = session.participants.map(p => p.age)
        let roleIds = session.participants.map(p => p.m_role)

        return this.queryFilter(this.query, queryValues) &&
          this.idListOrFilter(this.filterGender, genderIds) &&
          this.idListOrFilter(this.filterSocieties, societyIds) &&
          this.idListOrFilter(this.filterAges, filterIds) &&
          this.idListOrFilter(this.filterRoles, roleIds) &&
          (this.filterThemes.length === 0 || this.filterThemes.includes(session.project_id)) &&
          (this.filterLanguages.length === 0 || this.filterLanguages.includes(session.lang_id))
      }).sort(this.modelSorter(this.sortMode))
    }
  },
  created () {
    AuthEvents.$on('logout', this.fetchSessions)
  },
  mounted () {
    this.fetchSessions()
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchSessions)
  },
  methods: {
    async fetchSessions () {
      this.startApiWork()

      let { meta, data } = await this.$api.listProjects()

      if (meta.success) {
        data.forEach(project => this.$store.commit(SAVE_PROJECT, project || []))

        let projects = this.$store.getters.allProjects
        projects.forEach(async project => {
          // Only request for the sessions if they exist
          if (project.sessions > 0) {
            let {meta, data} = await this.$api.getProjectSessions(project.id)
            if (meta.success) this.$store.commit(ADD_SESSIONS, data || [])
          }
        })
      }

      this.endApiWork(meta)
    },
    viewSession (session) {
      const params = { project_id: session.project_id, session_id: session.id }
      this.$router.push({ name: SESSION_DETAIL_ROUTE, params })
    }
  }
}
</script>

<style lang="sass" scoped>
+tablet
  .is-45
    width: 47.5%
  .is-45:nth-child(odd)
    margin-right: 2.5%
  .is-45:last-child()
    margin-bottom: 1em
.add-padding
  padding: 1.5em 1em 1em 1em
.session-list-view
  .main
    max-width: $desktop
</style>
