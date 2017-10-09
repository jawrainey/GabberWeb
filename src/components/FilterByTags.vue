<template>
    <div class="dropdown column is-one-quarter" v-bind:class="{ 'is-active': isActive }">
        <div class="dropdown-trigger">
            <button @click="filterApplied" class="button is-white">
                <span>Tags </span>
                <span v-if="selectedTags.length >= 1" class="number-selected">{{ selectedTags.length }}</span>
                <span v-bind:class="[isActive ? 'arrow-up' : 'arrow-down']"></span>
            </button>
        </div>
        <div class="dropdown-menu">
            <div id="tag-menu" class="dropdown-content">
                <div class="dropdown-item control" v-for="tag in tags">
                    <label>
                        <input
                            type="checkbox"
                            class="checkbox"
                            @click.capture="onTagSelected"
                            v-model="selectedTags"
                            v-bind:value="tag"
                        />
                        <span>{{ tag | capitalize }}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {AudioBus} from '../AudioBus.js';

    export default {
        data: () => ({
            isActive: false,
            selectedTags: []
        }),
        mounted() {
            let _this = this;

            AudioBus.$on('FILTER_TOPICS_APPLIED', function() {
                _this.isActive = false;
            });
        },
        methods: {
            onTagSelected () {
                this.$store.commit('setSelectedTags', this.selectedTags);
            },
            filterApplied () {
                this.isActive = !this.isActive;
                if (this.isActive) {
                    AudioBus.$emit('FILTER_TAGS_APPLIED');
                }
            }
        },
        computed: mapGetters({tags: 'tags'}),
        filters: {
            capitalize: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    }
</script>

<style>
    #tag-menu
    {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
    /* Inspired by AirBnB */
    .number-selected {
        font-size: 12px;
        line-height: 18px;
        height: 20px;
        min-width: 20px;
        padding-left: 2px;
        padding-right: 2px;
        margin-left: 5px;
        border-radius: 10px;
        text-align: center;
        color: white;
        background-color: #009688;
        border: 1px solid #009688;
    }
</style>