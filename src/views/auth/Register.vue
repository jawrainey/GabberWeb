<template lang="pug">
box-layout.boxer
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
        label.label {{$t('view.auth.register.age')}}
        .control
          span.select.is-fullwidth
            select(v-model="age")
              option(:value="age.id", v-for="age in ages") {{ age.title }}
      .field
        label.label {{$t('view.auth.register.gender.title')}}
        .control
          span.select.is-fullwidth
            select(v-model="gender")
              option(:value="gender.id", v-for="gender in genderByLanguage") {{ gender.text }}

      .field(v-if="customGenderSelected")
        label.label {{$t('view.auth.register.gender.custom')}}
        input.input(
          type="text",
          v-model.trim="custom",
          @keyup.enter="register"
        )
      .field
        label.label {{$t('view.auth.register.society')}}
        .control
          span.select.is-fullwidth
            select(v-model="society")
              option(:value="society.id", v-for="society in societies") {{ society.name }}
      .field
        label.label {{$t('view.auth.register.role')}}
        .control
          span.select.is-fullwidth
            select(v-model="role")
              option(:value="role.id", v-for="role in roleByLanguage") {{ role.title }}
      .field
        label.label {{$t('view.auth.register.language.title')}}
        p.is-size-7.is-italic {{$t('view.auth.register.language.description')}}
        .control
          span.select.is-fullwidth
            select(v-model="lang")
              option(:value="locale.id", v-for="locale in availableLocales") {{ locale.endonym }}
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
import DataMixin from '@/mixins/Data'

export default {
  mixins: [ ApiWorkerMixin, DataMixin ],
  components: { BoxLayout, Message, Markdown },
  data: () => ({
    fullname: '',
    email: '',
    password: '',
    hasRegistered: false,
    lang: null,
    age: null,
    gender: null,
    society: null,
    role: null,
    custom: ''
  }),
  computed: {
    ages () { return this.AGES },
    societies () { return this.NATIONAL_SOCS },
    errorMessage () { return this.$store.getters.AUTH_ERROR },
    termsRoute () { return { name: TERMS_ROUTE } },
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } },
    returnRoute () { return this.$store.getters.returnRoute || this.projectListRoute },
    availableLocales () { return this.$store.getters.availableLanguages },
    genderByLanguage () { return this.GENDERS[this.$i18n.locale] },
    roleByLanguage () { return this.ROLES[this.$i18n.locale] },
    customGenderSelected () { return this.gender === 2 },
    canRegister () {
      return this.fullname !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.lang !== null &&
        this.age != null &&
        this.gender != null &&
        this.society != null &&
        this.role != null
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
        this.fullname, this.email, this.password, this.lang,
        this.age, this.gender, this.role, this.society, this.custom
      )
      
      this.hasRegistered = meta.success
      
      this.endApiWork(meta, this.$t('view.auth.register.failed_body'))
    }
  }
}
</script>

<style lang="sass">
.boxer
  padding: 1em 0

.has-registered
  .email
    margin-right: 0.3em

</style>
