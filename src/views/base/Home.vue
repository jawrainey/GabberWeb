<template lang="pug">
simple-layout
  section
    .columns.is-centered
      .column.is-three-fifths
        main
          .video-container
            iframe(src='https://www.youtube.com/embed/mIbTK3wOwD4', frameborder='0', allowfullscreen='')
          p.strapline.is-size-5.is-size-6-mobile {{$t('comp.pre_register.tagline')}}
          .columns.is-mobile
            .column.is-half.has-text-centered
              a(:href="iOSURL")
                img(:src='iosBadge' width="140" height="50")
            .column.is-half.has-text-centered
              a(:href='androidURL')
                img(:src='androidBadge' width="150" height="50")
          hr
          .columns.is-vcentered.side-padding
            .column.is-half
              .title.is-4.is-size-5-mobile.has-text-weight-semibold
                span {{$t('comp.pre_register.capturing.title')}}
              p.is-5.is-size-7-mobile {{$t('comp.pre_register.capturing.content')}}
            .column
              img.branding(src="/static/img/talkfutures/capturing-s.png",
              alt="Capture conversations with TalkFutures mobile application.")
          hr
          .columns.is-vcentered.reverse-on-mobile.side-padding
            .column.is-half
              img.branding(src="/static/img/talkfutures/highlighting-s.png",
              alt="Listen and tag TalkFutures conversations.")
            .column
              .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('comp.pre_register.sensemaking.title')}}
              p.is-5.is-size-7-mobile {{$t('comp.pre_register.sensemaking.content')}}
          hr
          .columns.is-vcentered.side-padding
            .column.is-half
              .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('comp.pre_register.reuse.title')}}
              p.is-5.is-size-7-mobile {{$t('comp.pre_register.reuse.content')}}
            .column
              img.branding(src="/static/img/talkfutures/sharing-s.png",
              alt="Share your favourite TalkFutures conversations with the world.")
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
    iOSURL () { return `https://itunes.apple.com/us/app/${getConfig('IOS_URL')}` },
    androidBadge () { return `/static/img/google/${this.$i18n.locale}.png` },
    iosBadge () { return `/static/img/ios/${this.$i18n.locale}.svg` }
  }
}
</script>

<style lang="sass">
  .cc-window
    border-top: 1px solid #4C5759
</style>

<style lang="sass" scoped>
  .video-container
    position: relative
    width: 420px
    height: 234px
    overflow: hidden
    margin: 1em auto
    padding: 0 1em !important

  .video-container
    iframe, object, embed
      position: absolute
      top: 0
      left: 0
      width: 420px
      height: 234px

  .ifrc-logo
    height: 20px
    width: 20px
  .ifrc-logo:hover
    border-bottom: none
  .ifrc-logo > img
    width: 65px
    height: 65px

  .add-margin
    margin: 1rem auto 0 auto
  .remove-top-margin
    margin-top: 1em
  .remove-margin-bottom
    margin-bottom: 0

  .level-item, .level-item > a
    color: #FFF

  a:hover, a.is-active
    color: #FFF
    border-bottom: 1px solid #E21E26

  .button:focus
    color: whitesmoke

  .button:hover
    border-color: #E21E26

  .logo
    width: 144px
    height: 144px
    margin: 2em 0 1.25em 0 !important

  .strapline
    font-size: 22px
    margin-bottom: 1em

  .branding
    max-height: 200px
    max-width: 100%
    margin: 0 auto

  .column
    text-align: center

  .partners
    max-height: 90px
    max-width: 240px
    margin: 0 auto

  +mobile
    .video-container, .video-container iframe, object, embed
      width: 320px
      height: 180px
    .side-padding
      padding: 0 1.6em

    .reverse-on-mobile
      display: flex
      flex-direction: column-reverse

    .partners
      max-height: 40px !important
      max-width: 175px !important

    .fixed-height
      max-height: 30px !important

    .ifrc-logo
      width: 100%
      height: 100%

  +tablet
    .fixed-height
      max-height: 40px !important
</style>
