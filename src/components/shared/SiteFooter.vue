<template lang="pug">
footer.container.column.is-three-fifths.add-borders
  nav.level
    .level-item
      router-link.is-text(:to="cookiesRoute")
        | {{$t('view.base.cookies.nav_title')}}
    .level-item
      router-link.is-text(:to="privacyRoute")
        | {{$t('view.base.privacy.nav_title')}}
    a.level-item.ifrc-logo(href="http://media.ifrc.org/innovation/", target="_blank", rel="noopener")
      img(:src="ifrcLogo", alt="International Federation of Red Cross and Red Crescent Societies")
    .level-item
      router-link.is-text(:to="researchRoute")
        | {{$t('view.base.research.nav_title')}}
    .level-item
      router-link.is-text(:to="termsRoute")
        | {{$t('view.base.terms.nav_title')}}
</template>

<script>
import { PRIVACY_ROUTE, TERMS_ROUTE, RESEARCH_ROUTE, COOKIES_ROUTE } from '@/const/routes'

export default {
  computed: {
    ifrcLogo () { return `/static/img/talkfutures/ifrc-logo/${this.$i18n.locale}.png` },
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } },
    researchRoute () { return { name: RESEARCH_ROUTE } },
    cookiesRoute () { return { name: COOKIES_ROUTE } }
  }
}
</script>

<style lang="sass" scoped>
  .add-borders
      border-top: 1px solid #282f2f
      border-bottom: 1px solid #282f2f
      padding: 1em 0
      margin: 1em auto
  a:hover, a.is-active
    color: #FFF
    border-bottom: 1px solid #E21E26
  .level-item, .level-item > a
    color: #FFF
  .ifrc-logo
    height: 20px
    width: 20px
  .add-margin
    margin: 1rem auto 0 auto
  .ifrc-logo:hover
    border-bottom: none
  .ifrc-logo > img
    width: 65px
    height: 65px
  .add-margin-mixed
    margin: 1em 0 !important
  a.dropdown-item:hover, a.dropdown-item.is-active
    background-color: #E21E26
    color: white

  +mobile
    .ifrc-logo
      width: 100%
      height: 100%
</style>
