<template lang="pug">
.session-pill.box(@click="$emit('view', session)")
  fa.disclosure(icon="chevron-right", size="2x")
  .columns.is-multiline.is-mobile
    .column.is-half-mobile.is-third-tablet
      h1.title.main-title.is-4
        fa(icon="microphone")
        span {{ ' ' + session.creator.fullname }}
      label-value(label="Participants")
        .bubble-list
          member-bubble(
            v-for="member in session.participants",
            :key="member.id",
            :member="member"
          )
    .column.is-half-mobile.is-third-tablet
      label-value.is-primary.created-on(
        label="Recorded", :value="session.created_on | longDate"
      )
      label-value.is-primary.num-annotations(
        label="Annotations", :value="session.user_annotations.length"
      )
    .column.is-third-tablet
      label-value(label="Topics")
        .tags
          .tag(v-for="topic in limitedTopics")
            | {{topic.text}}
          .tag(v-if="session.topics.length > topicLimit")
            | +{{session.topics.length - topicLimit}} more
</template>

<script>
import moment from 'moment-mini'
import LabelValue from '@/components/utils/LabelValue'
import MemberBubble from '@/components/utils/MemberBubble'

export default {
  components: { LabelValue, MemberBubble },
  props: {
    session: { type: Object, required: true },
    topicLimit: { type: Number, default: 3 }
  },
  computed: {
    formatedDate () {
      return moment(this.session.created_on).format('do MMM Y')
    },
    formatedTime () {
      return moment(this.session.created_on).format('h:mm a')
    },
    limitedTopics () {
      return this.session.topics.slice(0, this.topicLimit)
    }
  }
}
</script>

<style lang="sass">

.session-pill
  border-left: 15px solid $grey-light
  cursor: pointer
  position: relative
  transition: border-color 0.3s, transform 0.3s
  padding-right: 3rem
  
  &:not(:last-child)
    margin-bottom: 1em
  
  .main-title
    margin-bottom: 0.3em
  
  .label-value:last-child
    margin-bottom: 0
  
  +desktop
    &:hover
      border-left-color: $primary
      transform: translateX(2px)
  
  +mobile
    .label-value.num-annotations
      display: none
  
  .disclosure
    position: absolute
    right: 0.5em
    top: 50%
    transform: translateY(-50%)
    color: $grey

</style>
