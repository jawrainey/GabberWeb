<template lang="pug">
article.media.comment
  .media-left
    name-bubble.is-size-5(:name="comment.creator.fullname", :color-id="comment.creator.id")
  .media-content
    .content
      .columns.is-gapless.is-marginless.is-mobile
        .column
          p.comment-content {{ comment.content }}
        .column.is-narrow(v-if="comment.creator.id === $store.getters.currentUserId")
          button.delete(@click="deleteSelf", :disabled="isLoading") Delete
      nav.level.is-mobile
        .level-left
          button.button.is-link.is-rounded.is-small(@click="toggleReplies")
            | {{ toggleTitle }}
    h3.subtitle.has-text-centered(v-if="showReplies && isLoading") Fetching Replies ...
    comment-section(
      v-else-if="showReplies",
      :annotation="annotation",
      :comments="replies",
      :parent="comment"
    )
</template>

<script>
import { ADD_COMMENTS, REMOVE_COMMENT } from '@/const/mutations'
import NameBubble from '@/components/utils/NameBubble'
import CommentSection from './CommentSection'

export default {
  name: 'comment',
  components: { NameBubble, CommentSection },
  props: {
    annotation: { type: Object, required: true },
    comment: { type: Object, required: true }
  },
  data: () => ({
    isLoading: false,
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
        return this.numReplies > 0
          ? `${this.numReplies} ${plural}`
          : `Add a Reply`
      }
    },
    replies () {
      return this.$store.getters.commentChildren(this.comment.id)
    }
  },
  methods: {
    async deleteSelf () {
      let msg = 'Are you sure you want to delete your comment? This cannot be undone'
      if (!this.isCreator || this.isLoading || !confirm(msg)) return
      this.isLoading = true
      
      let { meta } = await this.$api.deleteComment(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.comment.id
      )
      
      if (meta.success) {
        // this.comment.content = '[deleted]'
        this.$store.commit(REMOVE_COMMENT, this.comment.id)
      }
      
      this.isLoading = false
    },
    toggleReplies () {
      this.showReplies = !this.showReplies
      if (!this.showReplies) return
      
      if (this.replies.length === 0) {
        this.fetchReplies()
      }
    },
    async fetchReplies () {
      this.isLoading = true
      
      let { meta, data } = await this.$api.getChildComments(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.comment.id
      )
      
      if (!meta.success) {
        console.log('Error', meta.messages)
      }
      
      this.$store.commit(ADD_COMMENTS, data || [])
      
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass">

.comment
  .comment-content
    margin-bottom: 0.5em

</style>
