<template lang="pug">
.annotation-edit
  .columns
    .column
      .level
        .level-left
          .level-item
            h3.subtitle.is-4(v-if="codebook.tags") Select tag and add comment
            h3.subtitle.is-4(v-else) Add comment
        .level-right
          .level-item
            label.label
              | Annotation – {{ annotation.start_interval | duration }} → {{ annotation.end_interval | duration }}
      ul(class="tags" v-if="codebook.tags")
        template(v-for="tag in codebook.tags")
          li(
            class="tag",
            :class="{ 'is-primary': selectedTags.includes(tag.id) }",
            @click="toggle(tag.id)"
          )
            span(v-text="tag.text" v-bind:key="tag.id")
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

@submit -> When the user changed the position of their annotation

*/

export default {
  props: {
    codebook: { type: Object, required: false },
    annotation: { type: Object, required: true },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    selectedTags: []
  }),
  computed: {
    canSubmit () { return !this.disabled && this.annotation.content !== '' }
  },
  methods: {
    toggle (tagID) {
      if (this.selectedTags.includes(tagID)) this.selectedTags = this.selectedTags.filter(t => t !== tagID)
      else this.selectedTags.push(tagID)
      this.annotation.tags = this.selectedTags
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
</style>
