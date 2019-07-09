<template lang="pug">
loading-full-layout(
  v-if="annotations.length === 0 && (apiInProgress || apiErrors.length > 0)",
  :loading-message="$t('view.project.session_list.loading_title')",
  :is-loading="apiInProgress",
  :errors="apiErrors",
  :back-route="projectListRoute"
)
full-layout.session-list-view(v-else-if="annotations && project")
  annotation-filters(
    slot="left",
    :annotations="annotations",
    :annotators.sync="annotatorFilters",
    :topics="projectContent.topics",
    :topicsSelected.sync="topicsSelected",
    :codesSelected.sync="codesSelected"
  )
  template(slot="mobileLeft")
    span.icon: fa(icon="filter")
    span {{$t('view.project.project_list.mobile_filter_title')}}

  template(slot="main")
    .container
      .columns.is-vcentered.is-mobile.border-bottom
        .column.is-half
          h1.title.main-title.is-4
            | Comments ({{ filteredAnnotations.length }})
        .column.is-text-overflow
          .columns.is-vcentered.is-mobile
            .column.is-full
              h1.title.main-title.is-4.is-text-overflow
                span(v-if="activePlaylistExists && isLoggedIn")
                  | {{ activePlaylist.name }}
                span(v-else-if="!activePlaylistExists && isLoggedIn")
                  | {{ $t('comp.playlist.main.titles.logged_in_not_active') }}
                span(v-else)
                  | {{ $t('comp.playlist.main.titles.not_logged_in') }}
      section.content
        .columns.is-mobile
          .container.column.is-half.border-right
            .content.scrollable-panel
              annotation-pill(
                v-for="annotation in filteredAnnotations",
                :key="annotation.id",
                :annotation="annotation",
                :selectedAnnotation="selectedAnnotation",
                @playPause="playPauseAnnotation",
                @chosen="chooseAnnotation")
          .container.column.is-half
            .content.scrollable-panel
              draggable(
                v-model="activePlaylist.annotations",
                @change="playlistOrderChanged")
                transition-group(type="transition", name="flip-list")
                  annotation-pill(
                    v-for="annotation in activePlaylist.annotations",
                    :key="annotation.id",
                    :annotation="annotation",
                    :isPlaylist="true",
                    :selectedAnnotation="selectedAnnotation",
                    @playPause="playPauseAnnotation",
                    @chosen="removeAnnotation")
      audio-player(
        v-if="annotations.length > 0",
        ref="audioPlayer",
        :annotation="selectedAnnotation",
        :id="selectedAnnotation.id",
        @playPause="playPauseAnnotation",
        @next="nextAnnotation",
        @prev="prevAnnotation",
        @ended="ended",
        @dragEnd="selectedAnnotation.isPlaying = true")
        circle-button.rm-bg.action-border(
          v-if="activePlaylistExists",
          slot="action",
          :icon="showAddOrRemove",
          @click="addRemove")
  playlist-sidebar(
    slot="right",
    :activePlaylist="activePlaylist",
    :changeActivePlaylist.sync="activePlaylist")
  template(slot="mobileRight")
    span.icon: fa(icon="info")
    span {{ $t('comp.playlist.sidebar.titles.main') }}
</template>

<script>
import { ADD_ANNOTATIONS, ADD_SESSIONS, SAVE_PROJECT, SAVE_PLAYLIST } from '@/const/mutations'
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import { AuthEvents, PlaylistEvents } from '@/events'

import ApiWorkerMixin from '@/mixins/ApiWorker'
import FiltersMixin from '@/mixins/Filters'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import AddCancelButton from '@/components/utils/AddCancelButton'
import AnnotationPill from '@/components/playlist/AnnotationPill'
import AnnotationFilters from '@/components/playlist/AnnotationFilters'
import AudioPlayer from '@/components/playlist/AudioPlayer'
import CircleButton from '@/components/utils/CircleButton'
import CreatePlaylistModal from '@/components/playlist/CreatePlaylistModal'
import PlaylistSidebar from '@/components/playlist/PlaylistSidebar'
import draggable from 'vuedraggable'

export default {
  mixins: [ ApiWorkerMixin, FiltersMixin ],
  components: {
    AddCancelButton,
    AudioPlayer,
    AnnotationPill,
    AnnotationFilters,
    CircleButton,
    CreatePlaylistModal,
    draggable,
    FullLayout,
    LoadingFullLayout,
    PlaylistSidebar },
  data: () => ({
    activePlaylist: {},
    selectedAnnotation: {},
    annotatorFilters: [],
    topicsSelected: [],
    codesSelected: []
  }),
  computed: {
    projectContent () {
      let project = this.$store.getters.projectContentByLanguage(this.project)
      project.topics = project.topics.filter(p => p.is_active)
      return project
    },
    showAddOrRemove () {
      let anno = this.activePlaylist.annotations.findIndex(a => a.id === this.selectedAnnotation.id) !== -1
      return anno ? 'trash' : 'plus'
    },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    projectId () { return parseInt(this.$route.params.project_id) },
    project () { return this.$store.getters.projectById(parseInt(this.$route.params.project_id)) },
    sessions () { return this.$store.getters.sessionsForProject(this.projectId) },
    annotations () {
      if (!this.project && !this.sessions) return []
      let projectAnnotations = this.$store.getters.annotations.filter(ano => ano.project_id === this.projectId)
      projectAnnotations.map(annotation => this.$set(annotation, 'isPlaying', false))
      return projectAnnotations
    },
    filteredAnnotations () {
      return this.annotations.filter(annotation => {
        let userIds = [annotation.creator.user_id]
        let codeIds = annotation.labels.map(a => a.id)
        let topicIds = this.sessions.find(s => s.id === annotation.session_id)
        topicIds = topicIds ? topicIds.topics.map(t => t.topic_id) : []

        return this.idListOrFilter(this.annotatorFilters, userIds) &&
          this.idListOrFilter(this.topicsSelected, topicIds) &&
          this.idListOrFilter(this.codesSelected, codeIds)
      })
    },
    activePlaylistExists () {
      return Object.entries(this.activePlaylist).length > 0 && this.activePlaylist.constructor === Object
    },
    isLoggedIn () {
      return this.$store.getters.currentUser
    }
  },
  created () {
    this.fetchAnnotations()
    AuthEvents.$on('logout', this.fetchAnnotations)
  },
  destroyed () {
    this.activePlaylist = {}
    AuthEvents.$off('logout', this.fetchAnnotations)
  },
  methods: {
    playlistOrderChanged () {
      this.editPlaylist(this.activePlaylist)
    },
    async ended () {
      this.selectedAnnotation.isPlaying = false
      await new Promise(resolve => setTimeout(resolve, 1250)) // 3 sec
      this.nextAnnotation(this.selectedAnnotation)
    },
    async editPlaylist (playlist) {
      this.startApiWork()

      let { meta, data } = await this.$api.editPlaylist(
        playlist.id, playlist.name, playlist.description,
        playlist.annotations, playlist.annotations.map(a => a.id))

      if (meta.success) {
        this.$store.commit(SAVE_PLAYLIST, data)
        let order = data.order
        data.annotations.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
        this.activePlaylist = data
      }
      this.endApiWork(meta)
    },
    async addRemove () {
      if (this.activePlaylist.annotations.findIndex(a => a.id === this.selectedAnnotation.id) === -1) {
        this.chooseAnnotation(this.selectedAnnotation)
      } else {
        this.removeAnnotation(this.selectedAnnotation)
      }
    },
    async chooseAnnotation (annotation) {
      // Notify sidebar that we want to create a playlist based from this annotation
      if (!this.activePlaylistExists) {
        PlaylistEvents.$emit('AddToUnknownPlaylist', annotation)
        return
      }

      if (this.activePlaylist.annotations.map(a => a.id).includes(annotation.id)) {
        console.log('You cannot add the same annotation more than once')
        return
      }
      this.addAnnotation(annotation)
    },
    async removeAnnotation (annotation) {
      this.activePlaylist.annotations = this.activePlaylist.annotations.filter(f => f.id !== annotation.id)
      this.editPlaylist(this.activePlaylist)
    },
    async addAnnotation (annotation) {
      this.activePlaylist.annotations.push(annotation)
      this.editPlaylist(this.activePlaylist)
    },
    scrollToAnnotation (annotation) {
      // TODO: could be improved by jumping to the region before or improve UI spacing above
      this.$el.getElementsByClassName(`ST-${annotation.id}`)[0].scrollIntoView()
    },
    // TODO: why is this here and not in the AudioPlayer? Given it has next/prev? should
    nextAnnotation (annotation) {
      // TODO: why is isPlaying on selectedAnnotation and not an event from AudioPlayer?
      this.selectedAnnotation.isPlaying = false
      let annotations = this.filteredAnnotations
      if (annotations.length <= 0) return
      let index = annotations.indexOf(annotation)
      // We are at the end of the filtered list OR the region does not exist
      if (index === (annotations.length - 1) || (index === -1)) {
        this.selectedAnnotation = annotations[0]
      } else {
        this.selectedAnnotation = annotations[index + 1]
      }
      this.$refs.audioPlayer.next(this.selectedAnnotation)
      this.selectedAnnotation.isPlaying = true
      this.scrollToAnnotation(this.selectedAnnotation)
    },
    prevAnnotation (annotation) {
      this.selectedAnnotation.isPlaying = false
      let annotations = this.filteredAnnotations
      if (annotations.length <= 0) return
      let index = annotations.indexOf(annotation)
      // We are at the start of the filtered list, so go around again
      if (index === 0) {
        this.selectedAnnotation = annotations[annotations.length - 1]
      } else if (index === -1) {
        // The region does not exist, for example, if a filter was applied.
        this.selectedAnnotation = annotations[0]
      } else {
        this.selectedAnnotation = annotations[index - 1]
      }
      this.$refs.audioPlayer.next(this.selectedAnnotation)
      this.selectedAnnotation.isPlaying = true
      this.scrollToAnnotation(this.selectedAnnotation)
    },
    playPauseAnnotation (annotation) {
      // A different annotation was manually selected
      if (annotation.id !== this.selectedAnnotation.id) {
        this.selectedAnnotation = annotation
        this.$refs.audioPlayer.play(this.selectedAnnotation)
        this.selectedAnnotation.isPlaying = true
      } else {
        this.$refs.audioPlayer.toggle(this.selectedAnnotation)
        this.selectedAnnotation.isPlaying = !this.selectedAnnotation.isPlaying
      }
      this.scrollToAnnotation(this.selectedAnnotation)
    },
    async fetchAnnotations () {
      this.startApiWork()

      let [ projectRes, sessionsRes ] = await Promise.all([
        this.$api.getProject(this.projectId),
        this.$api.getProjectSessions(this.projectId)
      ])

      let meta = this.mergeMetaBlocks(projectRes.meta, sessionsRes.meta)

      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, projectRes.data)
        this.$store.commit(ADD_SESSIONS, sessionsRes.data || [])

        // Now we have the project and session data, we want the annotations for the session
        if (sessionsRes.data.length > 0) {
          // By default, sessions do not come with all annotations for performance reasons
          let sessionsWithAnnotations = sessionsRes.data.map(
            session => this.$api.getSessionAnnotations(session.id, this.projectId))
          let sessionsWithAnnotationsRes = await Promise.all(sessionsWithAnnotations)
          let annotationsMeta = this.mergeMetaBlocks(...sessionsWithAnnotationsRes.map(m => m.meta))
          // All annotations were retrieved
          if (annotationsMeta.success) {
            sessionsWithAnnotationsRes.map(a => this.$store.commit(ADD_ANNOTATIONS, a.data))
          }
        }
      }

      this.selectedAnnotation = this.annotations.length > 0 ? this.annotations[0] : {}
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass" scoped>
  ::-webkit-scrollbar
    -webkit-appearance: none
    width: 6px
  ::-webkit-scrollbar-thumb
    border-radius: 4px
    background-color: #5E6D6F

  .border-bottom
    margin-left: -1em
    margin-right: -1em
    border-bottom: 1px solid #5E6D6F

  .border-right
    border-right: 1px solid #5E6D6F

  .container
    display: flex
    max-height: 100%
    min-height: 100%
    max-width: 100% // e.g. the parents width
    flex-direction: column
  .container .columns
    flex-grow: inherit

  .content
    overflow: hidden // Prevent scroll in columns
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-grow: 1
    margin-bottom: 0 !important

  .content .scrollable-panel
    overflow-y: auto
    flex-grow: 0
    padding: 0 .25em

  .rm-bg, .rm-bg:hover, .rm-bg:active, .rm-bg:focus,
  .action-border:active, .action-border:focus
    box-shadow: none
    border: none
    margin-bottom: 0
    color: #b3b3b3
    background: none
  .rm-bg:hover, .action-border:hover
    color: white
  .action-border, .action-border:active, .action-border:hover, .action-border:focus
    border: 1px solid $primary
  .action-border:hover
    border: 1px solid white
    transition-property: all
    transform: scale(1.06)
  .action-border.is-success, .action-border.is-danger
    color: white
    border: none
  .flip-list-move
    transition: transform 0.5s
  .no-move
    transition: transform 0s
  .ghost
    opacity: 0.5
</style>
