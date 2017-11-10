<template>
    <div class="is-scrollable">
        <div class="is-scroll-container">
            <ul>
                <play-list-item v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></play-list-item>
            </ul>
        </div>
    </div>
</template>

<script>
    import PlayListItem from './PlayListItem.vue'
    import { mapGetters } from 'vuex'

    export default {
        mounted() {
            // TODO: change userID based on router...
            this.$store.dispatch('FETCH_USER_PLAYLISTS', 1);
        },
        computed: mapGetters({playlists: 'userPlayLists'}),
        components : { 'playListItem': PlayListItem }
    }
</script>