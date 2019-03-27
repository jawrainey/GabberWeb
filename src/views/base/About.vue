<template lang="pug">
  simple-layout
    section.section.has-text-centered
      .columns.is-mobile.is-centered
        .column.is-two-thirds
          h1.title.is-2.is-size-4-mobile.has-text-weight-semibold
            | {{$t('view.base.about.title')}}
          hr
          .columns.is-vcentered
            .column.is-half
              .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('view.base.about.capturing.title')}}
              p.is-5.is-size-7-mobile {{$t('view.base.about.capturing.content')}}
            .column
              img.branding(src="/static/img/about/capturing.png")
          hr
          .columns.is-vcentered.reverse-on-mobile
            .column.is-half
              img.branding(src="/static/img/about/highlighting.png")
            .column
              .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('view.base.about.sensemaking.title')}}
              p.is-5.is-size-7-mobile {{$t('view.base.about.sensemaking.content')}}
          hr
          .columns.is-vcentered
            .column.is-half
              .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('view.base.about.reuse.title')}}
              p.is-5.is-size-7-mobile {{$t('view.base.about.reuse.content')}}
            .column
              img.branding(src="/static/img/about/sharing.png")
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
export default {
  components: { SimpleLayout }
}
</script>

<style lang="sass" scoped>
  +mobile
    .reverse-on-mobile
      display: flex
      flex-direction: column-reverse
  .branding
    max-height: 250px
    max-width: 100%
    margin: 0 auto
</style>
