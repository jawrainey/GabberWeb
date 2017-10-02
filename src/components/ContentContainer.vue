<template>
    <div id="content__container">
        <filter-by-topics></filter-by-topics>
        <filter-by-tags></filter-by-tags>
        <div id="regions__container">
            <region v-for="region in filteredRegions" :key="region.id" :region="region"></region>
        </div>
    </div>
</template>

<script>
    import FilterByTopics from './FilterByTopics.vue'
    import FilterByTags from './FilterByTags.vue'
    import Region from './Region.vue'
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters({filteredRegions: 'filteredRegions'}),
        components: {
            FilterByTopics,
            FilterByTags,
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