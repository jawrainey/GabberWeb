<template lang="pug">
full-layout.project-list
  section.filter(slot="left")
    h2.subtitle Filter Projects
    label.label By name
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
          h1.title.is-1 Gabber Projects
      //- .level-right(v-if="currentUser")
        .level-item(v-if="!isCreating")
          button.button.is-rounded.is-success(@click="toggleCreate") Create
        .lebel-item(v-else)
          button.button.is-rounded.is-danger(@click="toggleCreate") Cancel
    
    //- create-project(v-if="showCreate" @projectCreated="showCreate=false")
    
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
import { SET_PROJECTS } from '@/const/mutations'
import FullLayout from '@/layouts/FullLayout'
import Message from '@/components/utils/Message'
import ProjectItem from '@/components/project/ProjectItem'
import ProjectPill from '@/components/project/ProjectPill'
import CreateProject from '@/components/project/CreateProject'
import RecentProjects from '@/components/project/RecentProjects'
import { mapGetters } from 'vuex'

// Edit will emit that it has submitted (only once form is valid and response from server);
// From here, we can then hide the edit form and highlight the project?
export default {
  components: {
    ProjectItem, FullLayout, Message, CreateProject, RecentProjects, ProjectPill
  },
  data: () => ({
    showCreate: false,
    isCreating: false,
    errors: [],
    query: ''
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
      return projects.filter(p =>
        p.title.toLowerCase().includes(query)
      )
    },
    async fetchProjects () {
      let { meta, data } = await this.$api.listAllProjects()
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(
          SET_PROJECTS,
          data.personal.concat(data.public)
        )
      }
    },
    toggleCreate () {
      this.isCreating = !this.isCreating
    }
  }
}
</script>

<style lang="sass" scoped>
  
.project-list
  .filter, .main, .detail
    padding: 1.5em 1em
  .main
    max-width: $desktop
  
  .project-group:not(:last-child)
    margin-bottom: 3em
  
</style>
