<template lang="pug">
article.comment-composer.media(v-if="user")
  .media-left
    member-bubble(
      :member="user", use-id
    )
  .media-content
    message.is-danger.is-small(v-model="apiErrors", clearable)
    .field.is-grouped
      .control.is-expanded
        textarea.textarea(
          v-model="content",
          :disabled="!canType",
          :placeholder="$t('comp.comment.comment_composer.placeholder')"
          @keyup.enter.prevent="submit",
          rows="2"
        )
      .control
        button.button.is-primary(
          @click="submit",
          :disabled="!canSubmit",
        )
          span.is-hidden-mobile {{$t('comp.comment.comment_composer.action')}}
          fa.is-hidden-tablet(icon="paper-plane")
</template>

<script>
import { ADD_COMMENTS } from '@/const/mutations'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import MemberBubble from '@/components/member/MemberBubble'
import Message from '@/components/utils/Message'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { MemberBubble, Message },
  props: {
    annotation: { type: Object, required: true },
    parent: { type: Object, default: null }
  },
  data: () => ({
    content: ''
  }),
  computed: {
    user () { return this.$store.getters.currentUser },
    canSubmit () {
      return this.user &&
        !this.apiInProgress &&
        this.content.trim() !== ''
    },
    canType () { return this.canSubmit || this.content === '' }
  },
  methods: {
    async submit () {
      if (!this.canSubmit || this.apiInProgress) return
      this.startApiWork()
      
      this.content = this.content.trim()
      
      let { meta, data } = await this.$api.createComment(
        parseInt(this.$route.params.project_id),
        this.$route.params.session_id,
        this.annotation.id,
        this.content,
        (this.parent && this.parent.id) || null
      )
      
      if (meta.success) {
        this.content = ''
        this.$store.commit(ADD_COMMENTS, [ data ])
        if (this.parent) {
          this.parent.replies.push(data.id)
        }
      }
      
      this.endApiWork(meta, this.$t('comp.comment.comment_composer.fail_body'))
    }
  }
}
</script>

<style lang="sass">

</style>
