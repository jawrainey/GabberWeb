<template lang="pug">
header.site-header.hero
  nav.navbar(role="navigation", aria-label="main navigation")
    .navbar-brand
      router-link.navbar-item(:to="homeRoute").left-pad
        span.is-size-4.has-text-weight-bold G
      .navbar-burger(@click="toggleMobileNav", :class="menuClasses")
        span
        span
        span
    .navbar-menu.has-text-centered-mobile(:class="menuClasses")
      .navbar-end
        router-link.navbar-item(:to="homeRoute", :class="routeClass(homeRoute)")
          span {{$t('view.base.home.nav_title')}}
        router-link.navbar-item(:to="projectsRoute", :class="routeClass(projectsRoute)")
          span {{$t('view.project.project_list.nav_title')}}
        router-link.navbar-item(:to="aboutRoute", :class="routeClass(aboutRoute)")
          span {{$t('view.base.about.nav_title')}}
        template(v-if="!isLoggedIn")
          a.navbar-item(@click.prevent="pushLogin", :class="routeClass(loginRoute)")
            span {{$t('view.auth.login.nav_title')}}
          .navbar-item
            a.button.is-success(@click.prevent="pushRegister")
              span {{$t('view.auth.register.nav_title')}}
        .navbar-item(v-else)
          button.button.is-dark(@click="logout")
            | {{$t('comp.shared.site_header.logout_action')}}
        .navbar-item
          .dropdown(:class="dropdownClasses", v-if="availableLocales && availableLocales.length > 0")
            .dropdown-trigger
              button.button.is-small.make-red(
              aria-haspopup="true",
              aria-controls="dropdown-menu",
              @click="showLocaleDropdown = !showLocaleDropdown"
              )
                .icon: fa(icon="globe")
                span {{ currentLocale.endonym }}
            #dropdown-menu.dropdown-menu(role="menu")
              .dropdown-content
                a.dropdown-item(
                v-for="locale in availableLocales",
                @click.prevent="setLocale(locale)",
                :class="localeClasses(locale)"
                v-text="locale.endonym")
</template>

<script>
import {
  HOME_ROUTE, ABOUT_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE
} from '@/const/routes'
import { LOGOUT_USER } from '@/const/mutations'
import { AuthEvents } from '@/events'
import AuthRedirMixin from '@/mixins/AuthRedir'

export default {
  mixins: [ AuthRedirMixin ],
  props: {
    fullWidth: { type: Boolean, default: false }
  },
  data: () => ({
    mobileNav: false,
    showLocaleDropdown: false
  }),
  computed: {
    availableLocales () { return this.$store.getters.availableLanguages },
    currentLocale () { return this.$store.getters.currentLocale },
    dropdownClasses () { return { 'is-active': this.showLocaleDropdown } },
    isLoggedIn () { return this.$store.getters.currentUser },
    homeRoute () { return { name: HOME_ROUTE } },
    aboutRoute () { return { name: ABOUT_ROUTE } },
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } },
    menuClasses () { return { 'is-active': this.mobileNav } }
  },
  methods: {
    async logout () {
      await this.$api.logout()
      this.$store.commit(LOGOUT_USER)
      AuthEvents.$emit('logout')
    },
    localeClasses (locale) { return { 'is-active': this.$i18n.locale === locale.key } },
    setLocale (locale) {
      this.showLocaleDropdown = false
      this.$i18n.locale = locale.code
      const html = document.documentElement
      html.setAttribute('lang', this.$i18n.locale)
      html.setAttribute('dir', locale.code === 'ar' ? 'rtl' : 'ltr')
    },
    routeClass (route) {
      return {
        'is-active': route.name === this.$route.name
      }
    },
    toggleMobileNav () {
      this.mobileNav = !this.mobileNav
    }
  }
}
</script>

<style lang="sass" scoped>

.left-pad
  padding: 0 0 0 .75em

a.dropdown-item:hover, a.dropdown-item.is-active
  background-color: #1abc9c
  color: white

.site-header
  nav
    border-bottom: 1px solid $border
    z-index: 100

  +touch
    .navbar .navbar-menu
      background: $grey-darker
      border-radius: 0
      border-bottom: 1px solid $grey-light

</style>
