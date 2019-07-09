<template lang="pug">
  .annotation-pill.box(
    :class="classes",
    :style="styles",
    @mouseover="isHover=true",
    @mouseleave="isHover=false",
    @click="$emit('playPause', annotation)"
  )
    .columns.is-multiline.is-vcentered.is-mobile
      .column.is-2.no-bottom
       icon-bubble.is-smaller(
         v-if="isSelectedOrHover",
         :icon="isPlaying",
         :colorId="annotation.creator.user_id",
         @click="$emit('playPause', annotation)")
       member-bubble.is-smaller(
         v-else,
         :key="annotation.creator.id",
         :member="annotation.creator")
      .column.is-8.is-text-overflow.no-bottom.pad-left
        span.is-size-7.has-text-weight-semibold {{ annotation.content }}
      .column.is-2.no-bottom.has-text-centered.half-pad-left
        button.circle-button-new.button.is-success.no-focus-effects.is-smaller(
          v-if="isHover",
          :class="actionAddRemove",
          @click.stop="$emit('chosen', annotation)")
          fa.icon(:icon="showAddOrRemove")
        span.is-size-7(v-else) {{ length }}
      .column.is-full.is-paddingless.padding-left-right.is-hidden-mobile
        span.is-size-7.is-italic
          a(@click.stop="showTags = !showTags") {{ annotation.labels.length }} Codes
          | &#32; &middot; {{ annotation.comments.length }} Responses &middot; &#32;
          a(@click.stop="", :href="sessionURL", target="_blank") View Conversation
             span.icon: fa.is-small(icon="external-link-alt", size="xs")
          span(v-if="isPlaylist"): fa.is-small(icon="grip-vertical")
      .column.is-full(v-if="annotation.labels.length > 0 && showTags")
        a.tags
          span(v-for="tag in annotation.labels").tag.is-primary {{ tag.text }}
    .topics-bar.radius-top
      topic-segment(
        v-for="topic in topicsOverlappingAnnotation",
        :key="topic.id",
        :audio-duration="duration",
        :topic="topic")
</template>

<script>
import { ColorGenerator, Temporal } from '@/mixins'
import CircleButton from '@/components/utils/CircleButton'
import LabelValue from '@/components/utils/LabelValue'
import IconBubble from '@/components/utils/IconBubble'
import MemberBubble from '@/components/member/MemberBubble'
import TopicSegment from '@/components/topic/TopicSegment'

/* Emitted Events:

@chosen    (annotation) ~ When the user chooses to adds/removes this annotation
@playPause (annotation) ~ When the user wants to play/pause this annotation

*/

export default {
  mixins: [ColorGenerator, Temporal],
  components: { CircleButton, LabelValue, IconBubble, MemberBubble, TopicSegment },
  props: {
    annotation: {type: Object, required: true},
    isPlaylist: {type: Boolean, required: false, default: false},
    selectedAnnotation: {type: Object, required: true}
  },
  data: () => ({
    showTags: false,
    isHover: false
  }),
  computed: {
    computeLinearGradient () {
      // SessionIDs are UUIDs, so we take all the digits (of which theres many) and divide to get a unique-ish num
      let sid = this.colorFromId(this.session.id.replace(/\D/g, '') / 10000)
      return `linear-gradient(to top, ${this.colorFromId(this.session.project_id)} 50%, ${sid} 50%) border-box`
    },
    sessionURL () { return `/projects/${this.session.project_id}/conversations/${this.annotation.session_id}` },
    session () { return this.$store.getters.sessionById(this.annotation.session_id) },
    // TODO: create Playlist mixin as this is shared across AudioPlayler/AnnotationPill
    topicsOverlappingAnnotation () {
      return this.session.topics.filter(
        t => this.annotation.start_interval <= t.start_interval ||
          this.annotation.end_interval <= t.end_interval)
    },
    length () { return this.formatDuration(this.duration) },
    duration () { return this.annotation.end_interval - this.annotation.start_interval },
    isSelected () { return this.annotation.id === this.selectedAnnotation.id },
    isSelectedAndPlaying () { return this.isSelected && this.selectedAnnotation.isPlaying },
    isPlaying () { return this.isSelectedAndPlaying ? 'pause' : 'play' },
    // TODO: probably an easier way to achieve this without using IDs
    uniqueClass () { return `ST-${this.annotation.id}` },
    showAddOrRemove () { return this.isPlaylist ? 'trash' : 'plus' },
    actionAddRemove () { return { 'is-danger': this.isPlaylist } },
    isSelectedOrHover () { return this.isSelected || this.isSelectedAndPlaying || this.isHover },
    classes () {
      let custom = {
        'is-selected': this.isSelected,
        'is-playing': this.isSelectedAndPlaying
      }
      custom[this.uniqueClass] = true // TODO: not sure WHY this is being done?
      return custom
    },
    styles () {
      let color = this.isSelectedOrHover ? '#6d6d6d' : '#343C3D'
      return {
        background: `linear-gradient(${color}, ${color}) padding-box, ${this.computeLinearGradient}`,
        borderLeft: '7px solid transparent'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .circle-button-new
    display: inline-flex
    justify-content: center
    flex-direction: column
    border-radius: 1.5em
    text-align: center
    vertical-align: middle
    width: 2.5em
    .icon
      transform: scale(0.7)

  .pad-left
    padding-left: 0 !important
    padding-right: 0 !important
  .half-pad-left
    padding-left: .25em !important
  .no-bottom
    padding-bottom: 0 !important
  .no-padding-right
    padding-right: 0 !important
  .project-bar
    display: flex
    font-size: 2rem
    border-radius: 0.1em
    overflow: hidden
    margin: -.25em

  .project-segment
    height: 1em
    cursor: pointer
    -webkit-transition: border-bottom-width 0.3s
    transition: border-bottom-width 0.3s
    border-bottom: 0 solid rgba(0, 0, 0, 0.15)
    flex: 1001 1 0

  .padding-left-right
    padding: 0 1em !important

  .smaller-margin-bottom
    margin-bottom: 1em !important
  .is-smaller
    width: 1.75em !important
    height: 1.75em !important
  .is-selected
    background: red

  .annotation-pill
    cursor: pointer
    padding: .5em
    margin-bottom: .75em !important

  .play-pause
    margin-right: 6px
  .add-remove
    margin-left: 6px

  .topics-bar
    display: flex
    font-size: 2rem
    border-radius: 0.1em
    overflow: hidden
    margin: -.25em

  .radius-top
    border-bottom-left-radius: 0
    border-top-left-radius: 0
    border-top-right-radius: 0

  .topic-segment
    cursor: pointer !important
    flex-grow: 1 !important
    height: .75em !important
</style>
