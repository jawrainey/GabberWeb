<template lang="pug">
section.pad-it
  .columns.is-centered
    .column.is-three-fifths
      nav.level.is-mobile.margy
          a.level-item(
            v-for="locale in availableLocales",
            @click.prevent="setLocale(locale)",
            :class="localeClasses(locale)"
            v-text="locale.name"
          )
      .columns
        .column.has-text-centered
          img.branding.logo(src="/static/img/logo-with-text.png", width="144px", height="144px")
          p.strapline.is-size-5.is-size-6-mobile {{$t('comp.pre_register.tagline')}}
      section.has-text-centered
        a.button.is-large.is-outlined(:href="$t('comp.pre_register.action_button.url')") {{$t('comp.pre_register.action_button.text')}}
      hr
      .columns.is-vcentered
        .column.is-half
          .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('comp.pre_register.capturing.title')}}
          p.is-5.is-size-7-mobile {{$t('comp.pre_register.capturing.content')}}
        .column
          img.branding(src="/static/img/talkfutures/capturing.png")
      hr
      .columns.is-vcentered.reverse-on-mobile
        .column.is-half
          img.branding(src="/static/img/talkfutures/highlighting.png")
        .column
          .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('comp.pre_register.sensemaking.title')}}
          p.is-5.is-size-7-mobile {{$t('comp.pre_register.sensemaking.content')}}
      hr
      .columns.is-vcentered
        .column.is-half
          .title.is-4.is-size-5-mobile.has-text-weight-semibold {{$t('comp.pre_register.reuse.title')}}
          p.is-5.is-size-7-mobile {{$t('comp.pre_register.reuse.content')}}
        .column
          img.branding(src="/static/img/talkfutures/sharing.png")
      hr.no-margin-bottom
      footer
        nav.level.margy
          router-link.level-item.is-text(:to="cookiesRoute")
              | {{$t('view.base.cookies.nav_title')}}
          router-link.level-item.is-text(:to="privacyRoute")
              | {{$t('view.base.privacy.nav_title')}}
          router-link.level-item.is-text(:to="researchRoute")
              | {{$t('view.base.research.nav_title')}}
          router-link.level-item.is-text(:to="termsRoute")
              | {{$t('view.base.terms.nav_title')}}
        hr.no-top
        nav.level.is-mobile
          .level-left
            .level-item
              img.branding.bu(src="/static/img/talkfutures/ifrc.png")
          .level-right
            .level-item
              img.branding.bu.right(src="/static/img/talkfutures/solferino.png")
</template>

<script>

import { PRIVACY_ROUTE, TERMS_ROUTE, RESEARCH_ROUTE, COOKIES_ROUTE } from '@/const/routes'

const availableLocales = [
  { key: 'ar', name: 'العربية' },
  { key: 'en', name: 'English' },
  { key: 'es', name: 'Español' },
  { key: 'fr', name: 'Français' }
]

export default {
  data: () => ({ availableLocales, showLocaleDropdown: false }),
  computed: {
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } },
    researchRoute () { return { name: RESEARCH_ROUTE } },
    cookiesRoute () { return { name: COOKIES_ROUTE } },
    currentLocale () {
      // TODO: If we switch to Arabic, then we must switch r-to-l
      return availableLocales.find(l => l.key === this.$i18n.locale)
    },
    dropdownClasses () {
      return { 'is-active': this.showLocaleDropdown }
    }
  },
  methods: {
    localeClasses (locale) {
      return { 'is-active': this.$i18n.locale === locale.key }
    },
    setLocale (locale) {
      this.$i18n.locale = locale.key
      this.showLocaleDropdown = false
    }
  }
}
</script>

<style lang="sass" scoped>
.no-top
  margin-top: 1em

.no-margin-bottom
  margin-bottom: 0

.level-item
  color: #FFF

a:hover, a.is-active
  color: #FFF
  border-bottom: 1px solid #E21E26

.button:focus
  color: whitesmoke

.button:hover
  border-color: #E21E26

.now
  justify-content: center
  background: transparent
  margin: 0 1em 1em 1em

+mobile
  .now
    display: flex
  .fixie .branding
    height: 50px
  .pad-it
    padding: 0 1.6em

  .reverse-on-mobile
    display: flex
    flex-direction: column-reverse

+mobile
  .bu
    max-height: 50px !important
    max-width: 175px !important
  .right
    max-height: 30px !important

+tablet
  .right
    max-height: 40px !important

.margy
  margin: 1rem auto 0 auto

.logo
  margin: 2em 0 1.25em 0 !important

.strapline
  font-size: 22px

.branding
  max-height: 200px
  max-width: 100%
  margin: 0 auto
.fixie > img
  height: 80px

.column
  text-align: center

  .bu
    max-height: 90px
    max-width: 240px
    margin: 0 auto

</style>
