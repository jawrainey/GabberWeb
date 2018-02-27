<template>
    <section class="main-content columns is-fullheight">
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p v-if="SESSION_PROJECT" class="menu-label">{{ SESSION_PROJECT.title }}</p>
            <ul class="menu-list" v-if="SESSION_PROJECT">
                <li>
                    <a @click="isOverviewShown = !isOverviewShown">
                        Overview
                        <button v-bind:class="[isOverviewShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isOverviewShown">
                        <p>{{ SESSION_PROJECT.description }}</p>
                        <p>Number of sessions ({{ PROJECT_SESSIONS.length }}) | Number of annotations ({{ totalAnnotations }})</p>
                    </div>
                </li>
                <li>
                    <a @click="isMembersShown = !isMembersShown">
                        Members ({{ SESSION_PROJECT.members.length }})
                        <button v-bind:class="[isMembersShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isMembersShown" v-for="member in SESSION_PROJECT.members">
                        {{ member }} <span v-if="SESSION_PROJECT.creatorName === member"> | Creator</span>
                    </div>
                </li>
                <li>
                    <a @click="isTopicsShown = !isTopicsShown">
                        Topics ({{ SESSION_PROJECT.topics.length }})
                        <button v-bind:class="[isTopicsShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isTopicsShown" v-for="topic in SESSION_PROJECT.topics">
                        {{ topic }}
                    </div>
                </li>
            </ul>
            <a href="#" class="button is-fullwidth">Annotation playlist</a>
        </aside>

        <div class="container column is-10">
            <div class="section">
                <table class="table is-hoverable is-fullwidth" style="table-layout: fixed;">
                    <thead>
                        <tr>
                            <th>Topics</th>
                            <th>
                                <p>Creator</p>
                                <input v-model="creator" placeholder="Search...">
                            </th>
                            <th>Participants</th>
                            <th>
                                <p>Date</p>
                                <input v-model="date" placeholder="Search...">
                            </th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <session-row v-for="session in filteredSessions" :key="session.id" :projectSession="session"></session-row>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
  import SessionRow from '../components/Sessions/SessionRow.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {SessionRow},
    mounted () {
      this.fetchProject()
      this.fetchSessions()
    },
    watch: {
      '$route': ['fetchSessions', 'fetchProject']
    },
    data: () => ({
      // TODO: this should be refactored to a component
      isOverviewShown: false,
      isMembersShown: false,
      isTopicsShown: false,
      // filters
      creator: "",
      date: ""
    }),
    computed: {
      ...mapGetters(['PROJECT_SESSIONS', 'SESSION_PROJECT']),
      totalAnnotations() {
        return this.PROJECT_SESSIONS.map(i => i.meta.numAnnotations).reduce((t,a) => t + a)
      },
      filteredSessions: {
        get () {
          let sessions = this.PROJECT_SESSIONS
          if (this.creator.length >= 1)
            sessions = sessions.filter(s =>
              s.creator.toLocaleLowerCase() === this.creator.toLocaleLowerCase() ||
              s.creator.toLocaleLowerCase().includes(this.creator.toLocaleLowerCase())
            )
          if (this.date.length >= 1)
            sessions = sessions.filter(s =>
              s.date.toLocaleLowerCase() === this.date.toLocaleLowerCase() ||
              s.date.toLocaleLowerCase().includes(this.date.toLocaleLowerCase())
            )
          return sessions
        }
      }
    },
    methods: {
      fetchProject() {
        this.$store.dispatch('FETCH_PROJECT', this.$route.params.projectSlug)
      },
      fetchSessions () {
        this.$store.dispatch('FETCH_PROJECT_SESSIONS', this.$route.params.projectSlug)
      }
    }
  }
</script>