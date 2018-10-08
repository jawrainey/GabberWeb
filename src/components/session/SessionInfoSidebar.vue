<template lang="pug">
.session-info-sidebar
  h2.title.is-size-5.is-sidebar-heading {{ projectContent.title }}
  h2.title.is-size-7.is-inline.is-italic {{ projectContent.description }}
  hr.is-white
  h2.title.is-size-5 {{$t('comp.session.session_info_sidebar.title')}}
  label-value(
    :label="$t('comp.session.session_info_sidebar.created_label')",
    :value="sessionDate"
  )
  label-value(
    :label="participantsTitle"
  )
    .bubble-list.is-multiline
      .person(v-for="member in session.participants")
        .first
          member-bubble(:key="member.id", :member="member")
          p.society {{ societyById(member) }}
        .second
          span.meta.is-size-7.is-italic  {{ roleById(member) }} | {{ genderById(member) }} | {{ ageOfMember(member) }}
</template>

<script>
import moment from 'moment-mini'

import MemberBubble from '@/components/member/MemberBubble'
import LabelValue from '@/components/utils/LabelValue'
import DataMixin from '@/mixins/Data'

export default {
  mixins: [ DataMixin ],
  components: { MemberBubble, LabelValue },
  props: {
    // Used to obtain the project members; optional as to not show researchers on /session/N
    project: { type: Object, required: false },
    session: { type: Object, required: true }
  },
  computed: {
    participantsTitle () {
      return `${this.$t('comp.session.session_info_sidebar.members_label')} (${this.session.participants.length})`
    },
    projectContent () {
      return this.$store.getters.projectContentByLanguage(this.project)
    },
    sessionDate () {
      return moment(this.session.created_on)
        .format(this.$t('comp.session.session_info_sidebar.date_format'))
    },
    showResearchDescription () {
      return this.projectResearchers.length > 0
    },
    duration () {
      return this.$options.filters.duration(this.session.topics[this.session.topics.length - 1].end_interval)
    },
    numAnnotations () {
      return this.$store.getters.annotationsForSession(this.session.id).length
    },
    projectResearchers () {
      return this.project.members.filter(m => m.role === 'researcher')
    }
  }
}
</script>

<style lang="sass">
.is-sidebar-heading
  padding: 1em 0 0 0

.is-white
  background-color: white

.border-bottom
  margin-bottom: .5em !important
  padding-bottom: 3px
  border-bottom: 1px solid #ED4E56

.first, .second
  display: inline-flex
  align-items: center

.society
  font-size: 1em !important
  padding-left: 1em
.meta
  padding: 0 0 .5em 1em

.bubble-list
  margin-bottom: 0
</style>
