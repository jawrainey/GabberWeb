<template>
    <div class="columns">
        <filter-by-topics class="column is-narrow"></filter-by-topics>
        <filter-by-tags class="column is-narrow"></filter-by-tags>
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