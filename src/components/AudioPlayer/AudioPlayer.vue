<template>
    <footer id="audioplayer">
        <div id="audioplayer__options" :disabled="!regionsLoaded">
            <span v-if="regionsLoaded">{{ region.interview.topic }}</span>
            <div id="audioplayer__buttons">
                <button @click="onSeekBackTen" class="back-ten" :disabled="!regionsLoaded"></button>
                <button @click="onPreviousRegion" class="previous" :disabled="!regionsLoaded"></button>
                <button v-if="isPlaying" @click="pauseAudio" class="pause" :disabled="!regionsLoaded"></button>
                <button v-else @click="playAudio" class="play" :disabled="!regionsLoaded"></button>
                <button @click="onNextRegion" class="next" :disabled="!regionsLoaded"></button>
                <button @click="onSeekForwardTen" class="forward-ten" :disabled="!regionsLoaded"></button>
            </div>
            <div id="audioplayer__bar">
                <div class="audioplayer__progress_time">{{ position | readableSeconds }}</div>
                <progress class="progress is-primary is-small" :value="position" :max="region.length"></progress>
                <div class="audioplayer__progress_time">{{ region.length | readableSeconds }}</div>
                <audio id="player" ref="player" v-bind:src="regionURL"></audio>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        mounted() {
            this.$store.commit('AUDIO_PLAYER', this.$refs.player);
        },
        methods: {
            playAudio() {
                this.$store.dispatch('PLAY_AUDIO', this.$store.getters.selectedRegion);
            },
            pauseAudio() {
                this.$store.dispatch('PAUSE_AUDIO');
            },
            onNextRegion() {
                this.$store.dispatch('NEXT_REGION', this.$store.getters.filteredRegions);
            },
            onPreviousRegion() {
                this.$store.dispatch('PREV_REGION', this.$store.getters.filteredRegions);
            },
            onSeekForwardTen() {
                this.$store.dispatch('SEEK_TEN_FORWARD');
            },
            onSeekBackTen() {
                this.$store.dispatch('SEEK_TEN_BACKWARD');
            }
        },
        computed: {
            position: function() {
                return this.$store.getters.POSITION;
            },
            region: function() {
                return this.$store.getters.selectedRegion;
            },
            regionURL: function () {
                return this.$store.getters.selectedRegion.interview.url;
            },
            isPlaying: function() {
                return this.$store.getters.IS_PLAYING;
            },
            regionsLoaded: function() {
                return this.$store.getters.regionsLoaded;
            }
        },
        filters: {
            // TODO: share this between components (it is copied from Region.vue)
            readableSeconds: function (value) {
                let date = new Date(null);
                date.setSeconds(value);
                return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
            }
        }
    }
</script>

<style>
    /*
    Note: it is possible to remove all the disabled attributes from the button options,
    then use "pointer-events: none" style for each button. However, this property only
    accounts for clicks and not tab behavior: disabled prevents click and tab behavior.
    */
    div[disabled], button[disabled] {
        background-color: white !important;
        border-color: #DBDBDB !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        opacity: 0.5 !important;
        cursor: not-allowed !important;
    }

    #audioplayer {
        background: #EFEFEF;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    #audioplayer__options {
        text-align: center;
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
        margin: 0 auto;
        width: 224px;
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

    #audioplayer__buttons .play {
        background-image: url("../../assets/av-controls/play-circle.svg");
    }

    #audioplayer__buttons .pause {
        background-image: url("../../assets/av-controls/pause-circle.svg");
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