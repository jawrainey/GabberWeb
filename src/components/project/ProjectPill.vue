<template lang="pug">
.project-item.box.is-pill.is-primary
  project-header(
    :in-progress="apiInProgress",
    :is-editing="isEditing",
    :project="project",
    @startEdit="startEdit",
    @join="joinProject"
  )
  project-info(v-if="!isEditing", :project="project")
  template(v-else)
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
</template>

<script>
import { SAVE_PROJECT, DELETE_PROJECT } from '@/const/mutations'
import ProjectPropMixin from '@/mixins/ProjectProp'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import Message from '@/components/utils/Message'
import ProjectHeader from './ProjectHeader'
import ProjectEdit from './ProjectEdit'
import ProjectInfo from './ProjectInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [ ProjectPropMixin, ApiWorkerMixin ],
  components: { Message, ProjectHeader, ProjectEdit, ProjectInfo },
  data: () => ({
    isEditing: false,
    changes: {}
  }),
  computed: {
    ...mapGetters(['currentUser']),
    canDelete () { return this.isOwner && !this.apiInProgress }
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
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta, data } = await this.$api.editProject(
        this.project.id,
        this.changes.title,
        this.changes.description,
        this.changes.tags,
        this.changes.privacy
      )
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.isEditing = false
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
        this.$store.commit(SAVE_PROJECT, data)
      }
      
      this.endApiWork(meta, 'Failed to join project, please try again')
    }
  }
}
</script>

<style lang="sass">

.project-item
  &:not(:last-child)
    margin-bottom: 1.3em

</style>
