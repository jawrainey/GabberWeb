<template lang="pug">
    .project-tile
        article
            .media
                p.help.is-danger(v-if="isEditMode") {{ errorMessage }}
                .media-content
                    h4.title.is-4 {{ project.title }}
                    .content
                        input(v-model="project.title" @change="storeTitleChanged" v-bind:disabled="!isEditMode" class="input" type="text")
                .media-right
                    a(v-if="!isMember" @click="joinProject(project.slug)") Join
                    router-link(v-if="isMember && isAdmin" v-bind:to="{name: 'login', params: { playlistSlug: this.project.slug }}")
                        | Edit button
                    a(v-if="!isEditMode" @click="isEditMode = !isEditMode") Edit
                    a(v-else @click="isEditMode = !isEditMode") Close

            .media
                .media-content
                    input(v-model="project.description" @change="storeDescriptionChanged" v-bind:disabled="!isEditMode" class="input" type="text")
                .media-right(v-if="!isEditMode")
                    //- <!-- TODO: the router links are not being updated once the object is edited -->
                    router-link.button.is-success.is-rounded(v-bind:to="{name: 'ProjectPlaylist', params: { projectID: project.id }}")
                        | Playlists
                    router-link.button.is-success.is-rounded(v-bind:to="{name: 'Sessions', params: { projectSlug: project.slug }}")
                        | Gabbers

            div(v-if="isEditMode")
                h5.subtitle.is-5 Add Topics
                input.input(v-bind:value="addTopicValue" placeholder="Add a new topic and press enter to create" @keyup.enter="addTopicField")
                div(v-for="topic in project.topics")
                    input.input(type="text" v-model="topic.text" @change="topicEdited" v-bind:id="topic.id")
                    button(@click="removeTopic(topic.id)") Remove
            a.button.is-primary.is-right(v-if="isEditMode" v-on:click.stop="onSubmit") Update
</template>

<script>
  export default {
    props: {
      project: {},
      isMember: {
        type: Boolean
      }
    },
    data: () => ({
      isEditMode: false,
      errorMessage: '',
      // Used to reset the add topic field when AddTopicField called
      // TODO: should refactor topics to a component given it's the same in CreateProject
      addTopicValue: '',
      titleChanged: '',
      descriptionChanged: '',
      privacyChanged: '',
      topicsCreated: [],
      topicsEdited: [],
      topicsRemoved: []
    }),
    methods: {
      joinProject (projectSlug) {
        if (this.$store.getters.IS_LOGGED_IN) this.$store.dispatch('JOIN_PROJECT', projectSlug)
        else console.log("You must be logged in to join a project")
      },
      storeTitleChanged (event) {
        this.titleChanged = event.target.value
      },
      storeDescriptionChanged (event) {
        this.descriptionChanged = event.target.value
      },
      addTopicField (event) {
        this.addTopicValue = ''
        // Creating an ID is necessary to determine if a topic that has been added is unknown,
        // e.g. to differentiate between local when editing and removing items
        let topic = {
          'id': Math.floor((Math.random() * 10000000000000000000) + 1),
          'text': event.target.value
        }
        this.project.topics.push(topic)
        this.topicsCreated.push(topic)
      },
      topicEdited (event) {
        let topicID = parseInt(event.target.id)
        // The user edited a topic they just created, which we do not want to add to edit array
        // as edits are only for pre-existing topics known to the server
        // Only topics known to the server should be sent to edit/delete
        if (this.topicsCreated.map(t => parseInt(t.id)).includes(topicID)) return
        let topic = this.project.topics.filter(topic => parseInt(topic.id) === topicID)[0]
        this.topicsEdited.push(topic)
      },
      removeTopic (event) {
        let topicID = parseInt(event)
        // Only topics known to the server should be sent to edit/delete
        if (this.topicsCreated.map(t => parseInt(t.id)).includes(topicID)) {
          this.topicsCreated = this.topicsCreated.filter(t => t.id !== topicID)
        }
        else {
          this.topicsRemoved.push(topicID)
        }
        this.project.topics = this.project.topics.filter(t => t.id !== topicID)
      },
      onSubmit () {
        // TODO: validate form fields: a project must have a title, privacy, description, and topic.
        // TODO: the UI where the changes made are highlighted a different color
        let projectToPush = {
          projectID: this.project.id,
          title: this.titleChanged,
          description: this.descriptionChanged,
          privacy: '',
          topicsCreated: JSON.stringify(this.topicsCreated),
          topicsEdited: JSON.stringify(this.topicsEdited),
          topicsRemoved: JSON.stringify(this.topicsRemoved)
        }
        this.$store.dispatch('UPDATE_PROJECT', projectToPush)
          .then(() => this.isEditMode = false)
          .catch((e) => this.errorMessage = e)
      }
    },
    computed: {
      isAdmin() {
        // The current user is already a member of the project, which is not
        // true if the project was added locally (i.e. when 'JOIN' clicked)
        let member = this.project.members.filter(m => parseInt(m.id) === 26)
        if (!this.isMember || member.length <= 0) return false
        return member[0].role === "admin";
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~stylus/shared"

.project-tile
    radius($radius-large)
    background-color $grey-darker
    border-left $primary 10px solid
    margin-bottom 20px
    padding 20px

.media-right
    .button:not(:last-child)
        margin-right 10px
</style>