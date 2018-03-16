<template lang="pug">
header.site-header.hero
  nav.navbar(role="navigation", aria-label="main navigation")
    .navbar-brand
      .navbar-item.is-size-3.has-text-weight-bold
        router-link.has-text-white(:to="homeRoute") Gabber
      .navbar-burger(@click="toggleMobileNav", :class="menuClasses")
        span
        span
        span
    .navbar-menu.has-text-centered-mobile(:class="menuClasses")
      .navbar-end
        router-link.navbar-item(:to="homeRoute", :class="routeClass(homeRoute)")
          span Home
        router-link.navbar-item(:to="projectsRoute", :class="routeClass(projectsRoute)")
          span Projects
        router-link.navbar-item(:to="aboutRoute", :class="routeClass(aboutRoute)")
          span About
        
        template(v-if="!isLoggedIn")
          a.navbar-item(@click="login", :class="routeClass(loginRoute)")
            span Login
        .navbar-item(v-else)
          button.button.is-dark(@click="logout") Logout
</template>

<script>
import { HOME_ROUTE, ABOUT_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import { LOGOUT_USER, LOGIN_RETURN_ROUTE } from '@/const/mutations'
import { AuthEvents } from '@/events'

export default {
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
    login () {
      this.$store.commit(LOGIN_RETURN_ROUTE, {
        name: this.$route.name,
        params: this.$route.params
      })
      // console.log('login ...', this.$route)
      this.$router.push(this.loginRoute)
    },
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
    height: 60px
    z-index: 100
</style>
