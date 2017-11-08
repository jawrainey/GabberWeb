<template>
    <div>
        <div class="container main">
            <playlist></playlist>
            <content-container></content-container>
        </div>
        <audio-player></audio-player>
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
    .main {
        text-align: center;
        color: #2C3E50;
        margin-top: 1em;
    }
</style>