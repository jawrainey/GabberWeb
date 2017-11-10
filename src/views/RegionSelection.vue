<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-12 userPlaylist">
                <div class="tile">
                    <div class="tile is-parent is-vertical">
                        <h2 class="title is-4">Your playlists</h2>
                        <playlist></playlist>
                    </div>
                    <div class="tile is-parent is-9">
                        <article class="tile is-child">
                            <filter-bar></filter-bar>
                            <region-list></region-list>
                        </article>
                    </div>
                </div>
                <div class="tile is-parent audioPlayer">
                    <audio-player class="tile is-child"></audio-player>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Playlist from '../components/Playlist/Playlist.vue'
    import FilterBar from '../components/FilterBar/TheFilterBar.vue'
    import RegionList from '../components/Region/RegionList.vue'
    import AudioPlayer from '../components/AudioPlayer/AudioPlayer.vue'

    export default {
        components: {
            Playlist,
            FilterBar,
            RegionList,
            AudioPlayer
        },
        created () {
            this.fetchRegions();
        },
        watch: {
            // When this route is activated (e.g. changes) we want to fetch the regions for
            // the new route (based on the projectID parameter). This also lets us display
            // the loading state while the data is being fetched (e.g. fetching after navigation).
            '$route': 'fetchRegions'
        },
        methods: {
            fetchRegions () {
                this.$store.dispatch('FETCH_REGIONS_BY_PROJECT', this.$route.params.projectID);
            }
        }
    }
</script>

<style>
    /*
    NOTE:
        This does not account for varying screen-sizes or mobile devices as
        they will not be used in the next deployment.
    */
    header { height: 5vh; }
    .userPlaylist { margin-top: 1rem; height: 92vh; }
    .audioPlayer { max-height: 5vh; }
</style>