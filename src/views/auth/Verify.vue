<template lang="pug">
box-layout
  section.section
    h1.title Verifying
    message.is-danger(v-model="apiErrors")
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import { LOGIN_USER } from '@/const/mutations'

import ApiWorkerMixin from '@/mixins/ApiWorker'

import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message },
  mounted () {
    this.verifyToken(this.$route.params.token)
  },
  watch: {
    '$route.params.token' (newToken) {
      this.verifyToken(newToken)
    }
  },
  methods: {
    async verifyToken (token) {
      this.startApiWork()
      
      let { meta, data } = await this.$api.verify(token)
      
      if (meta.success) {
        this.$store.commit(LOGIN_USER, data)
        this.$router.push({ name: PROJECT_LIST_ROUTE })
      }
      
      this.endApiWork(meta, 'Verification failed')
    }
  }
}
</script>

<style lang="sass">
</style>
