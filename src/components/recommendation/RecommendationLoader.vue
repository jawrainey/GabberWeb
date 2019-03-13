<template>
  <content-loader
    :height="30"
    :width="240"
    :speed="2"
    class="recommendation-loader"
    primaryColor="#6C6C6C"
    secondaryColor="#02BBA4"
  >
    <rect x="40" y="0" width="134" height="11" />
    <rect x="40" y="15" width="190" height="11" />
    <rect x="0" y="30" width="35" height="5" />
    <rect x="38" y="30" width="35" height="5" />
    <rect x="75" y="30" width="35" height="5" />
    <circle cx="16" cy="13" r="13" />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  }
}
</script>

<style lang="sass" scoped>
  .recommendation-loader
    width: 100%
    padding: 1em .25em .5em 1em
    margin-bottom: 1em
</style>
