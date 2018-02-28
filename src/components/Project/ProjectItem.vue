<template>
    <div class="box">
        <article>
            <div class="media">
                <div class="media-left">
                    <p class="image is-32x32">
                        <img src="http://bulma.io/images/placeholders/128x128.png">
                    </p>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            {{ project.title }}
                        </p>
                    </div>
                </div>
                <div class="media-right">
                    <a v-if="!isMember" @click="joinProject(project.slug)">Join +</a>
                    <router-link
                            v-if="isMember && isAdmin"
                            :to="{name: 'login', params: { playlistSlug: this.project.slug }}">
                        Edit button
                    </router-link>
                </div>
            </div>
            <div class="media">
                <div class="media-left">
                    <p class="image is-32x32">
                        <img src="http://bulma.io/images/placeholders/128x128.png">
                    </p>
                </div>
                <div class="media-content">
                    <p>
                        {{ project.description }} ||
                        {{ creatorNameInitals }} ||
                        {{ memberInitals }}
                    </p>
                </div>
                <div class="media-right">
                    <router-link class="button is-primary" :to="{name: 'Sessions', params: { projectSlug: project.slug }}">
                        {{ project.sessions.length }} sessions
                    </router-link>
                    <router-link class="button is-primary" :to="{name: 'ProjectPlaylist', params: { projectID: project.id }}">
                        N playlists
                    </router-link>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
  export default {
    props: {
      project: {},
      isMember: {
        type: Boolean
      }
    },
    methods: {
      joinProject (projectSlug) {
        if (this.$store.getters.IS_LOGGED_IN) this.$store.dispatch('JOIN_PROJECT', projectSlug)
        else console.log("You must be logged in to join a project")
      }
    },
    computed: {
      isAdmin() {
        // The current user is already a member of the project, which is not
        // true if the project was added locally (i.e. when 'JOIN' clicked)
        let member = this.project.members.filter(m => parseInt(m.id) === 26)
        if (!this.isMember || member.length <= 0) return false
        return member[0].role === "admin";
      },
      // TODO: this should be encapsulated in a ParticipantCircle component
      creatorNameInitals () {
        return this.project.creatorName.split(' ').map(w => w[0].toUpperCase()).join('')
      },
      memberInitals () {
        return this.project.members.map(p => p.name.split(' ').map(w => w[0].toUpperCase()).join('')).join(", ")
      }
    }
  }
</script>

<style scoped>
    .box {
        border-left: 20px solid #FD7C81;
    }
</style>