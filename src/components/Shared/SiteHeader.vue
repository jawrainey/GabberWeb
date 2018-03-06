<template lang="pug">
header.site-header.hero
  nav.navbar(role="navigation", aria-label="main navigation")
    .container
      .navbar-brand
        p.navbar-item.is-size-3.has-text-weight-bold
          router-link.has-text-white(:to="homeRoute") Gabber
      .navbar-menu
        .navbar-end
          router-link.navbar-item(:to="homeRoute", :class="routeClass(homeRoute)")
            span Home
          router-link.navbar-item(:to="projectsRoute", :class="routeClass(projectsRoute)")
            span Projects
          router-link.navbar-item(:to="aboutRoute", :class="routeClass(aboutRoute)")
            span About
          
          template(v-if="!isLoggedIn")
            router-link.navbar-item(:to="loginRoute", :class="routeClass(loginRoute)")
              span Login
          .navbar-item(v-else)
            button.button.is-dark(@click="logout") Logout
</template>

<script>
import { HOME_ROUTE, ABOUT_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'

export default {
  computed: {
    isLoggedIn () { return this.$store.getters.IS_LOGGED_IN },
    homeRoute () { return { name: HOME_ROUTE } },
    aboutRoute () { return { name: ABOUT_ROUTE } },
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } }
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT_USER')
    },
    routeClass (route) {
      return {
        'is-active': route.name === this.$route.name
      }
    }
  }
}
</script>

<style lang="sass">
.site-header
  nav
    border-bottom: 1px solid $grey
    height: 60px
</style>
