<template lang="pug">
.box.is-pill.is-info.annotation-pill
  .level
    .level-left
      .level-item
        p
          name-bubble.is-size-5(
            :name="annotation.creator.fullname",
            :color-id="annotation.creator.id",
            padded
          )
          span.is-size-4 {{ annotation.creator.fullname }}
          button.button.is-text.timestamp(@click="$emit('chosen', annotation)")
            | {{ formatDuration(annotation.start_interval) }}
  .columns.is-gapless
    .column
      p.is-size-5 {{ annotation.content }}
    .column.is-narrow
      button.button.is-link.is-rounded(v-if="comments.length > 0", @click="toggleComments")
        | {{ commentTitle }}
  template(v-if="showComments")
    hr
    comment-section(
      v-if="showComments",
      :annotation="annotation",
      :comments="comments"
    )
</template>

<script>
import TemporalMixin from '@/mixins/Temporal'
import NameBubble from '@/components/utils/NameBubble'
import CommentSection from '@/components/comment/CommentSection'
import { mapGetters } from 'vuex'

export default {
  mixins: [ TemporalMixin ],
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
      let plural = this.comments.length === 1 ? 'Comment' : 'Comments'
      return this.showComments
        ? `Hide ${plural}`
        : `${this.comments.length} ${plural}`
    },
    comments () {
      return this.$store.getters.commentsForAnnotation(this.annotation.id)
    }
  },
  methods: {
    toggleComments () {
      this.showComments = !this.showComments
    },
    addComment () {
      // ...
    }
  }
}
</script>

<style lang="sass">

</style>
