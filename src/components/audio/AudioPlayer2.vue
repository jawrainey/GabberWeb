<template lang="pug">
.audio-player
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

const PLAYER_CONFIG = {
  barWidth: 4,
  cursorColor: '#38597E',
  cursorWidth: 2,
  progressColor: '#1BBC9C',
  waveColor: '#5E6D6E',
  scrollParent: true,
  minPxPerSec: 0,
  normalize: true,
  responsive: true
}

export const PlayerState = {
  Playing: 'playing',
  Paused: 'paused',
  Stopped: 'stopped',
  NotReady: 'not_ready'
}

/* Emitted Events

@progress (duration)  -> when the player position changed
@finish ()            -> when playing finished
@state ()             -> when the state changes
@ready (length)       -> when the audio was loaded

 */

export default {
  components: { CircleButton },
  props: {
    session: { type: Object, required: true }
  },
  data: () => ({
    audio: null,
    state: PlayerState.NotReady,
    progress: 0
  }),
  watch: {
    session () { this.setup() }
  },
  computed: {
    isPlaying () { return this.state === PlayerState.Playing },
    isPaused () { return this.state === PlayerState.Paused },
    isStopped () { return this.state === PlayerState.Stopped },
    canPlay () { return this.state !== PlayerState.NotReady },
    toggleIcon () { return this.isPlaying ? 'pause' : 'play' },
    current () {
      if (!this.canPlay) return '~'
      return this.format(this.progress)
    },
    remaining () {
      if (!this.canPlay) return '~'
      return this.format(Math.round(this.audio.getDuration()) - this.progress)
    }
  },
  mounted () { this.setup() },
  destroyed () { this.teardown() },
  methods: {
    toggle () {
      if (this.state === PlayerState.Stopped) {
        this.audio.seekTo(0)
      }
      if (this.state === PlayerState.Playing) {
        this.audio.pause()
        this.setState(PlayerState.Paused)
      } else {
        this.audio.play()
        this.setState(PlayerState.Playing)
      }
    },
    stop () {
      this.audio.stop()
      this.setState(PlayerState.Stopped)
    },
    backwards () {
      this.audio.skipBackward(1)
    },
    forwards () {
      this.audio.skipForward(1)
    },
    format (seconds) {
      seconds = Math.max(0, seconds)
      const pad = num => (num < 10 ? '0' : '') + Math.max(0, num)
      
      let mins = Math.floor(seconds / 60)
      let secs = Math.floor(seconds - (mins * 60))
      return `${pad(mins)}:${pad(secs)}`
    },
    setProgress (progress) {
      this.progress = progress
      this.$emit('progress', progress)
      if (this.isStopped && progress > 0) {
        this.setState(PlayerState.Paused)
      }
    },
    setState (state) {
      this.state = state
      this.$emit('state', state)
    },
    seekTo (progress) {
      let val = Math.min(
        1, Math.max(0, progress / this.audio.getDuration())
      )
      this.audio.seekAndCenter(val)
      if (this.state === PlayerState.Stopped) {
        this.state = PlayerState.Paused
      }
    },
    setup () {
      this.teardown()
      
      let wavesurfer = WaveSurfer.create({
        ...PLAYER_CONFIG, container: this.$refs.player
      })
      
      wavesurfer.load(this.session.file)
      wavesurfer.on('ready', () => {
        this.$emit('ready', this.audio.getDuration())
        this.setState(PlayerState.Stopped)
      })
      wavesurfer.on('finish', () => {
        this.setState(PlayerState.Stopped)
        this.$emit('finish')
      })
      wavesurfer.on('audioprocess', progress => {
        this.setProgress(progress)
      })
      wavesurfer.on('seek', percent => {
        this.setProgress(wavesurfer.getDuration() * percent)
      })
      this.audio = wavesurfer
      this.setState(PlayerState.NotReady)
    },
    teardown () {
      if (this.audio) {
        this.audio.destroy()
      }
      this.setState(PlayerState.NotReady)
    }
  }
}
</script>

<style lang="sass">

.audio-player
  
  .controls
    padding-bottom: 1em
    
    .is-time
      line-height: 3.5rem
      // height: 2.5rem
      font-size: 1.5rem
      color: $grey-light
      padding: 0 0.5em
  
  .player-wrapper
    height: 128px
    position: relative
  
  .loading
    position: absolute
    left: 0
    right: 0
    top: 1rem
    bottom: 0
    line-height: 128px
    height: 128px

</style>
