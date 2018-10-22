<template lang="pug">
simple-layout
  main.home-page
    .columns.with-padding
      .column.is-two-fifths
        .content
          h1.title.has-text-weight-bold.is-size-4-mobile {{$t('view.base.home.welcome')}}
          p.strapline.is-size-5.is-size-6-mobile {{$t('view.base.about.content.strapline')}}
          hr
          .columns.is-mobile
            .column.is-half.has-text-centered
              a.no-border(:href="iOSURL")
                img(:src='iosBadge' width="140" height="50", alt="Download TalkFutures for iOS")
            .column.is-half.has-text-centered
              a.no-border(:href='androidURL')
                img(:src='androidBadge' width="150" height="50", alt="Download TalkFutures for Android")
      .column.is-two-fifths
        section.section.featured
          h2.title.has-text-weight-bold.is-size-4-mobile {{$t('view.base.home.features.title')}}
          .recommendations(v-if="recommendedSessions.length <= 0")
            recommendation-loader.box
            recommendation-loader.box
            recommendation-loader.box
          .recommendations(v-else)
            recommendation(
              v-for="session in recommendedSessions",
              :key="session.id",
              :session="session")
          hr
          .is-centered
            router-link.button.is-success-red.is-small(:to="conversationsRoute")
              span {{ $t('view.base.home.action') }}
              .icon: fa(icon="chevron-right")
</template>

<script>
import { CONVERSATION_LIST_ROUTE } from '@/const/routes'
import { ADD_SESSIONS_RECOMMENDATIONS } from '@/const/mutations'

import SimpleLayout from '@/layouts/SimpleLayout'
import Recommendation from '../../components/conversations/Recommendation'
import RecommendationLoader from '../../components/conversations/RecommendationLoader'

import { ContentLoader } from 'vue-content-loader'
import { getConfig } from '../../mixins/Config'
import ApiWorkerMixin from '../../mixins/ApiWorker'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { RecommendationLoader, SimpleLayout, Recommendation, ContentLoader },
  created () {
    this.getRecommendations()
  },
  methods: {
    async getRecommendations () {
      this.startApiWork()
      let { meta, data } = await this.$api.getSessionsRecommendations()
      if (meta.success) this.$store.commit(ADD_SESSIONS_RECOMMENDATIONS, data)
      this.endApiWork(meta, 'No recommendations were found.')
    }
  },
  computed: {
    recommendedSessions () { return this.$store.getters.sessionsRecommendations },
    conversationsRoute () { return { name: CONVERSATION_LIST_ROUTE } },
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
  .with-padding
    padding: 1em
    margin: 0
  .centered
    align-items: center
    display: flex
    justify-content: center
  .fake-recs
    height: 92px
  .featured
    padding: .5em 0 0 0
  .no-border > img:hover
    transform: scale(1.025)
    filter: drop-shadow(0 1px 2px rgba(0,0,0,.5))
  .no-border:hover
    border-bottom: none

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
    font-size: .75em
    padding: 0 1.6em

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

    .section
      padding-bottom: 0

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

    .home-page
      display: flex
      justify-content: center
      height: 80vh !important

      .columns
        display: flex
        align-items: center
        justify-content: center
</style>
