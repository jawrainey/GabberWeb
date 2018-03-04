<template>
    <div class="box">
        <article>
            <div class="media">
                <p class="help is-danger" v-if="isEditMode">{{ errorMessage }}</p>
                <div class="media-content">
                    <div class="content">
                        <input v-model=project.title
                               @change="storeTitleChanged"
                               :disabled="!isEditMode"
                               class="input"
                               type="text">
                    </div>
                </div>
                <div class="media-right">
                    <a v-if="!isMember" @click="joinProject(project.id)">Join +</a>
                    <router-link
                            v-if="isMember && isAdmin"
                            :to="{name: 'login', params: { playlistSlug: project.id }}">
                        Edit button
                    </router-link>
                    <a v-if="!isEditMode" @click="isEditMode = !isEditMode">Edit</a>
                    <a v-else @click="isEditMode = !isEditMode">Close</a>
                </div>
            </div>
            <div class="media">
                <div class="media-content">
                    <input v-model=project.description
                           @change="storeDescriptionChanged"
                           :disabled="!isEditMode"
                           class="input"
                           type="text">
                </div>
                <div class="media-right" v-if="!isEditMode">
                    <!-- TODO: the router links are not being updated once the object is edited -->
                    <router-link class="button is-primary" :to="{name: 'Sessions', params: { projectID: project.id }}">
                        Gabbers
                    </router-link>
                    <router-link class="button is-primary" :to="{name: 'ProjectPlaylist', params: { projectID: project.id }}">
                        Playlists
                    </router-link>
                </div>
            </div>
            <div v-if="isEditMode">
                {{ typeof(project.isPublic) }}
                <select v-model="project.privacy">
                    <option value="public" :selected="project.isPublic ? 'selected' : ''">
                        Public
                        Anyone can search for and view
                    </option>
                    <option value="private" :selected="project.isPublic ? 'selected' : ''">
                        Private
                        Only project members can search and view
                    </option>
                </select>
                <h3>Add Topics</h3>
                <input class="input" :value=addTopicValue placeholder="Add a new topic and press enter to create" @keyup.enter="addTopicField"><br><br>
                <div v-for="topic in project.topics">
                    <input class="input" type="text" v-model=topic.text @change="topicEdited" :id=topic.id>
                    <button @click="removeTopic(topic.id)">Remove</button>
                </div>
            </div>
            <a v-if="isEditMode" v-on:click.stop="onSubmit" class="button is-primary is-right">Update</a>
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
      joinProject (projectID) {
        if (this.$store.getters.IS_LOGGED_IN) this.$store.dispatch('JOIN_PROJECT', projectID)
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
        // As both are (localProject and storeProject) are added, we must remove em'
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
        // TODO: should get current users id ... how?!
        let member = this.project.members.filter(m => parseInt(m.id) === 26)
        if (!this.isMember || member.length <= 0) return false
        return member[0].role === "admin";
      },
      isPublic() {
        console.log(this.project)
        return this.project.privacy === 'public'
      }
    }
  }
</script>

<style scoped>
    .box {
        border-left: 20px solid #FD7C81;
    }
</style>