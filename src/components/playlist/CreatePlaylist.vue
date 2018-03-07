<template>
    <div class="field">
        <div class="control">
            <input class="input" v-model="playlistName" type="text" placeholder="Playlist name">
        </div>
        <div class="control">
            <a class="button" @click="$emit('closeCreatePlaylist')">Cancel</a>
            <a class="button is-primary" @click="createPlaylist">Submit</a>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    playlistName: ''
  }),
  methods: {
    createPlaylist () {
      this.$store.dispatch('CREATE_NEW_PLAYLIST', { 'name': this.playlistName })
      this.$emit('closeCreatePlaylist')
    }
  }
}
</script>
