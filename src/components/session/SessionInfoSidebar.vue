<template lang="pug">
.session-info-sidebar
  h3.subtitle Gabber Info
  label-value(label="Created on", :value="sessionDate")
  label-value.creator(label="Creator")
    p.is-size-4
      member-bubble.is-size-5(
        :member="session.creator", pad-right
      )
      span {{ session.creator.fullname }}
  label-value(label="Participants")
    .bubble-list
      member-bubble.is-size-6(
        v-for="member in session.participants",
        :key="member.id",
        :member="member",
        pad-right
      )
  .columns.is-mobile
    .column
      label-value(label="Topics", :value="session.topics.length")
    .column
      label-value(label="Annotations", :value="numAnnotations")
</template>

<script>
import moment from 'moment-mini'

import MemberBubble from '@/components/member/MemberBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: { MemberBubble, LabelValue },
  props: {
    session: { type: Object, required: true }
  },
  computed: {
    sessionDate () {
      return moment(this.session.created_on)
        .format('h:mm a MMMM Do YYYY')
    },
    numAnnotations () {
      return this.$store.getters.annotationsForSession(this.session.id).length
    }
  }
}
</script>

<style lang="sass">
</style>
