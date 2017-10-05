<template>
    <div id="content__container">
        <filter-bar></filter-bar>
        <div id="regions__container">
            <region v-for="region in filteredRegions" :key="region.id" :region="region"></region>
        </div>
    </div>
</template>

<script>
    import FilterBar from './TheFilterBar.vue'
    import Region from './Region.vue'
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters({filteredRegions: 'filteredRegions'}),
        components: {
            FilterBar,
            Region
        }
    }
</script>

<style>
    #content__container {
        display: inline-block;
        width: 60%;
    }
    #regions__container {
        border-top: 1px solid gold;
        margin-bottom: 1em;
        padding-bottom: 91px; /* The size of the navigation menu; this will change onAdvanced*/
    }
</style>