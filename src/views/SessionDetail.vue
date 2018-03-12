<template lang="pug">
loading-full-layout(
  v-if="isLoading || errors.length > 0"
  loading-message="Fetching Gabber Session",
  :is-loading="isLoading",
  :errors="errors",
  :back-route="sessionListRoute"
)
full-layout.session-detail(v-else)
  annotation-filters(
    slot="left"
  )
  .main(slot="main")
    breadcrumbs
    h1.title {{ session.creator.fullname }}'s Gabber
    
    .box
      audio-player(
        ref="audioPlayer",
        :session="session",
        @progress="onProgress",
        @ready="d => audioDuration = d"
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
        span {{ ` ${(currentTopic).text} ` }}
        span(v-if="highlightTopic && currentTopic.id !== highlightTopic.id")
          fa(icon="long-arrow-alt-right")
          span {{` ${highlightTopic.text}`}}
    
    //- label.label Gabber Topics
    //- .tags.topic-tags
      .tag(
        v-for="(topic, index) in session.topics",
        @click="pickTopic(topic)",
        v-text="`${index + 1}. ${topic.text}`",
        :style="{ 'background-color': colorFromId(topic.id) }"
      )
    section
      h1.title Annotations
      annotation-pill(
        v-for="annotation in annotations",
        :key="annotation.id",
        :annotation="annotation",
        @chosen="choseAnnotation"
      )
      
  session-info-sidebar(
    slot="right",
    :session="session"
  )
</template>

<script>
import { ADD_SESSIONS, ADD_ANNOTATIONS, ADD_COMMENTS } from '@/const/mutations'
import { SESSION_LIST_ROUTE } from '@/const/routes'

import ColorGeneratorMixin from '@/mixins/ColorGenerator'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import Breadcrumbs from '@/components/utils/Breadcrumbs'

import AnnotationFilters from '@/components/annotation/AnnotationFilters'
import AnnotationPill from '@/components/annotation/AnnotationPill'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'
import AudioPlayer from '@/components/audio/AudioPlayer2'

import TopicsBar from '@/components/topic/TopicsBar'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, AnnotationFilters, AnnotationPill, SessionInfoSidebar, AudioPlayer, TopicsBar
  },
  data: () => ({
    errors: [],
    isLoading: true,
    audioProgress: 0,
    audioDuration: null,
    highlightTopic: null
  }),
  mounted () {
    this.fetchGabber()
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
      this.errors = []
      this.loading = true
      
      let [ sessionRes, annotationsRes ] = await Promise.all([
        this.$api.getSession(this.sessionId, this.projectId),
        this.$api.getSessionAnnotations(this.sessionId, this.projectId)
      ])
      
      this.errors = sessionRes.meta.messages
        .concat(annotationsRes.meta.messages)
      
      let allComments = (annotationsRes.data || []).reduce((comments, annotation) => {
        return comments.concat(annotation.comments)
      }, [])
      
      if (sessionRes.meta.success) {
        this.$store.commit(ADD_SESSIONS, [ sessionRes.data ])
        this.$store.commit(ADD_ANNOTATIONS, annotationsRes.data || [])
        this.$store.commit(ADD_COMMENTS, allComments)
      } else if (this.errors.length === 0) {
        this.errors.push('Gabber not found')
      }
      
      this.isLoading = false
    },
    onProgress (progress) {
      this.audioProgress = progress
    },
    pickTopic (topic) {
      // Seek to that point, plus a tiny bit because of float maths
      this.$refs.audioPlayer.seekTo(topic.start_interval + 0.01)
    },
    choseAnnotation (annotation) {
      this.$refs.audioPlayer.seekTo(annotation.start_interval)
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
