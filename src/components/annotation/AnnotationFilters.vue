<template lang="pug">
.annotation-filters
  h2.is-size-4.has-text-weight-semibold.margin-bottom {{$t('comp.annotation.annotation_filter.sort_title')}}
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)",
    label=""
  )
  h2.is-size-4.has-text-weight-semibold.margin-bottom {{$t('comp.annotation.annotation_filter.filter_title')}}
  .field
    label.label
      | {{$t('comp.annotation.annotation_filter.message_field.label')}}
    input.input.is-small(
      :value="query",
      @input="e => $emit('update:query', e.target.value)",
      :placeholder="$t('comp.annotation.annotation_filter.message_field.placeholder')"
    )
  .field
    label.label
      | {{$t('comp.annotation.annotation_filter.topic_field.label')}}
    topic-option(
      v-for="topic in uniqueTopics",
      :key="topic.id",
      :topic="topic",
      :selected="topics.includes(topic.topic_id)",
      :color-id="topic.topic_id",
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)"
    )
  .field(v-if="uniqueAnnotators.length > 0")
    label.label
      | {{$t('comp.annotation.annotation_filter.annotator_field.label')}}
    .bubble-list.is-multiline.is-size-3.scrolling-wrapper
      member-option(
        v-for="member in uniqueAnnotators",
        :key="member.id",
        :member="member",
        :selected="members.includes(member.user_id)",
        @select="selectMember(member)",
        @deselect="deselectMember(member)"
      )
</template>

<script>

/* Emitted Events

@update:sortMode  -> enables :sortMode.sync
@update:query     -> enables :query.sync
@update:topics    -> enables :topics.sync
@update:members   -> enables :members.sync

 */

import ColorGeneratorMixin from '@/mixins/ColorGenerator'
import TopicOption from '@/components/topic/TopicOption'
import MemberOption from '@/components/member/MemberOption'
import SortField from '@/components/utils/SortField'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: { TopicOption, MemberOption, SortField },
  props: {
    session: { type: Object, required: true },
    annotations: { type: Array, required: true },
    query: { type: String, required: true },
    topics: { type: Array, required: true },
    members: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  computed: {
    uniqueTopics () {
      return this.session.topics.filter((topic, index) =>
        index === this.session.topics.findIndex(t => t.topic_id === topic.topic_id)
      )
    },
    uniqueAnnotators () {
      let members = this.annotations.map(a => a.creator)
      return members.filter((member, index) =>
        index === members.findIndex(m => m.user_id === member.user_id)
      )
    }
  },
  methods: {
    selectTopic (topic) {
      this.$emit('update:topics', [ ...this.topics, topic.topic_id ])
    },
    deselectTopic (topic) {
      this.$emit('update:topics', this.topics.filter(tId =>
        tId !== topic.topic_id
      ))
    },
    selectMember (member) {
      this.$emit('update:members', [ ...this.members, member.user_id ])
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
.scrolling-wrapper
  display: flex
  flex-wrap: nowrap
  overflow-x: auto
  -webkit-overflow-scrolling: touch
  &::-webkit-scrollbar
    display: none
  .member-option
    flex: 0 0 auto
</style>
