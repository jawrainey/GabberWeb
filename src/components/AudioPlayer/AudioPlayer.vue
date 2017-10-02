<template>
    <footer id="audioplayer">
        <div id="audioplayer__options">
            <span>{{ region.topic }}</span>
            <div id="audioplayer__buttons">
                <button @click="onSeek(-10)" class="back-ten"></button>
                <button @click="onPreviousRegion" class="previous"></button>
                <button @click="onPlayPause" class="playpause"></button>
                <button @click="onNextRegion" class="next"></button>
                <button @click="onSeek(10)" class="forward-ten"></button>
                <button @click="onAddToPlaylist" class="playlist-add"></button>
            </div>
            <div id="audioplayer__bar">
                <div class="audioplayer__progress_time">00:00</div>
                <audio id="player" v-bind:src="audioSource" controls></audio>
                <div class="audioplayer__progress_time">00:20</div>
            </div>
        </div>
    </footer>
</template>

<script>
    // Receiving data from Region.vue
    import {EventBus} from '../../EventBus.js'

    export default {
        data: () => ({
            region: {},
            advanced: false,
            audioSource: ''
        }),
        methods: {
            // helpers
            setAudioSource(url) {},

            // Would affect Region read/unread icon
            onPlayPause() {},
            onNextRegion() {},
            onPreviousRegion() {},
            onSeek(position) {},
            // Would affect PlayList.vue UI
            onAddToPlaylist() {

            },
            // Advanced methods: soundwave, speakers, annotator, tags.
            showAdvancedView(){}
        },
        created () {
            EventBus.$on('REGION_SELECTED', (region) => {
                this.region = region;
                this.audioSource = region.audio.url;
            })
        }
    }
</script>

<style>
    #audioplayer {
        background: #EFEFEF;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 1em 0;
    }

    #audioplayer__options {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        width: 20%;
        margin: 0 auto;
    }

    #audioplayer__options button {
        height: 27px;
        width: 27px;
        background-size: cover;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        margin-left: .25rem;
        transition: background-image .25s ease-in-out;
        background-color: white;
    }

    #audioplayer__buttons {
        margin-bottom: 12px;
        cursor: default;
        display: -ms-flexbox;
        display: flex;
        width: 224px;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
    }

    #audioplayer__bar {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: center;
        align-items: center;
    }


    #audioplayer__buttons .back-ten {
        background-image: url("../../assets/av-controls/back-ten.svg");
    }

    #audioplayer__buttons .previous {
        background-image: url("../../assets/av-controls/previous.svg");
    }

    #audioplayer__buttons .playpause {
        background-image: url("../../assets/av-controls/play-circle.svg");
    }

    #audioplayer__buttons .next {
        background-image: url("../../assets/av-controls/next.svg");
    }

    #audioplayer__buttons .forward-ten {
        background-image: url("../../assets/av-controls/forward-ten.svg");
    }

    #audioplayer__buttons .playlist-add {
        background-image: url("../../assets/playlist-add.svg");
    }
</style>