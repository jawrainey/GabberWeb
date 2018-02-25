<template>
    <section class="main-content columns is-fullheight">
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p class="menu-label is-hidden-touch">Project name</p>
            <ul class="menu-list">
                <li>
                    <a href="#" @click="isOverviewShown = !isOverviewShown">
                        Overview
                        <button v-bind:class="[isOverviewShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isOverviewShown">
                        <p>Project description</p>
                        <p>Number of sessions ({{ sessions.length }}) | Number of annotations ({{ totalAnnotations }})</p>
                    </div>
                </li>
                <li>
                    <a href="#" @click="isMembersShown = !isMembersShown">
                        Members (3)
                        <button v-bind:class="[isMembersShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isMembersShown">
                        <p>Jay Rainey | (Creator)</p>
                        <p>Elena Rainer</p>
                        <p>Paul Rainer</p>
                    </div>
                </li>
                <li>
                    <a href="#" @click="isTopicsShown = !isTopicsShown">
                        Topics (4)
                        <button v-bind:class="[isTopicsShown ? 'arrow-down' : 'arrow-right']"></button>
                    </a>
                    <div v-if="isTopicsShown">
                        <p>Brexit and EU citizens</p>
                        <p>Impact of Brexit in ten years ...</p>
                        <p>Impact of Brexit in ten years ...</p>
                        <p>Impact of Brexit in ten years ...</p>
                    </div>
                </li>
            </ul>
            <a href="#" class="button is-fullwidth">Annotation playlist</a>
        </aside>

        <div class="container column is-10">
            <div class="section">
                <span v-if="PROJECT_SESSIONS.length <= 0">Loading sessions</span>
                <table class="table is-hoverable is-fullwidth" style="table-layout: fixed;">
                    <thead>
                        <tr>
                            <th>Topics</th>
                            <th>Creator</th>
                            <th>Participants</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <session-row v-for="session in PROJECT_SESSIONS" :key="session.id" :projectSession="session"></session-row>
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
      this.fetchSessions()
    },
    watch: {
      '$route': 'fetchSessions'
    },
    data: () => ({
      // TODO: this should be refactored to a component
      isOverviewShown: false,
      isMembersShown: false,
      isTopicsShown: false
    }),
    computed: {
      ...mapGetters(['PROJECT_SESSIONS']),
      totalAnnotations() {
        return this.PROJECT_SESSIONS.map(i => i.meta.numAnnotations).reduce((t,a) => t + a)
      }
    },
    methods: {
      fetchSessions () {
        this.$store.dispatch('FETCH_PROJECT_SESSIONS', this.$route.params.projectName)
      }
    }
  }
</script>