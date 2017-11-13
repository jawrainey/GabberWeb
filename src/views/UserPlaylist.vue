<template>
    <div>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-12">
                <div class="tile">
                    <div class="tile is-parent is-vertical">
                        <h2 class="title is-4">Your playlists</h2>
                        <playlist></playlist>
                    </div>
                    <div class="tile is-parent is-9">
                        <article class="tile is-child">
                            <h2 class="column" style="height: 60px;">{{ activePlaylistTitle }}</h2>
                            <region-list></region-list>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <audio-player></audio-player>
    </div>
</template>

<script>
    import Playlist from '../components/Playlist/Playlist.vue'
    import RegionList from '../components/Region/RegionList.vue'
    import AudioPlayer from '../components/AudioPlayer/AudioPlayer.vue'

    export default {
        components: {
            Playlist,
            RegionList,
            AudioPlayer
        },
        created () {
            this.fetchRegions();
        },
        watch: {
            '$route': 'fetchRegions'
        },
        methods: {
            fetchRegions() {
                let payload = { userID: 1, playlistID: this.$route.params.playlistID };
                this.$store.dispatch('FETCH_USER_REGIONS_FOR_PLAYLIST_BY_ID', payload);
            }
        },
        computed: {
            activePlaylistTitle() {
                return this.$store.getters.currentPlaylist(this.$route.params.playlistID).title;
            }
        }
    }
</script>