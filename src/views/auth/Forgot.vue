<template lang="pug">
box-layout
  section.section
    
    h1.title Reset Your Gabber Password
    h2.subtitle Submit your email address and we'll send you a link to reset your password.

    .forgot-form(v-if="!sentCode")
      label.label Enter your email
      .field.is-grouped
        .control.is-expanded
          input.input(
            type="text",
            v-model="email",
            @keyup.enter="sendCode",
            placeholder="pam@example.com"
          )
        .control
          button.button.is-success(
            @click="sendCode",
            :disabled="!canSend"
          ) Send
    
    template(v-else)
      message.is-success(
        title="Code Sent",
        :value="`We've sent a code to that ${email}, if it exists in our system, check your email to reset your password.`"
      )
    hr
    .buttons
      router-link.button.is-link(:to="loginRoute")
        .icon: fa(icon="chevron-left")
        span Login
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
