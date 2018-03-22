<template lang="pug">
box-layout
  section.section.has-text-centered
    h1.title Page Not Found
    h2.subtitle Could not find the page you were looking for, check your url is correct.
    
    hr
    
    .buttons.is-centered
      router-link.button.is-success.is-rounded.is-medium(:to="homeRoute")
        .icon: fa(icon="home")
        span Go Home
</template>

<script>
import { HOME_ROUTE } from '@/const/routes'
import BoxLayout from '@/layouts/BoxLayout'

export default {
  components: { BoxLayout },
  computed: {
    homeRoute () {
      return { name: HOME_ROUTE }
    }
  }
}
</script>

<style lang="css">
</style>
