<template lang="pug">
simple-layout
  section.hero.is-dark
    .hero-body
      .container
        h1.title.has-text-white {{ $t('view.base.research.title') }}
        h2.subtitle.has-text-grey-light {{ $t('view.base.research.subtitle') }}
  section.section
    .container.content.has-text-grey-lighter
      markdown(name="research")
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
import Markdown from '@/components/utils/Markdown'

export default {
  components: { SimpleLayout, Markdown }
}
</script>
