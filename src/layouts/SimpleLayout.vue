<template lang="pug">
.simple-layout
  main
    site-header
    slot
  site-footer
</template>

<script>
import SiteHeader from '../components/shared/SiteHeader'
import SiteFooter from '../components/shared/SiteFooter'

export default {
  components: { SiteHeader, SiteFooter }
}
</script>

<style lang="sass" scoped>

.simple-layout
  display: flex
  min-height: 100vh
  flex-direction: column

  > main
    flex: 1
    display: flex
    flex-direction: column

</style>
