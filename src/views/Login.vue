<template lang="pug">

section.section.is-medium

    .columns
        .column.is-one-third
        .column.is-one-third.has-text-centered
            h3.title.is-3 Login to Gabber

            .field
                label.label
                    span.has-text-white.has-text-left Email
                input(v-model="email" class="input" placeholder="Email" type="text")
            .field
                label.label
                    span.has-text-white.has-text-left Password
                input(v-model="password" class="input" placeholder="Password" type="password")

            p {{ errorMessage }}

            a.has-text-info.is-link(tabindex="100") Forgot password?
            
            .control
                button.button.is-success.is-link.is-rounded(@click="login") LOG IN

            hr

            .control
                router-link.button.is-info.is-link.is-rounded(v-bind:to="{ name: 'register' }") SIGN UP
        .column.is-one-third
</template>

<script>
  export default {
    data: () => ({
      email: '',
      password: ''
    }),
    methods: {
      login () {
        this.$store.dispatch('LOGIN_USER', { email: this.email, password: this.password })
      },
    },
    computed: {
      errorMessage() {
        return this.$store.getters.AUTH_ERROR
      }
    }
  }
</script>
