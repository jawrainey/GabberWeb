<template lang="pug">
simple-layout
  .container.home-page.is-vertical-aligned
    .columns.is-gapless.is-centered
      .column.is-two-fifths
        section.section
          h1.title {{ $t('view.base.home.title') }}
          .columns.is-mobile
            .column.is-half.has-text-centered
              a(:href='androidURL')
                img(src="/static/img/play-store.png" width="150" height="50")
            .column.is-half.has-text-centered
              a(:href="iOSURL")
                img(src="/static/img/app-store.png" width="150" height="50")
          hr
          h2.subtitle.is-italic {{ $t('view.base.home.subtitle') }}
          .buttons.is-centered
            router-link.button.is-success.is-medium(:to="projectsRoute")
              span {{ $t('view.base.home.action') }}
              .icon: fa(icon="chevron-right")
      .column.is-two-fifths
        img.people(src="/static/img/gabber.png" width="450" height="450")
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import SimpleLayout from '@/layouts/SimpleLayout'
import { getConfig } from '../../mixins/Config'

export default {
  components: { SimpleLayout },
  computed: {
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } },
    androidURL () { return `https://play.google.com/store/apps/details?id=${getConfig('ANDROID_URL')}` },
    iOSURL () { return `https://itunes.apple.com/us/app/${getConfig('IOS_URL')}` }
  }
}
</script>

<style lang="sass">
.home-page
  flex: 1
  img.people
    width: 450px
</style>
