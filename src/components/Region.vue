<template>
    <div class="region-row"
       @click="onRegionChosen(region)"
       @mouseenter="showOptions = true"
       @mouseleave="showOptions = false">
        <div class="region-col outer">
            <button v-if="isPlaying" @click="onPlayPause" class="pause"></button>
            <button v-else @click="onPlayPause" class="play"></button>
            <span class="position" v-else>{{ region.id }}.</span>
        </div>
        <div class="region-col outer">
            <button @click="addToPlaylist" class="playlist-add"></button>
        </div>
        <div class="region-col content">
            <span class="topic">{{ region.topic }}</span>
            <div class="tags">
                <button v-for="tag in region.tags">{{ tag }}</button>
            </div>
        </div>
        <div v-show="showOptions" class="region-col more">
            <button @click.stop="onOptions" class="options"></button>
        </div>
        <div class="region-col duration">
            <span>{{ region.audio.length | readableSeconds }}</span>
        </div>
    </div>
</template>

<script>
    // Sending data to AudioPlayer.vue
    import {EventBus} from '../EventBus.js'

    export default {
        props: ['region'],
        data: () => ({
            isPlaying: false,
            showOptions: false
        }),
        methods: {
            // These events also update the AudioPlayer, so we either need to couple the regions with it (bad idea)
            // or have an event bus between them, requiring a lifecycle hook on AudioPlayer.
            onPlayPause() {
                this.isPlaying = !this.isPlaying;
                // Fire event to audio player
            },
            addToPlaylist() {
                // Change local icon
                // Fire event to playlist (for animation)
            },
            onOptions() {
                // Display a dropdown with associated options
                console.log("We are on options only");
            },
            // Update the AudioPlayer with this particular region
            onRegionChosen(region) {
                EventBus.$emit('REGION_SELECTED', region);
            },
            // Show a read/unread icon to identify if the region was viewed
            // This should be a data variable? Same with Play/Pause?
            regionVisited() {
                // Show a read/unread icon to identify if the region was viewed

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