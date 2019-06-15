<template lang="pug">
.annotation-filters
  h3.title.is-size-4.has-text-weight-semibold
    | Filter Comments
  .field
    label.label
      | By Codes
    topic-option(
      v-for="code in uniqueLabels",
      :key="code.id",
      :topic="code",
      :selected="codesSelected.includes(code.id)",
      @select="selectCode(code)",
      @deselect="deselectCode(code)")
  .field
    label.label
      | By Topics
    topic-option(
      v-for="topic in topics",
      :key="topic.id",
      :topic="topic",
      :selected="topicsSelected.includes(topic.id)",
      :color-id="topic.id",
      @select="selectTopic(topic)",
      @deselect="deselectTopic(topic)")
  .field(v-if="uniqueAnnotators.length > 0")
    label.label
      | {{$t('comp.annotation.annotation_filter.annotator_field.label')}}
    .bubble-list.is-multiline.is-size-3
      member-option(
        v-for="annotator in uniqueAnnotators",
        :key="annotator.id",
        :member="annotator",
        :selected="annotators.includes(annotator.user_id)",
        @select="selectAnnotator(annotator)",
        @deselect="deselectAnnotator(annotator)")
</template>

<script>
import TopicOption from '@/components/topic/TopicOption'
import MemberOption from '@/components/member/MemberOption'
import SortField from '@/components/utils/SortField'

export default {
  components: { TopicOption, MemberOption, SortField },
  props: {
    annotations: { type: Array, required: true },
    annotators: { type: Array, required: true },
    topics: { type: Array, required: true },
    topicsSelected: { type: Array, required: true },
    codesSelected: { type: Array, required: true }
  },
  computed: {
    uniqueLabels () {
      let _labels = [].concat.apply([], this.annotations.map(a => a.labels.map(l => ({id: l.id, text: l.text}))))
      return [...new Set(_labels.map(s => JSON.stringify(s)))].map(s => JSON.parse(s))
    },
    uniqueAnnotators () {
      let annotators = this.annotations.map(a => a.creator)
      return annotators.filter((member, index) =>
        index === annotators.findIndex(m => m.user_id === member.user_id)
      )
    }
  },
  methods: {
    selectCode (code) {
      console.log(code)
      this.$emit('update:codesSelected', [ ...this.codesSelected, code.id ])
    },
    deselectCode (code) {
      this.$emit('update:codesSelected', this.codesSelected.filter(c => c !== code.id))
    },
    selectTopic (topic) {
      this.$emit('update:topicsSelected', [ ...this.topicsSelected, topic.id ])
    },
    deselectTopic (topic) {
      this.$emit('update:topicsSelected', this.topicsSelected.filter(tId =>
        tId !== topic.id
      ))
    },
    selectAnnotator (annotator) {
      this.$emit('update:annotators', [ ...this.annotators, annotator.user_id ])
    },
    deselectAnnotator (annotator) {
      this.$emit('update:annotators', this.annotators.filter(uId =>
        uId !== annotator.user_id
      ))
    }
  }
}
</script>

<style scoped>

</style>
