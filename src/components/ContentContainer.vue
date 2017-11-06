<template>
    <div id="content__container">
        <filter-bar></filter-bar>
        <div id="regions__container">
            <div v-if="!regionsLoaded">Loading regions from Gabber ... {{ regionsLoaded }} </div>
            <region v-if="regionsLoaded" v-for="region in filteredRegions" :key="region.id" :region="region"></region>
        </div>
    </div>
</template>

<script>
    import FilterBar from './FilterBar/TheFilterBar.vue'
    import Region from './Region/Region.vue'
    import { mapGetters } from 'vuex'

    export default {
        mounted() {
            // TODO: this parameter should be based on URL [e.g. when using vue-router]
            this.$store.dispatch('FETCH_REGIONS_BY_PROJECT', 3);
        },
        computed: mapGetters({filteredRegions: 'filteredRegions', regionsLoaded: 'regionsLoaded'}),
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