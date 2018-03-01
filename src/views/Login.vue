<template>
<div>
    <h1>Log in to Gabber</h1>
    <input v-model="email" class="input" placeholder="Email" type="text" >
    <input v-model="password" class="input" placeholder="Password" type="password">
    {{ errorMessage }}
    <a tabindex="100">Forgot password?</a>
    <div class="control">
        <button class="button is-link" @click="login">LOG IN</button>
    </div>
    <hr>
    <div class="control">
        <button class="button is-link">SIGN UP</button>
    </div>
    </div>
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