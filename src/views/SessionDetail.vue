<template lang="pug">
loading-full-layout(
  v-if="isLoading || errors.length > 0"
  loading-message="Fetching Gabber Session",
  :is-loading="isLoading",
  :errors="errors",
  :back-route="sessionListRoute"
)
full-layout(v-else)
  aside(slot="left")
    h3.subtitle Filter Annotations
  .main(slot="main")
    breadcrumbs
    h1.title {{session.creator.name}}'s Gabber
    pre {{session}}
  aside(slot="right")
    h3.subtitle Gabber Info
    label-value(label="Created on", :value="sessionDate")
    label-value(label="Creator")
      p.is-size-4
        name-bubble.is-size-5(
          :name="session.creator.name",
          :color-id="session.creator.id",
          padded
        )
        span {{session.creator.name}}
    label-value(label="Participants")
      name-bubble.is-size-6(
        v-for="member in session.participants",
        :key="member.id",
        :name="member.name",
        :color-id="member.user_id",
        padded
      )
    label-value(label="Topics")
      .tags
        .tag.is-link(v-for="topic in session.topics") {{topic.name}}
    label-value(
      label="Annotations", :value="session.user_annotations.length"
    )
</template>

<script>
import moment from 'moment-mini'

import { ADD_SESSIONS } from '@/const/mutations'
import { SESSION_LIST_ROUTE } from '@/const/routes'

import FullLayout from '@/layouts/FullLayout'
import LoadingFullLayout from '@/layouts/LoadingFullLayout'
import Breadcrumbs from '@/components/utils/Breadcrumbs'
import NameBubble from '@/components/utils/NameBubble'
import LabelValue from '@/components/utils/LabelValue'

export default {
  components: {
    FullLayout, LoadingFullLayout, Breadcrumbs, NameBubble, LabelValue
  },
  data: () => ({
    errors: [],
    isLoading: true
  }),
  mounted () {
    this.fetchGabber()
  },
  watch: {
    '$route.params.session_id' () {
      this.fetchGabber()
    }
  },
  computed: {
    sessionListRoute () { return { name: SESSION_LIST_ROUTE } },
    sessionId () { return this.$route.params.session_id },
    session () { return this.$store.getters.sessionById(this.sessionId) },
    sessionDate () {
      return moment(this.session.created_on)
        .format('h:mm a MMMM Do YYYY')
    }
  },
  methods: {
    async fetchGabber () {
      this.errors = []
      this.loading = true
      
      let { meta, data } = await this.$api.getSession(this.sessionId)
      
      this.errors = meta.messages
      
      if (meta.success) {
        this.$store.commit(ADD_SESSIONS, [ data ])
      } else if (this.errors.length === 0) {
        this.errors.push('Gabber not found')
      }
      
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass">
</style>
