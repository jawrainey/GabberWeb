<template lang="pug">
.project-item
  .level.is-mobile
    .level-left
      .level-item
        fa(:icon="projectIcon", size="2x")
      h4.level-item.title.is-4
        | {{project.title}}
        span(v-if="membershipType")
          | &ndash; {{ membershipType }}
    .level-right
      .level-item(v-if="canEdit")
        button.button.is-dark.is-rounded(@click="startEdit")
          .icon: fa(icon="cog")
          span Edit
      .level-item(v-if="isEditing")
        button.button.is-success.is-rounded(@click="saveEdit", :disabled="!canSaveEdit")
          .icon: fa(icon="check")
          span Save
      .level-item(v-if="isEditing")
        button.button.is-link.is-rounded(@click="cancelEdit", :disabled="inProgress")
          .icon: fa(icon="times")
          span Cancel
      .level-item(v-if="!isProjectMember")
        button.button.is-dark.is-rounded(@click="joinProject", :disabled="inProgress")
          .icon: fa(icon="user-plus")
          span Join
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
    .project-edit-form
      .field
        label.label Name
        input.input(type="text", v-model="changes.title", :disabled="inProgress")
      .field
        label.label Description
        textarea.textarea(v-model="changes.description", :disabled="inProgress")
      .field
        label.label Privacy
        p.control
          span.select
            select(v-model="changes.privacy")
              option(value="private", default) Private
              option(value="public", default) Public
      hr
      .field.is-grouped
        .control
          button.button.is-danger.is-rounded.is-small(@click="deleteProject", :disabled="!canDelete")
            .icon: fa(icon="trash")
            span Delete Project
</template>

<script>
import { SESSION_LIST_ROUTE, PLAYLIST_LIST_ROUTE } from '@/const/routes'
import { UPDATE_PROJECT, DELETE_PROJECT } from '@/const/mutations'
import Message from '@/components/utils/Message'
import { mapGetters } from 'vuex'

export default {
  components: { Message },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isEditing: false,
    changes: {},
    errors: [],
    inProgress: false
  }),
  computed: {
    ...mapGetters(['currentUser']),
    isOwner () {
      return this.project.creator.id === this.currentUser.id
    },
    isProjectMember () {
      return this.isOwner || this.project.members.some(member =>
        member.id === this.currentUser.id
      )
    },
    projectIcon () {
      return this.project.isProjectPublic ? 'users' : 'lock'
    },
    canEdit () { return this.isOwner && !this.isEditing },
    canDelete () { return this.isOwner && !this.inProgress },
    sessionsRoute () {
      const params = { project_id: this.project.id }
      return { name: SESSION_LIST_ROUTE, params }
    },
    playlistsRoute () {
      const params = { project_id: this.project.id }
      return { name: PLAYLIST_LIST_ROUTE, params }
    },
    canSaveEdit () {
      return !this.inProgress &&
        this.changes.title !== '' &&
        this.changes.description !== ''
    },
    membershipType () {
      if (!this.isProjectMember) return null
      if (this.isOwner) return 'Owner'
      let membership = this.project.members.some(m => m.user === this.currentUser)
      return membership.role === 'admin' ? 'Admin' : 'User'
    }
  },
  methods: {
    startEdit () {
      this.isEditing = true
      this.changes = JSON.parse(JSON.stringify(this.project))
    },
    cancelEdit () {
      console.log('Cancel!')
      this.isEditing = false
      this.changes = {}
    },
    async saveEdit () {
      if (!this.canSaveEdit || this.inProgress) return
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
        this.$store.commit(UPDATE_PROJECT, {
          id: this.project.id,
          project: data
        })
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
        this.$store.commit(UPDATE_PROJECT, {
          id: this.project.id,
          project: data
        })
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
