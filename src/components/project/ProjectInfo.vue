<template lang="pug">
.columns.is-multiline.project-info
  .column.is-narrow.is-hidden-mobile
    figure.image.is-96x96
      img.project-photo.is-rounded(:src="project.image")

  .column.is-half.description
    label-value.is-marginless(
      :label="$t('comp.project.project_info.info_label')",
      :value="projectContent.description"
    )
  .column.is-multiline(v-if="!readonly")
    .columns
      .column.is-half-tablet
        label-value.is-marginless(:label="$t('comp.project.project_info.members_label')")
          .bubble-list.is-multiline
            member-bubble(v-for="member in project.members",
            :key="member.id", :member="member", padded)
      .column.is-half-tablet
        .buttons.is-right
          router-link.button.is-link.is-rounded(:to="sessionsRoute")
            .icon: fa(icon="microphone")
            span {{$t('comp.project.project_info.sessions_action')}}
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
    projectContent () { return this.$store.getters.projectContentByLanguage(this.project) },
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

  .column.description
    font-size: .8em

  +desktop
    .column.description
      padding-left: 2.6em

.project-photo
  width: 96px !important
  height: 96px !important
</style>
