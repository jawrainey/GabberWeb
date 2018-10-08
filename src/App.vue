<template lang="pug">
#app-wrapper
  dev-banner(v-if="isDevMode")
  coming-soon(v-if="isComingSoon")
  router-view(v-else-if="!apiInProgress")
</template>

<script>
import { LOGIN_USER, SET_SUPPORTED_LANGUAGES } from './const/mutations'
import ApiWorkerMixin from './mixins/ApiWorker'
import ComingSoon from './views/base/ComingSoon'
import DevBanner from './views/base/DevBanner'
import { getConfig } from './mixins/Config'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { ComingSoon, DevBanner },
  computed: {
    isDevMode () { return getConfig('DEV_MODE') },
    isComingSoon () { return getConfig('COMING_SOON') }
  },
  created () {
    this.checkLogin()
    this.setSupportedLanguages()
  },
  methods: {
    async checkLogin () {
      this.startApiWork()

      let { meta, data } = await this.$api.getSelf()
      if (data) this.$store.commit(LOGIN_USER, data)

      this.endApiWork(meta)
    },
    async setSupportedLanguages () {
      if (this.$store.getters.availableLanguages.length > 0) return
      this.startApiWork()
      let { meta, data } = await this.$api.getSupportedLanguages()
      if (data) this.$store.commit(SET_SUPPORTED_LANGUAGES, data)
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
