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
            <span class="topic">{{ region.interview.topic }}</span>
            <p class="note" v-if="showNote && isViewingUserPlaylist">{{ showRegionNote }}</p>
            <div class="tags" v-bind:class="{ showTags: showTags }">
                <span class="tag" v-for="tag in region.tags">{{ tag }}</span>
            </div>
        </div>
        <div class="region-col more">
            <div v-if="onHover" class="dropdown is-active">
                <div class="dropdown-trigger">
                    <button @click.stop="showOptions = !showOptions" class="options"></button>
                </div>
                <div v-if="showOptions" class="dropdown-menu more-options">
                    <div class="dropdown-content">
                        <a :href="region.interview.uri" @click.stop="" target="_blank" class="dropdown-item">View in context</a>
                        <a v-if="isViewingUserPlaylist" @click.stop="showNote = !showNote" class="dropdown-item">
                            <span v-if="showNote">Hide</span><span v-else>Show</span> note
                        </a>
                        <a @click.stop="showTags = !showTags" class="dropdown-item">
                            <span v-if="showTags">Hide</span><span v-else>Show</span> all tags
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="region-col duration">
            <span>{{ readableSeconds(region.length) }}</span>
        </div>
    </div>
</template>

<script>
import AddRegionToPlayListMenu from './AddRegionToPlayListMenu.vue'
import {utilsMixin} from '../../mixins/index'

export default {
  props: ['region'],
  mixins: [utilsMixin],
  components: {
    AddRegionToPlayListMenu
  },
  data: () => ({
    onHover: false,
    showOptions: false,
    showNote: true,
    showTags: false
  }),
  methods: {
    // Update the AudioPlayer with this particular region
    onRegionChosen (region) {
      this.$store.dispatch('SET_SELECTED_REGION', region)
    },
    toggleSelectedPlaylist () {
      this.$store.commit('showPlayListMenu', this.region.id)
    }
  },
  computed: {
    isRegionSelected () {
      return (this.region.id === this.$store.getters.selectedRegion.id)
    },
    isRegionPlaying () {
      return (this.isRegionSelected && this.$store.getters.IS_PLAYING)
    },
    selectedPlaylist () {
      return this.$store.getters.showPlayListMenu === this.region.id
    },
    isViewingUserPlaylist () {
      return this.$route.name === 'userPlaylist'
    },
    showRegionNote () {
      return this.region.note || 'You did not add a note for this region'
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
        /*height: 3.5em;*/
        cursor: pointer;
        transition: background-color .2s linear;
    }
        .region-row.is-selected, .region-row:hover {
            background-color: #CCC;
        }

        /* Sane overrides */
        .region-row .dropdown-content {
            border-radius: 0;
            padding: 0;
        }
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
            font-size: 0.8em;
            margin-top: 5px;
            margin-left: 5px;
        }

        .region-col.outer .play {
            background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04IDV2MTRsMTEtN3oiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+");
        }

        .region-col.outer .pause {
            background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik02IDE5aDRWNUg2djE0em04LTE0djE0aDRWNWgtNHoiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+");
        }

        .region-col.outer .playlist-add {
            background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNCAxMEgydjJoMTJ2LTJ6bTAtNEgydjJoMTJWNnptNCA4di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00ek0yIDE2aDh2LTJIMnYyeiIvPgo8L3N2Zz4=");
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

        .region-col.content .note {
            display: block;
            margin-bottom: .5em;
        }

        .region-col.content .tags {
            font-size: .8em;
        }

    .region-col.more {
        margin-top: 0;
        width: 1.68em;
        margin-right: auto;
    }
        .options {
            background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik02IDEwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptMTIgMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bS02IDBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPgo8L3N2Zz4=");
        }

        .more-options {
            /* TODO: temporary HACK */
            left: -500%;
            top: 12px;
            min-width: 0;
        }

    .region-col.duration {
        font-size: 0.8em;
        font-feature-settings: "tnum";
        text-align: center;
        margin-top: 4px;
    }

    .tag:not(body) {
        height: 1.68em;
    }
    .tags:last-child {
        /* Removes the large (1em) default margin-bottom property */
        margin: 0 !important;
    }
    .tags {
        margin: .8em 0;
        /* This prevents multi-line tags for consistent UX, and is removed on-click */
        height: 28px;
    }
    .showTags {
        height: auto !important;
    }

</style>
