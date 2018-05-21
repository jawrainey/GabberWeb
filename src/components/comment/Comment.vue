<template lang="pug">
article.media.comment
  .media-left
    member-bubble.is-size-5(:member="comment.creator")
  .media-content
    .content
      .columns.is-gapless.is-marginless.is-mobile
        .column
          p.comment-content {{ comment.content }}
        .column.is-narrow(v-if="isCreator && comment.is_active")
          button.delete(@click="deleteSelf", :disabled="apiInProgress") Delete
      .buttons
        button.button.is-link.is-rounded.is-small(v-if="canReply || hasReplies", @click="toggleReplies")
          span {{ toggleTitle }}
    h3.subtitle.has-text-centered(v-if="showReplies && apiInProgress")
      | Fetching Replies ...
    comment-section(
      v-else-if="showReplies && (canReply || hasReplies)",
      :annotation="annotation",
      :comments="replies",
      :parent="comment",
      :can-reply="canReply"
    )
</template>

<script>
import { ADD_COMMENTS } from '@/const/mutations'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import MemberBubble from '@/components/member/MemberBubble'
import CommentSection from './CommentSection'

const NEST_LIMIT = 3

export default {
  name: 'comment',
  mixins: [ ApiWorkerMixin ],
  components: { MemberBubble, CommentSection },
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
      return this.comment.creator.user_id === this.$store.getters.currentUserId
    },
    toggleIcon () {
      return this.showReplies ? 'chevron-up' : 'chevron-down'
    },
    toggleTitle () {
      if (this.showReplies) {
        return this.$tc('comp.comment.comment.collapse_action', this.numReplies, {
          count: this.numReplies
        })
      } else {
        return this.$tc('comp.comment.comment.replies_action', this.numReplies, {
          count: this.numReplies
        })
      }
    },
    replies () {
      return this.$store.getters.commentChildren(this.comment.id)
    },
    canReply () {
      if (!this.comment.is_active) return false
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
      let msg = this.$t('comp.comment.comment.delete_body')
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
        this.$store.commit(ADD_COMMENTS, [
          {
            ...this.comment,
            content: this.$t('comp.comment.comment.deleted_title'),
            is_active: false
          }
        ])
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
    }
  }
}
</script>

<style lang="sass">

.comment
  .comment-content
    margin-bottom: 0.5em
  
  > .media-content
    overflow: visible
    
    > .comment-section
      margin-left: -1.5rem

</style>
