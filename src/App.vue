<template>
    <div>
    <div id="main">
        <playlist></playlist>
        <content-container></content-container>
    </div>
    <audio-player></audio-player>
    </div>
</template>

<script>
    import Playlist from './components/Playlist/Playlist.vue'
    import ContentContainer from './components/ContentContainer.vue'
    import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'

    export default {
        components: {
            Playlist,
            ContentContainer,
            AudioPlayer
        }
    }
</script>

<style>

    body { margin: 0; }

    #main {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 720px;
        margin: 1.68em auto;
        flex: 1;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin: 10px;
    }
</style>