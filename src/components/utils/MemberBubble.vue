<template lang="pug">
name-bubble(
  :name="member.fullname",
  :color-id="member.user_id",
  :padded="padded"
)
</template>

<script>
import NameBubble from './NameBubble'

export default {
  components: { NameBubble },
  props: {
    member: { type: Object, required: true },
    padded: { type: Boolean, default: false }
  }
}
</script>

<style lang="css">
</style>
