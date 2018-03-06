<template lang="pug">
full-layout.project-list
  section.filter(slot="left")
    .tile.is-vertical
      h5.is-6 Search Projects
      input(type="text" placeholder="Search...")
    .tile.is-vertical
      recent-projects
        
  section.main(slot="main")
    .level
      .level-left
        .level-item
          h1.title.is-1 Projects
      .level-right(v-if="IS_LOGGED_IN")
        .level-item
          button.button.is-rounded(v-bind:class="createClasses" @click="showCreate = !showCreate")
            | {{ showCreate ? 'Close' : 'Create' }}
      create-project(v-if="showCreate" @projectCreated="showCreate=false")

    .project-group
      h4.subtitle.is-4 My projects
      p(v-if="MY_PROJECTS && MY_PROJECTS.length <= 0") You are not a <b>member</b> of any projects.
      project-item(v-for="project in MY_PROJECTS" v-bind:key="project.id" v-bind:isMember="true" v-bind:project="project")

    .project-group
      h4.subtitle.is-4 Public projects
      p(v-if="PUBLIC_PROJECTS && PUBLIC_PROJECTS.length <= 0") There are no public projects.
      project-item(v-for="project in PUBLIC_PROJECTS" v-bind:key="project.id" v-bind:project="project")
  //- section.detail(slot="right")
  //-   p Project meta content
</template>

<script>
import ProjectItem from '../components/Project/ProjectItem'
import FullLayout from '../layouts/FullLayout'
import CreateProject from '../components/Project/CreateProject'
import RecentProjects from '@/components/Project/RecentProjects'
import { mapGetters } from 'vuex'

// Edit will emit that it has submitted (only once form is valid and response from server);
// From here, we can then hide the edit form and highlight the project?
export default {
  components: { ProjectItem, FullLayout, CreateProject, RecentProjects },
  data: () => ({
    showCreate: false
  }),
  computed: {
    ...mapGetters(['MY_PROJECTS', 'PUBLIC_PROJECTS', 'IS_LOGGED_IN']),
    createClass () {
      return { 'is-success': !this.showCreate, 'is-danger': this.showCreate }
    }
  },
  mounted () {
    this.populateProjects()
  },
  methods: {
    populateProjects () {
      this.$store.dispatch('FETCH_ALL_PROJECTS')
    }
  }
}
</script>

<style lang="sass" scoped>
  
.project-list
  .filter, .main, .detail
    padding: 1.5em 1em
  
</style>
