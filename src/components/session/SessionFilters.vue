<template lang="pug">
.session-filters
  h3.subtitle {{$t('comp.session.session_filters.sort_title')}}
  sort-field(
    :value="sortMode",
    @input="v => $emit('update:sortMode', v)",
    label=""
  )
  h3.subtitle {{$t('comp.session.session_filters.filter_title')}}
  .field
    label.label {{$t('comp.session.session_filters.filters.language.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedLanguage", @change="langChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.language.default')}}
          option(:value="lang.id", v-for="lang in availableLanguages") {{ lang.text }}
  .field
    label.label {{$t('comp.session.session_filters.filters.society.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedSociety", @change="societyChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.society.default')}}
          option(:value="ns.id", v-for="ns in nationalSocieties") {{ ns.name }}
  .field
    label.label {{$t('comp.session.session_filters.filters.role.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedRole", @change="roleChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.role.default')}}
          option(:value="role.id", v-for="role in roleByLanguage") {{ role.title }}
  .field
    label.label {{$t('comp.session.session_filters.filters.gender.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedGender", @change="genderChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.gender.default')}}
          option(:value="gender.id", v-for="gender in genderByLanguage") {{ gender.text }}
  .field
    label.label {{$t('comp.session.session_filters.filters.age.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedAge", @change="ageChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.age.default')}}
          option(:value="age.id", v-for="age in ageRanges") {{ age.text }}
  .field
    label.label {{$t('comp.session.session_filters.filters.topic.title')}}
    .control
      span.select.is-fullwidth
        select(v-model="selectedTopic", @change="topicChanged")
          option(value="-1", selected="selected") {{$t('comp.session.session_filters.filters.topic.default')}}
          option(:value="topic.id", v-for="topic in projectContent.topics") {{ topic.text }}
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
import DataMixin from '@/mixins/Data'

export default {
  mixins: [ DataMixin ],
  components: { TopicOption, MemberOption, SortField, MemberBubble },
  data: () => ({
    selectedLanguage: -1,
    selectedTopic: -1,
    selectedGender: -1,
    selectedSociety: -1,
    selectedAge: -1,
    selectedRole: -1
  }),
  props: {
    project: { type: Object, required: true },
    sessions: { type: Array, required: true },
    query: { type: String, required: true },
    ages: { type: Array, required: true },
    genders: { type: Array, required: true },
    roles: { type: Array, required: true },
    societies: { type: Array, required: true },
    languages: { type: Array, required: true },
    topics: { type: Array, required: true },
    members: { type: Array, required: true },
    sortMode: { type: String, required: true }
  },
  computed: {
    projectContent () { return this.$store.getters.projectContentByLanguage(this.project) },
    nationalSocieties () { return this.NATIONAL_SOCS },
    ageRanges () { return this.AGES },
    genderByLanguage () { return this.GENDERS[this.$i18n.locale] },
    roleByLanguage () { return this.ROLES[this.$i18n.locale] },
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
    roleChanged () {
      if (this.selectedRole < 0) {
        this.$emit('update:roles', this.roles.splice(0, 0))
      } else {
        this.$emit('update:roles', this.roles.splice(0, this.roles.length))
        this.$emit('update:roles', this.roles.concat([ this.selectedRole ]))
      }
    },
    ageChanged () {
      if (this.selectedAge < 0) {
        this.$emit('update:ages', this.ages.splice(0, 0))
      } else {
        this.$emit('update:ages', this.ages.splice(0, this.ages.length))
        this.$emit('update:ages', this.ages.concat([ this.selectedAge ]))
      }
    },
    societyChanged () {
      if (this.selectedSociety < 0) {
        this.$emit('update:societies', this.societies.splice(0, 0))
      } else {
        this.$emit('update:societies', this.societies.splice(0, this.societies.length))
        this.$emit('update:societies', this.societies.concat([ this.selectedSociety ]))
      }
    },
    genderChanged () {
      if (this.selectedGender < 0) {
        this.$emit('update:genders', this.genders.splice(0, 0))
      } else {
        this.$emit('update:genders', this.genders.splice(0, this.genders.length))
        if (this.selectedGender >= 2) {
          this.$emit('update:genders', this.genders.concat([ 2, 3 ]))
        } else {
          this.$emit('update:genders', this.genders.concat([ this.selectedGender ]))
        }
      }
    },
    langChanged () {
      if (this.selectedLanguage < 0) {
        this.$emit('update:languages', this.languages.splice(0, 0))
      } else {
        this.$emit('update:languages', this.languages.splice(0, this.languages.length))
        this.$emit('update:languages', this.languages.concat([ this.selectedLanguage ]))
      }
    },
    topicChanged () {
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
