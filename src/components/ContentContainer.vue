<template>
    <div id="content__container">
        <filter-bar></filter-bar>
        <div id="regions__container" class="is-scrollable">
            <div v-if="!regionsLoaded">{{ regionsLoadedMessage }}</div>
            <div class="is-scroll-container">
                <region v-if="regionsLoaded" v-for="region in filteredRegions" :key="region.id" :region="region"></region>
            </div>
        </div>
    </div>
</template>

<script>
    import FilterBar from './FilterBar/TheFilterBar.vue'
    import Region from './Region/Region.vue'
    import { mapGetters } from 'vuex'

    export default {
        created () {
            this.fetchRegions();
        },
        watch: {
            // When this route is activated (e.g. changes) we want to fetch the regions for
            // the new route (based on the projectID parameter). This also lets us display
            // the loading state while the data is being fetched (e.g. fetching after navigation).
            '$route': 'fetchRegions'
        },
        methods: {
          fetchRegions () {
              this.$store.dispatch('FETCH_REGIONS_BY_PROJECT', this.$route.params.projectID);
          }
        },
        computed: mapGetters({
            filteredRegions: 'filteredRegions',
            regionsLoaded: 'regionsLoaded',
            regionsLoadedMessage: 'regionsLoadedMessage'
        }),
        components: {
            FilterBar,
            Region
        }
    }
</script>

<style>
    #content__container {
        display: inline-block;
        width: 70%;
    }
    #regions__container {
        border-top: 1px solid gold;
        padding-bottom: 91px; /* The size of the navigation menu; this will change onAdvanced*/
    }
    .is-scrollable {
        overflow-y: scroll;
    }
    .is-scroll-container {
        height: 50vh;
    }
</style>