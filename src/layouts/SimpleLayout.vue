<template lang="pug">
.default-layout
  main
    site-header
    slot
  site-footer
</template>

<script>
import SiteHeader from '../components/Shared/SiteHeader'
import SiteFooter from '../components/Shared/SiteFooter'

export default {
  components: { SiteHeader, SiteFooter }
}
</script>

<style lang="scss">
.default-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  > main {
    flex: 1;
  }
}
</style>
