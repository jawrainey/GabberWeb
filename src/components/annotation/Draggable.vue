<template lang="pug">
.draggable-elem(
  @mousedown.prevent="onMousedown",
  @touchstart="onMousedown",
  :class="classes"
)
</template>

<script>

/* Emitted Events:

@move (x, y) -> when the user dragged the element (the x & y difference)

 */

let currentDrag = null

/** A global drag handler, which automatically is added/removed w/ hot reload */
function globalDrag (e) {
  if (currentDrag) {
    // Get the last positions
    let { x: prevX, y: prevY } = currentDrag
    
    // Process the first touch if a TouchEvent
    if (e.type === 'touchmove') {
      currentDrag.x = e.changedTouches[0].clientX
      currentDrag.y = e.changedTouches[0].clientY
    } else {
      // Otherwise, process a MouseEvent
      currentDrag.x = e.clientX
      currentDrag.y = e.clientY
    }
    
    // Emit the change x & y coord changes
    currentDrag.vm.$emit(
      'move',
      currentDrag.x - prevX,
      currentDrag.y - prevY
    )
  }
}

/** A global drag up handler, also works with hot reloading */
function globalUp (e) {
  if (currentDrag) {
    currentDrag.vm.active = false
  }
  
  currentDrag = null
}

/** Remove previous handlers, if running with hot reloading */
if (window.gabberDrag) {
  document.removeEventListener('mousemove', window.gabberDrag.ondrag)
  document.removeEventListener('mouseup', window.gabberDrag.onup)
  document.removeEventListener('touchmove', window.gabberDrag.ondrag)
  document.removeEventListener('touchend', window.gabberDrag.onup)
}

// Create new handlers
window.gabberDrag = window.gabberDrag = {
  ondrag: { handleEvent: e => globalDrag(e) },
  onup: { handleEvent: e => globalUp(e) }
}

// Add global handlers, so you can handle events outside Draggable components
document.addEventListener('mousemove', window.gabberDrag.ondrag)
document.addEventListener('mouseup', window.gabberDrag.onup)
document.addEventListener('touchmove', window.gabberDrag.ondrag)
document.addEventListener('touchend', window.gabberDrag.onup)

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
  user-select: none
  &.is-active
    box-shadow: 0 0 10px black
    cursor: grabbing
  &.is-disabled
    cursor: not-allowed

</style>
