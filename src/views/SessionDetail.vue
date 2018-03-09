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
    h1.title {{ session.creator.name }}'s Gabber
    
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
        @pickTopic="pickTopic",
        :audio-duration="audioDuration"
      )
    
    .box(v-if="currentTopic")
      h2.title.is-4
        span.is-size-5.has-text-grey-light Topic
        |
        | {{ currentTopic.text }}
    
    label.label Gabber Topics
    .tags.topic-tags
      .tag(
        v-for="(topic, index) in session.topics",
        @click="pickTopic(topic)",
        v-text="`${index + 1}. ${topic.text}`",
        :style="{ 'background-color': colorFromId(topic.id) }"
      )
    section
      h1.title Annotations
      h2.subtitle ...
  session-info-sidebar(
    slot="right",
    :session="session"
  )
</template>

<script>
import { ADD_SESSIONS } from '@/const/mutations'
import { SESSION_LIST_ROUTE } from '@/const/routes'

import ColorGeneratorMixin from '@/mixins/ColorGenerator'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'

import Breadcrumbs from '@/components/utils/Breadcrumbs'

import AnnotationFilters from '@/components/annotation/AnnotationFilters'
import SessionInfoSidebar from '@/components/session/SessionInfoSidebar'
import AudioPlayer from '@/components/audio/AudioPlayer2'

import TopicsBar from '@/components/topic/TopicsBar'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, AnnotationFilters, SessionInfoSidebar, AudioPlayer, TopicsBar
  },
  data: () => ({
    errors: [],
    isLoading: true,
    audioProgress: 0,
    audioDuration: null
  }),
  mounted () {
    this.fetchGabber()
  },
  watch: {
    '$route.params.session_id' () { this.fetchGabber() }
  },
  computed: {
    sessionListRoute () { return { name: SESSION_LIST_ROUTE } },
    sessionId () { return this.$route.params.session_id },
    session () { return this.$store.getters.sessionById(this.sessionId) },
    currentTopic () {
      return this.session.topics.find(topic =>
        this.audioProgress >= topic.start && this.audioProgress < topic.end
      )
    }
  },
  methods: {
    async fetchGabber () {
      this.errors = []
      this.loading = true
      
      let { meta, data } = await this.$api.getSession(this.sessionId)
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(ADD_SESSIONS, [ data ])
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
      this.$refs.audioPlayer.seekTo(topic.start + 0.01)
    }
  }
}
</script>

<style lang="sass">

.session-detail
  
  .topic-tags .tag
    cursor: pointer

</style>
