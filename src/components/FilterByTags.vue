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
    import { mapGetters } from 'vuex'

    export default {
        data: () => ({
            selectedTags: []
        }),
        methods: {
            onTagSelected () {
                this.$store.commit('setSelectedTags', this.selectedTags);
            }
        },
        computed: mapGetters({tags: 'tags'})
    }
</script>

<style>
    #filter__tags__container > li { display: inline-block; }
</style>