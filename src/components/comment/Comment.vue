<template lang="pug">
article.media.comment
  .media-left
    name-bubble.is-size-5(
      :name="comment.creator.fullname",
      :color-id="comment.creator.id"
    )
  .media-content
    .content
      .columns.is-gapless.is-marginless.is-mobile
        .column
          p.comment-content {{ comment.content }}
        .column.is-narrow(v-if="isCreator")
          button.delete(@click="deleteSelf", :disabled="apiInProgress") Delete
      nav.level.is-mobile
        .level-left
          button.button.is-link.is-rounded.is-small(v-if="canReply", @click="toggleReplies")
            | {{ toggleTitle }}
    h3.subtitle.has-text-centered(v-if="showReplies && apiInProgress")
      | Fetching Replies ...
    comment-section(
      v-else-if="showReplies && canReply",
      :annotation="annotation",
      :comments="replies",
      :parent="comment"
    )
</template>

<script>
import { ADD_COMMENTS, REMOVE_COMMENT } from '@/const/mutations'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import NameBubble from '@/components/utils/NameBubble'
import CommentSection from './CommentSection'

const NEST_LIMIT = 3

export default {
  name: 'comment',
  mixins: [ ApiWorkerMixin ],
  components: { NameBubble, CommentSection },
  props: {
    annotation: { type: Object, required: true },
    comment: { type: Object, required: true }
  },
  data: () => ({
    showReplies: false
  }),
  computed: {
    numReplies () { return this.comment.replies.length },
    hasReplies () { return this.comment.replies.length > 0 },
    isCreator () {
      return this.comment.creator.id === this.$store.getters.currentUserId
    },
    toggleTitle () {
      if (this.showReplies) {
        return this.numReplies > 0 ? 'Hide Replies' : 'Cancel'
      } else {
        let plural = this.numReplies === 1 ? 'reply' : 'Replies'
        return this.numReplies > 0 ? `${this.numReplies} ${plural}` : `Add a Reply`
      }
    },
    replies () {
      return this.$store.getters.commentChildren(this.comment.id)
    },
    canReply () {
      let depth = 0
      let parentId = this.comment.parent_id
      let current = null
      do {
        current = this.$store.getters.commentById(parentId)
        parentId = (current && current.parent_id) || null
        depth++
      } while (current && depth <= NEST_LIMIT)
      return depth < NEST_LIMIT
    }
  },
  methods: {
    async deleteSelf () {
      let msg = 'Are you sure you want to delete your comment? This cannot be undone'
      if (!this.isCreator || this.apiInProgress || !confirm(msg)) return
      this.startApiWork()
      
      // Try to delete the comment
      let { meta } = await this.$api.deleteComment(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.comment.id
      )
      
      // If successfull, remove from the state
      if (meta.success) {
        // this.comment.content = '[deleted]'
        this.$store.commit(REMOVE_COMMENT, this.comment.id)
      }
      
      // Re-enable the ui
      this.endApiWork(meta)
    },
    toggleReplies () {
      this.showReplies = !this.showReplies
      if (!this.showReplies) return
      
      // If no replies, fetch them
      if (this.replies.length === 0) {
        this.fetchReplies()
      }
    },
    async fetchReplies () {
      this.startApiWork()
      
      // Fetch child comments
      let { meta, data } = await this.$api.getChildComments(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.comment.id
      )
      
      // Commit the comments
      if (meta.success) {
        this.$store.commit(ADD_COMMENTS, data || [])
      } else {
        console.log('Error', meta.messages)
      }
      
      this.endApiWork(meta)
      console.log(this.apiInProgress)
    }
  }
}
</script>

<style lang="sass">

.comment
  .comment-content
    margin-bottom: 0.5em

</style>
