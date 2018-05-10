<template lang="pug">
box-layout
  section.section.has-text-centered
    h1.title {{ $t('views.base.not_found.title') }}
    h2.subtitle {{ $t('views.base.not_found.subtitle') }}
    
    hr
    
    .buttons.is-centered
      router-link.button.is-success.is-rounded.is-medium(:to="homeRoute")
        .icon: fa(icon="home")
        span {{ $t('views.base.not_found.back_action') }}
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
