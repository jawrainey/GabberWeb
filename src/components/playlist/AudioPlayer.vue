<template lang="pug">
  .audio-player.box.is-paddingless
    audio(ref="player")
    .columns.is-mobile.is-vcentered.is-marginless.has-text-centered.is-multiline
      .column.is-full.is-mobile
        .columns.is-vcentered.is-mobile
          .settings.column.is-1
              <!--circle-button.rm-bg(icon="cog")-->
          .buttons.column.is-10.is-marginless.has-text-centered
            span.circle-button.button.rm-bg.is-marginless.is-paddingless
              | {{ this.formatDuration(Math.round(position)) }}
            circle-button.rm-bg(
              @click="$emit('prev', annotation)",
              icon="step-backward")
            circle-button.rm-bg.action-border(
              @click="$emit('playPause', annotation)",
              :icon="toggleIcon")
            circle-button.rm-bg(
              @click="$emit('next', annotation)",
              icon="step-forward")
            span.circle-button.button.rm-bg.is-marginless.is-paddingless
              | {{ this.formatDuration(max) }}
          .add.column.is-1(v-if="$slots.action")
            slot(name="action")
      .column.is-full.is-paddingless(
        @mouseover="hover = true",
        @mouseleave="hover = false")
        vue-slider(
          @callback="seekTo",
          @drag-end="dragEnd",
          v-model="position",
          tooltip="false",
          :max="max",
          :speed="0.1",
          :bgStyle="bgStyle",
          :processStyle="processStyle",
          :height="5",
          :dot-size="hover ? 11 : 0")
      .column.is-full.is-paddingless.opac(
        @mouseover="hover = true",
        @mouseleave="hover = false")
        .topics-bar.is-flex(v-if="topicsExist")
          topic-segment(
            v-for="topic in topicsOverlappingAnnotation",
            :key="topic.id",
            :audio-duration="annotation.end_interval",
            :topic="topic")
</template>

<script>
import VueSlider from 'vue-slider-component'
import CircleButton from '@/components/utils/CircleButton'
import TopicSegment from '@/components/topic/TopicSegment'
import TemporalMixin from '@/mixins/Temporal'

/* Emitted Events:

@addRemove              ~ When the user Adds/Removes annotation from Active Playlist
@prev      (annotation) ~ When the user skips to the prev annotation
@playPause (annotation) ~ When the user wants to play an annotation
@next      (annotation) ~ When the user skips to the next annotation
@ended                  ~ When the player finishes the recording
@dragEnd                ~ When the user finishes dragging the selector
*/

export const PlayerState = {
  Playing: 'playing',
  Paused: 'paused',
  Stopped: 'stopped'
}

export default {
  mixins: [ TemporalMixin ],
  components: { VueSlider, CircleButton, TopicSegment },
  props: {
    annotation: { type: Object, required: true }
  },
  data: () => ({
    hover: false,
    annotationChanged: false,
    player: null,
    volume: 1,
    premuteVolume: 0,
    // How far along we are
    position: 0,
    // Store progress in a set interval
    progressTimer: 0,
    state: PlayerState.Stopped
  }),
  mounted () { this.setup() },
  computed: {
    topicsExist () { return !(this.session === undefined || this.session.topics.length <= 0) },
    // TODO: this is also in AnnotationPill? make a mixin? It's also incorrect!
    topicsOverlappingAnnotation () {
      return this.session.topics.filter(
        t => this.annotation.start_interval <= t.start_interval ||
          this.annotation.end_interval <= t.end_interval)
    },
    session () { return this.$store.getters.sessionById(this.annotation.session_id) },
    max () { return Math.floor(this.annotation.end_interval - this.annotation.start_interval) },
    isPlaying () { return this.state === PlayerState.Playing },
    isStopped () { return this.state === PlayerState.Stopped },
    toggleIcon () { return this.annotation && this.annotation.isPlaying ? 'pause' : 'play' },
    currentTime () { return this.formatDuration(this.position) },
    bgStyle () { return { 'backgroundColor': '#434343' } },
    processStyle () {
      let bg = this.hover ? 'whiteSmoke' : 'rgba(179,179,179,.75)'
      return { 'backgroundColor': bg, 'border-radius': '0' }
    }
  },
  watch: {
    'annotation' () {
      this.annotationChanged = true
    }
  },
  methods: {
    audioURI (annotation) {
      let session = this.$store.getters.sessionById(annotation.session_id)
      return `${session.audio_url}#t=${annotation.start_interval},${annotation.end_interval}`
    },
    play (annotation) {
      // The audio was first pressed or a different audio was selected.
      if (this.state === PlayerState.Stopped || this.annotationChanged) {
        this.player.src = this.audioURI(annotation)
        this.player.currentTime = annotation.start_interval
        this.position = 0
        this.annotationChanged = false
      } else if (this.state === PlayerState.Paused) {
        // When continuing to play from pause we want to start of from previous position
        this.player.currentTime = annotation.start_interval + this.position
      }
      this.volume = this.player.volume
      this.player.play()
      this.setProgress()
      this.state = PlayerState.Playing
    },
    pause () {
      // Stop the slider from increasing
      clearInterval(this.progressTimer)
      this.player.pause()
      this.state = PlayerState.Paused
    },
    next (annotation) {
      this.pause()
      this.position = 0
      this.player.src = this.audioURI(annotation)
      this.player.currentTime = annotation.start_interval
      this.play(annotation)
    },
    toggle (annotation) {
      if (this.state === PlayerState.Playing) this.pause()
      else this.play(annotation)
    },
    stop () {
      this.resetProgress()
      this.pause()
      this.state = PlayerState.Stopped
      this.$emit('ended')
    },
    seekTo (progress) {
      this.position = progress
      this.player.currentTime = progress
    },
    dragEnd (context) {
      this.seekTo(context.value)
      if (this.state === PlayerState.Paused || this.state === PlayerState.Stopped) {
        this.play(this.annotation)
        this.$emit('dragEnd')
      }
    },
    setProgress () {
      // e.g. when a different annotation is selected we must reset the previous state
      if (this.state === PlayerState.Playing) this.resetProgress()

      this.progressTimer = setInterval(_ => {
        if (this.position >= this.max) {
          this.stop()
        } else {
          this.position = Math.round((this.position + 0.1) * 100) / 100
        }
      }, 100)
    },
    resetProgress () {
      clearInterval(this.progressTimer)
      this.position = 0
      this.player.currentTime = 0
    },
    setVolume (position) {
      this.player.volume = position
    },
    mute () {
      if (this.volume === 0) {
        this.volume = this.premuteVolume
      } else {
        this.premuteVolume = this.volume
        this.volume = 0
      }
      this.setVolume(this.volume)
    },
    setup () {
      this.player = this.$refs.player
    }
  }
}
</script>

<style lang="sass">
  .layout-main
    padding-bottom: 0 !important

  .vue-slider
    border-radius: 0 !important
    cursor: pointer !important
</style>

<style lang="sass" scoped>
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
  .action-border.is-success
    background-color: #2FCC70
  .action-border.is-danger
    background-color: #E74C3C

  .audio-player
    margin-left: -1em !important
    margin-right: -1em !important
    border-radius: 0

  .vue-slider-horizontal
    padding: 0 !important

  .topic-segment
    cursor: auto !important
</style>
