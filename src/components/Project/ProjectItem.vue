<template>
    <div class="box">
        {{ project.id }}
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
                    <!--Could do: vuex for user, and check if admin of project? When logged in, get all projects?-->
                    <!--<span v-if="isAdmin">Edit button </span>-->
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
        this.$store.dispatch('JOIN_PROJECT', projectSlug);
      }
    },
    computed: {
      // TODO: this should be encapsulated in a ParticipantCircle component
      creatorNameInitals () {
        return this.project.creatorName.split(' ').map(w => w[0].toUpperCase()).join('')
      },
      memberInitals () {
        return this.project.members.map(p => p.split(' ').map(w => w[0].toUpperCase()).join('')).join(", ")
      }
    }
  }
</script>

<style scoped>
    .box {
        border-left: 20px solid #FD7C81;
    }
</style>