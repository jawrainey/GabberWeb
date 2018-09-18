<template lang="pug">
simple-layout
  main.padding
    .columns.is-mobile.is-centered.no-bottom
      .column.is-two-thirds.no-bottom
        .columns.is-vcentered
          .column.has-text-centered
            img.branding.logo(src="/static/img/logo-with-text-s.png", alt="TalkFutures logo")
            p.strapline.is-size-5.is-size-6-mobile {{$t('view.base.about.content.strapline')}}
        .columns.is-mobile
          .column.is-half.has-text-centered
            p.is-italic.is-4 {{$t('view.base.about.no_ios')}}
            a.is-hidden
              img(:src='iosBadge' width="140" height="50")
          .column.is-half.has-text-centered
            a(:href='androidURL')
              img(:src='androidBadge' width="150" height="50")
        hr
    .columns.is-mobile.is-centered
      .column.is-two-thirds
        .title.is-2.is-size-5-mobile.has-text-weight-semibold
          | {{$t('view.base.about.content.prepare.title')}}
        hr
        .columns.is-vcentered
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
        .columns.is-vcentered
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
        .columns.is-vcentered
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
        .columns.is-vcentered
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
        .columns.is-vcentered
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
        .columns
          .column
            a.button.is-large.is-outlined.action(href="mailto:innovation.team@ifrc.org")
              | {{ $t('view.base.about.content.contact.action') }}
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
import { getConfig } from '../../mixins/Config'

export default {
  components: { SimpleLayout },
  computed: {
    androidURL () { return `https://play.google.com/store/apps/details?id=${getConfig('ANDROID_URL')}` },
    iOSURL () { return `https://itunes.apple.com/us/app/${getConfig('IOS_URL')}` },
    androidBadge () { return `/static/img/google/${this.$i18n.locale}.png` },
    iosBadge () { return `/static/img/ios/${this.$i18n.locale}.svg` }
  }
}
</script>

<style lang="sass" scoped>
.no-bottom
  padding-bottom: 0
  margin-bottom: 0
.padding
  padding: 2em 0 0 0

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
