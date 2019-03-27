<template lang="pug">
.project-detail
  h3.title.is-size-4.has-text-weight-semibold.is-marginless.smaller-margin-bottom {{ projectContent.title }}
  label-value.is-size-7(
    :label="$t('comp.project.project_info_sidebar.info_label')",
    :value="projectContent.description"
  )
  label-value(
    :label="$t('comp.project.project_info_sidebar.owner_label')"
  )
    p.is-size-4
      member-bubble.is-size-5(
        :member="project.creator",
        pad-right
      )
      span {{ project.creator.fullname }}
  label-value(
    :label="$t('comp.project.project_info_sidebar.members_label')",
    :value="project.members.length"
  )
  label-value(
  :label="$t('comp.project.project_info_sidebar.researchers_label')"
  )
    p.is-size-4(v-if="projectResearchers.length > 0", v-for="member in projectResearchers")
      member-bubble.is-size-5(
      :key="member.id",
      :member="member",
      pad-right
      )
      span {{ member.fullname }}
    p(v-if="projectResearchers.length <= 0").blockquote.is-size-7 {{ $t('comp.session.session_info_sidebar.researchers.description') }}
  label-value(
    :label="$t('comp.project.project_info_sidebar.sessions_label')",
    :value="sessions.length"
  )
</template>

<script>
import MemberBubble from '@/components/member/MemberBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { MemberBubble, LabelValue },
  props: {
    project: { type: Object, required: true },
    sessions: { type: Array, required: true }
  },
  computed: {
    projectContent () { return this.$store.getters.projectContentByLanguage(this.project) },
    projectResearchers () { return this.project.members.filter(m => m.role === 'researcher') }
  }
}
</script>

<style lang="sass" scoped>
  .smaller-margin-bottom
    margin-bottom: .5em !important
</style>
