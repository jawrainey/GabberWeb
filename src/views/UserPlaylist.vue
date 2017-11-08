<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-12 userPlaylist">
                <div class="tile">
                    <div class="tile is-parent is-vertical">
                        <article class="tile is-child notification is-primary">
                            <p class="title">Your playlists ...</p>
                            <p class="subtitle">Top tile</p>
                        </article>
                    </div>
                    <div class="tile is-parent is-9">
                        <article class="tile is-child notification is-info">
                            <p class="title">Filters...</p>
                            <div class="is-scrollable">
                                <div class="is-scroll-container">
                                    <p>All the regions</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="tile is-parent audioPlayer">
                    <article class="tile is-child notification is-danger">
                        <p class="title">Audio player</p>
                        <div class="content">
                            <p>Audio player ...</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Playlist from '../components/Playlist/Playlist.vue'
    import ContentContainer from '../components/ContentContainer.vue'
    import AudioPlayer from '../components/AudioPlayer/AudioPlayer.vue'

    export default {
        components: {
            Playlist,
            ContentContainer,
            AudioPlayer
        }
    }
</script>

<style>
    /*
    NOTE:
        This does not account for varying screen-sizes or mobile devices as
        they will not be used in the next deployment.
    */
    header {
        height: 5vh;
    }
    .userPlaylist {
        margin-top: 1rem;
        height: 92vh;
    }
    html, body {
        height: 100%;
        max-height: 100%;
    }

    .audioPlayer {
        max-height: 5vh;
    }

    .is-scrollable {
        overflow-y: scroll;
    }
    .is-scroll-container {
        height: 60vh;
    }

</style>