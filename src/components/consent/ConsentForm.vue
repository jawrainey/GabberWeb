<template lang="pug">
section.consent-form
  .has-text-centered
    .hero-body
      h1.title {{$t('comp.consent.consent_form.title')}}
      h2.subtitle {{$t('comp.consent.consent_form.subtitle')}}

  .field
    label.label {{$t('comp.consent.consent_form.session_title')}}
    .box
      audio-player(:session="session")

  .field
    label.label {{$t('comp.consent.consent_form.project_title')}}
    project-pill(:project="project", readonly)

  .field
    label.label {{$t('comp.consent.consent_form.research.title')}}
    .box.consent-control.is-size-6.has-text-justified
      label {{$t('comp.consent.consent_form.research.body')}}
      br
      i.help.has-text-centered
        | {{$t('comp.consent.consent_form.research.statement')}}
        |
        router-link(:to="researchRoute")
          b {{$t('comp.consent.consent_form.research.link')}}

  .field
    label.label {{$t('comp.consent.consent_form.perms_title')}}
    i.help.is-warning(v-if="showEmbargo") {{$t('comp.consent.consent_form.research.embargo')}}
    br
    .box.consent-control.is-size-5
      label
        input(type="radio", v-model="updatedConsent", value="public")
        strong {{$t('comp.consent.consent_form.public_title')}}
        br
        i.help {{$t('comp.consent.consent_form.public_body')}}
      label(v-if="project.privacy === 'private'")
        input(type="radio", v-model="updatedConsent", value="members")
        strong {{$t('comp.consent.consent_form.private_title')}}
        br
        i.help {{$t('comp.consent.consent_form.private_body')}}
      label
        input(type="radio", v-model="updatedConsent", value="private")
        strong {{$t('comp.consent.consent_form.hidden_title')}}
        br
        i.help {{$t('comp.consent.consent_form.hidden_body')}}

  .field
    .user-appearance-field
      .columns
        .column
          label-value(:label="$t('comp.consent.consent_form.appearance_label')")
            member-bubble.is-size-4(
              v-if="updatedConsent !== 'private'", :member="user", use-id
            )
            blockquote.blockquote(v-else)
              | {{$t('comp.consent.consent_form.no_show')}}
        .column
          label-value(:label="$t('comp.consent.consent_form.access_label')")
            ol: li(v-for="person in whoHasAccess", v-text="person")

  .field
    .buttons.is-centered
      button.button.is-success.is-medium(
        @click="onSubmit", :disabled="updatedConsent && disabled"
      ) {{$t('comp.consent.consent_form.submit_action')}}
</template>

<script>
import { RESEARCH_ROUTE } from '@/const/routes'
import LabelValue from '@/components/utils/LabelValue'
import MemberBubble from '@/components/member/MemberBubble'

import ProjectPill from '@/components/project/ProjectPill'
import AudioPlayer from '@/components/audio/AudioPlayer'

/* Emitted Events

@submit (consent) -> When the submits consent for the session

*/

export default {
  components: { LabelValue, MemberBubble, ProjectPill, AudioPlayer },
  props: {
    project: { type: Object, required: true },
    session: { type: Object, required: true },
    user: { type: Object, required: true },
    consent: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    updatedConsent: ''
  }),
  watch: {
    updatedConsent (newValue) {
      if (!this.project || !this.user) return

      // Filter out our injected user
      this.project.members = this.project.members.filter(m =>
        m.user_id !== this.user.id
      )
      if (newValue !== 'private') {
        this.project.members.push({
          role: 'participant',
          user_id: this.user.id
        })
      }
    }
  },
  computed: {
    whoHasAccess () {
      let consent = this.updatedConsent || this.consent
      let people = [
        this.$t('comp.consent.consent_form.people.researcher'),
        this.$t('comp.consent.consent_form.people.interviewer'),
        this.$t('comp.consent.consent_form.people.administrators'),
        this.$t('comp.consent.consent_form.people.participant')
      ]
      if (consent === 'private') return people
      people.push(this.$t('comp.consent.consent_form.people.member'))
      if (consent === 'members') return people
      people.push(this.$t('comp.consent.consent_form.people.public'))
      return people
    },
    showEmbargo () {
      let createdOn = new Date(this.session.created_on)
      createdOn.setHours(createdOn.getHours() + 24)
      return Date.now() < createdOn
    },
    researchRoute () { return { name: RESEARCH_ROUTE } }
  },
  mounted () {
    this.updatedConsent = this.consent
  },
  methods: {
    onChange (e) {
      this.updatedConsent = e.target.value
    },
    onSubmit (e) {
      this.$emit('submit', this.updatedConsent)
    }
  }
}
</script>

<style lang="sass" scoped>

.consent-form
  .field
    margin-bottom: 2em
    > .label
      font-size: $size-5

    +desktop
      > .label + *
        margin-left: 1em

  .consent-control
    > label
      display: block
      > strong
        padding: 0 0.3em

  .user-appearance-field
    ol li
      margin-left: 1em

</style>
