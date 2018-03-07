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
  
  section.main(slot="main")
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
    
    .project-group
      h4.is-size-4 My Projects
      project-item(
        v-for="project in filteredPersonalProjects",
        :key="project.id",
        :project="project"
      )
    
    .project-group
      h4.is-size-4 Public Projects
      project-item(
        v-for="project in filteredPublicProjects",
        :key="project.id",
        :project="project"
      )
    //- .project-group
    //-   h4.subtitle.is-4 My projects
    //-   p(v-if="MY_PROJECTS && MY_PROJECTS.length <= 0") You are not a <b>member</b> of any projects.
    //-   project-item(v-for="project in MY_PROJECTS" v-bind:key="project.id" v-bind:isMember="true" v-bind:project="project")
    //-
    //- .project-group
    //-   h4.subtitle.is-4 Public projects
    //-   p(v-if="PUBLIC_PROJECTS && PUBLIC_PROJECTS.length <= 0") There are no public projects.
    //-   project-item(v-for="project in PUBLIC_PROJECTS" v-bind:key="project.id" v-bind:project="project")
</template>

<script>
import { SET_PROJECTS } from '@/const/mutations'
import FullLayout from '@/layouts/FullLayout'
import Message from '@/components/utils/Message'
import ProjectItem from '@/components/Project/ProjectItem'
import CreateProject from '@/components/Project/CreateProject'
import RecentProjects from '@/components/Project/RecentProjects'
import { mapGetters } from 'vuex'

// Edit will emit that it has submitted (only once form is valid and response from server);
// From here, we can then hide the edit form and highlight the project?
export default {
  components: { ProjectItem, FullLayout, Message, CreateProject, RecentProjects },
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
      
      console.log(meta)
      console.log(data)
      
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
  
</style>
