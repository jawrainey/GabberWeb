<template>
    <div id="playlist__container">
        <ul>
            <play-list-item v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></play-list-item>
        </ul>
    </div>
</template>

<script>
    import PlayListItem from './PlayListItem.vue'

    export default {
        data: () => (
            {
                playlists: [
                {
                    'name': 'CDT teaching',
                    'totalTime': '08:15',
                    'numberOfRegions': 4
                },
                {
                    'name': 'Research methods',
                    'totalTime': '06:12',
                    'numberOfRegions': 5
                }
                ]
            }),
        components : { 'playListItem': PlayListItem }
    }
</script>

<style>
    #playlist__container { cursor: pointer; display: flex; width: 30%; float: left; border-right: 1px solid gold; }
</style>