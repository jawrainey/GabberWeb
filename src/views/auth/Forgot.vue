<template lang="pug">
box-layout
  section.section
    h1.title Forgotten password
    h2.subtitle Send an email to you to reset your password
    
    .reset-form(v-if="!sentCode")
      label.label Enter your email
      .field.has-addons
        .control.is-expanded
          input.input(
            type="text",
            v-model="email",
            @keyup.enter="send",
            placeholder="pam@example.com"
          )
        .control
          button.button.is-success(
            @click="send",
            :disabled="!canSend"
          ) Send
    
    template(v-else)
      .message.is-success
        .message-header: p Code Sent
        .message-body: p We've sent a code to that email address, if it exists in our system, check your email to reset your password.
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

export default {
  components: { BoxLayout },
  data: () => ({
    email: '',
    sentCode: false
  }),
  computed: {
    canSend () { return this.email !== '' },
    loginRoute () { return { name: LOGIN_ROUTE } }
  },
  methods: {
    async send () {
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
