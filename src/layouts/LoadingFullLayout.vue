<template lang="pug">
full-layout(v-if="isLoading")
  aside(slot="left")
  .main(slot="main")
    breadcrumbs
    section.section.is-medium
      h1.title.has-text-centered {{ loadingMessage }}
  aside(slot="right")
full-layout(v-else-if="errors.length > 0")
  aside(slot="left")
  .main(slot="main")
    breadcrumbs
    section.section.is-medium
      message.is-danger.is-medium(v-model="errors")
      .buttons.is-centered
        router-link.button.is-link(:to="backRoute")
          .icon: fa(icon="chevron-left")
          span Go Back
  aside(slot="right")
</template>

<script>
import FullLayout from './FullLayout'
import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'

export default {
  components: { FullLayout, Message, Breadcrumbs },
  props: {
    errors: { type: Array },
    isLoading: { type: Boolean },
    loadingMessage: { type: String },
    backRoute: { type: Object }
  }
}
</script>

<style lang="css">
</style>
