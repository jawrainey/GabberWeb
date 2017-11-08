<template>
    <div id="playlist__container">
        <ul>
            <play-list-item v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></play-list-item>
        </ul>
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

<style>
    #playlist__container { cursor: pointer; display: flex; width: 25%; float: left; border-right: 1px solid gold; }
</style>