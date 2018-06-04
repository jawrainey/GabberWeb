<template lang="pug">
.annotation-edit
  .columns
    .column
      .level
        .level-left
          .level-item
            h3.subtitle.is-4(v-if="codebook") Select tags and add a comment
            h3.subtitle.is-4(v-else) Add a comment
        .level-right
          .level-item
            label.label
              | Annotation – {{ annotation.start_interval | duration }} → {{ annotation.end_interval | duration }}
      ul.tags(v-if="codebook && codebook.tags")
        li.tag.is-medium(
          v-for="tag in codebook.tags",
          :class="tagClass(tag.id)",
          @click="toggle(tag.id)"
        )
          span {{ tag.text }}
      .field
        textarea.textarea(
          type="text",
          v-model="annotation.content",
          :disabled="disabled",
          placeholder="I think that ...",
          rows="2"
        )
  hr
  .field.is-grouped.is-grouped-right
    .control
      button.button.is-link.is-rounded(@click="cancel")
        | Cancel

    .control
      button.button.is-success.is-rounded(@click="submit", :disabled="!canSubmit")
        | Create
</template>

<script>

/* Emitted Events

@submit -> When the user submits the annotation
@cancel -> When the user cancels creating their annotation

*/

export default {
  props: {
    annotation: { type: Object, required: true },
    codebook: { type: Object, required: false },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    selectedTags: []
  }),
  computed: {
    canSubmit () { return !this.disabled && this.annotation.content !== '' }
  },
  methods: {
    toggle (tagId) {
      if (this.selectedTags.includes(tagId)) {
        this.selectedTags = this.selectedTags.filter(t => t !== tagId)
      } else {
        this.selectedTags.push(tagId)
      }
      this.annotation.tags = this.selectedTags
    },
    tagClass (tagId) {
      return this.selectedTags.includes(tagId)
        ? 'is-primary' : 'is-dark'
    },
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="sass">
.annotation-edit
  .tags .tag
    cursor: pointer
</style>
