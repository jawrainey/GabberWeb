<template>
    <div id="content__container">
        <filter-by-topics @onTopicSelected="setSelectedTopics"></filter-by-topics>
        <filter-by-tags></filter-by-tags>
        <region-container :selectedTopics="selectedTopics"></region-container>
    </div>
</template>

<script>
    import FilterByTopics from './FilterByTopics.vue'
    import FilterByTags from './FilterByTags.vue'
    import RegionContainer from './RegionContainer.vue'

    // Uncomfortable with this solution, however, it does decouple logic from region container
    // Hack like as alternative to emitting? this.$children.find(r => r.selectedTags).selectedTags
    export default {
        data: () => ({
            // These are being set by the associated filters in their own components (this child)
            // which are then used to compute in the regionContainer child.
            selectedTopics: [],
        }),
        methods: {
            setSelectedTopics(selectedTopics) { this.selectedTopics = selectedTopics; }
        },
        components: {
            FilterByTopics,
            FilterByTags,
            RegionContainer
        }
    }
</script>

<style>
    #content__container {
        display: inline-block;
        width: 60%;
    }
</style>