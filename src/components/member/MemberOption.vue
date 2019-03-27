<template lang="pug">
span.member-option(@click="toggleSelection", :class="selectionClass")
  member-bubble(:member="member", pad-right)
    fa.has-text-success(v-if="selected", icon="check")
</template>

<script>
import SelectableMixin from '@/mixins/Selectable'
import MemberBubble from '@/components/member/MemberBubble'

export default {
  mixins: [ SelectableMixin ],
  components: { MemberBubble },
  props: {
    member: { type: Object, required: true }
  }
}
</script>

<style lang="sass" scoped>

.member-option
  cursor: pointer
  user-select: none

  &:hover:not(.is-active)
    opacity: 0.9

</style>
