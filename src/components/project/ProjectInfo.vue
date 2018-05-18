<template lang="pug">
.columns.project-info
  .column.description
    label-value.is-marginless(
      :label="$t('comp.project.project_info.info_label')",
      :value="project.description"
    )
  .column.members
    label-value.is-marginless(:label="$t('comp.project.project_info.members_label')")
      .bubble-list.is-multiline
        member-bubble(
          v-for="member in project.members",
          :key="member.id",
          :member="member",
          padded
        )
  .column.is-narrow(v-if="!readonly")
    .buttons.is-right
      router-link.button.is-link.is-rounded(:to="sessionsRoute")
        .icon: fa(icon="microphone")
        span {{$t('comp.project.project_info.sessions_action')}}
      //- router-link.button.is-link.is-rounded(:to="playlistsRoute")
        .icon: fa(icon="headphones")
        span {{$t('comp.project.project_info.playlists_action')}}
</template>

<script>
import { SESSION_LIST_ROUTE } from '@/const/routes'
import ProjectPropMixin from '@/mixins/ProjectProp'

import LabelValue from '@/components/utils/LabelValue'
import MemberBubble from '@/components/member/MemberBubble'

export default {
  mixins: [ ProjectPropMixin ],
  components: { LabelValue, MemberBubble },
  props: {
    readonly: { type: Boolean, default: false }
  },
  computed: {
    sessionsRoute () {
      const params = { project_id: this.project.id }
      return { name: SESSION_LIST_ROUTE, params }
    }
  }
}
</script>

<style lang="sass">

.project-info
  border-top: 1px solid $border
  padding-top: 0.6em
  
  +desktop
    .column.description
      padding-left: 2.6em

</style>
