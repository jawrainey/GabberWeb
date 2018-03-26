<template lang="pug">
#app-wrapper
  router-view(v-if="!apiInProgress")
</template>

<script>
import { LOGIN_USER } from './const/mutations'
import ApiWorkerMixin from './mixins/ApiWorker'

export default {
  mixins: [ ApiWorkerMixin ],
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
