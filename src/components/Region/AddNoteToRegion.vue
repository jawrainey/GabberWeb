<template>
    <div class="modal"
        v-bind:class="{ 'is-active': this.$store.getters.showAddRegionNote }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add a note to the selected region</p>
                <button class="delete" @click="closeModal" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <div class="control">
                        <textarea v-model="regionNote" class="textarea is-primary" placeholder="This will help structure your playlist later"></textarea>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot is-pulled-right">
                <button class="button" @click.stop="closeModal">Skip</button>
                <button class="button is-success" @click.stop="addNote()">Add note</button>
            </footer>
        </div>
    </div>
</template>

<script>
    // TODO: scroll disabled AND click outside to hide
    export default {
      props: ['region', 'playlist'],
      data: () => ({
        regionNote: ''
      }),
      methods: {
        addNote () {
          let payload = {
            'note': this.regionNote,
            'regionID': this.region.id,
            'playlistID': this.$store.getters.lastSelectedPlaylistID
          }
          this.$store.dispatch('ADD_NOTE_TO_REGION_IN_PLAYLIST', payload)
          this.closeModal()
        },
        closeModal () {
          // Modifies the UI state only; this is where module namespaces would help.
          this.$store.commit('showAddRegionNote', false)
          this.$store.commit('showPlayListMenu', -1)
        }
      }
    }
</script>

<style>
    /* https://github.com/jgthms/bulma/issues/516 */
    .is-pulled-right { justify-content: flex-end; }
</style>