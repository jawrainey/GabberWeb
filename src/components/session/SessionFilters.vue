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
    label.label By Language
    .control
      span.select.is-fullwidth
        select(v-model="selectedLanguage", @change="langChanged")
          option(value="-1", selected="selected") All Languages
          option(:value="lang.id", v-for="lang in availableLanguages") {{ lang.text }}
  .field
    label.label {{$t('comp.session.session_filters.topic_field.label')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedTopic", @change="selectTopic")
          option(value="-1", selected="selected") All Topics
          option(:value="topic.id", v-for="topic in project.content['en'].topics") {{ topic.text }}
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
  components: { TopicOption, MemberOption, SortField, MemberBubble },
  data: () => ({
    selectedLanguage: -1,
    selectedTopic: -1
  }),
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
    langChanged () {
      if (this.selectedLanguage < 0) {
        this.$emit('update:languages', this.languages.splice(0, 0))
      } else {
        this.$emit('update:languages', this.languages.splice(0, this.languages.length))
        this.$emit('update:languages', this.languages.concat([ this.selectedLanguage ]))
      }
    },
    selectTopic () {
      if (this.selectedTopic < 0) {
        this.$emit('update:topics', this.topics.splice(0, 0))
      } else {
        this.$emit('update:topics', this.topics.splice(0, this.topics.length))
        this.$emit('update:topics', this.topics.concat([ this.selectedTopic ]))
      }
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
