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
          autocomplete='name',
          v-model="fullname",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.name_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.email_field.label')}}
        input.input(
          type="email",
          autocomplete="email",
          v-model.trim="email",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.email_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.pass_field.label')}}
        input.input(
          type="password",
          autocomplete="current-password",
          v-model="password",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.pass_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.language.title')}}
        p.is-size-7.is-italic {{$t('view.auth.register.language.description')}}
        .control
          span.select.is-fullwidth
            select(v-model="lang")
              option(:value="locale.id", v-for="locale in availableLocales") {{ locale.name }}
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

// TODO: make request to server and have this in store?
const availableLocales = [
  { key: 'ar', name: 'العربية', id: 4 },
  { key: 'en', name: 'English', id: 1 },
  { key: 'es', name: 'Español', id: 6 },
  { key: 'fr', name: 'Français', id: 5 },
  { key: 'it', name: 'Italiano', id: 2 },
  { key: 'ru', name: 'Русский', id: 5 }
]

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message, Markdown },
  data: () => ({
    availableLocales,
    fullname: '',
    email: '',
    password: '',
    lang: null,
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
        this.password !== '' &&
        this.lang !== null
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
        this.fullname, this.email, this.password, this.lang
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
