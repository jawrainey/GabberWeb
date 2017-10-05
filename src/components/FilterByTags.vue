<template>
    <div class="dropdown column is-one-quarter" v-bind:class="{ 'is-active': isActive }">
        <div class="dropdown-trigger">
            <button @click="filterApplied" class="button is-white">
                <span>Tags</span>
                <span v-bind:class="[isActive ? 'arrow-up' : 'arrow-down']"></span>
            </button>
        </div>
        <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div class="dropdown-item">
                    <div class="control" v-for="tag in tags">
                        <label>
                            <input
                                type="checkbox"
                                class="checkbox"
                                @click.capture="onTagSelected"
                                v-model="selectedTags"
                                v-bind:value="tag"
                            /><span class="">{{ tag | capitalize }}</span>
                        </label>
                    </div>
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
    #filter__tags__container > li { display: inline-block; }
</style>