<template lang="pug">
.full-layout(:class="typeClass")
  site-header(:full-width="true")
  //- nav.mobile-controls
    .columns.is-gapless.is-mobile
      .column.is-narrow
        button.button.is-link(@click="toggleMobileLeft") L
      .column
      .column.is-narrow
        button.button.is-link(@click="toggleMobileRight") R
  aside.layout-left(v-if="$slots.left", :class="leftClasses")
    slot(name="left")
  main.layout-main
    slot(name="main")
  aside.layout-right(v-if="$slots.right", :class="rightClasses")
    slot(name="right")
</template>

<script>
import SiteHeader from '../components/shared/SiteHeader'
import SiteFooter from '../components/shared/SiteFooter'

const MobileMode = {
  SHOW_MAIN: 'none',
  SHOW_LEFT: 'left',
  SHOW_RIGHT: 'right'
}

export default {
  components: { SiteHeader, SiteFooter },
  data () {
    return { typeClass: this.calcTypeClass(), mobileMode: MobileMode.SHOW_MAIN }
  },
  updated () {
    this.typeClass = this.calcTypeClass()
  },
  computed: {
    leftClasses () {
      return { 'mobile-show': this.mobileMode === MobileMode.SHOW_LEFT }
    },
    rightClasses () {
      return { 'mobile-show': this.mobileMode === MobileMode.SHOW_RIGHT }
    }
  },
  methods: {
    calcTypeClass () {
      if (!this.$slots.left && !this.$slots.right) return 'only-main'
      if (this.$slots.left && !this.$slots.right) return 'left-main'
      if (!this.$slots.left && this.$slots.right) return 'main-right'
      return 'left-main-right'
    },
    toggleMobileLeft () {
      const transitions = {
        [MobileMode.SHOW_LEFT]: MobileMode.SHOW_MAIN,
        [MobileMode.SHOW_RIGHT]: MobileMode.SHOW_LEFT,
        [MobileMode.SHOW_MAIN]: MobileMode.SHOW_LEFT
      }
      this.mobileMode = transitions[this.mobileMode]
    },
    toggleMobileRight () {
      const transitions = {
        [MobileMode.SHOW_LEFT]: MobileMode.SHOW_RIGHT,
        [MobileMode.SHOW_RIGHT]: MobileMode.SHOW_MAIN,
        [MobileMode.SHOW_MAIN]: MobileMode.SHOW_RIGHT
      }
      this.mobileMode = transitions[this.mobileMode]
    }
  }
}
</script>

<style lang="sass">

=padded-panel
  padding: 0.5em 1em

=panel-common
  overflow-y: auto
  -webkit-overflow-scrolling: touch
  +padded-panel

+desktop
  .full-layout
    display: grid
    height: 100vh
    grid-template-rows: 64px auto

    &.left-main-right
      grid-template-columns: 3fr 8fr 3fr
      grid-template-areas: 'header header header' 'left main right'
    &.left-main
      grid-template-columns: 3fr 11fr
      grid-template-areas: 'header header' 'left main'
    &.main-right
      grid-template-columns: 11fr 3fr
      grid-template-areas: 'header header' 'main right'
    &.only-main
      grid-template-areas: 'header' 'main'
    
    > .mobile-controls
      display: none

    > header
      grid-area: header
    
    > .layout-main
      +panel-common
      grid-area: main
    
    > .layout-left
      +panel-common
      background-color: $grey-darker
      grid-area: left
      border-right: 1px solid $grey-dark
    
    > .layout-right
      +panel-common
      background-color: $grey-darker
      grid-area: right
      border-left: 1px solid $grey-dark

+touch
  .full-layout
    position: relative
    
    .mobile-controls
      padding: 0.5em 0
      
      .button
        border-radius: 0
        font-size: 1.6rem
    
    > .layout-main
      +padded-panel
    
    > .layout-left
      +padded-panel
      &:not(.mobile-show)
        display: none
      &.mobile-show
        position: absolute
        left: 0
        top: 0
        right: 3em
    
    > .layout-right
      +padded-panel
      &:not(.mobile-show)
        display: none
      &.mobile-show
        position: absolute
        left: 3em
        top: 0
        right: 0
    
</style>
