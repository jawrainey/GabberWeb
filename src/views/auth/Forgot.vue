<template lang="pug">
box-layout
  section.section
    
    h1.title {{$t('view.auth.forgot.title')}}
    h2.subtitle {{$t('view.auth.forgot.subtitle')}}

    .forgot-form(v-if="!sentCode")
      label.label {{$t('view.auth.forgot.email_field.label')}}
      .field.is-grouped
        .control.is-expanded
          input.input(
            type="text",
            v-model.trim="email",
            @keyup.enter="sendCode",
            :placeholder="$t('view.auth.forgot.email_field.placeholder')"
          )
        .control
          button.button.is-success(
            @click="sendCode",
            :disabled="!canSend"
          ) {{$t('view.auth.forgot.email_field.label')}}
    
    template(v-else)
      message.is-success(
        :title="$t('view.auth.forgot.success_title')",
        :value="$t('view.auth.forgot.success_body', { email })"
      )
    hr
    .buttons
      router-link.button.is-link(:to="loginRoute")
        .icon: fa(icon="chevron-left")
        span {{$t('view.auth.login.nav_title')}}
</template>

<script>
import { LOGIN_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message },
  data: () => ({
    email: '',
    sentCode: false
  }),
  computed: {
    canSend () { return this.isEmail(this.email) && !this.apiInProgress },
    loginRoute () { return { name: LOGIN_ROUTE } }
  },
  methods: {
    isEmail (string) {
      return /^.+@.+\..+$/.test(string)
    },
    async sendCode () {
      if (!this.canSend) return
      this.startApiWork()
      
      let { meta } = await this.$api.sendReset(this.email)
      this.sentCode = meta.success
      
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="css">
</style>
