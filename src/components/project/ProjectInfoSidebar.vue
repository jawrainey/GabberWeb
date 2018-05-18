<template lang="pug">
.project-detail
  h3.title.is-3 {{ project.title }}
  p.subtitle {{ project.created_on | longDate }}
  label-value(
    :label="$t('comp.project.project_info_sidebar.info_label')",
    :value="project.description"
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
    :label="$t('comp.project.project_info_sidebar.members_label')"
  )
    .bubble-list.is-multiline
      member-bubble.is-size-6(
        v-for="member in project.members",
        :key="member.id",
        :member="member"
      )
  label-value(
    :label="$t('comp.project.project_info_sidebar.sessions_label')"
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
  }
}
</script>

<style lang="sass">
</style>
