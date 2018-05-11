<template lang="pug">
box-layout
  section.section(v-if="!hasRegistered")
    h3.title {{$t('view.auth.register.title')}}
    h4.subtitle() {{$t('misc.words.or')}}
      router-link(:to="loginRoute")  {{$t('view.auth.register.login_action')}}
    
    message.is-danger(v-model="apiErrors", clearable)
    
    .login-form
      .field
        label.label {{$t('view.auth.register.name_field.label')}}
        input.input(
          type="text",
          v-model="fullname",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.name_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.email_field.label')}}
        input.input(
          type="email",
          v-model="email",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.email_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.pass_field.label')}}
        input.input(
          type="password",
          v-model="password",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.pass_field.placeholder')"
        )
      p
        | {{$t('view.auth.register.terms_body')}}
        router-link(:to="termsRoute", target="_blank")
          |  {{$t('view.base.terms.nav_title')}}
        = ' &'
        router-link(:to="privacyRoute", target="_blank")
          |  {{$t('view.base.privacy.nav_title')}}
      br
      .buttons.is-centered
        router-link.button.is-link(:to="returnRoute")
          | {{$t('view.auth.register.cancel_action')}}
        button.button.is-success(@click="register", :disabled="!canRegister")
          | {{$t('view.auth.register.submit_action')}}
  
  section.section.has-registered(v-else)
    h2.title.is-2.has-text-centered
      fa.email(icon="envelope-open", size="lg")
      span {{$t('view.auth.register.success_title')}}
    .message.is-success.is-medium
      .message-header {{$t('view.auth.register.success_subtitle')}}
      .message-body.content
        markdown(name="registered")
</template>

<script>
import { TERMS_ROUTE, PRIVACY_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'
import Markdown from '@/components/utils/Markdown'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message, Markdown },
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
      
      this.endApiWork(meta, this.$t('view.auth.register.failed_body'))
    }
  }
}
</script>

<style lang="sass">

.has-registered
  .email
    margin-right: 0.3em

</style>
