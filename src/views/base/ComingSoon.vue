<template lang="pug">
section.side-padding
  .columns.is-centered
    .column.is-three-fifths
      nav.level.is-mobile.add-margin
          a.level-item(
            v-for="locale in availableLocales",
            @click.prevent="setLocale(locale)",
            :class="localeClasses(locale)"
            v-text="locale.name")
      main(:style="{ direction: setTextDirection }")
        .columns
          .column.has-text-centered
            img.branding.logo(src="/static/img/logo-with-text.png")
            p.strapline.is-size-5.is-size-6-mobile {{$t('comp.pre_register.tagline')}}
        section.has-text-centered
          a.button.is-large.is-outlined(:href="$t('comp.pre_register.action_button.url')") {{$t('comp.pre_register.action_button.text')}}
        hr
        .columns.is-vcentered
          .column.is-half
            .title.is-4.is-size-5-mobile.has-text-weight-semibold
              span {{$t('comp.pre_register.capturing.title')}}
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
        hr.remove-margin-bottom
      footer
        nav.level.add-margin
          .level-item
            router-link.is-text(:to="cookiesRoute")
                | {{$t('view.base.cookies.nav_title')}}
          .level-item
            router-link.is-text(:to="privacyRoute")
              | {{$t('view.base.privacy.nav_title')}}
          a.level-item.ifrc-logo(href="http://media.ifrc.org/innovation/", target="_blank")
            img(src="/static/img/talkfutures/ifrc.png")
          .level-item
            router-link.is-text(:to="researchRoute")
              | {{$t('view.base.research.nav_title')}}
          .level-item
            router-link.is-text(:to="termsRoute")
              | {{$t('view.base.terms.nav_title')}}
        hr.remove-top-margin
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
  data: () => ({ availableLocales }),
  computed: {
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } },
    researchRoute () { return { name: RESEARCH_ROUTE } },
    cookiesRoute () { return { name: COOKIES_ROUTE } },
    setTextDirection () { return this.$i18n.locale === 'ar' ? 'rtl' : 'ltr' }
  },
  methods: {
    localeClasses (locale) { return { 'is-active': this.$i18n.locale === locale.key } },
    setLocale (locale) { this.$i18n.locale = locale.key }
  }
}
</script>

<style lang="sass">
.cc-window
  border-top: 1px solid #4C5759
</style>

<style lang="sass" scoped>
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
