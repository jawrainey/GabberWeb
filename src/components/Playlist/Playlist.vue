<template>
    <div class="is-scrollable">
        <span v-if="userPlayLists.length <= 0">You have not created any playlists.</span>
        <div class="is-scroll-container">
            <ul>
                <play-list-item v-for="playlist in userPlayLists" :key="playlist.id" :playlist="playlist"></play-list-item>
            </ul>
        </div>
    </div>
</template>

<script>
    import PlayListItem from './PlayListItem.vue'
    import { mapGetters } from 'vuex'

    export default {
      mounted () {
        this.$store.dispatch('FETCH_USER_PLAYLISTS')
      },
      computed: mapGetters(['userPlayLists']),
      components: { 'playListItem': PlayListItem }
    }
</script>
