<template>
    <ul id="filter__tags__container">
        <li v-for="tag in tags">
            <label>
                <input
                    type="checkbox"
                    @click.capture="onTagSelected"
                    v-model="selectedTags"
                    v-bind:value="tag"
                />{{tag}}
            </label>
        </li>
    </ul>
</template>

<script>
    export default {
        data: () => ({
            tags: require('../data/tags.json'),
            selectedTags: [],
        }),
        methods: {
            onTagSelected () {
                this.$emit('onTagSelected', this.selectedTags)
            }
        }
    }
</script>

<style>
    #filter__tags__container > li { display: inline-block; }
</style>