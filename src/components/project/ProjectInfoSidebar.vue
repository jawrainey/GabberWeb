<template lang="pug">
.project-detail
  h3.title.is-3 {{project.title}}
  p.subtitle {{projectDate}}
  label-value(label="Description", :value="project.description")
  label-value(label="Creator")
    p.is-size-4
      name-bubble.is-size-5(
        :name="project.creator.fullname",
        :color-id="project.creator.user_id",
        padded
      )
      span {{ project.creator.fullname }}
  label-value(label="Project Members")
    name-bubble.is-size-6(
      v-for="member in project.members",
      :key="member.id",
      :name="member.fullname",
      :color-id="member.user_id",
      padded
    )
</template>

<script>
import moment from 'moment-mini'

import NameBubble from '@/components/utils/NameBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { NameBubble, LabelValue },
  props: {
    project: { type: Object, required: true }
  },
  computed: {
    projectDate () {
      return moment(this.project.created_on)
        .format('h:mm a MMMM Do YYYY')
    }
  }
}
</script>

<style lang="sass">
</style>
