<template lang="pug">
#app-wrapper
  router-view
</template>

<script>
import SiteHeader from './components/Shared/SiteHeader.vue'

export default {
  components: {
    SiteHeader
  }
}
</script>

<style lang="sass">

@import "~bulmaswatch/darkly/_variables.scss"
@import "~bulma/bulma.sass"
@import "~bulmaswatch/darkly/_overrides.scss"

.button:focus
  text-decoration: underline

.button.is-uppercase
  text-transform: uppercase

.input
  background-color: $grey-lighter

.input:focus
  background-color: $white

// Why would a css framework add a transition: all :S
a, .button
  transition: none

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
