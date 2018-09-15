<template lang="pug">
footer.hero.is-dark.is-small
  .container.has-text-centered
      .nav.level.add-margin-mixed
        .level-item
          router-link.button.is-text(:to="privacyRoute")
            | {{$t('view.base.privacy.nav_title')}}
        .level-item
          router-link.button.is-text(:to="termsRoute")
            | {{$t('view.base.terms.nav_title')}}
        .level-item
          router-link.button.is-text(:to="researchRoute")
            | {{$t('view.base.research.nav_title')}}
        .level-item
          router-link.button.is-text(:to="cookiesRoute")
            | {{$t('view.base.cookies.nav_title')}}
</template>

<script>
import { PRIVACY_ROUTE, TERMS_ROUTE, RESEARCH_ROUTE, COOKIES_ROUTE } from '@/const/routes'

export default {
  computed: {
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } },
    researchRoute () { return { name: RESEARCH_ROUTE } },
    cookiesRoute () { return { name: COOKIES_ROUTE } }
  }
}
</script>

<style lang="sass">
  .add-margin-mixed
    margin: 1em 0 !important
  a.dropdown-item:hover, a.dropdown-item.is-active
    background-color: #1abc9c
    color: white
</style>
