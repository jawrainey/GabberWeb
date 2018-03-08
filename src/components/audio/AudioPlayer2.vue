<template lang="pug">
.audio-player
  p {{ state }}
  .controls
    .columns.is-mobile.is-gapless
      .column
        p.has-text-right.is-time {{ current }}
      .column.is-narrow
        .buttons
          circle-button.is-link.no-active-effects(
            icon="backward",
            @click="backwards",
            :disabled="!canPlay"
          )
          circle-button.is-link.is-large.no-active-effects(
            :icon="toggleIcon",
            @click="toggle",
            :disabled="!canPlay"
          )
          circle-button.is-link.no-active-effects(
            icon="stop",
            @click="stop",
            :disabled="!canPlay"
          )
          circle-button.is-link.no-active-effects(
            icon="forward",
            @click="forwards",
            :disabled="!canPlay"
          )
      .column
        p.has-text-left.is-time {{ remaining }}
  .player-wrapper
    .loading.has-text-centered.is-size-3(v-if="!canPlay")
      fa(icon="circle-notch", spin)
      span &nbsp;Loading Audio
    .player(ref="player")
</template>

<script>
import WaveSurfer from 'wavesurfer.js'

import CircleButton from '@/components/utils/CircleButton'

const PLAYING = 'playing'
const PAUSED = 'paused'
const STOPPED = 'stopped'
const NOT_READY = 'not-ready'

export default {
  components: { CircleButton },
  props: {
    session: { type: Object, required: true }
  },
  data: () => ({
    wavesurfer: false,
    state: NOT_READY,
    progress: 0
  }),
  watch: {
    session () { this.setup() }
  },
  computed: {
    isPlaying () { return this.state === PLAYING },
    isPaused () { return this.state === PAUSED },
    isStopped () { return this.state === STOPPED },
    canPlay () { return this.state !== NOT_READY },
    toggleIcon () { return this.isPlaying ? 'pause' : 'play' },
    current () {
      if (!this.canPlay) return '~'
      return this.format(this.progress)
    },
    remaining () {
      if (!this.canPlay) return '~'
      return this.format(Math.floor(this.wavesurfer.getDuration()) - this.progress)
    }
  },
  mounted () { this.setup() },
  destroyed () { this.teardown() },
  methods: {
    toggle () {
      if (this.state === PLAYING) {
        this.wavesurfer.pause()
        this.state = PAUSED
      } else {
        this.wavesurfer.play()
        this.state = PLAYING
      }
    },
    stop () {
      this.wavesurfer.stop()
      this.state = STOPPED
    },
    backwards () {
      this.wavesurfer.skipBackward(1)
    },
    forwards () {
      this.wavesurfer.skipForward(1)
    },
    format (seconds) {
      const pad = num => (num < 10 ? '0' : '') + num
      
      let mins = Math.floor(seconds / 60)
      let secs = Math.floor(seconds - (mins * 60))
      return `${pad(mins)}.${pad(secs)}s`
      // console.log(typeof seconds, seconds)
      // return `~`
    },
    setup () {
      this.teardown()
      
      let wavesurfer = WaveSurfer.create({
        container: this.$refs.player,
        barWidth: 4,
        cursorColor: '#38597E',
        cursorWidth: 2,
        progressColor: '#1BBC9C',
        waveColor: '#5E6D6E'
      })
      
      wavesurfer.load(this.session.file)
      wavesurfer.on('ready', () => {
        console.log('ready')
        this.state = STOPPED
      })
      wavesurfer.on('finish', () => {
        console.log('finish')
        this.state = STOPPED
        wavesurfer.seekTo(0)
      })
      wavesurfer.on('audioprocess', progress => {
        console.log('audioprocess', progress)
        this.progress = progress
      })
      this.wavesurfer = wavesurfer
      this.state = NOT_READY
    },
    teardown () {
      if (this.wavesurfer) {
        this.wavesurfer.destroy()
      }
      this.state = NOT_READY
    }
  }
}
</script>

<style lang="sass">

.audio-player
  padding-bottom: 1em
  
  .controls
    padding-bottom: 1em
    
    .is-time
      line-height: 3.5rem
      // height: 2.5rem
      font-size: 1.5rem
      color: $grey-light
      padding: 0 0.5em
  
  .player-wrapper
    padding: 1em
    height: calc(128px + 2em)
    position: relative
    background: $grey-darker
    border-radius: $radius-large
  
  .loading
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    line-height: 128px

</style>
