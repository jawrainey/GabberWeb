<template lang="pug">
simple-layout
  main.padding.set-bg
    .columns.is-mobile.is-centered.set-bg
      .column.is-two-thirds
        .top.click-to-show(@click="showVideo = !showVideo")
          .title.is-2.is-size-3-mobile.has-text-weight-semibold
            | {{$t('view.base.about.content.prepare.title')}}
          span.is-4.is-size-6-mobile.pulled-right (Click to show/hide video)
        iframe.about-video(
          v-show="showVideo"
          width="640"
          height="360"
          frameborder="0",
          :src="aboutVideoURL",
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen)
        hr
        .columns.is-vcentered.set-bg
          .column.is-mobile.is-centered
            .columns.is-half.has-text-centered.is-vcentered
              .column.has-text-centered
                img.branding(src="/static/img/talkfutures/theme-desc.png")
              .column.has-text-centered
                .title.is-4.is-size-5-mobile.has-text-weight-semibold
                  | {{$t('view.base.about.content.prepare.theme.title')}}
                p.is-5.is-size-7-mobile
                  | {{$t('view.base.about.content.prepare.theme.subtitle')}}
        hr
        .columns.is-vcentered.set-bg
          .column.has-text-centered
            .columns.is-vcentered
              .column.is-half.has-text-centered
                .title.is-4.is-size-5-mobile.has-text-weight-semibold
                  | {{$t('view.base.about.content.add_people.title')}}
                p.is-5.is-size-7-mobile
                  | {{$t('view.base.about.content.add_people.subtitle')}}
              .column.is-half.has-text-centered
                img.branding(src="/static/img/talkfutures/add.png")
        hr
        .columns.is-vcentered.set-bg
          .column.has-text-centered
            .columns.is-vcentered
              .column.is-half.has-text-centered
                img.branding(src="/static/img/talkfutures/themes.png")
              .column.is-half.has-text-centered
                .title.is-4.is-size-5-mobile.has-text-weight-semibold
                  | {{$t('view.base.about.content.record.title')}}
                p.is-5.is-size-7-mobile
                  | {{$t('view.base.about.content.record.subtitle')}}
        hr
        .columns.is-vcentered.set-bg
          .column.has-text-centered
            .columns.is-vcentered
              .column.is-half.has-text-centered
                .title.is-4.is-size-5-mobile.has-text-weight-semibold
                  | {{$t('view.base.about.content.upload.title')}}
                p.is-5.is-size-7-mobile
                  | {{$t('view.base.about.content.upload.subtitle')}}
              .column.is-half.has-text-centered
                img.branding(src="/static/img/talkfutures/upload.png")
        hr
        .columns.is-vcentered.set-bg
          .column.has-text-centered
            .columns.is-vcentered
              .column.is-half.has-text-centered
                img.branding(src="/static/img/talkfutures/highlighting-s.png")
              .column.is-half.has-text-centered
                .title.is-4.is-size-5-mobile.has-text-weight-semibold
                  | {{$t('view.base.about.content.invite.title')}}
                p.is-5.is-size-7-mobile
                  | {{$t('view.base.about.content.invite.subtitle')}}
        hr
        .columns.set-bg
          .column
            a.button.is-large.is-outlined.action(href="mailto:innovation.team@ifrc.org")
              | {{ $t('view.base.about.content.contact.action') }}
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
import { getConfig } from '../../mixins/Config'

export default {
  components: { SimpleLayout },
  data: () => ({
    showVideo: true
  }),
  computed: {
    aboutVideoURL () {
      let aboutVideoURL = this.$store.getters.currentLocale.code === 'fr' ? '292270631' : '292084565'
      return `https://player.vimeo.com/video/${aboutVideoURL}`
    },
    androidURL () { return `https://play.google.com/store/apps/details?id=${getConfig('ANDROID_URL')}` },
    iOSURL () { return `https://itunes.apple.com/us/app/${getConfig('IOS_URL')}` },
    androidBadge () { return `/static/img/google/${this.$i18n.locale}.png` },
    iosBadge () { return `/static/img/ios/${this.$i18n.locale}.svg` }
  }
}
</script>

<style lang="sass" scoped>
.click-to-show
  cursor: pointer
.about-video
  padding-top: 1.6em
.no-bottom
  padding-bottom: 0
  margin-bottom: 0
.padding
  padding: 2em 0 0 0
.set-bg
  background-color: #1F2424
.branding
  max-height: 200px
  max-width: 100%
  margin: 0 auto

.column
  text-align: center

.logo
  width: 144px
  height: 144px

.strapline
  font-size: 22px
  padding: 1em

.column-icon
  margin-bottom: 2rem

+mobile
  .side-padding
    padding: 0 1.6em

  .action
    width: 100%
    border-radius: 3px
    font-size: 0.85em
</style>
