<template lang="pug">
.session-pill.box(@click="$emit('view', session)")
  fa.disclosure(icon="chevron-right", size="2x")
  .tile.is-ancestor
    .tile.is-vertical.is-parent
      .tile
        h1.title.main-title.is-3 {{ session.creator.name }}
      .tile
        label-value(label="Participants")
          name-bubble.is-primary(
            v-for="participant in session.participants",
            :key="participant.id",
            :name="participant.name",
            :color-id="participant.user_id",
            padded
          )
    .tile.is-parent
      .tile.is-vertical
        .tile
          label-value.is-primary(label="Time", :value="formatedTime")
        .tile
          label-value.is-primary(label="Annotations", :value="session.user_annotations.length")
      .tile.is-vertical
        .tile
          label-value.is-primary(label="Date", :value="formatedDate")
    .tile
      label-value(label="Topics")
        .tags
          .tag(v-for="topic in limitedTopics")
            | {{topic.text}}
          .tag(v-if="session.topics.length > topicLimit")
            | + {{session.topics.length - topicLimit}} more
</template>

<script>
import moment from 'moment-mini'
import LabelValue from '@/components/utils/LabelValue'
import NameBubble from '@/components/utils/NameBubble'

export default {
  components: { LabelValue, NameBubble },
  props: {
    session: {
      type: Object,
      required: true
    },
    topicLimit: {
      type: Number,
      default: 3
    }
  },
  computed: {
    formatedDate () {
      return moment(this.session.created_on).format('do MMM Y')
    },
    formatedTime () {
      return moment(this.session.created_on).format('h:mm a')
    },
    participantList () {
      return this.session.participants.map(p => this.initialize(p.name)).join(', ')
    },
    limitedTopics () {
      return this.session.topics.slice(0, this.topicLimit)
    }
  },
  methods: {
    initialize (name) {
      return name.split(' ')
        .map(s => s[0])
        .join('')
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
  
  +desktop
    .label-value
      margin-bottom: 0
    
    &:hover
      border-left-color: $primary
      transform: translateX(2px)
  
  .disclosure
    position: absolute
    right: 0.5em
    top: 50%
    transform: translateY(-50%)

</style>
