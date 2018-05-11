<template lang="pug">
box-layout
  section.section
    h1.title {{$t('view.auth.reset.title')}}
    h2.subtitle {{$t('view.auth.reset.subtitle')}}
    
    .reset-form(v-if="!passwordReset")
      message.is-danger(v-model="errors", clearable)
    
      label.label {{$t('view.auth.reset.pass_field.label')}}
      .field.has-addons
        .control.is-expanded
          input.input(
            type="password",
            v-model="password",
            @keyup.enter="resetPassword",
            :placeholder="$t('view.auth.reset.pass_field.placeholder')"
          )
        .control
          button.button.is-success(
            @click="resetPassword",
            :disabled="!canReset",
            v-text="$t('view.auth.reset.submit_action')"
          )
    
    .success(v-else)
      message.is-info(
        :title="$t('view.auth.reset.success_title')",
        :value="$t('view.auth.reset.success_body')"
      )
      .buttons.is-centered
        router-link.button.is-success(:to="projectListRoute")
          span {{$t('view.project.project_list.nav_title')}}
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import { LOGIN_USER } from '@/const/mutations'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'

export default {
  components: { BoxLayout, Message },
  data: () => ({
    password: '',
    errors: [],
    passwordReset: false
  }),
  computed: {
    canReset () { return this.password.length >= 8 },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } }
  },
  methods: {
    async resetPassword () {
      if (!this.canReset) return
      
      let { meta, data } = await this.$api.resetPassword(
        this.$route.params.code, this.password
      )
      
      this.passwordReset = meta.success
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(LOGIN_USER, data)
      } else if (meta.messages.length === 0) {
        this.errors.push(this.$t('view.auth.reset.failed_body'))
      }
    }
  }
}
</script>

<style lang="sass">
</style>
