<template lang="pug">
.markdown-content(v-if="content", v-html="content")
</template>

<script>
import AllContent from '../../i18n/content'

export default {
  props: {
    name: {
      type: String,
      required: true,
      validator: value => AllContent[value]
    }
  },
  data: () => ({ content: null }),
  watch: {
    '$i18n.locale' (newLocale) {
      this.loadContent()
    },
    'name' (newPath) {
      this.loadContent()
    }
  },
  created () {
    this.loadContent()
  },
  methods: {
    async loadContent () {
      try {
        let fetchContent = AllContent[this.name][this.$i18n.locale]
        if (!fetchContent) throw new Error('Invalid Markdown path')
        this.content = await fetchContent()
      } catch (error) {
        console.log('Failed to load content')
        this.content = `content.${this.name}.${this.$i18n.locale}.md`
      }
    }
  }
}
</script>

<style lang="sass">
</style>
