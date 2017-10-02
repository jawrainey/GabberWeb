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
            selectedTags: []
        }),
        methods: {
            onTagSelected () {
                this.$store.commit('setSelectedTags', this.selectedTags);
            }
        },
        computed: {
            tags() {
                return this.$store.getters.tags;
            }
        }
    }
</script>

<style>
    #filter__tags__container > li { display: inline-block; }
</style>