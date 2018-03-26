<template lang="pug">
span.member-bubble(:class="classes", :style="styles")
  fa(:icon="memberIcon", fixed-width)
</template>

<script>
import ColorGeneratorMixin from '@/mixins/ColorGenerator'
import Tooltip from '@/components/utils/Tooltip'
import IconSet from '@/assets/json/member-icons'

export default {
  mixins: [ ColorGeneratorMixin ],
  components: { Tooltip },
  props: {
    member: { type: Object, required: true },
    padRight: { type: Boolean, default: false },
    useId: { type: Boolean, default: false }
  },
  computed: {
    classes () {
      return { 'is-padded-right': this.padRight }
    },
    styles () {
      return { 'background-color': this.colorFromId(this.memberId) }
    },
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

.member-bubble
  display: inline-flex
  justify-content: center
  align-items: center
  width: 2em
  height: 2em
  border-radius: 1em
  text-transform: capitalize
  vertical-align: middle
  color: white
  
  &.is-padded-right
    margin-right: 0.3em

</style>
