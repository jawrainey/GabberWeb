<template lang="pug">
footer.hero.is-dark.is-small
  .hero-body
    .container
      .level
        .level-left
          .level-item
            .dropdown.is-up(:class="dropdownClasses")
              .dropdown-trigger
                button.button.is-small(aria-haspopup="true", aria-controls="dropdown-menu", @click="showLocaleDropdown = !showLocaleDropdown")
                  .icon: fa(icon="globe")
                  span {{ currentLocale.name }}
              #dropdown-menu.dropdown-menu(role="menu")
                .dropdown-content
                  a.dropdown-item(
                    v-for="locale in availableLocales",
                    @click.prevent="setLocale(locale)",
                    :class="localeClasses(locale)"
                    v-text="locale.name"
                  )
          .level-item
            router-link.button.is-text(:to="privacyRoute")
              | {{$t('view.base.privacy.nav_title')}}
          .level-item
            router-link.button.is-text(:to="termsRoute")
              | {{$t('view.base.terms.nav_title')}}
        .level-right
          .level-item
            p.has-text-grey
              | Gabber &copy; &mdash; {{$t('comp.shared.site_footer.copyright')}}
              |
              b: a(href="https://openlab.ncl.ac.uk", target="_blank")
                | Open Lab
</template>

<script>
import { PRIVACY_ROUTE, TERMS_ROUTE } from '@/const/routes'

const availableLocales = [
  { key: 'en', name: 'English' },
  { key: 'ru', name: 'Russian' }
]

export default {
  data: () => ({ availableLocales, showLocaleDropdown: false }),
  computed: {
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    termsRoute () { return { name: TERMS_ROUTE } },
    currentLocale () {
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

<style lang="sass">
</style>
