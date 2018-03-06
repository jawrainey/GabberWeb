<template lang="pug">
box-layout
  section.section
    h3.title Register for Gabber
    
    .message.is-danger(v-if="errorMessage")
      .message-header
        p Something went wrong
      .message-body
        p {{ errorMessage }}
    
    .field
      label.label Full Name
      input.input(
        type="text",
        v-model="fullName",
        @keyup.enter="register",
        placeholder="Jim Halpert"
      )
    
    .field
      label.label Email
      input.input(
        type="text",
        v-model="email",
        @keyup.enter="register",
        placeholder="geoff@example.com"
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
      | By signing up, you agree to our
      |
      router-link(:to="termsRoute", target="_blank") Terms of Service
      |
      | and
      |
      router-link(:to="privacyRoute", target="_blank") Privacy Policy.
    
    br
    
    .buttons.is-centered
      button.button.is-danger.is-rounded.is-uppercase(@click="$router.go(-1)") Cancel
      button.button.is-success.is-rounded.is-uppercase(@click="register") Sign Up
</template>

<script>
import { TERMS_ROUTE, PRIVACY_ROUTE } from '@/const/routes'

import BoxLayout from '@/layouts/BoxLayout'

export default {
  components: { BoxLayout },
  data: () => ({
    fullname: '',
    email: '',
    password: ''
  }),
  computed: {
    errorMessage () { return this.$store.getters.AUTH_ERROR },
    termsRoute () { return { name: TERMS_ROUTE } },
    privacyRoute () { return { name: PRIVACY_ROUTE } }
  },
  methods: {
    register () {
      this.$store.dispatch('REGISTER_USER', { fullname: this.fullname, email: this.email, password: this.password })
    }
  }
}
</script>
