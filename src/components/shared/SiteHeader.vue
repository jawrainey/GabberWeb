<template lang="pug">
header.site-header.hero
  nav.navbar(role="navigation", aria-label="main navigation")
    .navbar-brand
      .navbar-item.is-size-3-desktop.has-text-weight-bold
        router-link.has-text-white(:to="homeRoute") Gabber
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
    mobileNav: false
  }),
  computed: {
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

<style lang="sass">

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
