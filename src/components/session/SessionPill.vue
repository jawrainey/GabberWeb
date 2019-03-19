<template lang="pug">
.session-pill.box(@click.stop="$emit('view', session)", :style="pillStyle")
  fa.disclosure(icon="chevron-right", size="2x")
  .columns.is-multiline
    .column.is-third-tablet.is-text-overflow
      h1.title.main-title.is-4.is-text-overflow.hmm
        member-bubble(:member="session.creator", pad-right)
          fa.mic-icon(icon="microphone", size="lg")
        span.is-capitalized {{ ' ' + session.creator.fullname }}
      .columns.is-hidden-mobile.no-bottom
        .column.is-half-tablet
          label-value.is-primary.is-hidden-mobile.no-bottom(
            :label="$t('comp.session.session_pill.member_label')"
          )
          .bubble-list.is-multiline.is-clipped
            member-bubble(
              v-for="member in session.participants",
              :key="member.id",
              :member="member"
            )
        .column.is-half-tablet
          label-value.is-primary.created-on(
            :label="$t('comp.session.session_pill.when_label')",
            :value="session.created_on | longDate"
          )
      .columns.is-mobile
        .column.is-half-mobile
          label-value.is-primary(
          :label="$t('comp.session.session_pill.language')",
          :value="language.endonym"
          )
        .column.is-half-mobile
          label-value.is-primary(
            :label="$t('comp.session.session_pill.duration')",
            :value="duration"
          )
        .column
          label-value.is-primary(
            :label="$t('comp.session.session_pill.annotation_label')",
            :value="session.num_user_annotations"
          )
</template>

<script>
import moment from 'moment-mini'
import { ColorGenerator } from '@/mixins'
import LabelValue from '@/components/utils/LabelValue'
import IconBubble from '@/components/utils/IconBubble'
import MemberBubble from '@/components/member/MemberBubble'

export default {
  mixins: [ ColorGenerator ],
  components: { LabelValue, IconBubble, MemberBubble },
  props: {
    session: { type: Object, required: true },
    topicLimit: { type: Number, default: 3 }
  },
  computed: {
    pillStyle () {
      return {
        'border-left-color': this.colorFromId(this.session.creator.user_id)
      }
    },
    duration () {
      if (this.session.topics[this.session.topics.length - 1] === undefined) return 0
      return this.$options.filters.duration(this.session.topics[this.session.topics.length - 1].end_interval)
    },
    language () {
      return this.$store.getters.languageById(this.session.lang_id)
    },
    formatedDate () {
      return moment(this.session.created_on).format('do MMM Y')
    },
    formatedTime () {
      return moment(this.session.created_on).format('h:mm a')
    },
    limitedTopics () {
      return this.session.topics.slice(0, this.topicLimit)
    }
  },
  methods: {
    trim (string, length) {
      return string.length > length
        ? `${string.slice(0, length - 1)}…`
        : string
    }
  }
}
</script>

<style lang="sass">
.hmm
  padding-bottom: .3em
  margin-bottom: 0 !important

.no-bottom
  margin-bottom: 0 !important

.session-pill
  border-left: 15px solid $grey-light
  cursor: pointer
  position: relative
  transition: border-color 0.3s, transform 0.3s
  padding-right: 2rem

  &:not(:last-child)
    margin-bottom: 1em

  .main-title
    margin-bottom: 0.3em

    .member-bubble
      font-size: 1.1em

  .label-value:last-child
    margin-bottom: 0

  +desktop
    &:hover
      transform: translateX(2px)
    &:not(:hover)
      border-left-color: $grey-light !important

  +mobile
    .label-value
      margin-bottom: 0

  .disclosure
    position: absolute
    right: 0.5em
    top: 50%
    transform: translateY(-50%)
    color: $grey

  .is-text-overflow
    flex: 1
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
