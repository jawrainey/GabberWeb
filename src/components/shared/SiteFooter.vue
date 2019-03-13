<template lang="pug">
footer.hero.is-dark.is-small
  .hero-body
    .container
      .level
        .level-left
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
        .level-right
          .level-item
            p.has-text-grey
              | Gabber &copy; &mdash; {{$t('comp.shared.site_footer.copyright')}}
              |
              b: a(href="https://openlab.ncl.ac.uk", target="_blank")
                | Open Lab
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
