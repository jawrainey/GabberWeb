<template lang="pug">
footer.hero.is-dark.is-small
  .hero-body
    .container
      .level
        .level-left
          .level-item
            router-link.button.is-text(:to="privacyRoute") Privacy
          .level-item
            router-link.button.is-text(:to="termsRoute") Terms
        .level-right
          .level-item
            p.has-text-grey
              | Gabber &copy; &mdash; A research project at
              |
              b: a(href="https://openlab.ncl.ac.uk", target="_blank")
                | Open Lab
</template>

<script>
import { PRIVACY_ROUTE, TERMS_ROUTE } from '@/const/routes'

export default {
  computed: {
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } }
  }
}
</script>

<style lang="css">
</style>
