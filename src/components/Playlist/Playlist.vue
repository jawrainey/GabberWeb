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
        computed: mapGetters({playlists: 'userPlayLists'}),
        components : { 'playListItem': PlayListItem }
    }
</script>

<style>
    #playlist__container { cursor: pointer; display: flex; width: 30%; float: left; border-right: 1px solid gold; }
</style>