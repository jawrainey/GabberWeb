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
    <audio-player class=""></audio-player>
    </div>
</template>

<script>
    import Playlist from '../components/Playlist/Playlist.vue'
    import RegionList from '../components/Region/RegionList.vue'
    import AudioPlayer from '../components/AudioPlayer/AudioPlayer.vue'
    // TODO: quick workaround because the AudioPlayer state is not exposed via the state.
    // Note: this is very bad; the general state of the AudioPlayer should be abstracted
    // to a store module, but until then we want to use it here to reset the progress bar
    import {AudioBus} from '../AudioBus.js';

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
                // Each time playlists are loaded we must reset the progress bar;
                // This is independent of fetching and AudioPlayer because this view
                // composes them and hence having this 'action' here makes most sense.
                AudioBus.$emit('RESET_SLIDER_AND_STOP_AUDIO');
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