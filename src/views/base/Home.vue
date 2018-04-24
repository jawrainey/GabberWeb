<template lang="pug">
simple-layout
  .container.home-page.is-vertical-aligned
    .columns.is-gapless.is-centered
      .column.is-two-fifths
        section.section
          h1.title Structure and record audio conversations and directly annotate and discuss their content with others
          .buttons
            router-link.button.is-success.is-medium.is-rounded(:to="projectsRoute")
              span Explore Projects
              .icon: fa(icon="chevron-right")
      .column.is-two-fifths
        img(src="/static/img/gabber.png" width="450" height="450")
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

.home-page
  flex: 1

</style>
