<template lang="pug">
full-layout.project-list-view
  section.filter(slot="left")
    h2.subtitle Filter Projects
    label.label Search for a project
    input.input(
      type="text",
      v-model="query",
      placeholder="e.g. My Fancy Project"
    )
  
  .main(slot="main")
    .level
      .level-left
        .level-item
          h1.title.is-1 Projects
      .level-right(v-if="currentUser")
        .level-item
          add-cancel-button.is-medium(@click="toggleCreate", :toggled="!!newProject")
    
    .box.new-project(v-if="newProject")
      h3.subtitle.is-4 Create a new Project
      message.is-danger(v-model="apiErrors", clearable)
      project-edit(
        :project="newProject",
        action="Create",
        :disabled="apiInProgress",
        @submit="createProject",
        @cancel="toggleCreate"
      )
    message.is-danger(v-else, v-model="apiErrors")
    
    section.project-group(v-if="filteredPersonalProjects.length > 0")
      h4.is-size-4.has-text-grey-light My Projects
      project-pill(
        v-for="project in filteredPersonalProjects",
        :key="project.id",
        :project="project"
      )
      
    section.project-group(v-if="filteredPublicProjects.length > 0")
      h4.is-size-4.has-text-grey-light Public Projects
      project-pill(
        v-for="project in filteredPublicProjects",
        :key="project.id",
        :project="project"
      )
</template>

<script>
import { SET_PROJECTS, SAVE_PROJECT } from '@/const/mutations'
import { AuthEvents } from '@/events'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import FullLayout from '@/layouts/FullLayout'
import Message from '@/components/utils/Message'
import AddCancelButton from '@/components/utils/AddCancelButton'
import ProjectPill from '@/components/project/ProjectPill'
import ProjectEdit from '@/components/project/ProjectEdit'
import { mapGetters } from 'vuex'

export default {
  mixins: [ ApiWorkerMixin ],
  components: {
    FullLayout, Message, AddCancelButton, ProjectEdit, ProjectPill
  },
  data: () => ({
    query: '',
    newProject: null
  }),
  computed: {
    ...mapGetters(['currentUser', 'personalProjects', 'publicProjects']),
    filteredPersonalProjects () {
      return this.filterProjects(this.personalProjects, this.query)
    },
    filteredPublicProjects () {
      return this.filterProjects(this.publicProjects, this.query)
    }
  },
  mounted () {
    this.fetchProjects()
    AuthEvents.$on('logout', this.fetchProjects)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchProjects)
  },
  methods: {
    filterProjects (projects, query) {
      query = this.query.toLowerCase()
      return projects.filter(p => p.title.toLowerCase().includes(query))
    },
    toggleCreate () {
      if (this.newProject) {
        this.newProject = null
      } else {
        this.newProject = {
          title: '',
          description: '',
          privacy: 'public',
          creator: this.currentUser,
          topics: []
        }
      }
    },
    async fetchProjects () {
      this.startApiWork()
      
      let { meta, data } = await this.$api.listProjects()
      
      if (meta.success) {
        this.$store.commit(SET_PROJECTS, data)
      }
      
      this.endApiWork(meta, 'Could not fetch projects, please reload')
    },
    async createProject () {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let topics = this.newProject.topics.map(p => p.text)
      
      let { meta, data } = await this.$api.createProject(
        this.newProject.title, this.newProject.description, topics, this.newProject.privacy
      )
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.newProject = null
      } else if (this.apiErrors.length === 0) {
        this.apiErrors.push('Could not create project, please try again')
      }
      
      this.endApiWork(meta, 'Could not create project')
    }
  }
}
</script>

<style lang="sass" scoped>
  
.project-list-view
  .main
    max-width: $desktop
  
  .new-project
    border-left: 15px solid $green
  
  .project-group:not(:last-child)
    margin-bottom: 3em
  
</style>
