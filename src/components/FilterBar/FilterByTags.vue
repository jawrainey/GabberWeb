<template>
    <div class="dropdown" v-bind:class="{ 'is-active': isActive }" :disabled="!regionsLoaded">
        <div class="dropdown-trigger">
            <button @click="filterApplied" class="button is-white" :disabled="!regionsLoaded">
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
                            v-model="selectedTags"
                            v-bind:value="tag"
                        />
                        <span>{{ tag | capitalize }}</span>
                        <span class="numSelected">{{ numRegionsPerTag(tag) }}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {AudioBus} from '../../AudioBus.js'

export default {
  created () {
    this.projectChangedUI()
  },
  watch: {
    '$route': 'projectChangedUI'
  },
  data: () => ({
    isActive: false
  }),
  mounted () {
    AudioBus.$on('FILTER_TOPICS_APPLIED', () => {
      this.isActive = false
    })
  },
  methods: {
    projectChangedUI () {
      // Reset the drop-down position and the number of tags selected
      this.isActive = false
      this.$store.dispatch('FETCH_TAGS', this.$route.params.projectID)
    },
    filterApplied () {
      this.isActive = !this.isActive
      if (this.isActive) {
        AudioBus.$emit('FILTER_TAGS_APPLIED')
      }
    }
  },
  computed: {
    ...mapGetters(['tags', 'regionsLoaded', 'numRegionsPerTag']),
    selectedTags: {
      get () {
        return this.$store.getters.selectedTags
      },
      set (value) {
        this.$store.commit('setSelectedTags', value)
      }
    }
  },
  filters: {
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
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
