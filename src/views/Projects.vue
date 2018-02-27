<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3">
                <h2 class="title is-4">SidebarTitle</h2>
                Sidebar
            </div>
            <div class="column is-9">
                <article>
                    <h1 class="title is-1">Projects</h1>
                    <div class="has-text-centered">
                        <button class="button is-large is-success is-rounded">Create project</button>
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
        </div>
    </div>
</template>

<script>
  import ProjectItem from '../components/Project/ProjectItem.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {ProjectItem},
    name: 'projects',
    created () {
      // NOTE: why not also update the session variable and other stuff throughout?
      this.$store.dispatch('FETCH_ALL_PROJECTS')
    },
    computed: {
      ...mapGetters(['MY_PROJECTS', 'PUBLIC_PROJECTS'])
    }
  }
</script>

<style scoped>

</style>