<template lang="pug">
.project-item.box.is-pill.is-primary
  project-header(
    :in-progress="apiInProgress",
    :is-editing="isEditingInfo || isEditingMembers",
    :project="project",
    :readonly="readonly",
    @startEdit="startEdit",
    @stopEdit="cancelEdit",
    @editMembers="isEditingMembers = true",
    @join="joinProject",
    @leave="leaveProject"
  )
  .editing-info(v-if="isEditingInfo")
    message.is-danger(v-model="apiErrors", clearable)
    project-edit(
      :project="changes",
      :disabled="apiInProgress",
      :deletable="true",
      :action="this.$t('comp.project.project_pill.update_action')",
      @submit="saveEdit",
      @cancel="cancelEdit",
      @delete="deleteProject"
    )
  project-members(
    v-else-if="isEditingMembers",
    :project="project",
    :disabled="apiInProgress"
  )
  project-info(v-else, :project="project", :readonly="readonly")
  .columns
    .column.border-top
      h4.title.is-7 {{ $t('comp.project.project_pill.link_future') }}&nbsp;
        a(:href="url", target="_blank").has-text-weight-normal {{ projectContent.title }}
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

export const URLS = {
  5: {
    'ar': 'https://future-rcrc.com/2018/08/21/future-of-work/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/future-of-work/',
    'es': 'https://future-rcrc.com/2018/05/31/labor-futura/',
    'fr': 'https://future-rcrc.com/2018/07/24/lavenir-du-travail/'
  },
  6: {
    'ar': 'https://future-rcrc.com/2018/08/21/health-of-the-future/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/health-of-the-future/',
    'es': 'https://future-rcrc.com/2018/05/31/salud-en-el-futuro/',
    'fr': 'https://future-rcrc.com/2018/07/24/lavenir-de-la-sante/'
  },
  7: {
    'ar': 'https://future-rcrc.com/2018/08/20/natural-disasters-climate-change-and-depletion-of-resources/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/natural-disasters-climate-change-and-depletion-of-resources/',
    'es': 'https://future-rcrc.com/2018/05/31/desastres-naturales-cambio-climatico-y-agotamiento-de-recursos/?lang=es',
    'fr': 'https://future-rcrc.com/2018/07/24/catastrophes-et-changements-climatiques/?lang=fr'
  },
  8: {
    'ar': 'https://future-rcrc.com/2018/08/21/conflict-and-poverty/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/fragility-conflict-violence-and-development/',
    'es': 'https://future-rcrc.com/2018/05/31/fragilidad-conflicto-violencia-y-desarrollo/?lang=es',
    'fr': 'https://future-rcrc.com/2018/07/24/conflits-et-pauvrete/?lang=fr'
  },
  9: {
    'ar': 'https://future-rcrc.com/2018/08/21/new-communities/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/31/nuevas-comunidades/?lang=es',
    'es': 'https://future-rcrc.com/2018/05/31/poder-y-gobierno/',
    'fr': 'https://future-rcrc.com/2018/07/24/nouvelles-communautes-et-villes/?lang=fr'
  },
  10: {
    'ar': 'https://future-rcrc.com/2018/08/21/new-communities/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/new-communities/',
    'es': 'https://future-rcrc.com/2018/05/31/nuevas-comunidades/?lang=es',
    'fr': 'https://future-rcrc.com/2018/07/24/nouvelles-communautes-et-villes/?lang=fr'
  },
  11: {
    'ar': 'https://future-rcrc.com/2018/08/21/new-technologies/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/adapting-to-and-experimenting-with-new-technologies-and-dynamics/',
    'es': 'https://future-rcrc.com/2018/05/31/adaptacion-y-experimentacion-con-nuevas-tecnologias-y-dinamicas/?lang=es',
    'fr': 'https://future-rcrc.com/2018/07/24/technologies-emergentes/?lang=fr'
  },
  12: {
    'ar': 'https://future-rcrc.com/2018/08/21/future-of-financing/',
    'en': 'http://future-rcrc.com/2018/05/03/financing-growing-humanitarian-and-development-needs/',
    'es': 'http://future-rcrc.com/2018/05/31/financiacion-de-la-atencion-de-crecientes-necesidades-humanitarias-y-de-desarrollo/',
    'fr': 'https://future-rcrc.com/2018/08/21/future-of-financing/'
  },
  13: {
    'ar': 'https://future-rcrc.com/2018/08/21/participation-and-engagement/?lang=ar',
    'en': 'https://future-rcrc.com/2018/05/03/participation-and-engagement/',
    'es': 'https://future-rcrc.com/2018/05/31/participacion-y-colaboracion-en-eso-estamos-todos/?lang=es',
    'fr': 'https://future-rcrc.com/2018/07/24/participation-et-mobilisation/?lang=fr'
  }
}

export default {
  mixins: [ ProjectPropMixin, ApiWorkerMixin ],
  components: { Message, ProjectHeader, ProjectEdit, ProjectMembers, ProjectInfo },
  props: {
    readonly: { type: Boolean, default: false }
  },
  data: () => ({
    isEditingInfo: false,
    isEditingMembers: false,
    changes: {},
    URLS
  }),
  computed: {
    ...mapGetters(['currentUser']),
    url () { return this.URLS[this.project.id][this.$store.getters.currentLocale.code] },
    projectContent () { return this.$store.getters.projectContentByLanguage(this.project) }
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
        this.changes.image,
        this.changes.content,
        this.changes.privacy,
        this.changes.organisation
      )
      
      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.isEditingInfo = false
      }
      
      this.endApiWork(meta, this.$t('comp.project.project_pill.update_failed'))
    },
    async deleteProject () {
      let message = this.$t('comp.project.project_pill.delete_confirm')
      if (this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta } = await this.$api.deleteProject(this.project.id)
      
      if (meta.success) {
        this.$store.commit(DELETE_PROJECT, this.project.id)
      }
      
      this.endApiWork(meta, this.$t('comp.project.project_pill.delete_failed'))
    },
    async joinProject () {
      let message = this.$t('comp.project.project_pill.join_confirm')
      if (this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta, data } = await this.$api.joinProject(this.project.id)
      
      if (meta.success) {
        this.$store.commit(ADD_MEMBER_TO_PROJECT, {
          projectId: this.project.id,
          member: data
        })
      }
      
      this.endApiWork(meta, this.$t('comp.project.project_pill.join_failed'))
    },
    async leaveProject () {
      let member = this.currentMembership
      
      let message = this.$t('comp.project.project_pill.leave_confirm')
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
      
      this.endApiWork(meta, this.$t('comp.project.project_pill.leave_failed'))
    }
  }
}
</script>

<style lang="sass">

.border-top
  border-top: 1px solid #5E6D6F

.project-item
  &:not(:last-child)
    margin-bottom: 1.3em

</style>
