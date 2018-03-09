<template lang="pug">
simple-layout
  .container.home-page.vertical-aligned
    section.section
      .columns
        .column.is-one-third
          img(src="https://gabber.audio/static/img/screen.gif")
        .column.is-two-thirds.vertical-aligned
          section.section
            h1.title.is-2
              | Your voice matters
            h2.subtitle.is-3
              | Record, publish, and collaboratively annotate audio interviews with Gabber
            .buttons
              router-link.button.is-success.is-large.is-rounded(:to="projectsRoute")
                span Explore Projects
                .icon: fa(icon="chevron-right")
</template>

<script>
import { PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import SimpleLayout from '@/layouts/SimpleLayout'

export default {
  components: { SimpleLayout },
  computed: {
    projectsRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } }
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
