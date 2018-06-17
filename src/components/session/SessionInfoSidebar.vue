<template lang="pug">
.session-info-sidebar
  h3.subtitle {{$t('comp.session.session_info_sidebar.title')}}
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
    p.is-size-4(v-if="projectResearchers.length > 0", v-for="researcher in projectResearchers")
      member-bubble.is-size-6(:member="researcher", pad-right)
      span {{ researcher.fullname }}
    .field(v-if="projectResearchers.length <= 0")
      blockquote.blockquote {{ $t('comp.session.session_info_sidebar.researchers.description') }}
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
