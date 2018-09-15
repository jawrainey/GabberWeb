<template lang="pug">
full-layout.project-list-view
  section.filter(slot="left")
    h2.subtitle {{$t('view.project.project_list.filter_title')}}
    sort-field(v-model="sortMode")
    .field
      label.label {{$t('view.project.project_list.filter_field.label')}}
      input.input.is-small(
        type="text",
        v-model="query",
        :placeholder="$t('view.project.project_list.filter_field.placeholder')"
      )

  template(slot="mobileLeft")
    span.icon: fa(icon="filter")
    span {{$t('view.project.project_list.mobile_filter_title')}}

  .main(slot="main")
    .columns.is-mobile
      .column
        h1.title.is-1 {{$t('view.project.project_list.title')}}
      .column.is-narrow(v-if="currentUser")
        add-cancel-button.is-medium(@click="toggleCreate", :toggled="!!newProject")

    .box.new-project(v-if="newProject")
      h3.subtitle.is-4 {{$t('view.project.project_list.create_title')}}
      message.is-danger(v-model="apiErrors", clearable)
      project-edit(
        :project="newProject",
        :action="$t('view.project.project_list.create_action')",
        :disabled="apiInProgress",
        @submit="createProject",
        @cancel="toggleCreate"
      )
    message.is-danger(v-else, v-model="apiErrors")

    section.project-group(v-if="filteredPersonalProjects.length > 0")
      h4.is-size-4.has-text-grey-light {{$t('view.project.project_list.private_title')}}
      project-pill(
        v-for="project in filteredPersonalProjects",
        :key="project.id",
        :project="project"
      )

    section.project-group(v-if="filteredPublicProjects.length > 0")
      h4.is-size-4.has-text-grey-light {{$t('view.project.project_list.public_title')}}
      project-pill(
        v-for="project in filteredPublicProjects",
        :key="project.id",
        :project="project"
      )

    action-box(v-if="noProjects && !newProject && !apiInProgress", title="No themes")
      p.is-size-5(slot="content")
        span(v-if="currentUser") {{$t('view.project.project_list.unauthed_empty_body')}}
        span(v-else) {{$t('view.project.project_list.authed_empty_body')}}
      a.button.is-success.is-medium.is-marginless(
        v-if="!currentUser",
        slot="action",
        @click="pushRegister"
      ) {{$t('view.auth.register.nav_title')}}
</template>

<script>
import { SET_PROJECTS, SAVE_PROJECT } from '@/const/mutations'
import { AuthEvents } from '@/events'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import AuthRedirMixin from '@/mixins/AuthRedir'
import FiltersMixin from '@/mixins/Filters'
import FullLayout from '@/layouts/FullLayout'
import Message from '@/components/utils/Message'
import AddCancelButton from '@/components/utils/AddCancelButton'
import SortField from '@/components/utils/SortField'
import ActionBox from '@/components/utils/ActionBox'
import ProjectPill from '@/components/project/ProjectPill'
import ProjectEdit from '@/components/project/ProjectEdit'
import { mapGetters } from 'vuex'

export default {
  mixins: [ ApiWorkerMixin, AuthRedirMixin, FiltersMixin ],
  components: {
    FullLayout, Message, AddCancelButton, SortField, ActionBox, ProjectEdit, ProjectPill
  },
  data: () => ({
    query: '',
    sortMode: 'newest',
    newProject: null
  }),
  computed: {
    ...mapGetters(['currentUser', 'personalProjects', 'publicProjects']),
    filteredPersonalProjects () {
      return this.filterProjects(this.personalProjects, this.query)
    },
    filteredPublicProjects () {
      return this.filterProjects(this.publicProjects, this.query)
    },
    noProjects () {
      return this.filteredPersonalProjects.length === 0 &&
        this.filteredPublicProjects.length === 0
    }
  },
  mounted () {
    this.fetchProjects()
    AuthEvents.$on('logout', this.fetchProjects)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchProjects)
  },
  methods: {
    filterProjects (projects, query) {
      return projects.filter(project => {
        return this.queryFilter(this.query, [
          project.creator.fullname,
          ...project.members.map(m => m.fullname)
        ])
      }).sort(this.modelSorter(this.sortMode))
    },
    toggleCreate () {
      if (this.newProject) {
        this.newProject = null
      } else {
        this.newProject = {
          image: '/static/img/logo.png',
          content: {
            // By default we will create English
            'en': {
              title: '',
              description: '',
              topics: []
            }
          },
          privacy: 'public',
          creator: this.currentUser,
          organisation: {id: 0, description: null, name: null}
        }
      }
    },
    async fetchProjects () {
      this.startApiWork()

      let { meta, data } = await this.$api.listProjects()

      if (meta.success) {
        this.$store.commit(SET_PROJECTS, data)
      }

      this.endApiWork(meta, this.$t('view.project.project_list.fetch_failed_body'))
    },
    async createProject () {
      if (this.apiInProgress) return
      this.startApiWork()

      let { meta, data } = await this.$api.createProject(
        this.newProject.image, this.newProject.content, this.newProject.privacy, this.newProject.organisation
      )

      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, data)
        this.newProject = null
      }

      this.endApiWork(meta, this.$t('view.project.project_list.create_failed_body'))
    }
  }
}
</script>

<style lang="sass" scoped>

.project-list-view
  .main
    max-width: $desktop

  .new-project
    border-left: 15px solid $green

  .project-group:not(:last-child)
    margin-bottom: 3em

</style>
