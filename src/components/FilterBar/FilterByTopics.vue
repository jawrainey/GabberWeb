<template>
    <div class="dropdown" v-bind:class="{ 'is-active': isActive }" :disabled="!regionsLoaded">
        <div class="dropdown-trigger">
            <button @click="filterApplied" class="button is-white" :disabled="!regionsLoaded">
                <span>Topics</span>
                <span v-if="selectedTopics.length >= 1" class="number-selected">{{ selectedTopics.length }}</span>
                <span v-bind:class="[isActive ? 'arrow-up' : 'arrow-down']"></span>
            </button>
        </div>
        <div class="dropdown-menu topicSelection" role="menu">
            <div class="dropdown-content">
                <div class="dropdown-item">
                    <div class="control" v-for="topic in topics">
                        <label>
                            <input
                                type="checkbox"
                                class="checkbox"
                                @click.capture="onTopicSelected"
                                v-model="selectedTopics"
                                v-bind:value="topic"
                            />
                            <span class="numSelected">{{ numRegionsPerTopic(topic) }}</span>
                            <span class="topic">{{ topic }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    // Yeah ... we should not do this. Given this component shares so much
    // with the other filter (by tags) and likely the others, then we should
    // refactor this into slots; however, how best we expose this local state (isActive)
    // currently eludes me. I could put the logic in shared state (for each filter dropdown),
    // but that feels wrong.
    import {AudioBus} from '../../AudioBus.js';

    export default {
        created() {
            this.projectChangedUI();
        },
        watch: {
            '$route': 'projectChangedUI'
        },
        data: () => ({
            isActive: false,
            selectedTopics: []
        }),
        mounted() {
            AudioBus.$on('FILTER_TAGS_APPLIED', () => {
                this.isActive = false;
            });
        },
        methods: {
            projectChangedUI() {
                this.isActive = false;
                this.selectedTopics = [];
                this.$store.dispatch('FETCH_TOPICS', this.$route.params.projectID);
            },
            onTopicSelected () {
                this.$store.commit('setSelectedTopics', this.selectedTopics);
            },
            filterApplied () {
                this.isActive = !this.isActive;
                if (this.isActive) {
                    AudioBus.$emit('FILTER_TOPICS_APPLIED');
                }
            }
        },
        computed: mapGetters({
            regionsLoaded: 'regionsLoaded',
            topics: 'topics',
            numRegionsPerTopic: 'numRegionsPerTopic'
        })
    }
</script>

<style>
    .topicSelection .dropdown-content {
        max-width: 40%;
    }

    .control {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* The following are shaped between filters; need to refactor this out */
    .arrow-up, .arrow-down {
        height: 24px;
        width: 24px;
    }

    .topicSelection .numSelected {
        font-weight: 600;
        font-size: .75em;
        float: right;
        padding: 0.2em 0 0 1em;
    }
    .topic {
        padding-right: 1em;
    }


    .arrow-up { background-image: url("../../assets/arrow-up.svg"); }
    .arrow-down { background-image: url("../../assets/arrow-down.svg"); }
</style>