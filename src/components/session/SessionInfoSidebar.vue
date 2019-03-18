<template lang="pug">
.session-info-sidebar
  h3.title.is-size-4.has-text-weight-semibold.is-marginless.m-bottom {{$t('comp.session.session_info_sidebar.title')}}
  label-value(
    :label="$t('comp.session.session_info_sidebar.created_label')",
    :value="sessionDate"
  )
  label-value.creator(
    :label="$t('comp.session.session_info_sidebar.creator_label')"
  )
    p.is-size-4
      member-bubble.is-size-5(
        :member="session.creator",
        pad-right
      )
      span {{ session.creator.fullname }}
  label-value(
    :label="$t('comp.session.session_info_sidebar.members_label')"
  )
    .bubble-list
      member-bubble.is-size-6(
        v-for="member in session.participants",
        :key="member.id",
        :member="member",
        pad-right
      )
  label-value(v-if="project",
  :label="$t('comp.session.session_info_sidebar.researchers.title')"
  )
    p(v-if="showResearchDescription", v-for="researcher in projectResearchers").is-size-4
      member-bubble.is-size-6(:member="researcher", pad-right)
      span {{ researcher.fullname }}
    blockquote(v-if="!showResearchDescription").blockquote
      | {{ $t('comp.session.session_info_sidebar.researchers.description') }}
  label-value(
    label="Duration",
    :value="duration"
    )
  .columns.is-mobile
    .column
      label-value(
        :label="$t('comp.session.session_info_sidebar.topics_label')",
        :value="session.topics.length"
      )
    .column
      label-value(
        :label="$t('comp.session.session_info_sidebar.annotations_label')",
        :value="numAnnotations"
      )
</template>

<script>
import moment from 'moment-mini'

import MemberBubble from '@/components/member/MemberBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { MemberBubble, LabelValue },
  props: {
    // Used to obtain the project members; optional as to not show researchers on /session/N
    project: { type: Object, required: false },
    session: { type: Object, required: true }
  },
  computed: {
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
</style>
