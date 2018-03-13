<template lang="pug">
transition(name="fade")
  .message(v-show="messageList.length > 0")
    .message-header
      p(v-text="title")
      button.delete(v-if="clearable", @click="$emit('input', [])")
    .message-body
      p(v-for="message in messageList", v-text="message")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Something went wrong'
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [ String, Array ],
      required: true,
      default () { return [] }
    },
    decay: {
      type: Boolean,
      default: false
    }
  },
  destroyed () {
    if (this.timer) clearTimeout(this.timer)
  },
  watch: {
    value (newValue) {
      if (!this.decay) return
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => this.$emit('input', []), 3000)
    }
  },
  data: () => ({
    timer: null
  }),
  computed: {
    messageList () {
      return Array.isArray(this.value)
        ? this.value
        : [ this.value ]
    }
  }
}
</script>

<style lang="css">
</style>
