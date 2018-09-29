<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0"
  loading-message="Fetching Gabber Conversation",
  :is-loading="apiInProgress",
  :errors="apiErrors",
  :back-route="sessionListRoute"
)
full-layout.session-detail(v-else-if="session")
  annotation-filters(
    slot="left",
    :session="session",
    :annotations="annotations",
    :query.sync="query",
    :topics.sync="topicFilters",
    :members.sync="memberFilters",
    :sortMode.sync="sortMode"
  )
  template(slot="mobileLeft")
    span.icon: fa(icon="filter")
    span Filter
  .main(slot="main")
    breadcrumbs
    h1.title {{ projectContent.title }}
    h2.subtitle {{$t('view.project.session_detail.title', {name: session.creator.fullname})}}
    .box
      audio-player(
        ref="audioPlayer",
        :session="session",
        @progress="onProgress",
        @ready="setAudioDuration"
      )
        transition(name="fade")
          annotation-range(
            v-if="newAnnotation",
            :audio-duration="audioDuration && audioDuration",
            :start="newAnnotation.start_interval",
            :end="newAnnotation.end_interval",
            :disabled="isCreatingAnnotation",
            :editable="true",
            @change="updateRange"
          )
        transition(name="fade")
          annotation-range(
            v-if="audioDuration && focusedAnnotation",
            :audio-duration="audioDuration",
            :start="focusedAnnotation.start_interval",
            :end="focusedAnnotation.end_interval"
          )
      topics-bar(
        v-if="audioDuration",
        :topics="session.topics",
        :audio-duration="audioDuration",
        :active-topic="currentTopic",
        @pickTopic="pickTopic",
        @over="t => highlightTopic = t",
        @leave="highlightTopic = null"
      )
      p.is-size-4.current-topic-name(v-if="currentTopic")
        span.is-size-5.has-text-grey-light
          | {{$t('view.project.session_detail.topic_title')}}
        span  {{ currentTopic.text }}
        span(v-if="highlightTopic && currentTopic.id !== highlightTopic.id")
          span  → {{highlightTopic.text}}

    section
      .level.is-mobile
        .level-left
          .level-item
            h1.title {{$t('view.project.session_detail.annotations_title')}}
        .level-right
          add-cancel-button.is-medium(
            v-if="currentUser && audioDuration",
            @click="toggleNewAnnotation",
            :toggled="!!newAnnotation",
            :disabled="apiInProgress || isCreatingAnnotation"
          )

      .box.is-pill.is-success.new-annotation(v-if="newAnnotation")
        message.is-danger(v-model="newAnnotationErrors", clearable)
        annotation-edit(
          :codebook="project.codebook",
          :annotation="newAnnotation",
          :disabled="isCreatingAnnotation",
          @position="t => seekTo(t)",
          @submit="createAnnotation",
          @cancel="toggleNewAnnotation"
        )

      annotation-pill(
        v-for="annotation in filteredAnnotations",
        :key="annotation.id",
        :annotation="annotation",
        :topics="session.topics",
        @chosen="choseAnnotation",
        @focus="annot => focusedAnnotation = annot",
        @blur="annot => focusedAnnotation = null",
      )

      action-box(v-if="!newAnnotation && filteredAnnotations.length === 0", :title="$t('view.project.session_detail.no_annotations_title')")
        p.is-size-5.has-text-centered.current-topic-name(slot="content")
          router-link.button.is-success-red(:to="registerRoute" v-if="annotations.length === 0")
            span {{$t('view.project.session_detail.no_annotations')}}
          span(v-else) {{$t('view.project.session_detail.no_filtered_annotations')}}
  session-info-sidebar(
    slot="right",
    :session="session"
  )

  template(slot="mobileRight")
    span.icon: fa(icon="info")
    span Gabber info
</template>

<script>
import { ADD_SESSIONS, ADD_ANNOTATIONS, ADD_COMMENTS, SAVE_PROJECT } from '@/const/mutations'
import { SESSION_LIST_ROUTE, REGISTER_ROUTE } from '@/const/routes'
import { AuthEvents } from '@/events'
import { mapGetters } from 'vuex'

import ApiWorkerMixin from '@/mixins/ApiWorker'
import ColorGeneratorMixin from '@/mixins/ColorGenerator'
import FiltersMixin from '@/mixins/Filters'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import Breadcrumbs from '@/components/utils/Breadcrumbs'
import Message from '@/components/utils/Message'
import AddCancelButton from '@/components/utils/AddCancelButton'
import ActionBox from '@/components/utils/ActionBox'

import AnnotationFilters from '@/components/annotation/AnnotationFilters'
import AnnotationPill from '@/components/annotation/AnnotationPill'
import AnnotationEdit from '@/components/annotation/AnnotationEdit'
import AnnotationRange from '@/components/annotation/AnnotationRange'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'
import AudioPlayer from '@/components/audio/AudioPlayer'

import TopicsBar from '@/components/topic/TopicsBar'

export default {
  mixins: [ ColorGeneratorMixin, ApiWorkerMixin, FiltersMixin ],
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, Message, AddCancelButton, ActionBox, AnnotationFilters, AnnotationPill, AnnotationEdit, AnnotationRange, SessionInfoSidebar, AudioPlayer, TopicsBar
  },
  data: () => ({
    audioProgress: 0,
    audioDuration: null,
    audioRatio: null,
    highlightTopic: null,
    newAnnotation: null,
    newAnnotationErrors: [],
    isCreatingAnnotation: false,
    focusedAnnotation: null,
    query: '',
    topicFilters: [],
    memberFilters: [],
    sortMode: 'newest'
  }),
  created () {
    this.fetchGabber()
  },
  mounted () {
    AuthEvents.$on('logout', this.fetchGabber)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchGabber)
  },
  watch: {
    '$route.params.session_id' () { this.fetchGabber() }
  },
  computed: {
    ...mapGetters([ 'currentUser' ]),
    registerRoute () { return { name: REGISTER_ROUTE } },
    sessionListRoute () { return { name: SESSION_LIST_ROUTE } },
    projectContent () { return this.$store.getters.projectContentByLanguage(this.project) },
    projectId () { return parseInt(this.$route.params.project_id) },
    sessionId () { return this.$route.params.session_id },
    session () { return this.$store.getters.sessionById(this.sessionId) },
    project () { return this.$store.getters.projectById(this.projectId) },
    annotations () { return this.$store.getters.annotationsForSession(this.sessionId) },
    currentTopic () {
      return this.session.topics.find(topic =>
        this.audioProgress >= topic.start_interval &&
        this.audioProgress < topic.end_interval
      )
    },
    filteredAnnotations () {
      return this.annotations.filter(annotation => {
        let searchKeys = [ annotation.content, annotation.creator.fullname ]
        let topicFilters = this.topicFilters.map(id =>
          this.session.topics.find(t => t.topic_id === id)
        )
        let userIds = [ annotation.creator.user_id ]
        return this.queryFilter(this.query, searchKeys) &&
          this.annotationTopicFilters(topicFilters, annotation) &&
          this.idListOrFilter(this.memberFilters, userIds)
      }).sort(this.modelSorter(this.sortMode))
    }
  },
  methods: {
    async fetchGabber () {
      this.startApiWork()

      let [ projectRes, sessionRes, annotationsRes ] = await Promise.all([
        this.$api.getProject(this.projectId),
        this.$api.getSession(this.sessionId, this.projectId),
        this.$api.getSessionAnnotations(this.sessionId, this.projectId)
      ])

      let meta = this.mergeMetaBlocks(projectRes.meta, sessionRes.meta, annotationsRes.meta)

      let sessions = [ sessionRes.data ]
      let annotations = annotationsRes.data || []
      let comments = annotations.reduce((comments, annotation) => {
        return comments.concat(annotation.comments)
      }, [])

      if (meta.success) {
        this.$store.commit(SAVE_PROJECT, projectRes.data)
        this.$store.commit(ADD_SESSIONS, sessions)
        this.$store.commit(ADD_ANNOTATIONS, annotations)
        this.$store.commit(ADD_COMMENTS, comments)
      }

      this.endApiWork(
        meta, this.$t('view.project.session_detail.fetch_failed_body')
      )
    },
    onProgress (progress) {
      if (this.newAnnotation && progress > this.newAnnotation.end_interval) {
        this.seekTo(this.newAnnotation.start_interval)
      } else {
        this.audioProgress = progress
      }
    },
    pickTopic (topic) {
      // Seek to that point, plus a tiny bit because of float maths
      this.seekTo(topic.start_interval + 0.01)
      if (this.topicFilters.length === 1 && this.topicFilters[0] === topic.topic_id) {
        this.topicFilters = [ ]
      } else {
        this.topicFilters = [ topic.topic_id ]
      }
    },
    choseAnnotation (annotation) {
      this.seekTo(annotation.start_interval)
    },
    seekTo (duration) {
      this.$refs.audioPlayer.seekTo(duration)
    },
    setAudioDuration (duration) {
      this.audioDuration = duration
    },
    updateRange (start, end) {
      let ratio = this.audioDuration / this.$refs.audioPlayer.$el.offsetWidth
      if (start) {
        this.newAnnotation.start_interval = Math.min(
          this.newAnnotation.end_interval - 0.5,
          Math.max(0, this.newAnnotation.start_interval + ratio * start)
        )
      }
      if (end) {
        this.newAnnotation.end_interval = Math.max(
          this.newAnnotation.start_interval + 0.5,
          Math.min(
            this.audioDuration, this.newAnnotation.end_interval + ratio * end
          )
        )
      }
    },
    toggleNewAnnotation () {
      if (this.newAnnotation) {
        this.newAnnotation = null
        return
      }

      this.newAnnotation = {
        creator: this.currentUser,
        content: '',
        tags: [],
        start_interval: Math.max(this.audioProgress - 10, 0),
        end_interval: Math.min(this.audioProgress + 10, this.audioDuration)
      }
    },
    async createAnnotation () {
      if (this.isCreatingAnnotation) return
      this.isCreatingAnnotation = true
      this.newAnnotationErrors = []

      let { meta, data } = await this.$api.createAnnotation(
        this.newAnnotation.content,
        this.newAnnotation.tags,
        this.newAnnotation.start_interval,
        this.newAnnotation.end_interval,
        this.sessionId,
        this.projectId
      )

      this.newAnnotationErrors = meta.messages

      if (meta.success) {
        this.$store.commit(ADD_ANNOTATIONS, [ data ])
        this.newAnnotation = null
      } else if (this.newAnnotationErrors.length === 0) {
        this.newAnnotationErrors.push(
          this.$t('view.project.session_detail.create_failed_body')
        )
      }

      this.isCreatingAnnotation = false
    }
  }
}
</script>

<style lang="sass">

.session-detail

  .topic-tags .tag
    cursor: pointer

  .current-topic-name
    padding-top: 0.5em

</style>
