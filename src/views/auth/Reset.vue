<template lang="pug">
box-layout
  section.section
    h1.title Reset password
    h2.subtitle Reset your password using this form
    
    .reset-form(v-if="!passwordReset")
      message.is-danger(v-model="errors", clearable)
    
      label.label New Password
      .field.has-addons
        .control.is-expanded
          input.input(
            type="password",
            v-model="password",
            @keyup.enter="resetPassword",
            placeholder="e.g. ••••••••"
          )
        .control
          button.button.is-success(
            @click="resetPassword",
            :disabled="!canReset"
          ) Reset
    
    .success(v-else)
      message.is-info(
        title="Password Reset",
        value="Your password has been reset"
      )
      .buttons.is-centered
        router-link.button.is-success(:to="projectListRoute")
          span Projects
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import { LOGIN_USER } from '@/const/mutations'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  data: () => ({
    password: '',
    errors: [],
    passwordReset: false
  }),
  computed: {
    canReset () { return this.password.length >= 8 },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } }
  },
  methods: {
    async resetPassword () {
      if (!this.canReset) return
      
      let { meta, data } = await this.$api.resetPassword(
        this.$route.params.code, this.password
      )
      
      this.passwordReset = meta.success
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(LOGIN_USER, data)
      } else if (meta.messages.length === 0) {
        this.errors.push('Password reset failed, please try again')
      }
    }
  }
}
</script>

<style lang="css">
</style>
