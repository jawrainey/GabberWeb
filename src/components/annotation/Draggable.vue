<template lang="pug">
.draggable-elem(
  @mousedown.prevent="onMousedown",
  @touchstart.prevent="onMousedown",
  :class="classes"
)
</template>

<script>

let currentDrag = null

function globalDrag (e) {
  // e.preventDefault()
  
  if (currentDrag) {
    currentDrag.vm.$emit('move', e.movementX)
  }
}

function globalUp (e) {
  // e.preventDefault()
  
  if (currentDrag) {
    currentDrag.vm.active = false
  }
  
  currentDrag = null
}

if (window.gabberDrag) {
  document.removeEventListener('mousemove', window.gabberDrag.ondrag)
  document.removeEventListener('mouseup', window.gabberDrag.onup)
  // document.removeEventListener('touchmove', window.gabberDrag.ondrag)
  // document.removeEventListener('touchend', window.gabberDrag.onup)
}

window.gabberDrag = window.gabberDrag = {
  ondrag: { handleEvent: e => globalDrag(e) },
  onup: { handleEvent: e => globalUp(e) }
}

document.addEventListener('mousemove', window.gabberDrag.ondrag)
document.addEventListener('mouseup', window.gabberDrag.onup)
// document.addEventListener('touchmove', window.gabberDrag.ondrag)
// document.addEventListener('touchend', window.gabberDrag.onup)

export default {
  props: {
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    active: false
  }),
  computed: {
    classes () {
      return { 'is-active': this.active, 'is-disabled': this.disabled }
    }
  },
  methods: {
    onMousedown (e) {
      if (this.disabled) return
      currentDrag = {
        target: e.target,
        vm: this,
        x: e.clientX,
        y: e.clientY
      }
      this.active = true
    }
  }
}
</script>

<style lang="sass">

.draggable-elem
  cursor: grab
  &.is-active
    box-shadow: 0 0 10px black
    cursor: grabbing
  &.is-disabled
    cursor: not-allowed

</style>
