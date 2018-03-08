<template lang="pug">
.columns.project-info
  .column.description
    p {{ project.description }}
  .column.is-narrow
    .buttons.is-right
      router-link.button.is-link.is-rounded.is-medium(:to="sessionsRoute")
        .icon: fa(icon="microphone")
        span Gabbers
      router-link.button.is-link.is-rounded.is-medium(:to="playlistsRoute")
        .icon: fa(icon="headphones")
        span Playlists
</template>

<script>
import { SESSION_LIST_ROUTE, PLAYLIST_LIST_ROUTE } from '@/const/routes'
import ProjectPropMixin from '@/mixins/ProjectProp'

export default {
  mixins: [ ProjectPropMixin ],
  computed: {
    sessionsRoute () {
      const params = { project_id: this.project.id }
      return { name: SESSION_LIST_ROUTE, params }
    },
    playlistsRoute () {
      const params = { project_id: this.project.id }
      return { name: PLAYLIST_LIST_ROUTE, params }
    }
  }
}
</script>

<style lang="sass">

.project-info
  border-top: 1px solid $border
  padding-top: 0.6em
  
  .column.description
    padding-left: 2.6em

</style>
