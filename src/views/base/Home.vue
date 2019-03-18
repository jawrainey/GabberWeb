<template lang="pug">
  simple-layout
    main.home-page
      .columns.with-padding.has-text-centered
        .column.is-two-fifths
          .content
            h1.title.has-text-weight-bold.is-size-4-mobile {{$t('view.base.home.title')}}
            p.strapline.is-size-5.is-size-6-mobile {{$t('view.base.home.strapline')}}
            hr
            p.is-italic Download and sign up now to record conversations in Gabber
            .columns.is-mobile
              .column.is-half
                a.no-border(:href="iOSURL")
                  img.badge(:src='iosBadge', :alt="iOSAlt")
              .column.is-half
                a.no-border(:href='androidURL')
                  img.badge(:src='androidBadge', :alt="androidAlt")
        .column.is-two-fifths
          section.section.featured
            h2.title.has-text-weight-bold.is-size-4-mobile {{$t('view.base.home.features')}}
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
              router-link.button.view-projects.is-large(:to="projectsRoute")
                span {{ $t('view.base.home.action') }}
                .icon: fa(icon="chevron-right")
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import { ADD_SESSIONS_RECOMMENDATIONS } from '@/const/mutations'

import SimpleLayout from '@/layouts/SimpleLayout'
import Recommendation from '../../components/recommendation/Recommendation'
import RecommendationLoader from '../../components/recommendation/RecommendationLoader'

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
      this.endApiWork(meta)
    }
  },
  computed: {
    recommendedSessions () { return this.$store.getters.sessionsRecommendations },
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } },
    androidURL () { return `https://play.google.com/store/apps/details?id=${getConfig('ANDROID_URL')}` },
    iOSURL () { return `https://itunes.apple.com/us/app/${getConfig('IOS_URL')}` },
    iOSAlt () { return this.$t('view.base.home.alt_text.ios') },
    androidBadge () { return `/static/img/google/${this.$i18n.locale}.png` },
    androidAlt () { return this.$t('view.base.home.alt_text.android') },
    iosBadge () { return `/static/img/ios/${this.$i18n.locale}.svg` }
  }
}
</script>

<style lang="sass" scoped>
  .badge
    width: 180px
    height: 55px
  .with-padding
    padding: 1em
    margin: 0
  .featured
    padding: .5em 0 0 0
  .no-border > img:hover
    transform: scale(1.025)
    filter: drop-shadow(0 1px 2px rgba(0,0,0,.5))
  .no-border:hover
    border-bottom: none
  a:hover, a.is-active
    color: #FFF
  .button:focus
    color: whitesmoke
  .strapline
    font-size: .75em
    padding: 0 1.6em

  +mobile
    .badge
      width: 150px
      height: 50px
    .view-projects
      font-size: 1em

  +tablet
    .home-page
      display: flex
      justify-content: center
      height: 80vh !important
    .columns
      display: flex
      align-items: center
      justify-content: center
</style>
