<template lang="pug">
loading-full-layout(
  v-if="isLoading || errors.length > 0",
  loading-message="Fetching Project's Gabbers",
  :is-loading="isLoading",
  :errors="errors",
  :back-route="projectListRoute"
)
full-layout.session-list-view(v-else)
  .filter(slot="left")
    h3.subtitle Filter Gabbers
    .field
      label.label Search by name
      input.input.is-small(
        v-model="query",
        placeholder="e.g. My Cool Project"
      )
      
  .main(slot="main")
    breadcrumbs
    h1.title.is-1 Gabbers
    session-pill(
      v-for="session in filteredSessions",
      :key="session.id",
      :session="session",
      @view="viewSession"
    )
  
  .detail(slot="right")
    h3.title.is-3 {{project.title}}
    p.subtitle {{projectDate}}
    label-value(label="Description", :value="project.description")
    label-value(label="Creator")
      p.is-size-4
        name-bubble.is-size-5(
          :name="project.creator.name",
          :color-id="project.creator.id",
          padded
        )
        span {{project.creator.name}}
    label-value(label="Project Members")
      name-bubble.is-size-6(
        v-for="member in project.members",
        :key="member.id",
        :name="member.name",
        :color-id="member.user_id",
        padded
      )
</template>

<script>
import moment from 'moment-mini'

import { ADD_SESSIONS, SAVE_PROJECT } from '@/const/mutations'
import { PROJECT_LIST_ROUTE, SESSION_DETAIL_ROUTE } from '@/const/routes'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'
import SessionPill from '@/components/sessions/SessionPill'
import NameBubble from '@/components/utils/NameBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: {
    FullLayout, LoadingFullLayout, BoxLayout, Breadcrumbs, Message, SessionPill, NameBubble, LabelValue
  },
  data: () => ({
    isLoading: true,
    errors: [],
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
        session.creator.name.match(regex) ||
        session.participants.some(participant => participant.name.match(regex))
      )
    },
    projectDate () {
      return moment(this.project.created_on)
        .format('h:mm a MMMM Do YYYY')
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
      this.errors = []
      this.isLoading = true
      
      let [ projectRes, sessionsRes ] = await Promise.all([
        this.$api.getProject(this.projectId),
        this.$api.getProjectSessions(this.projectId)
      ])
      
      this.errors = projectRes.meta.messages
        .concat(sessionsRes.meta.messages)
      
      if (!projectRes.meta.success) {
        if (this.errors.length === 0) {
          this.errors.push('Project not Found')
        }
      } else {
        this.$store.commit(SAVE_PROJECT, projectRes.data)
        
        if (sessionsRes.meta.success) {
          this.$store.commit(ADD_SESSIONS, sessionsRes.data)
        }
      }
      this.isLoading = false
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
