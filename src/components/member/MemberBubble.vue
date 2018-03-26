<template lang="pug">
icon-bubble.member-bubble(:icon="memberIcon", :colorId="memberId", :pad-right="padRight")
  slot
</template>

<script>
import IconBubble from '@/components/utils/IconBubble'
import IconSet from '@/assets/json/member-icons'

export default {
  components: { IconBubble },
  props: {
    member: { type: Object, required: true },
    padRight: { type: Boolean, default: false },
    useId: { type: Boolean, default: false }
  },
  computed: {
    memberId () {
      return this.useId ? this.member.id : this.member.user_id
    },
    memberIcon () {
      return IconSet[this.memberId % IconSet.length]
    }
  }
}
</script>

<style lang="sass">

</style>
