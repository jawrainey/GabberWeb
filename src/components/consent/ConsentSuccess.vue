<template lang="pug">
box-layout
  section.section
    h1.title {{$t('comp.consent.consent_success.title')}}
    h2.subtitle {{$t('comp.consent.consent_success.subtitle')}}
    message.is-success(
      :title="$t('comp.consent.consent_success.message_title')",
      :value="$t('comp.consent.consent_success.message_body')"
    )
    hr
    .buttons.is-centered
      router-link.button.is-success.is-medium(
        v-if="currentUser", :to="sessionRoute"
      )
        span {{$t('comp.consent.consent_success.session_action')}}
        span.icon: fa(icon="chevron-right")
      button.button.is-success(v-else-if="isRegistered", @click="login")
        span {{$t('view.auth.login.nav_title')}}
      button.button.is-success(v-else, @click="register")
        span {{$t('view.auth.register.nav_title')}}
</template>

<script>
import { SESSION_DETAIL_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '@/const/routes'
import { LOGIN_RETURN_ROUTE } from '@/const/mutations'

import { mapGetters } from 'vuex'

import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  props: {
    project: { type: Object, required: true },
    session: { type: Object, required: true },
    user: { type: Object, required: true }
  },
  computed: {
    ...mapGetters([ 'currentUser' ]),
    sessionRoute () { return this.makeSessionRoute() },
    isRegistered () { return this.user.registered && this.user.verified }
  },
  methods: {
    makeSessionRoute () {
      let params = { project_id: this.project.id, session_id: this.session.id }
      return { name: SESSION_DETAIL_ROUTE, params }
    },
    login () {
      this.$store.commit(LOGIN_RETURN_ROUTE, this.makeSessionRoute())
      this.$router.push({ name: LOGIN_ROUTE })
    },
    register () {
      this.$store.commit(LOGIN_RETURN_ROUTE, this.makeSessionRoute())
      this.$router.push({ name: REGISTER_ROUTE })
    }
  }
}
</script>

<style lang="css">
</style>
