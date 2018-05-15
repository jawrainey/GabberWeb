<template lang="pug">
#app-wrapper
  coming-soon(v-if="isComingSoon")
  router-view(v-else-if="!apiInProgress")
</template>

<script>
import { LOGIN_USER } from './const/mutations'
import ApiWorkerMixin from './mixins/ApiWorker'
import ComingSoon from './views/base/ComingSoon'
import { getConfig } from './mixins/Config'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { ComingSoon },
  computed: {
    isComingSoon () { return getConfig('COMING_SOON') }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    async checkLogin () {
      this.startApiWork()
      
      let { meta, data } = await this.$api.getSelf()
      if (data) this.$store.commit(LOGIN_USER, data)
      
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass">
@import "~sass/transitions"
@import "~bulma/bulma"
@import "~bulmaswatch/darkly/_overrides.scss"

@import "~sass/transitions"
@import "~sass/theme"

</style>
