<template lang="pug">
.session-pill.box(@click.stop="$emit('view', session)", :style="pillStyle")
  fa.disclosure(icon="chevron-right", size="2x")
  .columns.is-multiline
    .column.is-third-tablet
      h1.title.main-title.is-4
        member-bubble(:member="session.creator", pad-right)
          fa.mic-icon(icon="microphone", size="lg")
        span {{ ' ' + session.creator.fullname }}
      label-value(
        :label="$t('comp.session.session_pill.member_label')"
      )
        .bubble-list.is-multiline
          .person(v-for="member in session.participants")
            .first
              member-bubble(:key="member.id", :member="member")
              p.society.is-size-7.padding-left {{ societyById(member) }}
            .second
              span.meta.is-size-7.is-italic  {{ roleById(member) }} | {{ genderById(member) }} | {{ ageOfMember(member) }}
    .column.is-third-tablet
      label-value.is-primary.created-on(
        :label="$t('comp.session.session_pill.when_label')",
        :value="session.created_on | longDate"
      )
      .columns.is-hidden-mobile
        .column.is-half-tablet
          label-value.is-primary.is-hidden-mobile(
          label="Duration",
          :value="duration"
          )
        .column.is-half-tablet
          label-value.is-primary.is-hidden-mobile(
          :label="$t('comp.session.session_pill.annotation_label')",
          :value="session.num_user_annotations"
          )
      .columns.is-hidden-mobile
        .column.is-half-tablet
          label-value.is-primary.is-hidden-mobile(
            v-if="language",
            label="Language",
            :value="language.endonym"
          )
    .column.is-third-tablet.is-clipped
      label-value(:label="$t('comp.session.session_pill.topic_label')")
        .tags.is-clipped
          .tag(v-for="topic in limitedTopics")
            | {{trim(topic.text, 60)}}
          .tag(v-if="session.topics.length > topicLimit")
            | +{{session.topics.length - topicLimit}}
            | {{$t('comp.session.session_pill.more')}}
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
    duration () {
      return this.$options.filters.duration(this.session.topics[this.session.topics.length - 1].end_interval)
    },
    genders () {
      return this.session.participants.map(p => this.GENDERS[this.$i18n.locale][p.gender].text)
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
    ageOfMember (member) { return this.AGES.find(s => s.id === member.age).text },
    roleById (member) { return this.ROLES[this.$i18n.locale][member.m_role].title },
    genderById (member) { return this.GENDERS[this.$i18n.locale][member.gender].text },
    societyById (member) { return this.NATIONAL_SOCS.find(s => s.id === member.society).name },
    trim (string, length) {
      return string.length > length
        ? `${string.slice(0, length - 1)}…`
        : string
    }
  }
}
</script>

<style lang="sass">
.first, .second
  display: inline-flex
  align-items: center

  .society
    text-overflow: ellipsis
    font-size: 1em !important

  .meta
    padding-left: .5em

  .bubble-list
    margin-bottom: 0

  .person:first-child
    margin-bottom: .5em

.padding-left
  padding-left: .75em

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
  
  .disclosure
    position: absolute
    right: 0.5em
    top: 50%
    transform: translateY(-50%)
    color: $grey

</style>
