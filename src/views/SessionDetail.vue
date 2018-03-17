<template lang="pug">
loading-full-layout(
  v-if="apiInProgress || apiErrors.length > 0"
  loading-message="Fetching Gabber Session",
  :is-loading="apiInProgress",
  :errors="apiErrors",
  :back-route="sessionListRoute"
)
full-layout.session-detail(v-else-if="session")
  annotation-filters(
    slot="left",
    :session="session"
  )
  .main(slot="main")
    breadcrumbs
    h1.title {{ session.creator.fullname }}'s Gabber
    
    .box
      audio-player(
        ref="audioPlayer",
        :session="session",
        @progress="onProgress",
        @seek="onSeek",
        @ready="setAudioDuration"
      )
        transition(name="fade")
          annotation-range(
            v-if="newAnnotation",
            :audio-duration="audioDuration",
            :start="newAnnotation.start_interval",
            :end="newAnnotation.end_interval",
            :disabled="isCreatingAnnotation",
            :editable="true"
            @change="updateRange"
          )
        transition(name="fade")
          annotation-range(
            v-if="focusedAnnotation",
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
        span.is-size-5.has-text-grey-light Topic
        span  {{ currentTopic.text }}
        span(v-if="highlightTopic && currentTopic.id !== highlightTopic.id")
          span  → {{highlightTopic.text}}
    
    section
      .level.is-mobile
        .level-left
          .level-item
            h1.title Annotations
        .level-right
          add-cancel-button.is-medium(
            @click="toggleNewAnnotation",
            :toggled="!!newAnnotation",
            :disabled="apiInProgress || isCreatingAnnotation"
          )
      
      .box.is-pill.is-success.new-annotation(v-if="newAnnotation")
        h3.subtitle.is-4 Add an annotation
        message.is-danger(v-model="newAnnotationErrors", clearable)
        annotation-edit(
          :annotation="newAnnotation",
          :audio-progress="audioProgress",
          :disabled="isCreatingAnnotation",
          @position="t => seekTo(t)"
          @submit="createAnnotation",
          @cancel="toggleNewAnnotation"
        )
      
      annotation-pill(
        v-for="annotation in annotations",
        :key="annotation.id",
        :annotation="annotation",
        @chosen="choseAnnotation",
        @focus="annot => focusedAnnotation = annot",
        @blur="annot => focusedAnnotation = null",
      )
      
  session-info-sidebar(
    slot="right",
    :session="session"
  )
</template>

<script>
import { ADD_SESSIONS, ADD_ANNOTATIONS, ADD_COMMENTS } from '@/const/mutations'
import { SESSION_LIST_ROUTE } from '@/const/routes'
import { AuthEvents } from '@/events'

import ApiWorkerMixin from '@/mixins/ApiWorker'
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import Breadcrumbs from '@/components/utils/Breadcrumbs'
import Message from '@/components/utils/Message'
import AddCancelButton from '@/components/utils/AddCancelButton'

import AnnotationFilters from '@/components/annotation/AnnotationFilters'
import AnnotationPill from '@/components/annotation/AnnotationPill'
import AnnotationEdit from '@/components/annotation/AnnotationEdit'
import AnnotationRange from '@/components/annotation/AnnotationRange'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'
import AudioPlayer from '@/components/audio/AudioPlayer2'

import TopicsBar from '@/components/topic/TopicsBar'

export default {
  mixins: [ ColorGeneratorMixin, ApiWorkerMixin ],
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, Message, AddCancelButton, AnnotationFilters, AnnotationPill, AnnotationEdit, AnnotationRange, SessionInfoSidebar, AudioPlayer, TopicsBar
  },
  data: () => ({
    audioProgress: 0,
    audioDuration: null,
    audioRatio: null,
    highlightTopic: null,
    newAnnotation: null,
    newAnnotationErrors: [],
    isCreatingAnnotation: false,
    focusedAnnotation: null
  }),
  mounted () {
    this.fetchGabber()
    AuthEvents.$on('logout', this.fetchGabber)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchGabber)
  },
  watch: {
    '$route.params.session_id' () { this.fetchGabber() }
  },
  computed: {
    sessionListRoute () { return { name: SESSION_LIST_ROUTE } },
    projectId () { return parseInt(this.$route.params.project_id) },
    sessionId () { return this.$route.params.session_id },
    session () { return this.$store.getters.sessionById(this.sessionId) },
    annotations () { return this.$store.getters.annotationsForSession(this.sessionId) },
    currentTopic () {
      return this.session.topics.find(topic =>
        this.audioProgress >= topic.start_interval &&
        this.audioProgress < topic.end_interval
      )
    }
  },
  methods: {
    async fetchGabber () {
      this.startApiWork()
      
      let [ sessionRes, annotationsRes ] = await Promise.all([
        this.$api.getSession(this.sessionId, this.projectId),
        this.$api.getSessionAnnotations(this.sessionId, this.projectId)
      ])
      
      let meta = this.mergeMetaBlocks(sessionRes.meta, annotationsRes.meta)
      
      let sessions = [ sessionRes.data ]
      let annotations = annotationsRes.data || []
      let comments = annotations.reduce((comments, annotation) => {
        return comments.concat(annotation.comments)
      }, [])
      
      if (meta.success) {
        this.$store.commit(ADD_SESSIONS, sessions)
        this.$store.commit(ADD_ANNOTATIONS, annotations)
        this.$store.commit(ADD_COMMENTS, comments)
      }
      
      this.endApiWork(meta, 'Gabber not found')
    },
    onProgress (progress) {
      if (this.newAnnotation && progress > this.newAnnotation.end_interval) {
        this.seekTo(this.newAnnotation.start_interval)
      } else {
        this.audioProgress = progress
      }
    },
    onSeek (progress) {
      // if (this.newAnnotation) {
      //   this.newAnnotation.start_interval = Math.round(progress)
      // }
    },
    pickTopic (topic) {
      // Seek to that point, plus a tiny bit because of float maths
      this.seekTo(topic.start_interval + 0.01)
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
          Math.max(
            this.newAnnotation.start_interval + ratio * start,
            0
          )
        )
      }
      if (end) {
        this.newAnnotation.end_interval = Math.max(
          this.newAnnotation.start_interval + 0.5,
          Math.min(
            this.newAnnotation.end_interval + ratio * end,
            this.audioDuration
          )
        )
      }
    },
    toggleNewAnnotation () {
      if (this.newAnnotation) {
        this.newAnnotation = null
        return
      }
      
      // this.$refs.audioPlayer.pause()
      this.newAnnotation = {
        creator: this.$store.getters.currentUser,
        content: '',
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
        this.newAnnotationErrors.push('Failed to create annotation, please try again')
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
