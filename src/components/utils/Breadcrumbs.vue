<template lang="pug">
nav(class="breadcrumb", aria-label="breadcrumbs")
  ul
    template(v-for="route in $route.matched")
      li(v-if="showRoute(route)", :class="classes(route)")
        router-link(:to="link(route)")
          .icon.is-small(v-if="icon(route)")
            fa(:icon="icon(route)")
          span(v-if="label(route)", v-text="label(route)")
</template>

<script>
export default {
  computed: {
    lastRoute () {
      let route = null
      this.$route.matched.forEach(r => {
        if (r.meta.crumb) route = r
      })
      return route
    }
  },
  methods: {
    classes (route) {
      return { 'is-active': route === this.lastRoute }
    },
    link (route) {
      let name = route.meta.holderFor || route.name
      return name ? { name } : route.path
    },
    showRoute (route) {
      return route.meta.crumb || route.meta.crumbIcon
    },
    icon (route) { return route.meta.crumbIcon },
    label (route) { return route.meta.crumb }
  }

}
</script>

<style lang="sass">

.breadcrumb
  ul li:not(:last-child) a
    color: $grey-lighter
  
  ul li:last-child a
    color: $grey-light

</style>
