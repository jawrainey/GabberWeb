<template lang="pug">
#app-wrapper
  router-view(v-if="!isChecking")
</template>

<script>
import { LOGIN_USER } from './const/mutations'

export default {
  data: () => ({
    isChecking: false
  }),
  created () {
    this.checkLogin()
  },
  methods: {
    async checkLogin () {
      this.isChecking = true
      let { data } = await this.$api.getSelf()
      if (data) {
        this.$store.commit(LOGIN_USER, data)
      }
      this.isChecking = false
    }
  }
}
</script>

<style lang="sass">

@import "~bulma/bulma.sass"
@import "~bulmaswatch/darkly/_overrides.scss"

.button:focus
  text-decoration: underline

.button.is-uppercase
  text-transform: uppercase

.button.is-default
  @extend .is-rounded
  @extend .is-uppercase

.button.no-active-effects
  @each $name, $pair in $colors
    &.is-#{$name}:active
      box-shadow: none
      background-color: nth($pair, 1)
      border-color: nth($pair, 1)

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

hr
  height: 1px

// input[type="checkbox"] { margin-right: .8rem; }
//
// .control {
//   overflow: hidden;
//   white-space: nowrap;
// }
// .control:not(:last-child) {
//   padding-bottom: .42rem;
// }
//
// .checkbox {
//   position: relative;
//   top: -0.19rem;
//   cursor: pointer;
// }
// .checkbox:before {
//   -webkit-transition: all 0.3s ease-in-out;
//   -moz-transition: all 0.3s ease-in-out;
//   transition: all 0.3s ease-in-out;
//   content: "";
//   position: absolute;
//   left: 0;
//   z-index: 1;
//   width: 1rem;
//   height: 1rem;
//   border: 2px solid #CCC;
// }
// .checkbox:checked:before {
//   -webkit-transform: rotate(-45deg);
//   -moz-transform: rotate(-45deg);
//   -ms-transform: rotate(-45deg);
//   -o-transform: rotate(-45deg);
//   transform: rotate(-45deg);
//   height: .5rem;
//   border-color: #009688;
//   border-top-style: none;
//   border-right-style: none;
// }
// .checkbox:after {
//   content: "";
//   position: absolute;
//   top: -0.125rem;
//   left: 0;
//   width: 1.1rem;
//   height: 1.1rem;
//   background: #fff;
//   cursor: pointer;
// }
</style>
