<template lang="pug">
full-layout(v-if="isLoading")
  aside(slot="left")
  .main(slot="main")
    loading(:title="loadingMessage")
full-layout(v-else-if="errors.length > 0")
  aside(slot="left")
  .main(slot="main")
    section.section.is-medium
      message.is-danger.is-medium(v-model="errors")
      .buttons.is-centered(v-if="backRoute")
        router-link.button.is-link(:to="backRoute")
          .icon: fa(icon="chevron-left")
          span Go Back
  aside(slot="right")
</template>

<script>
import FullLayout from './FullLayout'
import Message from '@/components/utils/Message'
import Breadcrumbs from '@/components/utils/Breadcrumbs'
import Loading from '@/components/utils/Loading'

export default {
  components: { FullLayout, Message, Breadcrumbs, Loading },
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
