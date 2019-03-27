<template lang="pug">
.full-layout(:class="typeClass")
  site-header(:full-width="true", ref="header")
  nav.mobile-controls(
    v-if="hasControls", :style="controlsStyles", ref="controls"
  )
    .columns.is-gapless.is-mobile
      .column.is-narrow
        button.button.is-dark.no-focus-effects(
          v-if="this.$slots.mobileLeft",
          @click="toggleMobileLeft"
        )
          slot(v-if="mobileMode !== 'left'", name="mobileLeft")
          template(v-else)
            span.icon: fa(icon="chevron-left")
            span {{ $t('comp.project.project_header.close_action') }}
      .column
      .column.is-narrow
        button.button.is-dark.no-focus-effects(
          v-if="this.$slots.mobileRight",
          @click="toggleMobileRight"
        )
          slot(v-if="mobileMode !== 'right'", name="mobileRight")
          template(v-else)
            span {{ $t('comp.project.project_header.close_action') }}
            span.icon: fa(icon="chevron-right")
  .full-layout-items(:style="itemsStyles")
    aside.layout-left(v-if="$slots.left", :class="leftClasses")
      slot(name="left")
    main.layout-main(@scroll="onScroll")
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
    return {
      typeClass: this.calcTypeClass(),
      mobileMode: MobileMode.SHOW_MAIN,
      scrollOffset: 0
    }
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
    },
    hasControls () {
      return this.$slots.mobileLeft || this.$slots.mobileRight
    },
    fixControls () {
      let headerHeight = this.$refs.header && this.$refs.header.$el.offsetHeight
      return this.scrollOffset >= (headerHeight || 99999)
    },
    controlsStyles () {
      return this.fixControls
        ? { position: 'fixed', left: 0, right: 0, top: 0, 'z-index': 200 }
        : {}
    },
    itemsStyles () {
      return this.fixControls && this.$refs.controls
        ? { 'margin-top': `${this.$refs.controls.offsetHeight}px` }
        : {}
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
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
    },
    onScroll (e) {
      this.scrollOffset = e.currentTarget.scrollY
    }
  }
}
</script>

<style lang="sass" scoped>

=padded-panel
  padding: 0.5em 1em

=panel-common
  +padded-panel
  max-height: 100%
  overflow-y: auto
  -webkit-overflow-scrolling: touch

=sidebar-panel
  +panel-common
  background-color: $background

+desktop
  .mobile-controls
    display: none

  .full-layout
    display: flex
    flex-direction: column
    height: 100vh

    > .full-layout-items
      flex: 1
      display: flex

      > .layout-main
        +panel-common
        flex: 0.8

      > .layout-left
        +sidebar-panel
        flex: 0.2
        border-right: 1px solid $border

      > .layout-right
        +sidebar-panel
        flex: 0.2
        border-left: 1px solid $border

    &.left-main-right .full-layout-items
      > .layout-main
        flex: 0.6

=mobile-panel
  +sidebar-panel
  position: fixed
  width: calc(100vw - 1em)
  top: 7rem
  bottom: 0
  transition: $transition left, $transition right, $transition box-shadow
  z-index: 10
  box-shadow: 0 0 0 transparent

  &.mobile-show
    box-shadow: 0 0 30px black

+touch
  .full-layout
    overflow: hidden

    .mobile-controls
      padding: 0.4em 1em
      background-color: lighten($background, 7%)
      border-bottom: 1px solid $border

      .button
        font-size: 0.9rem
        text-decoration: none
        &:hover
          background-color: $dark

    > .full-layout-items
      position: relative

      > .layout-main
        padding: 1em

      > .layout-left
        +mobile-panel
        border-top-right-radius: 0.5em
        &:not(.mobile-show)
          left: -100vw
        &.mobile-show
          left: 0

      > .layout-right
        +mobile-panel
        border-top-left-radius: 0.5em
        &:not(.mobile-show)
          right: -100vw
        &.mobile-show
          right: 0

</style>
