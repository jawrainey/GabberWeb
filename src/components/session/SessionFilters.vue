<template lang="pug">
.session-filters
  h2.is-size-4.has-text-weight-semibold.margin-bottom {{$t('comp.session.session_filters.sort_title')}}
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)",
    label=""
  )
  h2.is-size-4.has-text-weight-semibold.margin-bottom {{$t('comp.session.session_filters.filter_title')}}
  .field
    label.label {{$t('comp.session.session_filters.language_title.label')}}
    topic-option(
      v-for="lang in availableLanguages",
      :key="lang.id",
      :topic="lang",
      :selected="languages.includes(lang.id)",
      @select="selectLang(lang)",
      @deselect="deselectLang(lang)"
    )
  .field.members-field(v-if="uniqueParticipants.length > 0")
    label.label {{$t('comp.session.session_filters.member_field.label')}}
    .bubble-list.is-multiline.is-size-3.scrolling-wrapper
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
    languages: { type: Array, required: true },
    topics: { type: Array, required: true },
    members: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  computed: {
    projectContent () {
      let project = this.$store.getters.projectContentByLanguage(this.project)
      project.topics = project.topics.filter(p => p.is_active)
      return project
    },
    availableLanguages () {
      let languages = this.$store.getters.availableLanguages
      for (let i = 0; i < languages.length; i++) {
        languages[i]['text'] = languages[i]['endonym']
      }
      return languages
    },
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
    selectLang (lang) {
      this.$emit('update:languages', this.languages.concat([ lang.id ]))
    },
    deselectLang (lang) {
      this.$emit('update:languages', this.languages.filter(tId =>
        tId !== lang.id
      ))
    },
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
  .scrolling-wrapper
    display: flex
    flex-wrap: nowrap
    overflow-x: auto
    -webkit-overflow-scrolling: touch
    &::-webkit-scrollbar
      display: none
    .member-option
      flex: 0 0 auto

  .is-sidebar-heading
    padding: 1em 0 0 0
  .is-white
    background-color: white
  .border-bottom
    margin-bottom: .5em !important
    padding-bottom: 3px
    border-bottom: 1px solid #ED4E56
  .first, .second
    display: inline-flex
    align-items: center
  .meta
    padding: 0 0 .5em 1em
  .bubble-list
    margin-bottom: 0
</style>
