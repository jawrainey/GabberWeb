<template lang="pug">
box-layout
  section.section
    h1.title Forgotten password
    h2.subtitle Send an email to you to reset your password
    
    .forgot-form(v-if="!sentCode")
      label.label Enter your email
      .field.has-addons
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
        value="We've sent a code to that email address, if it exists in our system, check your email to reset your password."
      )
      .buttons.is-centered
        button.button.is-primary(@click="sentCode = false")
          | Try Again?
    hr
    .buttons
      router-link.button.is-link(:to="loginRoute")
        .icon: fa(icon="chevron-left")
        span Back
</template>

<script>
import { LOGIN_ROUTE } from '@/const/routes'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  data: () => ({
    email: '',
    sentCode: false
  }),
  computed: {
    canSend () { return this.email !== '' },
    loginRoute () { return { name: LOGIN_ROUTE } }
  },
  methods: {
    async sendCode () {
      if (!this.canSend) return
      
      let { meta } = await this.$api.sendReset(this.email)
      
      this.sentCode = meta.success
      // this.email = ''
    }
  }
}
</script>

<style lang="css">
</style>
