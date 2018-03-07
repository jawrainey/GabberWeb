<template lang="pug">
.project-item
  project-header(
    :in-progress="inProgress",
    :is-editing="isEditing",
    :project="project",
    @startEdit="startEdit",
    @join="joinProject"
  )
  template(v-if="!isEditing")
    .columns.project-info
      .column
        p {{ project.description }}
      .column.is-narrow
        .buttons.is-right
          router-link.button.is-link.is-rounded.is-medium(:to="sessionsRoute")
            .icon: fa(icon="microphone")
            span Gabbers
          router-link.button.is-link.is-rounded.is-medium(:to="playlistsRoute")
            .icon: fa(icon="headphones")
            span Playlists
  template(v-else)
    message.is-danger(v-model="errors", clearable)
    project-edit(
      :project="changes",
      :disabled="inProgress",
      :deletable="true",
      action="Update",
      @submit="saveEdit",
      @cancel="cancelEdit",
      @delete="deleteProject"
    )
</template>

<script>
import { SESSION_LIST_ROUTE, PLAYLIST_LIST_ROUTE } from '@/const/routes'
import { SAVE_PROJECT, DELETE_PROJECT } from '@/const/mutations'
import ProjectPropMixin from '@/mixins/ProjectProp'
import Message from '@/components/utils/Message'
import ProjectHeader from './ProjectHeader'
import ProjectEdit from './ProjectEdit'
import { mapGetters } from 'vuex'

export default {
  mixins: [ ProjectPropMixin ],
  components: { Message, ProjectHeader, ProjectEdit },
  data: () => ({
    isEditing: false,
    changes: {},
    errors: [],
    inProgress: false
  }),
  computed: {
    ...mapGetters(['currentUser']),
    canDelete () { return this.isOwner && !this.inProgress },
    sessionsRoute () {
      const params = { project_id: this.project.id }
      return { name: SESSION_LIST_ROUTE, params }
    },
    playlistsRoute () {
      const params = { project_id: this.project.id }
      return { name: PLAYLIST_LIST_ROUTE, params }
    }
  },
  methods: {
    startEdit () {
      this.isEditing = true
      this.changes = JSON.parse(JSON.stringify(this.project))
    },
    cancelEdit () {
      this.isEditing = false
      this.changes = {}
    },
    async saveEdit () {
      this.inProgress = true
      this.errors = []
      
      let { meta, data } = await this.$api.editProject(
        this.project.id,
        this.changes.title,
        this.changes.description,
        this.changes.tags,
        this.changes.privacy
      )
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.isEditing = false
      } else if (meta.messages.length === 0) {
        this.errors.push('Could not save project, try again?')
      }
      
      this.inProgress = false
    },
    async deleteProject () {
      let message = 'Are you sure you want to delete this project? This action cannot be undone'
      if (this.inProgress || !confirm(message)) return
      this.inProgress = true
      this.errors = []
      
      let { meta } = await this.$api.deleteProject(this.project.id)
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(DELETE_PROJECT, this.project.id)
      } else if (this.errors.length === 0) {
        this.errors.push('Failed to delete project, please try again')
      }
      
      this.inProgress = false
    },
    async joinProject () {
      let message = 'Are you sure you want to join this project?'
      if (this.inProgress || !confirm(message)) return
      this.inProgress = true
      this.errors = []
      
      let { meta, data } = await this.$api.joinProject(this.project.id)
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
      }
      
      this.inProgress = false
    }
  }
}
</script>

<style lang="sass">

.project-item
  +border-radius($radius-large)
  background-color: $grey-darker
  border-left: $primary 15px solid
  padding: 1.3em
  
  &:not(:last-child)
    margin-bottom: 1.3em
  
  .project-info
    border-top: 1px solid $border
    padding-top: 0.6em

</style>
