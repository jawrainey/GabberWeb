<template>
<div>
    <h1>Register for Gabber</h1>
    <p>{{ errorMessage }}</p>
    <input v-model="fullname" class="input" placeholder="Full name" type="text" >
    <input v-model="email" class="input" placeholder="Email" type="text" >
    <input v-model="password" class="input" placeholder="Password" type="password">
    <a tabindex="100">Forgot password?</a>
    <div class="control">
        <button class="button is-link" @click="register">SIGN UP</button>
    </div>
    <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
    <hr>
    <div class="control">
        <button class="button is-link">LOGIN</button>
    </div>
    </div>
</template>

<script>
  export default {
    data: () => ({
      fullname: '',
      email: '',
      password: ''
    }),
    methods: {
      register () {
        this.$store.dispatch('REGISTER_USER', { fullname: this.fullname, email: this.email, password: this.password })
      }
    },
    computed: {
      errorMessage() {
        return this.$store.getters.AUTH_ERROR
      }
    }
  }
</script>