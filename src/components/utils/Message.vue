<template lang="pug">
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
    }
  },
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
