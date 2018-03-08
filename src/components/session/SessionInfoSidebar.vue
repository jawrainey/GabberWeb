<template lang="pug">
.session-info-sidebar
  h3.subtitle Gabber Info
  label-value(label="Created on", :value="sessionDate")
  label-value(label="Creator")
    p.is-size-4
      name-bubble.is-size-5(
        :name="session.creator.name",
        :color-id="session.creator.id",
        padded
      )
      span {{session.creator.name}}
  label-value(label="Participants")
    name-bubble.is-size-6(
      v-for="member in session.participants",
      :key="member.id",
      :name="member.name",
      :color-id="member.user_id",
      padded
    )
  label-value(label="Topics")
    .tags
      .tag.is-link(v-for="topic in session.topics") {{topic.name}}
  label-value(
    label="Annotations", :value="session.user_annotations.length"
  )
</template>

<script>
import moment from 'moment-mini'

import NameBubble from '@/components/utils/NameBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { NameBubble, LabelValue },
  props: {
    session: { type: Object, required: true }
  },
  computed: {
    sessionDate () {
      return moment(this.session.created_on)
        .format('h:mm a MMMM Do YYYY')
    }
  }
}
</script>

<style lang="sass">
</style>
