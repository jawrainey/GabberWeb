<template lang="pug">
article.comment-composer.media(v-if="user")
  .media-left
    name-bubble(:name="user.fullname", :color-id="user.id")
  .media-content
    message.is-danger.is-small(v-model="errors", clearable)
    .field.is-grouped
      .control.is-expanded
        textarea.textarea(
          v-model="content",
          :disabled="!canType",
          placeholder="I think that ..."
          @keyup.enter.prevent="submit",
          rows="2"
        )
      .control
        button.button.is-primary(
          @click="submit",
          :disabled="!canSubmit",
          v-text="'Comment'"
        )
</template>

<script>
import { ADD_COMMENTS } from '@/const/mutations'
import NameBubble from '@/components/utils/NameBubble'
import Message from '@/components/utils/Message'

export default {
  components: { NameBubble, Message },
  props: {
    annotation: { type: Object, required: true },
    parent: { type: Object, default: null }
  },
  data: () => ({
    errors: [],
    content: '',
    inProgress: false
  }),
  computed: {
    user () { return this.$store.getters.currentUser },
    canSubmit () {
      return this.user &&
        !this.inProgress &&
        this.content.trim() !== ''
    },
    canType () { return this.canSubmit || this.content === '' }
  },
  methods: {
    async submit () {
      if (!this.canSubmit) return
      this.inProgress = true
      this.errors = []
      
      this.content = this.content.trim()
      
      let { meta, data } = await this.$api.createComment(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.content.trim(),
        (this.parent && this.parent.id) || null
      )
      
      this.errors = meta.messages
      console.log(meta)
      
      if (meta.success) {
        this.content = ''
        this.$store.commit(ADD_COMMENTS, [ data ])
      } else if (this.errors.length === 0) {
        this.errors.push('Could not make comment, please try again')
      }
      
      this.inProgress = false
    }
  }
}
</script>

<style lang="sass">
</style>
