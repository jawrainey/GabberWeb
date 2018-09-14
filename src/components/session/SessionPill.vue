<template lang="pug">
.session-pill.box(@click.stop="$emit('view', session)", :style="pillStyle")
  fa.disclosure(icon="chevron-right", size="2x")
  .columns.is-multiline
    .column.is-third-tablet
      h1.title.main-title.is-4
        member-bubble(:member="session.creator", pad-right)
          fa.mic-icon(icon="microphone", size="lg")
        span {{ ' ' + session.creator.fullname }}
      label-value.is-hidden-mobile(
        :label="$t('comp.session.session_pill.member_label')"
      )
        .bubble-list.is-multiline
          member-bubble(
            v-for="member in session.participants",
            :key="member.id",
            :member="member"
          )
            span {{ genderById(member) }}
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
    .column.is-third-tablet
      label-value(:label="$t('comp.session.session_pill.topic_label')")
        .tags
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

export const GENDERS = {
  'ar': [
    {'id': 0, 'text': 'إناثا'},
    {'id': 1, 'text': 'الذكر'},
    {'id': 2, 'text': 'يرجى التحديد'},
    {'id': 3, 'text': 'الأفضل أن لا يقال'}
  ],
  'en': [
    {'id': 0, 'text': 'Female'},
    {'id': 1, 'text': 'Male'},
    {'id': 2, 'text': 'Please Specify'},
    {'id': 3, 'text': 'Rather not say'}
  ],
  'es': [
    {'id': 0, 'text': 'Femenino'},
    {'id': 1, 'text': 'Masculino'},
    {'id': 2, 'text': 'Por favor especifica'},
    {'id': 3, 'text': 'Prefiero no decirlo'}
  ],
  'fr': [
    {'id': 0, 'text': 'Femelle'},
    {'id': 1, 'text': 'Mâle'},
    {'id': 2, 'text': 'Veuillez préciser'},
    {'id': 3, 'text': 'Plutôt pas dire'}
  ]
}

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
      return this.$options.filters.duration(this.session.topics[this.session.topics.length - 1].end_interval)
    },
    genders () {
      return this.session.participants.map(p => GENDERS[this.$i18n.locale][p.gender].text)
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
    // ageOfMember (member) { return AGES[this.$i18n.locale][member.age].text },
    genderById (member) { return GENDERS[this.$i18n.locale][member.gender].text },
    trim (string, length) {
      return string.length > length
        ? `${string.slice(0, length - 1)}…`
        : string
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
