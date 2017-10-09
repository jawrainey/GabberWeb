<template>
    <div class="region-row"
       v-bind:class="{ 'is-selected': isRegionSelected }"
       @click="onRegionChosen(region)"
       @mouseenter="onHover = true"
       @mouseleave="onHover = false; showOptions = false">
        <div class="region-col outer">
            <button v-if="isRegionPlaying" class="pause"></button>
            <button v-else-if="onHover && !isRegionPlaying" class="play"></button>
            <span v-else-if="!onHover" class="position">{{ region.id }}.</span>
        </div>
        <div class="region-col outer">
            <button @click.stop="toggleSelectedPlaylist" class="playlist-add"></button>
            <add-region-to-play-list-menu
                :region="region"
                v-if="selectedPlaylist">
            </add-region-to-play-list-menu>
        </div>
        <div class="region-col content">
            <span class="topic">{{ region.topic }}</span>
            <div class="tags">
                <span class="tag" v-for="tag in region.tags">{{ tag }}</span>
            </div>
        </div>
        <div class="region-col more">
            <div v-if="onHover" class="dropdown is-active">
                <div class="dropdown-trigger">
                    <button @click.stop="showOptions = !showOptions" class="options"></button>
                </div>
                <div v-if="showOptions" class="dropdown-menu">
                    <div class="dropdown-content">
                        <a href="#" @click.stop="" class="dropdown-item ">View in context</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="region-col duration">
            <span>{{ region.audio.length | readableSeconds }}</span>
        </div>
    </div>
</template>

<script>
    import AddRegionToPlayListMenu from './AddRegionToPlayListMenu.vue'

    export default {
        props: ['region'],
        components: {
            AddRegionToPlayListMenu
        },
        data: () => ({
            onHover: false,
            showOptions: false
        }),
        methods: {
            // Update the AudioPlayer with this particular region
            onRegionChosen(region) {
                this.$store.commit('setSelectedRegion', region);
            },
            toggleSelectedPlaylist() {
                this.$store.commit('showPlayListMenu', this.region.id);
            }
        },
        computed: {
            isRegionSelected() {
                return (this.region.id === this.$store.getters.selectedRegion.id);
            },
            isRegionPlaying() {
                return (this.isRegionSelected && this.$store.getters.isAudioPlaying)
            },
            selectedPlaylist() {
                return this.$store.getters.showPlayListMenu === this.region.id;
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
    .play, .pause, .playlist-add, .options, .add-to-playlist {
        height: 24px;
        width: 24px;
        cursor: pointer;
        border: none;
        background-color: transparent;
        background-repeat: no-repeat;
    }

    .play:focus, .pause:focus, .playlist-add:focus, .options:focus {
        outline: none;
    }

    .region-row {
        display: -ms-flexbox;
        display: flex;
        height: 3.5em;
        cursor: pointer;
        transition: background-color .2s linear;
    }
        .region-row.is-selected, .region-row:hover {
            background-color: #EFEFEF;
        }

        /* Sane overrides */
        .region-row .dropdown-content {
            border-radius: 0;
            padding: 0;
        }
        .region-row .dropdown-menu { min-width: 6rem; }
        .region-row .dropdown-item { padding-right: 1rem; }

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
            background-image: url("../../assets/play.svg");
        }

        .region-col.outer .pause {
            background-image: url("../../assets/pause.svg");
        }

        .region-col.outer .playlist-add {
            background-image: url("../../assets/playlist-add.svg");
        }

    .region-col.content {
        text-align: left;
        -ms-flex: 1;
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0;
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
            background-image: url("../../assets/options.svg");
        }

    .region-col.duration {
        font-size: 0.8em;
        font-feature-settings: "tnum";
        width: 2.52em;
        text-align: center;
        margin-top: 4px;
    }

    .tag:not(body) {
        height: 1.68em;
    }
</style>