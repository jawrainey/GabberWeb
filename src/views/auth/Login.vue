<template lang="pug">
box-layout
  section.section
    h1.title Login in to Gabber
    h4.subtitle or
      router-link(:to="registerRoute")  create an account
    
    message.is-danger(v-model="errors", clearable)
    
    .field
      label.label Email
      input.input(
        type="text",
        v-model="email",
        @keyup.enter="login",
        placeholder="e.g. jim@example.com"
      )
    .field
      label.label
        span.has-text-white.has-text-left Password
      input.input(
        type="password",
        v-model="password",
        @keyup.enter="login",
        placeholder="e.g. ••••••••"
      )
    
    p
      router-link(:to="forgotRoute", tabindex="100")
        | Forgot your password?
    
    br
    
    .buttons.is-centered
      router-link.button.is-link(:to="returnRoute") Cancel
      button.button.is-success(
        @click="login", :disabled="!canLogin") Log In
      
    hr
    
    .columns
      .column
        h3.is-size-4.has-text-grey-lighter Don't already have an account?
      .column.is-narrow
        router-link.button.is-success(:to="registerRoute") Sign Up!
</template>

<script>
import { LOGIN_USER } from '@/const/mutations'
import { PROJECT_LIST_ROUTE, REGISTER_ROUTE, FORGOT_ROUTE } from '@/const/routes'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  data: () => ({
    email: '',
    password: '',
    errors: []
  }),
  computed: {
    canLogin () {
      return this.email !== '' && this.password !== ''
    },
    returnRoute () { return this.$store.getters.returnRoute || this.projectListRoute },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    registerRoute () { return { name: REGISTER_ROUTE } },
    forgotRoute () { return { name: FORGOT_ROUTE } },
    errorMessage () { return this.$store.getters.AUTH_ERROR }
  },
  mounted () {
    if (this.$store.getters.currentUser) {
      this.$router.push(this.returnRoute)
    }
  },
  methods: {
    async login () {
      if (!this.canLogin) return
      this.errors = []
      
      let { meta, data } = await this.$api.login(this.email, this.password)
      
      if (meta.success) {
        this.$store.commit(LOGIN_USER, data)
        this.$router.push(this.returnRoute)
      } else {
        this.errors = meta.messages
        if (meta.messages.length === 0) {
          this.errors.push('Invalid login, please try again')
        }
      }
    }
  }
}
</script>
