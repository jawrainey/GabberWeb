<template lang="pug">
box-layout
  section.section(v-if="!hasRegistered")
    h3.title Create a Gabber Account
    h4.subtitle() or
      router-link(:to="loginRoute")  log in to your account
    
    message.is-danger(v-model="apiErrors", clearable)
    
    .login-form
      .field
        label.label Full Name
        input.input(
          type="text",
          v-model="fullname",
          @keyup.enter="register",
          placeholder="e.g. Jim Halpert"
        )
      .field
        label.label Email
        input.input(
          type="email",
          v-model="email",
          @keyup.enter="register",
          placeholder="e.g. jim@example.com"
        )
      .field
        label.label Password
        input.input(
          type="password",
          v-model="password",
          @keyup.enter="register",
          placeholder="e.g. ••••••••"
        )
      p
        = 'By signing up, you agree to our '
        router-link(:to="termsRoute", target="_blank") Terms of Service
        = ' and '
        router-link(:to="privacyRoute", target="_blank") Privacy Policy.
      br
      .buttons.is-centered
        router-link.button.is-link(:to="returnRoute") Cancel
        button.button.is-success(
          @click="register", :disabled="!canRegister"
        ) Sign Up
  section.section.has-registered(v-else)
    h2.title.is-2.has-text-centered
      fa.email(icon="envelope-open", size="lg")
      span Check your mail
    .message.is-success.is-medium
      .message-header Account Created!
      .message-body.content
        p We've created a brand new account just for you, we just need you to confirm your email address.
        p You'll recieve an email shortly with a link to verify your account. Click that link and your good to Gabber!
</template>

<script>
import { TERMS_ROUTE, PRIVACY_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message },
  data: () => ({
    fullname: '',
    email: '',
    password: '',
    hasRegistered: false
  }),
  computed: {
    errorMessage () { return this.$store.getters.AUTH_ERROR },
    termsRoute () { return { name: TERMS_ROUTE } },
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } },
    returnRoute () { return this.$store.getters.returnRoute || this.projectListRoute },
    canRegister () {
      return this.fullname !== '' &&
        this.email !== '' &&
        this.password !== ''
    }
  },
  mounted () {
    if (this.$store.getters.currentUser) {
      this.$router.push(this.returnRoute)
    }
  },
  methods: {
    async register () {
      if (!this.canRegister || this.apiInProgress) return
      this.startApiWork()
      
      let { meta } = await this.$api.register(
        this.fullname, this.email, this.password
      )
      
      this.hasRegistered = meta.success
      
      this.endApiWork(meta, 'Registration failed, please try again')
    }
  }
}
</script>

<style lang="sass">

.has-registered
  .email
    margin-right: 0.3em

</style>
