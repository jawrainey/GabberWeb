<template>
    <div class="is-scrollable">
        <div v-if="!regionsLoaded">{{ regionsLoadedMessage }}</div>
        <div class="is-scroll-container">
            <region v-if="regionsLoaded" v-for="region in filteredRegions" :key="region.id" :region="region"></region>
        </div>
    </div>
</template>

<script>
import FilterBar from '../FilterBar/TheFilterBar.vue'
import Region from '../Region/Region.vue'
import { mapGetters } from 'vuex'

export default {
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
    .is-scrollable {
        max-width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .is-scroll-container {
        height: 70vh;
    }
</style>
