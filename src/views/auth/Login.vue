<template lang="pug">
box-layout
  section.section
    h1.title {{$t('view.auth.login.title')}}
    h4.subtitle {{$t('misc.words.or')}}
      router-link(:to="registerRoute")  {{$t('view.auth.login.signup_action')}}
    
    message.is-danger(v-model="errors", clearable)

    form
      .field
        label.label {{$t('view.auth.login.email_field.label')}}
        input.input(
          type="email",
          autocomplete="email",
          v-model.trim="email",
          @keyup.enter="login",
          :placeholder="$t('view.auth.login.email_field.placeholder')"
        )
      .field
        label.label
          span.has-text-white.has-text-left {{$t('view.auth.login.pass_field.label')}}
        input.input(
          type="password",
          autocomplete="current-password",
          v-model="password",
          @keyup.enter="login",
          :placeholder="$t('view.auth.login.pass_field.placeholder')"
        )

    p
      router-link(:to="forgotRoute", tabindex="100")
        | {{$t('view.auth.login.forgot_action')}}
    
    br
    
    .buttons.is-centered
      router-link.button.is-link(:to="returnRoute")
        | {{$t('view.auth.login.cancel_action')}}
      button.button.is-success(@click="login", :disabled="!canLogin")
        | {{$t('view.auth.login.submit_action')}}
      
    hr
    
    .columns
      .column
        h3.is-size-4.has-text-grey-lighter
          | {{$t('view.auth.login.signup_body')}}
      .column.is-narrow
        router-link.button.is-success(:to="registerRoute")
          | {{$t('view.auth.register.nav_title')}}
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
          this.errors.push(this.$t('view.auth.login.failed_body'))
        }
      }
    }
  }
}
</script>
