<template>
    <div class="region-row"
       @click="onRegionChosen(region)"
       @mouseenter="onHover = true"
       @mouseleave="onHover = false">
        <div class="region-col outer">
            <button v-if="isRegionPlaying" class="pause"></button>
            <button v-else-if="onHover && !isRegionPlaying" class="play"></button>
            <span v-else-if="!onHover" class="position">{{ region.id }}.</span>
        </div>
        <div class="region-col outer">
            <button class="playlist-add"></button>
        </div>
        <div class="region-col content">
            <span class="topic">{{ region.topic }}</span>
            <div class="tags">
                <button v-for="tag in region.tags">{{ tag }}</button>
            </div>
        </div>
        <div v-show="onHover" class="region-col more">
            <button @click.stop="" class="options"></button>
        </div>
        <div class="region-col duration">
            <span>{{ region.audio.length | readableSeconds }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['region'],
        data: () => ({ onHover: false }),
        methods: {
            // Update the AudioPlayer with this particular region
            onRegionChosen(region) {
                this.$store.commit('setSelectedRegion', region);
            },
            addToPlaylist() {},
            onOptions() {}
        },
        computed: {
            isRegionPlaying() {
                let selectedRegion = this.$store.getters.selectedRegion.id;
                let isAudioPlaying = this.$store.getters.isAudioPlaying;
                return (this.region.id === selectedRegion && isAudioPlaying)
            }
        },
        filters: {
            readableSeconds: function (value) {
                let date = new Date(null);
                date.setSeconds(value);
                return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
            }
        }
    }
</script>

<style>
    /* Shared between buttons: needs fixed as they are button elements */
    .play, .pause, .playlist-add, .options {
        height: 24px;
        width: 24px;
        cursor: pointer;
        border: none;
        background-color: transparent;
        background-repeat: no-repeat;
    }

    .region-row {
        display: -ms-flexbox;
        display: flex;
        height: 3.05em;
        cursor: pointer;
        transition: background-color .2s linear;
    }
        .region-row:hover {
            background-color: #EFEFEF;
        }

    .region-col {
        display: block;
        margin: 0.25em 0;
    }

    .region-col.outer {
        font-size: .9em;
        width: 2.52em;
    }
        .position {
            display: block;
            margin-top: 4px;
        }
        
        .region-col.outer .play {
            background-image: url("../assets/play.svg");
        }

        .region-col.outer .pause {
            background-image: url("../assets/pause.svg");
        }

        .region-col.outer .playlist-add {
            background-image: url("../assets/playlist-add.svg");
        }

    .region-col.content {
        text-align: left;
        -ms-flex: 1;
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
        .region-col.content .topic {
            font-size: .9em;
            font-weight: 600;
        }
        .region-col.content .tags {
            font-size: .8em;
        }

    .region-col.more {
        margin-top: 0;

    }
        .options {
            background-image: url("../assets/options.svg");
        }

    .region-col.duration {
        font-size: 0.8em;
        font-feature-settings: "tnum";
        width: 2.52em;
        text-align: center;
        margin-top: 4px;
    }

</style>