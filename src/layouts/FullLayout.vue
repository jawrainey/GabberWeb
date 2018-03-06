<template lang="pug">
.full-layout(:class="typeClass")
  site-header
  aside.left(v-if="$slots.left")
    slot(name="left")
  main.main
    slot(name="main")
  aside.right(v-if="$slots.right")
    slot(name="right")
</template>

<script>
import SiteHeader from '../components/Shared/SiteHeader'
import SiteFooter from '../components/Shared/SiteFooter'

export default {
  components: { SiteHeader, SiteFooter },
  data () {
    return { typeClass: this.calcTypeClass() }
  },
  updated () {
    this.typeClass = this.calcTypeClass()
  },
  methods: {
    calcTypeClass () {
      if (!this.$slots.left && !this.$slots.right) return 'only-main'
      if (this.$slots.left && !this.$slots.right) return 'left-main'
      if (!this.$slots.left && this.$slots.right) return 'main-right'
      return 'left-main-right'
    }
  }
}
</script>

<style lang="sass">

=overflow-scroll
  overflow: scroll
  -webkit-overflow-scrolling: touch

.full-layout
  display: grid
  height: 100vh
  grid-template-rows: 60px auto

  &.left-main-right
    grid-template-columns: 2fr 8fr 2fr
    grid-template-areas: 'header header header' 'left main right'
  &.left-main
    grid-template-columns: 2fr 10fr
    grid-template-areas: 'header header' 'left main'
  &.main-right
    grid-template-columns: 10fr 2fr
    grid-template-areas: 'header header' 'main right'
  &.only-main
    grid-template-areas: 'header' 'main'

  > header
    grid-area: header
  
  > main
    +overflow-scroll
    grid-area: main
  
  > .left
    +overflow-scroll
    background-color: $grey-darker
    grid-area: left
    border-right: 1px solid $grey-dark
  
  > .right
    +overflow-scroll
    background-color: $grey
    grid-area: right
    border-left: 1px solid $grey-dark

    
</style>
