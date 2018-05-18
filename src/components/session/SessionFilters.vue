<template lang="pug">
.session-filters
  h3.subtitle {{$t('comp.session.session_filters.sort_title')}}
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)",
    label=""
  )
  hr
  h3.subtitle {{$t('comp.session.session_filters.filter_title')}}
  .field
    label.label {{$t('comp.session.session_filters.name_field.label')}}
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      :placeholder="$t('comp.session.session_filters.name_field.placeholder')"
    )
  .field
    label.label {{$t('comp.session.session_filters.topic_field.label')}}
    topic-option(
      v-for="topic in project.topics",
      :key="topic.id",
      :topic="topic",
      :selected="topics.includes(topic.id)",
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)"
    )
  .field.members-field
    label.label {{$t('comp.session.session_filters.member_field.label')}}
    .bubble-list.is-multiline.is-size-3
      member-option(
        v-for="member in uniqueParticipants",
        :key="member.id",
        :member="member",
        :selected="members.includes(member.user_id)",
        @select="selectMember(member)",
        @deselect="deselectMember(member)"
      )
</template>

<script>
import TopicOption from '@/components/topic/TopicOption'
import MemberOption from '@/components/member/MemberOption'
import SortField from '@/components/utils/SortField'
import MemberBubble from '@/components/member/MemberBubble'

export default {
  components: { TopicOption, MemberOption, SortField, MemberBubble },
  props: {
    project: { type: Object, required: true },
    sessions: { type: Array, required: true },
    query: { type: String, required: true },
    topics: { type: Array, required: true },
    members: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  computed: {
    uniqueParticipants () {
      let people = this.sessions.reduce((people, session) =>
        ([ ...people, ...session.participants, session.creator ]),
      [])
      
      return people.filter((person, index) =>
        index === people.findIndex(p => p.user_id === person.user_id)
      )
    }
  },
  methods: {
    selectTopic (topic) {
      this.$emit('update:topics', this.topics.concat([ topic.id ]))
    },
    deselectTopic (topic) {
      this.$emit('update:topics', this.topics.filter(tId =>
        tId !== topic.id
      ))
    },
    selectMember (member) {
      this.$emit('update:members', this.members.concat([ member.user_id ]))
    },
    deselectMember (member) {
      this.$emit('update:members', this.members.filter(uId =>
        uId !== member.user_id
      ))
    }
  }
}
</script>

<style lang="sass">
</style>
