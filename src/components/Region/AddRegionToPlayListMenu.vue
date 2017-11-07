<template>
    <div class="dropdown is-active" @click.stop="">
        <div class="dropdown-menu" id="add-to-playlist-menu" role="menu">
            <div class="dropdown-content">
                <div class="dropdown-item">
                    <p>Add region to ...</p>
                </div>
                <hr class="dropdown-divider">
                <div class="dropdown-item control" v-for="playlist in allUserPlaylists">
                    <label>
                        <input
                            type="checkbox"
                            class="checkbox"
                            v-model="isRegionInPlayList"
                            v-bind:value="playlist.id"
                            @change="addRemove(playlist, $event)"
                        />
                        <span>{{ playlist.title }}</span>
                    </label>
                    <add-note-to-region
                        :region="region"
                        :playlist="playlist"
                        v-if="showAddRegionNote">
                    </add-note-to-region>
                </div>
                <hr class="dropdown-divider">
                <div class="dropdown-item">
                    <div class="control" @click="showCreatePlaylist = !showCreatePlaylist">
                        <button class="add-to-playlist"></button>
                        <span>Create playlist</span>
                    </div>
                    <create-playlist
                        @closeCreatePlaylist="showCreatePlaylist = false;"
                        v-if="showCreatePlaylist">
                    </create-playlist>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CreatePlaylist from '../Playlist/CreatePlaylist.vue'
    import AddNoteToRegion from './AddNoteToRegion.vue'

    export default {
        props: ["region"],
        components: {
            CreatePlaylist,
            AddNoteToRegion
        },
        data: () => ({
            showCreatePlaylist: false
        }),
        methods: {
            addRemove(playlist, event) {
                let payload = {'regionID': this.region.id, 'playlistID': playlist.id, 'userID': 1};
                // This is fired after checked; did the user check a playlist?
                if (event.target.checked) {
                    this.$store.dispatch('ADD_REGION_TO_PLAYLIST', payload);
                    this.$store.commit('showAddRegionNote', true);
                }
                else {
                    this.$store.dispatch('REMOVE_REGION_FROM_PLAYLIST', payload);
                }
            }
        },
        computed: {
            allUserPlaylists() {
                return this.$store.getters.userPlayLists;
            },
            showAddRegionNote() {
                return this.$store.getters.showAddRegionNote;
            },
            // Used to show which playlists the selected region are in, which are represented in checkboxes.
            isRegionInPlayList: {
                get() {
                    // This ensures that components are recalculated when opened,
                    // which maps to user interactions when selecting a region.
                    return this.$store.getters.selectedPlaylistsForRegion(this.region.id);
                },
                // The problem I had was: it is tricky to map selectedItems to a checkbox across components.
                // We would have to store the state of each component, which feels wrong.
                // Instead, I have opted to recalculate the state each time the component is opened, and,
                // rather than updating the list of selected items here, it is updated when the playlist
                // is selected above. This exists to initially bind the selectedPlaylists, and allow
                // user interactions with the checkbox to work as expected.
                set(selectedPlaylistID) {}
            }
        }
    }
</script>

<style>
    .add-to-playlist { background-image: url("../../assets/add.svg"); }
</style>