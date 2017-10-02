<template>
    <div id="content__container">
        <filter-by-topics></filter-by-topics>
        <filter-by-tags></filter-by-tags>
        <region-container></region-container>
    </div>
</template>

<script>
    import FilterByTopics from './FilterByTopics.vue'
    import FilterByTags from './FilterByTags.vue'
    import RegionContainer from './RegionContainer.vue'

    export default {
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