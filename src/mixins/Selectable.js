/*
 * A mixin for components that can be selected, toggling it on or off
 */

export default {
  props: {
    selected: { type: Boolean, required: true }
  },
  computed: {
    selectionClass () {
      return { 'is-selected': this.selected }
    }
  },
  methods: {
    toggleSelection () {
      this.$emit(this.selected ? 'deselect' : 'select')
    }
  }
}
