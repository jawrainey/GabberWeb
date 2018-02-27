<template>
    <base-layout>
        <div slot="sidebar">
            <h2 class="title is-4">Your playlists</h2>
            <playlist></playlist>
        </div>
        <div slot="main">
            <h2 class="column" style="height: 60px;">{{ activePlaylistTitle }}</h2>
            <region-list></region-list>
        </div>
    </base-layout>
</template>

<script>
    import Playlist from '../components/Playlist/Playlist.vue'
    import RegionList from '../components/Region/RegionList.vue'
    import AudioPlayer from '../components/AudioPlayer/AudioPlayer.vue'
    import BaseLayout from '../components/Shared/BaseLayout.vue'

    export default {
      components: {
        Playlist,
        RegionList,
        AudioPlayer,
        BaseLayout
      },
      created () {
        this.fetchRegions()
      },
      watch: {
        '$route': 'fetchRegions'
      },
      methods: {
        fetchRegions () {
          let payload = { playlistID: this.$route.params.playlistID }
          this.$store.dispatch('FETCH_USER_REGIONS_FOR_PLAYLIST_BY_ID', payload)
        }
      },
      computed: {
        activePlaylistTitle () {
          return this.$store.getters.currentPlaylist(this.$route.params.playlistID).title
        }
      }
    }
</script>
