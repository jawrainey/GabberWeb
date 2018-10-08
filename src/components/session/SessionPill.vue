<template lang="pug">
.session-pill.box(@click.stop="$emit('view', session)", :style="pillStyle")
  fa.disclosure(icon="chevron-right", size="2x")
  p.title.is-4.is-5.is-size-6-mobile.border-bottom {{ projectContent.title }}
  .columns.is-multiline
    .column.participants.is-third-tablet
      h1.title.main-title.is-5.is-size-6-mobile
        member-bubble(:member="session.creator", pad-right)
          fa.mic-icon(icon="microphone", size="lg")
        span {{ forename }}
      label-value(
        :label="$t('comp.session.session_pill.member_label')"
      )
        .bubble-list.is-multiline
          .person(v-for="member in session.participants")
            .first
              member-bubble(:key="member.id", :member="member")
              p.society {{ societyById(member) }}
            .second.is-hidden-mobile.is-hidden-tablet-only
              span.meta.is-size-7.is-italic  {{ roleById(member) }} | {{ genderById(member) }} | {{ ageOfMember(member) }}
    .column.meta-details.is-third-tablet
      label-value.is-link.created-on.is-hidden-mobile(
        :label="$t('comp.session.session_pill.when_label')",
        :value="session.created_on | longDate"
      )
      .columns.is-mobile
        .column.is-half-mobile
          label-value.is-link(
          :label="$t('comp.session.session_pill.duration')",
          :value="duration"
          )
        .column.is-half-mobile
          label-value.is-link(
          :label="$t('comp.session.session_pill.annotation_label')",
          :value="session.num_user_annotations"
          )
      .columns.is-hidden-mobile
        .column.is-half-tablet
          label-value.is-link.is-hidden-mobile(
            v-if="language",
            :label="$t('comp.session.session_pill.language')",
            :value="language.endonym"
          )
</template>

<script>
import moment from 'moment-mini'
import { ColorGenerator } from '@/mixins'
import LabelValue from '@/components/utils/LabelValue'
import IconBubble from '@/components/utils/IconBubble'
import MemberBubble from '@/components/member/MemberBubble'
import DataMixin from '@/mixins/Data'

export default {
  mixins: [ ColorGenerator, DataMixin ],
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
    forename () {
      return this.session.creator.fullname.split(' ')[0] || this.session.creator.fullname
    },
    duration () {
      if (this.session.topics[this.session.topics.length - 1] === undefined) return 0
      return this.$options.filters.duration(this.session.topics[this.session.topics.length - 1].end_interval)
    },
    genders () {
      return this.session.participants.map(p => this.GENDERS[this.$i18n.locale][p.gender].text)
    },
    projectContent () {
      let proj = this.$store.getters.projectById(this.session.project_id)
      return this.$store.getters.projectContentByLanguage(proj)
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
.border-bottom
  margin-bottom: .5em !important
  padding-bottom: 3px
  border-bottom: 1px solid #ED4E56

.first, .second
  display: inline-flex
  align-items: center

.society
  font-size: .75em !important
  padding-left: .75em
.meta
  padding-left: .5em

.bubble-list
  margin-bottom: 0

.person:first-child
  margin-bottom: .5em

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
    .meta-details
      padding: 1em 1em 0 1em !important
    .participants
      padding-bottom: 0 !important
  .disclosure
    position: absolute
    right: 0.5em
    top: 50%
    transform: translateY(-50%)
    color: $grey
</style>
