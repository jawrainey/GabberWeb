<template lang="pug">
#app-wrapper
  router-view(v-if="!apiInProgress")
</template>

<script>
import { LOGIN_USER } from './const/mutations'
import ApiWorkerMixin from './mixins/ApiWorker'

export default {
  mixins: [ ApiWorkerMixin ],
  created () {
    this.checkLogin()
  },
  methods: {
    async checkLogin () {
      this.startApiWork()
      
      let { meta, data } = await this.$api.getSelf()
      if (data) this.$store.commit(LOGIN_USER, data)
      
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass">

@import "~bulma/bulma.sass"
@import "~bulmaswatch/darkly/_overrides.scss"
@import "~sass/transitions.sass"

.button
  &:focus
    text-decoration: underline
  &.is-uppercase
    text-transform: uppercase
  &.is-default
    @extend .is-rounded
    @extend .is-uppercase
  &.no-focus-effects
    @each $name, $pair in $colors
      &.is-#{$name}:focus
        box-shadow: none
        background-color: nth($pair, 1)
        border-color: nth($pair, 1)
  &.is-static
    background-color: $grey-lighter
  &.is-circle
    display: inline-flex
    flex-direction: column
    border-radius: $radius-rounded
    vertical-align: middle
    width: 2.5em
    height: 2.5em
  &.is-success
    font-weight: bold
    text-shadow: 0 0 5px rgba(0,0,0,0.3)

.input, .textarea, .select select
  background-color: $grey-lighter
  &:focus
    background-color: $white
    border-color: $primary
    box-shadow: 0 0 5px rgba(255,255,255, 0.5)
  &:disabled
    color: $grey-dark
    background-color: $grey-light

.box.is-pill
  @each $name, $pair in $colors
    &.is-#{$name}
      border-left: 15px solid nth($pair, 1)

// Why would a css framework add a transition: all :S
a, .button
  transition: none

a
  color: $primary

hr
  height: 1px

</style>
