<template lang="pug">
.comment-section
  comment(
    v-for="comment in comments",
    :key="comment.id",
    :comment="comment",
    :annotation="annotation"
  )
  comment-composer(:annotation="annotation", :parent="parent")
</template>

<script>
// import Comment from './Comment'
import CommentComposer from './CommentComposer'

export default {
  components: { CommentComposer },
  props: {
    annotation: { type: Object, required: true },
    comments: { type: Array, required: true },
    parent: { type: Object, default: null }
  },
  data: () => ({
    isLoading: false
  }),
  beforeCreate () {
    this.$options.components.Comment = require('./Comment.vue').default
  }
}
</script>

<style lang="sass">

</style>
