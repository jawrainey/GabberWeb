<template lang="pug">
simple-layout
  section.hero.is-dark
    .hero-body
      .container
        h1.title.has-text-white {{ $t('view.base.about.title') }}
        h2.subtitle.has-text-grey-light {{ $t('view.base.about.subtitle') }}
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
export default {
  components: { SimpleLayout }
}
</script>

<style lang="sass">

.column-icon
  margin-bottom: 2rem

</style>
