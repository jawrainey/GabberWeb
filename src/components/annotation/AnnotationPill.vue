<template lang="pug">
.box.is-pill.is-info.annotation-pill(
  @mouseover="$emit('focus', annotation)",
  @mouseleave="$emit('blur')"
)
  .level
    .level-left
      .level-item
        p
          name-bubble.is-size-5(
            :name="annotation.creator.fullname",
            :color-id="annotation.creator.user_id",
            padded
          )
          span.is-size-4 {{ annotation.creator.fullname }}
          button.button.is-text.timestamp(@click="$emit('chosen', annotation)")
            | {{ annotation.start_interval | duration }} → {{ annotation.end_interval | duration }}
    .level-right
      .level-item.is-marginless(v-if="isOwner")
        button.button.is-dark.is-rounded(@click="deleteSelf")
          .icon: fa(icon="trash")
  .columns.is-gapless
    .column
      p.is-size-5 {{ annotation.content }}
    .column.is-narrow
      button.button.is-link.is-rounded(@click="toggleComments")
        | {{ commentTitle }}
  transition(name="fade")
    comment-section(
      v-if="showComments",
      :annotation="annotation",
      :comments="comments"
    )
</template>

<script>
import { REMOVE_ANNOTATION } from '@/const/mutations'

import TemporalMixin from '@/mixins/Temporal'
import ApiWorkerMixin from '@/mixins/ApiWorker'

import NameBubble from '@/components/utils/NameBubble'
import CommentSection from '@/components/comment/CommentSection'
import { mapGetters } from 'vuex'

/* Emitted Events:

@chosen (annotation) ~ When the user chose this annotation
@focus ()            ~ When the user wants to highlight an annotation
@blur ()             ~ When the user wants to highlight an annotation

*/

export default {
  mixins: [ TemporalMixin, ApiWorkerMixin ],
  components: { NameBubble, CommentSection },
  props: {
    annotation: { type: Object, required: true }
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
    }
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
      }
      
      this.endApiWork(meta, 'Could not delete annotation, please try again')
    }
  }
}
</script>

<style lang="sass">

.annotation-pill
  // cursor: help
  > .comment-section
    margin-top: 2em
    border-top: 1px solid $grey
    padding-top: 2em

</style>
