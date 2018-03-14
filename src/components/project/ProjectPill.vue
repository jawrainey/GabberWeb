<template lang="pug">
.project-item.box.is-pill.is-primary
  project-header(
    :in-progress="apiInProgress",
    :is-editing="isEditingInfo || isEditingMembers",
    :project="project",
    @startEdit="startEdit",
    @stopEdit="cancelEdit",
    @editMembers="isEditingMembers = true",
    @join="joinProject",
    @leave="leaveProject"
  )
  transition(name="fade-short", mode="out-in")
    .editing-info(v-if="isEditingInfo")
      message.is-danger(v-model="apiErrors", clearable)
      project-edit(
        :project="changes",
        :disabled="apiInProgress",
        :deletable="true",
        action="Update",
        @submit="saveEdit",
        @cancel="cancelEdit",
        @delete="deleteProject"
      )
    project-members(
      v-else-if="isEditingMembers",
      :project="project",
      :disabled="apiInProgress"
    )
    project-info(v-else, :project="project")
</template>

<script>
import { SAVE_PROJECT, DELETE_PROJECT, ADD_MEMBER_TO_PROJECT, REMOVE_MEMBER_FROM_PROJECT } from '@/const/mutations'
import ProjectPropMixin from '@/mixins/ProjectProp'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import Message from '@/components/utils/Message'
import ProjectHeader from './ProjectHeader'
import ProjectEdit from './ProjectEdit'
import ProjectMembers from './ProjectMembers'
import ProjectInfo from './ProjectInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [ ProjectPropMixin, ApiWorkerMixin ],
  components: { Message, ProjectHeader, ProjectEdit, ProjectMembers, ProjectInfo },
  data: () => ({
    isEditingInfo: false,
    isEditingMembers: false,
    changes: {}
  }),
  computed: {
    ...mapGetters(['currentUser']),
    canDelete () { return this.isOwner && !this.apiInProgress }
  },
  methods: {
    startEdit () {
      this.isEditingInfo = true
      this.changes = JSON.parse(JSON.stringify(this.project))
    },
    cancelEdit () {
      this.isEditingMembers = false
      this.isEditingInfo = false
      this.changes = {}
    },
    async saveEdit () {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta, data } = await this.$api.editProject(
        this.project.id,
        this.changes.title,
        this.changes.description,
        this.changes.topics,
        this.changes.privacy
      )
      
      console.log(meta)
      console.log(data)
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.isEditingInfo = false
      }
      
      this.endApiWork(meta, 'Could not save project, try again?')
    },
    async deleteProject () {
      let message = 'Are you sure you want to delete this project? This action cannot be undone'
      if (this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta } = await this.$api.deleteProject(this.project.id)
      
      if (meta.success) {
        this.$store.commit(DELETE_PROJECT, this.project.id)
      }
      
      this.endApiWork(meta, 'Failed to delete project, please try again')
    },
    async joinProject () {
      let message = 'Are you sure you want to join this project?'
      if (this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta, data } = await this.$api.joinProject(this.project.id)
      
      if (meta.success) {
        this.$store.commit(ADD_MEMBER_TO_PROJECT, {
          projectId: this.project.id,
          member: data
        })
      }
      
      this.endApiWork(meta, 'Failed to join project, please try again')
    },
    async leaveProject () {
      let member = this.currentMembership
      
      let message = 'Are you sure you want to leave this project?'
      if (!member || this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta } = await this.$api.leaveProject(
        this.project.id, member.id
      )
      
      if (meta.success) {
        this.$store.commit(REMOVE_MEMBER_FROM_PROJECT, {
          projectId: this.project.id,
          memberId: member.id
        })
      }
      
      this.endApiWork(meta, 'Failed to leave project, please try again')
    }
  }
}
</script>

<style lang="sass">

.project-item
  &:not(:last-child)
    margin-bottom: 1.3em

</style>
