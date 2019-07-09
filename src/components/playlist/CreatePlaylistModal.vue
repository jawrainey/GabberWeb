<template lang="pug">
playlist-modal(
  :title="$t('comp.playlist.create.title')",
  :action="$t('comp.playlist.create.form.buttons.submit')",
  :playlist="playlist",
  :isActive="isActive",
  @cancel="$emit('cancel')",
  @submit="createPlaylist"
)
</template>

<script>
import { SAVE_PLAYLIST } from '@/const/mutations'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import PlaylistModal from '@/components/playlist/PlaylistModal'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { PlaylistModal },
  props: {
    isActive: { type: Boolean, default: false },
    playlist: { type: Object, required: true }
  },
  methods: {
    async createPlaylist () {
      this.startApiWork()

      let { meta, data } = await this.$api.createPlaylist(
        this.playlist.name, this.playlist.description, this.playlist.annotations)

      if (meta.success) {
        this.$store.commit(SAVE_PLAYLIST, data)
        this.$emit('submit', data)
      }
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass" scoped>
  .align-right
    justify-content: flex-end
</style>
