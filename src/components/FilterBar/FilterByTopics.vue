<template>
    <div class="dropdown column is-one-quarter" v-bind:class="{ 'is-active': isActive }">
        <div class="dropdown-trigger">
            <button @click="filterApplied" class="button is-white">
                <span>Topics</span>
                <span v-if="selectedTopics.length >= 1" class="number-selected">{{ selectedTopics.length }}</span>
                <span v-bind:class="[isActive ? 'arrow-up' : 'arrow-down']"></span>
            </button>
        </div>
        <div class="dropdown-menu" role="menu">
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
                            <span>{{ topic }}</span>
                            <span class="numSelected">{{ numRegionsPerTopic(topic) }}</span>
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
        data: () => ({
            isActive: false,
            selectedTopics: []
        }),
        mounted() {
            AudioBus.$on('FILTER_TAGS_APPLIED', () => {
                this.isActive = false;
            });
            // TODO: have a guess ...
            this.$store.dispatch('FETCH_TOPICS', 3);
        },
        methods: {
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
        computed: mapGetters({topics: 'topics', numRegionsPerTopic: 'numRegionsPerTopic'})
    }
</script>

<style>
    /* The following are shaped between filters; need to refactor this out */
    .arrow-up, .arrow-down {
        height: 24px;
        width: 24px;
    }

    .numSelected {
        font-weight: 600;
        font-size: .75em;
    }

    .arrow-up { background-image: url("../../assets/arrow-up.svg"); }
    .arrow-down { background-image: url("../../assets/arrow-down.svg"); }
    input[type="checkbox"] { margin-right: .8rem; }

    .control {
        overflow: hidden;
        white-space: nowrap;
    }
    .control:not(:last-child) {
        padding-bottom: .42rem;
    }

    .checkbox {
        position: relative;
        top: -0.19rem;
        cursor: pointer;
    }
    .checkbox:before {
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        content: "";
        position: absolute;
        left: 0;
        z-index: 1;
        width: 1rem;
        height: 1rem;
        border: 2px solid #CCC;
    }
    .checkbox:checked:before {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        height: .5rem;
        border-color: #009688;
        border-top-style: none;
        border-right-style: none;
    }
    .checkbox:after {
        content: "";
        position: absolute;
        top: -0.125rem;
        left: 0;
        width: 1.1rem;
        height: 1.1rem;
        background: #fff;
        cursor: pointer;
    }
</style>