<template>
    <div id="regions__container">
      <region v-for="region in filteredRegions" :key="region.id" :region="region"></region>
    </div>
</template>

<script>
    import Region from './Region.vue'

    export default {
        props: ['selectedTags', 'selectedTopics', 'sortType'],
        data: () => ({
            regions: require('../data/regions.json').regions
        }),
        computed: {
            filteredRegions() {
                if (this.selectedTopics.length > 0 && this.selectedTags.length > 0) {
                    return this.regions.filter(
                        r => this.selectedTopics.includes(r.topic) &&
                        r.tags.some(tag => this.selectedTags.includes(tag))
                    )
                }
                let filterRegions = this.regions;

                if (this.selectedTopics.length > 0) {
                    filterRegions = this.regions.filter(r => this.selectedTopics.includes(r.topic))
                }

                if (this.selectedTags.length > 0) {
                    // This is currently OR (i.e. some) and should be AND instead;
                    filterRegions = this.regions.filter(r => r.tags.some(tag => this.selectedTags.includes(tag)))
                }

                // Calculate index; not the best place for this: Look into vue.set;
//                 for (let i=1,j=0; i <= filterRegions.length; i++, j++)
//                 {
//                     filterRegions[j]['index'] = i;
//                     this.$set(filterRegions[j].index, i);
//                 }

                return filterRegions;
            }
        },
        components: {
            Region
        }
    }
</script>

<style>
    #regions__container {
        border-top: 1px solid gold;
        margin-bottom: 1em;
        padding-bottom: 91px; /* The size of the navigation menu; this will change onAdvanced*/
    }

</style>