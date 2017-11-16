<template>
    <footer id="audioplayer">
        <div id="audioplayer__options" :disabled="!regionsLoaded">
            <span v-if="regionsLoaded">{{ selectedRegion.interview.topic }}</span>
            <div id="audioplayer__buttons">
                <button @click="SEEK_TEN_BACKWARD" class="back-ten" :disabled="!regionsLoaded"></button>
                <button @click="PREV_REGION(filteredRegions)" class="previous" :disabled="!regionsLoaded"></button>
                <button v-if="IS_PLAYING" @click="PAUSE_AUDIO" class="pause" :disabled="!regionsLoaded"></button>
                <button v-else @click="PLAY_AUDIO(selectedRegion)" class="play" :disabled="!regionsLoaded"></button>
                <button @click="NEXT_REGION(filteredRegions)" class="next" :disabled="!regionsLoaded"></button>
                <button @click="SEEK_TEN_FORWARD" class="forward-ten" :disabled="!regionsLoaded"></button>
            </div>
            <vue-slider @callback="PAUSE_PLAY" v-model="position" :tooltip="false" :max="selectedRegion.length"></vue-slider>
            <div id="audioplayer__bar">
                <div class="audioplayer__progress_time">{{ readableSeconds(position) }}</div>
                <div class="audioplayer__progress_time">{{ readableSeconds(selectedRegion.length) }}</div>
                <audio id="player" ref="player" v-bind:src="selectedRegion.interview.url"></audio>
            </div>
        </div>
    </footer>
</template>

<script>
    import vueSlider from 'vue-slider-component';
    import {utilsMixin} from '../../mixins/index'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        components: {
            vueSlider
        },
        mixins: [utilsMixin],
        mounted() {
            this.$store.commit('AUDIO_PLAYER', this.$refs.player);
        },
        methods: {
            ...mapActions(['PLAY_AUDIO', 'PAUSE_AUDIO', 'NEXT_REGION', 'PREV_REGION', 'SEEK_TEN_FORWARD','SEEK_TEN_BACKWARD']),
            PAUSE_PLAY() {
                // This is called when the slider is moved. As the position is updated
                // when play is called 'fresh' it invokes the updated position.
                this.PAUSE_AUDIO();
                this.PLAY_AUDIO(this.selectedRegion);
            }
        },
        computed: {
            ...mapGetters(['selectedRegion', 'filteredRegions', 'IS_PLAYING', 'regionsLoaded']),
            position: {
                get() {
                    return this.$store.getters.POSITION;
                },
                set(position) {
                    this.$store.commit('UPDATE_POSITION', position);
                }
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
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGlkPSJhIi8+CiAgICA8L2RlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImIiPgogICAgICAgIDx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICA8L2NsaXBQYXRoPgogICAgPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNMTIgNVYxTDcgNmw1IDVWN2MzLjMgMCA2IDIuNyA2IDZzLTIuNyA2LTYgNi02LTIuNy02LTZINGMwIDQuNCAzLjYgOCA4IDhzOC0zLjYgOC04LTMuNi04LTgtOHptLTEuMSAxMUgxMHYtMy4zTDkgMTN2LS43bDEuOC0uNmguMVYxNnptNC4zLTEuOGMwIC4zIDAgLjYtLjEuOGwtLjMuNnMtLjMuMy0uNS4zLS40LjEtLjYuMS0uNCAwLS42LS4xLS4zLS4yLS41LS4zLS4yLS4zLS4zLS42LS4xLS41LS4xLS44di0uN2MwLS4zIDAtLjYuMS0uOGwuMy0uNnMuMy0uMy41LS4zLjQtLjEuNi0uMS40IDAgLjYuMWMuMi4xLjMuMi41LjNzLjIuMy4zLjYuMS41LjEuOHYuN3ptLS45LS44di0uNXMtLjEtLjItLjEtLjMtLjEtLjEtLjItLjItLjItLjEtLjMtLjEtLjIgMC0uMy4xbC0uMi4ycy0uMS4yLS4xLjN2MnMuMS4yLjEuMy4xLjEuMi4yLjIuMS4zLjEuMiAwIC4zLS4xbC4yLS4ycy4xLS4yLjEtLjN2LTEuNXoiLz4KPC9zdmc+");
    }

    #audioplayer__buttons .previous {
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik02IDZoMnYxMkg2em0zLjUgNmw4LjUgNlY2eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=");
    }

    #audioplayer__buttons .play {
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMCAxNi41bDYtNC41LTYtNC41djl6TTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPgo8L3N2Zz4=");
    }

    #audioplayer__buttons .pause {
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTEgMTRIOVY4aDJ2OHptNCAwaC0yVjhoMnY4eiIvPgo8L3N2Zz4=");
    }

    #audioplayer__buttons .next {
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik02IDE4bDguNS02TDYgNnYxMnpNMTYgNnYxMmgyVjZoLTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==");
    }

    #audioplayer__buttons .forward-ten {
        background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjQgMjRIMFYwaDI0djI0eiIgaWQ9ImEiLz4KICAgIDwvZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYiI+CiAgICAgICAgPHVzZSBvdmVyZmxvdz0idmlzaWJsZSIgeGxpbms6aHJlZj0iI2EiLz4KICAgIDwvY2xpcFBhdGg+CiAgICA8cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGQ9Ik00IDEzYzAgNC40IDMuNiA4IDggOHM4LTMuNiA4LThoLTJjMCAzLjMtMi43IDYtNiA2cy02LTIuNy02LTYgMi43LTYgNi02djRsNS01LTUtNXY0Yy00LjQgMC04IDMuNi04IDh6bTYuOCAzSDEwdi0zLjNMOSAxM3YtLjdsMS44LS42aC4xVjE2em00LjMtMS44YzAgLjMgMCAuNi0uMS44bC0uMy42cy0uMy4zLS41LjMtLjQuMS0uNi4xLS40IDAtLjYtLjEtLjMtLjItLjUtLjMtLjItLjMtLjMtLjYtLjEtLjUtLjEtLjh2LS43YzAtLjMgMC0uNi4xLS44bC4zLS42cy4zLS4zLjUtLjMuNC0uMS42LS4xLjQgMCAuNi4xLjMuMi41LjMuMi4zLjMuNi4xLjUuMS44di43em0tLjgtLjh2LS41cy0uMS0uMi0uMS0uMy0uMS0uMS0uMi0uMi0uMi0uMS0uMy0uMS0uMiAwLS4zLjFsLS4yLjJzLS4xLjItLjEuM3Yycy4xLjIuMS4zLjEuMS4yLjIuMi4xLjMuMS4yIDAgLjMtLjFsLjItLjJzLjEtLjIuMS0uM3YtMS41eiIvPgo8L3N2Zz4=");
    }
</style>