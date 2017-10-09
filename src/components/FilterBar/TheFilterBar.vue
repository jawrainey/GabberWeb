<template>
    <div class="columns">
        <filter-by-topics></filter-by-topics>
        <filter-by-tags></filter-by-tags>
    </div>
</template>

<script>
    import FilterByTopics from './FilterByTopics.vue'
    import FilterByTags from './FilterByTags.vue'

    export default {
        components: {
            FilterByTopics,
            FilterByTags
        }
    }
</script>