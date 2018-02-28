<template>
    <base-layout>
        <div slot="sidebar">
            <p>Sidebar content</p>
        </div>
        <div slot="main">
            <article>
                <h1 class="title is-1">Projects</h1>
                <div class="has-text-centered">
                    <button class="button is-large is-success">+</button>
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
  import { mapGetters } from 'vuex'

  export default {
    components: {ProjectItem, BaseLayout, EditProject},
    mounted () {
      this.populateProjects()
    },
    methods: {
      populateProjects() {
        if (this.$store.getters.IS_LOGGED_IN) {
          this.$store.dispatch('FETCH_ALL_PROJECTS')
        }
        else {
          this.$store.dispatch('FETCH_ALL_PUBLIC_PROJECTS')
        }
      }
    },
    computed: {
      ...mapGetters(['MY_PROJECTS', 'PUBLIC_PROJECTS'])
    }
  }
</script>