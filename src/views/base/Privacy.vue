<template lang="pug">
simple-layout
  section.hero.is-dark
    .hero-body
      .container
        h1.title.has-text-white {{ $t('view.base.privacy.title') }}
        h2.subtitle.has-text-grey-light {{ $t('view.base.privacy.subtitle') }}
  section.section
    .container.content.has-text-grey-lighter
      markdown(name="privacy")
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
import Markdown from '@/components/utils/Markdown'

export default {
  components: { SimpleLayout, Markdown }
}
</script>
