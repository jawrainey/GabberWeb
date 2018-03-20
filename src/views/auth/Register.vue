<template lang="pug">
box-layout
  section.section
    h3.title Register for Gabber
    
    h4.subtitle
      = 'Already have an account? '
      router-link(:to="loginRoute") Log in
    
    message.is-danger(v-model="errors", clearable)
    
    .login-form(v-if="!created")
      .field
        label.label Full Name
        input.input(
          type="text",
          v-model="fullname",
          @keyup.enter="register",
          placeholder="Jim Halpert"
        )
      .field
        label.label Email
        input.input(
          type="text",
          v-model="email",
          @keyup.enter="register",
          placeholder="jim@example.com"
        )
      .field
        label.label Password
        input.input(
          type="password",
          v-model="password",
          @keyup.enter="register",
          placeholder="••••••••"
        )
      p
        = 'By signing up, you agree to our '
        router-link(:to="termsRoute", target="_blank") Terms of Service
        = ' and '
        router-link(:to="privacyRoute", target="_blank") Privacy Policy.
      br
      .buttons.is-centered
        button.button.is-danger(
          @click="$router.go(-1)"
        ) Cancel
        button.button.is-success(
          @click="register", :disabled="!canRegister"
        ) Sign Up
    template(v-else)
      message.is-primary(
        title="Account Created",
        value="Your account has been created and you should shortly recieve a confirmation by email."
      )
      .buttons.is-right
        router-link.button.is-success(:to="projectListRoute")
          | Checkout some projects!
</template>

<script>
import { LOGIN_USER } from '@/const/mutations'
import { TERMS_ROUTE, PRIVACY_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  data: () => ({
    fullname: '',
    email: '',
    password: '',
    created: false,
    errors: [ ]
  }),
  computed: {
    errorMessage () { return this.$store.getters.AUTH_ERROR },
    termsRoute () { return { name: TERMS_ROUTE } },
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } },
    canRegister () {
      return this.fullname !== '' &&
        this.email !== '' &&
        this.password !== ''
    }
  },
  methods: {
    async register () {
      if (!this.canRegister) return
      this.errors = []
      
      let { meta, data } = await this.$api.register(
        this.fullname, this.email, this.password
      )
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(LOGIN_USER, data)
        this.created = true
      } else if (meta.messages.length === 0) {
        this.errors.push('Registration failed, please try again')
      }
    }
  }
}
</script>
