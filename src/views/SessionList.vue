<template lang="pug">
box-layout(v-if="loading")
  section.section
    h1.title Fetching Gabbers
box-layout(v-else-if="errors.length > 0")
  section.section
    h1.title Something went wrong
    message.is-danger(v-model="errors")
    .buttons.is-centered
      router-link.button.is-link(:to="projectListRoute")
        | Go home
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
    pre {{project.title}}
    pre {{sessions.map(s => s.creator.name)}}
  
  .detail(slot="right")
    .content
      h3.subtitle {{project.title}}
      p {{project.created_on}}
      p {{project.description}}
</template>

<script>
import { ADD_SESSIONS, SAVE_PROJECT } from '@/const/mutations'
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import FullLayout from '@/layouts/FullLayout'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'

export default {
  components: { FullLayout, BoxLayout, Breadcrumbs, Message },
  data: () => ({
    loading: true,
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
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.errors = []
      this.loading = true
      
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
      this.loading = false
    }
  }
}
</script>

<style lang="sass" scoped>

.session-list-view
  .filter, .detail
    padding: 1em
  
  .main
    padding: 0.5em 1em
    max-width: $desktop

</style>
