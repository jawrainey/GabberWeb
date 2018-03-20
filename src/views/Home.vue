<template lang="pug">
simple-layout
  .container.home-page.vertical-aligned
    .columns.is-gapless
      .column.is-one-third
        img.phone(src="https://gabber.audio/static/img/screen.gif")
      .column.is-two-thirds.vertical-aligned
        section.section
          h1.title
            | Your voice matters
          h2.subtitle
            | Record, publish, and collaboratively annotate audio interviews with Gabber
          .buttons
            router-link.button.is-success.is-medium.is-rounded(:to="projectsRoute")
              span Explore Projects
              .icon: fa(icon="chevron-right")
</template>

<script>
import { PROJECT_LIST_ROUTE } from '@/const/routes'
import SimpleLayout from '@/layouts/SimpleLayout'

export default {
  components: { SimpleLayout },
  computed: {
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } }
  }
}
</script>

<style lang="sass">

.vertical-aligned
  display: flex
  align-items: center
  justify-content: center

.home-page
  flex: 1

</style>
