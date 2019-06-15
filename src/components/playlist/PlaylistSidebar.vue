<template lang="pug">
.playlist-detail
  edit-playlist-modal(
    :isActive.sync="isEditing",
    :playlist="playlist",
    @cancel="isEditing=false",
    @submit="isEditing=false")
  create-playlist-modal(
    :isActive.sync="isCreating",
    :playlist="playlist",
    @cancel="isCreating=false",
    @submit="createPlaylist")
  .columns.is-vcentered.is-mobile
    .column
      h3.title.is-size-4.has-text-weight-semibold {{ $t('comp.playlist.sidebar.titles.main') }}
    .column
      circle-button.is-small.is-pulled-right.zoom-on-hover(
        v-if="isLoggedIn",
        icon="plus",
        @click="createWithoutAnnotation")
  .box(v-if="!isLoggedIn")
    .buttons.is-centered.is-size-7.is-italic
      router-link.button.is-success-red(:to="registerRoute")
        span {{ $t('comp.playlist.sidebar.titles.not_logged_in') }}
  .playlist-pill.box(
    v-else,
    v-for="playlist in playlists",
    @click="changeActivePlaylist(playlist)",
    :class="{ active: playlist.id === isActivePlaylistID }")
      .columns.is-multiline.is-gapless
        .column.is-full
          h4.is-size-6.label.value.is-text-overflow {{ playlist.name }}
        .column.is-full
          span.is-size-7 {{ playlist.annotations.length }} &#32;
            | {{ $t('comp.playlist.sidebar.pill.tracks') }} &middot; &#32;
            | {{ totalLength(playlist) }}
        .column.is-full.actions
          span.is-size-7.is-italic
            a(@click.stop="", href="/playlist/share/URI", target="_blank") Share
              span.icon: fa.is-small(icon="external-link-alt", size="xs")
            a(@click.stop="editPlaylist(playlist)") Edit
              span.icon: fa.is-small(icon="edit", size="xs")
            a(@click.stop="") Delete
              span.icon: fa.is-small(icon="trash", size="xs")
</template>

/* Emitted Events:

@changeActivePlaylist () -> when the user wants to switch between their existing playlists

*/

<script>
import { ADD_SESSIONS, SET_PLAYLISTS } from '@/const/mutations'
import { REGISTER_ROUTE } from '@/const/routes'
import { AuthEvents, PlaylistEvents } from '@/events'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import TemporalMixin from '@/mixins/Temporal'
import LabelValue from '@/components/utils/LabelValue'
import ActionBox from '@/components/utils/ActionBox'
import AddCancelButton from '@/components/utils/AddCancelButton'
import CircleButton from '@/components/utils/CircleButton'
import EditPlaylistModal from '@/components/playlist/EditPlaylistModal'
import CreatePlaylistModal from '@/components/playlist/CreatePlaylistModal'

export default {
  mixins: [ ApiWorkerMixin, TemporalMixin ],
  components: { ActionBox, AddCancelButton, CircleButton, CreatePlaylistModal, EditPlaylistModal, LabelValue },
  props: {
    activePlaylist: { type: Object, required: true }
  },
  data: () => ({
    isEditing: false,
    isCreating: false,
    playlist: {}
  }),
  created () {
    // When an annotation is chosen and no playlist is selected, we force the user to create one.
    PlaylistEvents.$on('AddToUnknownPlaylist', this.createWithAnnotation)
  },
  mounted () {
    this.fetchPlaylists()
    AuthEvents.$on('logout', this.fetchPlaylists)
  },
  destroyed () {
    AuthEvents.$off('logout', this.fetchPlaylists)
  },
  computed: {
    registerRoute () { return { name: REGISTER_ROUTE } },
    isActivePlaylistID () {
      let selectedPlaylist = this.playlists.find(pl => pl.id === this.activePlaylist.id)
      return selectedPlaylist !== undefined ? selectedPlaylist.id : null
    },
    playlists () {
      return this.$store.getters.allPlaylists
    },
    isLoggedIn () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    createWithAnnotation (annotation) {
      this.playlist.annotations = [annotation]
      this.isCreating = true
    },
    createWithoutAnnotation () {
      // Reset between opening/closing
      this.playlist = {name: '', description: '', annotations: []}
      this.isCreating = true
    },
    createPlaylist (playlist) {
      this.isCreating = false
      this.changeActivePlaylist(playlist)
    },
    editPlaylist (playlist) {
      this.playlist = playlist
      this.isEditing = true
    },
    totalLength (playlist) {
      let secs = playlist.annotations.map(p => p.end_interval - p.start_interval).reduce((a, b) => a + b, 0)
      return this.formatDuration(secs)
    },
    changeActivePlaylist (playlist) {
      this.$emit('update:changeActivePlaylist', playlist)
    },
    async fetchPlaylists () {
      this.startApiWork()
      let { meta, data } = await this.$api.listPlaylists()

      if (meta.success) {
        this.$store.commit(SET_PLAYLISTS, data)
        // If a user clicks a playlist, we need to know all the associated metadata.
        // Transform playlist to only obtain session/project ids
        let sessions = data.map(pl =>
          pl.annotations.map(z => (
            {session_id: z.session_id, project_id: z.project_id})
          )
        )
        // As there may be X playlists with Y annotations, we want to reduce this to one list
        let allSessions = [].concat.apply([], sessions.map(s => s))
        // Remove duplicates from the list to reduce number of requests sent
        let uniqueSessions = [...new Set(allSessions.map(s => JSON.stringify(s)))].map(s => JSON.parse(s))
        // Get all the sessions related to the annotations in the playlist
        // This is necessary as we need to access audio_url and other metadata
        let responses = await Promise.all(uniqueSessions.map(s => this.$api.getSession(s.session_id, s.project_id)))
        let sessionsMeta = this.mergeMetaBlocks(...responses.map(m => m.meta))

        if (sessionsMeta.success) {
          // Flatten the session data from all requests
          let mergedSessions = [].concat.apply([], responses.map(m => m.data))
          this.$store.commit(ADD_SESSIONS, mergedSessions)
        }
      }
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass" scoped>
.playlist-pill
  border-left: 12px solid $grey-light
  cursor: pointer
  position: relative
  margin-bottom: .5em
  +desktop
    &:hover, .active
      border-left-color: $primary
      transform: translateX(4px)
  padding: .5em
.active
  transform: translateX(4px)
  border-left-color: $primary
.zoom-on-hover:hover
  transform: scale(1.06)
.is-text-overflow
  flex: 1
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
