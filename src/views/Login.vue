<template lang="pug">
box-layout
  section.section
    h3.title.has-text-centered Login to Gabber
    
    .message.is-danger(v-if="errorMessage")
      .message-header
        p Something went wrong
      .message-body
        p {{ errorMessage }}
    
    .field
      label.label Email
      input(
        type="text",
        v-model="email",
        @keyup.enter="login",
        class="input",
        placeholder="geoff@example.com"
      )
    .field
      label.label
        span.has-text-white.has-text-left Password
      input(
        type="password",
        v-model="password",
        @keyup.enter="login",
        class="input",
        placeholder="••••••••"
      )
    
    //- p
    //-   a.is-text(tabindex="100") Forgot password?
    
    br
    
    .buttons.is-centered
      button.button.is-danger.is-rounded.is-uppercase(@click="$router.go(-1)") Back
      button.button.is-success.is-rounded.is-uppercase(@click="login") Log In
      
    hr
    
    .columns
      .column
        h3.is-size-4.has-text-grey-lighter Don't already have an account?
      .column.is-narrow
        router-link.button.is-info.is-link.is-rounded.is-uppercase(v-bind:to="{ name: 'register' }") Sign Up
</template>

<script>
import BoxLayout from '@/layouts/BoxLayout'

export default {
  components: { BoxLayout },
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login () {
      this.$store.dispatch('LOGIN_USER', { email: this.email, password: this.password })
    }
  },
  computed: {
    errorMessage () {
      return this.$store.getters.AUTH_ERROR
    }
  }
}
</script>
