<template>
    <ul id="filter__topics__container">
        <li v-for="topic in topics">
            <label>
                <input
                    type="checkbox"
                    @click.capture="onTopicSelected"
                    v-model="selectedTopics"
                    v-bind:value="topic"
                />{{topic}}
            </label>
        </li>
    </ul>
</template>

<script>
    export default {
        data: () => ({
            selectedTopics: [],
        }),
        methods: {
            onTopicSelected () {
                this.$store.commit('setSelectedTopics', this.selectedTopics);
            },
        },
        computed: {
            topics() {
                return this.$store.getters.topics;
            }
        }
    }
</script>