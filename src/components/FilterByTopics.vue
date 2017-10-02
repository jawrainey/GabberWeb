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
            topics: require('../data/topics.json'),
            selectedTopics: [],
        }),
        methods: {
            onTopicSelected () {
                this.$emit('onTopicSelected', this.selectedTopics)
            },
        }
    }
</script>