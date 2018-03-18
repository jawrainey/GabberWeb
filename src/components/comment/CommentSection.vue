<template lang="pug">
.comment-section
  comment(
    v-for="comment in comments",
    :key="comment.id",
    :comment="comment",
    :annotation="annotation"
  )
  comment-composer(
    :annotation="annotation",
    :parent="parent"
  )
  .buttons.is-centered(v-if="!$store.getters.currentUser")
    button.button.is-primary.is-rounded(@click="login")
      | Login to comment
</template>

<script>
import { LOGIN_ROUTE } from '@/const/routes'
import { LOGIN_RETURN_ROUTE } from '@/const/mutations'
import CommentComposer from './CommentComposer'

export default {
  components: { CommentComposer },
  props: {
    annotation: { type: Object, required: true },
    comments: { type: Array, required: true },
    parent: { type: Object, default: null }
  },
  beforeCreate () {
    // We have to require it manually to fix the circular dependancy
    this.$options.components.Comment = require('./Comment.vue').default
  },
  methods: {
    login () {
      this.$store.commit(LOGIN_RETURN_ROUTE, {
        name: this.$route.name, params: this.$route.params
      })
      this.$router.push({ name: LOGIN_ROUTE })
    }
  }
}
</script>

<style lang="sass">

</style>
