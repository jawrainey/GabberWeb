<template lang="pug">
simple-layout
  section.hero.is-dark
    .hero-body
      .container
        h1.title.has-text-white {{ $t('views.base.about.title') }}
        h2.subtitle.has-text-grey-light {{ $t('views.base.about.subtitle') }}
  section.section
    .columns
      .column.has-text-centered
        img.column-icon(src="/static/img/about_capture.png" width="165" height="165")
        h3.subtitle.is-3.has-text-white {{ $t('views.base.about.col_1.title') }}
        p.has-text-grey-light {{ $t('views.base.about.col_1.body') }}

      .column.has-text-centered
        img.column-icon(src="/static/img/about_structure.png" width="165" height="165")
        h3.subtitle.is-3.has-text-white {{ $t('views.base.about.col_2.title') }}
        p.has-text-grey-light {{ $t('views.base.about.col_2.body') }}

      .column.has-text-centered
        img.column-icon(src="/static/img/about_discuss.png" width="165" height="165")
        h3.subtitle.is-3.has-text-white {{ $t('views.base.about.col_3.title') }}
        p.has-text-grey-light {{ $t('views.base.about.col_3.body') }}
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
