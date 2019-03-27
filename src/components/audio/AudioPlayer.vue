<template lang="pug">
.audio-player
  .controls
    .columns.is-mobile.is-gapless
      .column
        p.has-text-left.is-time {{ current }}
      .column.is-narrow
        .buttons
          circle-button.is-link.no-focus-effects(
            icon="backward",
            @click="backwards",
            :disabled="!canPlay"
          )
          circle-button.is-link.is-medium.no-focus-effects(
            :icon="toggleIcon",
            @click="toggle",
            :disabled="!canPlay"
          )
          circle-button.is-link.no-focus-effects(
            icon="forward",
            @click="forwards",
            :disabled="!canPlay"
          )
      .column
        p.has-text-right.is-time {{ remaining }}
  .player-wrapper.is-clipped
    template(v-if="!canPlay")
      .loading.has-text-centered.is-size-3(v-if="!failed")
        fa(icon="circle-notch", spin)
        span  {{$t('comp.audio.audio_player.loading')}}
      message.is-warning(
        v-else,
        :title="$t('comp.audio.audio_player.fail_title')",
        :value="$t('comp.audio.audio_player.fail_body')"
      )
    .player(ref="player")
    slot
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
import TemporalMixin from '@/mixins/Temporal'
import CircleButton from '@/components/utils/CircleButton'
import Message from '@/components/utils/Message'

const PLAYER_CONFIG = {
  barWidth: 4,
  // cursorColor: '#38597E',
  cursorColor: '#fff',
  cursorWidth: 2,
  progressColor: '#1BBC9C',
  waveColor: '#5E6D6E',
  scrollParent: true,
  minPxPerSec: 0,
  normalize: true,
  responsive: true,
  height: 84
}

export const PlayerState = {
  Playing: 'playing',
  Paused: 'paused',
  Stopped: 'stopped',
  NotReady: 'not_ready'
}

/* Emitted Events

@progress (duration)  -> when the player position changed
@seek (progress)      -> when the player position changed
@finish ()            -> when playing finished
@state ()             -> when the state changes
@ready (length)       -> when the audio was loaded
@error (error)        -> if an error occured fetching the audio file

 */

export default {
  mixins: [ TemporalMixin ],
  components: { CircleButton, Message },
  props: {
    session: { type: Object, required: true }
  },
  data: () => ({
    audio: null,
    state: PlayerState.NotReady,
    progress: 0,
    failed: false
  }),
  watch: {
    session () { this.setup() }
  },
  computed: {
    isPlaying () { return this.state === PlayerState.Playing },
    isStopped () { return this.state === PlayerState.Stopped },
    canPlay () { return this.state !== PlayerState.NotReady },
    toggleIcon () { return this.isPlaying ? 'pause' : 'play' },
    current () {
      if (!this.canPlay) return '~'
      return this.formatDuration(this.progress)
    },
    remaining () {
      if (!this.canPlay) return '~'
      return this.formatDuration(Math.round(this.audio.getDuration()) - this.progress)
    }
  },
  mounted () { this.setup() },
  destroyed () { this.teardown() },
  methods: {
    toggle () {
      // If stopped, seek to the start
      if (this.state === PlayerState.Stopped) this.audio.seekTo(0)

      // If playing, pause
      if (this.state === PlayerState.Playing) {
        this.pause()
      } else {
        // If paused, start playing
        this.play()
      }
    },
    play () {
      if (this.state === PlayerState.Playing) return
      this.audio.play()
      this.setState(PlayerState.Playing)
    },
    pause () {
      if (this.state === PlayerState.Paused) return
      this.audio.pause()
      this.setState(PlayerState.Paused)
    },
    stop () {
      // Stop the audio & update the state
      this.audio.stop()
      this.setState(PlayerState.Stopped)
    },
    backwards () {
      // Skip back 10 seconds
      this.audio.skipBackward(10)
    },
    forwards () {
      // Skip forward 10 seconds
      this.audio.skipForward(10)
    },
    setProgress (progress) {
      this.progress = progress
      this.$emit('progress', progress)

      // If stopped, move to a paused state
      if (this.isStopped && progress > 0) {
        this.setState(PlayerState.Paused)
      }
    },
    setState (state) {
      this.state = state
      this.$emit('state', state)
    },
    seekTo (progress) {
      this.audio.seekAndCenter(Math.min(
        1, Math.max(0, progress / this.audio.getDuration())
      ))
    },
    setup () {
      this.teardown()

      // Create a wavesurfer instance
      let wavesurfer = WaveSurfer.create({
        ...PLAYER_CONFIG, container: this.$refs.player
      })

      // Load the audio & set the volume
      wavesurfer.load(this.session.audio_url)
      // wavesurfer.setVolume(0.5)

      // Add event listeners
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
        let progress = wavesurfer.getDuration() * percent
        this.$emit('seek', progress)
        this.setProgress(progress)
      })
      wavesurfer.on('error', error => {
        this.failed = true
        this.$emit('error', error)
      })

      // Store the instance & set our state
      this.failed = false
      this.audio = wavesurfer
      this.setState(PlayerState.NotReady)
    },
    teardown () {
      if (this.audio) {
        this.audio.destroy()
        this.audio = null
      }
      this.setState(PlayerState.NotReady)
    }
  }
}
</script>

<style lang="sass" scoped>

$player-height: 42px

.audio-player

  .controls
    padding-bottom: 1em

    .is-time
      line-height: 3.5rem
      color: $grey-light

      +tablet
        font-size: 1.5rem

  .player-wrapper
    height: $player-height
    position: relative

    .player
      z-index: 100

  .loading
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: $player-height
    height: $player-height

</style>
