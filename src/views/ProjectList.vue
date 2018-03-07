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
  
  message.is-danger(v-model="errors", clearable)
  
  .main(slot="main")
    .level
      .level-left
        .level-item
          h1.title.is-1 Projects
      .level-right(v-if="currentUser && !newProject")
        .level-item
          button.button.is-rounded.is-success(@click="toggleCreate") Create Project
    
    .box.new-project(v-if="newProject")
      h3.subtitle.is-4 Create a new Project
      message.is-danger(v-model="errors", clearable)
      project-edit(
        :project="newProject",
        action="Create",
        :disabled="isCreating",
        @submit="createProject",
        @cancel="toggleCreate"
      )
    
    section.project-group
      h4.is-size-4.has-text-grey-light My Projects
      project-pill(
        v-for="project in filteredPersonalProjects",
        :key="project.id",
        :project="project"
      )
    
    section.project-group
      h4.is-size-4.has-text-grey-light Public Projects
      project-pill(
        v-for="project in filteredPublicProjects",
        :key="project.id",
        :project="project"
      )
</template>

<script>
import { SET_PROJECTS, SAVE_PROJECT } from '@/const/mutations'
import FullLayout from '@/layouts/FullLayout'
import Message from '@/components/utils/Message'
import ProjectItem from '@/components/project/ProjectItem'
import ProjectPill from '@/components/project/ProjectPill'
import ProjectEdit from '@/components/project/ProjectEdit'
import RecentProjects from '@/components/project/RecentProjects'
import { mapGetters } from 'vuex'

// Edit will emit that it has submitted (only once form is valid and response from server);
// From here, we can then hide the edit form and highlight the project?
export default {
  components: {
    ProjectItem, FullLayout, Message, ProjectEdit, RecentProjects, ProjectPill
  },
  data: () => ({
    errors: [],
    query: '',
    newProject: null,
    isCreating: false
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
          tags: [],
          creator: this.currentUser
        }
      }
      console.log(this.newProject)
    },
    async fetchProjects () {
      this.errors = []
      let { meta, data } = await this.$api.listAllProjects()
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(
          SET_PROJECTS,
          data.personal.concat(data.public)
        )
      }
    },
    async createProject () {
      this.errors = []
      let { meta, data } = await this.$api.createProject(
        this.newProject.title, this.newProject.description, this.newProject.tags, this.newProject.privacy
      )
      this.errors = meta.messages
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.newProject = null
      } else if (this.errors.length === 0) {
        this.errors.push('Could not create project, please try again')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  
.project-list-view
  .filter, .main, .detail
    padding: 1em
  
  .main
    max-width: $desktop
  
  .new-project
    border-left: 15px solid $green
  
  .project-group:not(:last-child)
    margin-bottom: 3em
  
</style>
