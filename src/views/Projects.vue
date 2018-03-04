<template>
    <base-layout>
        <div slot="sidebar">
            <p>Sidebar content</p>
        </div>
        <div slot="main">
            <article>
                <h1 class="title is-1">Projects</h1>
                <div v-if="IS_LOGGED_IN">
                    <div class="has-text-centered">
                        <button class="button is-large "
                                v-bind:class="{ 'is-success': !showCreate, 'is-danger': showCreate }"
                                @click="showCreate = !showCreate">
                            <span v-if="!showCreate">Create</span>
                            <span v-else>Close</span>
                        </button>
                    </div>
                    <create-project v-if="showCreate" @projectCreated="showCreate=false"></create-project>
                </div>
            </article>
            <article>
                <h2 class="title is-3">My projects</h2>
                <p v-if="MY_PROJECTS && MY_PROJECTS.length <= 0">You are not a <b>member</b> of any projects. Why not join one below?</p>
                <project-item v-for="project in MY_PROJECTS" :key="project.id" :isMember=true :project="project"></project-item>
            </article>
            <article>
                <h2 class="title is-3">Public projects</h2>
                <project-item v-for="project in PUBLIC_PROJECTS" :key="project.id" :project="project"></project-item>
            </article>
        </div>
    </base-layout>
</template>

<script>
  import ProjectItem from '../components/Project/ProjectItem.vue'
  import BaseLayout from '../components/Shared/BaseLayout.vue'
  import CreateProject from '../components/Project/CreateProject.vue'
  import { mapGetters } from 'vuex'

  // Edit will emit that it has submitted (only once form is valid and response from server);
  // From here, we can then hide the edit form and highlight the project?
  export default {
    components: {ProjectItem, BaseLayout, CreateProject},
    data: () => ({
      showCreate: false,
    }),
    mounted () {
      this.populateProjects()
    },
    methods: {
      populateProjects() {
        this.$store.dispatch('FETCH_ALL_PROJECTS')
      }
    },
    computed: {
      ...mapGetters(['MY_PROJECTS', 'PUBLIC_PROJECTS', 'IS_LOGGED_IN'])
    }
  }
</script>