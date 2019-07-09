<template lang="pug">
playlist-modal(
  :title="$t('comp.playlist.edit.title')",
  :action="$t('comp.playlist.edit.form.buttons.submit')",
  :playlist="playlist",
  :isActive="isActive",
  @cancel="$emit('cancel')",
  @submit="editPlaylist"
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
    async editPlaylist () {
      this.startApiWork()

      let { meta, data } = await this.$api.editPlaylist(
        this.playlist.id, this.playlist.name, this.playlist.description,
        this.playlist.annotations, this.playlist.annotations.map(a => a.id))

      if (meta.success) {
        this.$store.commit(SAVE_PLAYLIST, data)
        this.$emit('submit')
      }
      this.endApiWork(meta)
    }
  }
}
</script>
