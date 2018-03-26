<template lang="pug">
.box.is-pill.is-info.annotation-pill(
  :style="pillStyles",
  @mouseover="$emit('focus', annotation)",
  @mouseleave="$emit('blur')"
)
  .columns.is-mobile
    .column.info-column
      member-bubble.is-size-5.is-size-6-mobile(
        :member="annotation.creator", pad-right
      )
      span.is-size-4
        | {{ annotation.creator.fullname }}
      button.button.is-text.timestamp(@click="$emit('chosen', annotation)")
        span.is-hidden-touch
          | {{ startTime | duration }} → {{ endTime | duration }}
        span.is-hidden-desktop
          | {{ startTime | duration }}
    .column.is-narrow(v-if="isOwner")
      button.button.is-dark.is-rounded(@click="deleteSelf")
        .icon: fa(icon="trash")
  .columns.is-gapless
    .column
      p.is-size-5 {{ annotation.content }}
    .column.is-narrow.has-text-right
      button.button.is-link.is-rounded(@click="toggleComments")
        | {{ commentTitle }}
  transition(name="slide")
    comment-section(
      v-if="showComments",
      :annotation="annotation",
      :comments="comments"
    )
</template>

<script>
import { REMOVE_ANNOTATION } from '@/const/mutations'

import ApiWorkerMixin from '@/mixins/ApiWorker'
import ColorGeneratorMixin from '@/mixins/ColorGenerator'

import MemberBubble from '@/components/member/MemberBubble'
import CommentSection from '@/components/comment/CommentSection'
import { mapGetters } from 'vuex'

/* Emitted Events:

@chosen (annotation) ~ When the user chose this annotation
@focus ()            ~ When the user wants to highlight an annotation
@blur ()             ~ When the user wants to highlight an annotation

*/

export default {
  mixins: [ ApiWorkerMixin, ColorGeneratorMixin ],
  components: { MemberBubble, CommentSection },
  props: {
    annotation: { type: Object, required: true },
    topics: { type: Array, required: false }
  },
  data: () => ({
    showComments: false
  }),
  computed: {
    ...mapGetters(['currentUser']),
    commentTitle () {
      if (this.showComments) return 'Hide Comments'
      switch (this.comments.length) {
        case 0: return 'Add a comment'
        case 1: return `1 Comment`
        default: return `${this.comments.length} Comments`
      }
    },
    comments () {
      return this.$store.getters.commentsForAnnotation(this.annotation.id)
    },
    isOwner () {
      return this.annotation.creator.user_id === this.$store.getters.currentUserId
    },
    startTopic () {
      if (!this.topics) return null
      return this.topics.find(topic =>
        this.annotation.start_interval >= topic.start_interval &&
        this.annotation.start_interval < topic.end_interval
      )
    },
    pillStyles () {
      let styles = {}
      if (this.startTopic) {
        styles['border-left-color'] = this.colorFromId(
          this.startTopic.topic_id || this.startTopic.id
        )
      }
      return styles
    },
    startTime () { return this.annotation.start_interval },
    endTime () { return this.annotation.end_interval }
  },
  methods: {
    toggleComments () {
      this.showComments = !this.showComments
    },
    async deleteSelf () {
      let message = 'Are you sure you want to delete this annotation? This cannot be undone'
      
      if (!this.isOwner || this.apiInProgress || !confirm(message)) return
      this.startApiWork()
      
      let { meta } = await this.$api.deleteAnnotation(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id
      )
      
      if (meta.success) {
        this.$store.commit(REMOVE_ANNOTATION, this.annotation.id)
        this.$emit('blur')
      }
      
      this.endApiWork(meta, 'Could not delete annotation, please try again')
    }
  }
}
</script>

<style lang="sass">

.annotation-pill
  > .comment-section
    margin-top: 1em
    border-top: 1px solid $grey
    padding-top: 1em
  
  .info-column > *
      vertical-align: middle

</style>
