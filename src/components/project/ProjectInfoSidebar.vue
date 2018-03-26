<template lang="pug">
.project-detail
  h3.title.is-3 {{ project.title }}
  p.subtitle {{ project.created_on | longDate }}
  label-value(label="Description", :value="project.description")
  label-value(label="Creator")
    p.is-size-4
      member-bubble.is-size-5(
        :member="project.creator", pad-right
      )
      span {{ project.creator.fullname }}
  label-value(label="Project Members")
    .bubble-list.is-multiline
      member-bubble.is-size-6(
        v-for="member in project.members",
        :key="member.id",
        :member="member"
      )
</template>

<script>
import MemberBubble from '@/components/member/MemberBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { MemberBubble, LabelValue },
  props: {
    project: { type: Object, required: true }
  }
}
</script>

<style lang="sass">
</style>
