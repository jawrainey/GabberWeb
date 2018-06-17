<template lang="pug">
.columns.project-header
  .column
    h3.title.is-3
      span.icon-item: fa(v-if="projectIcon", :icon="projectIcon", transform="shrink-6")
      span  {{project.title}}
      span.membership.is-size-5.has-text-grey-light(v-if="membershipType")
        |  {{ membershipType }}
  
  .column.is-narrow(v-if="!readonly")
    .buttons.is-right
      icon-button.is-dark.is-rounded(
        v-if="canEdit",
        @click="$emit('editMembers')",
        icon="users",
        :title="$t('comp.project.project_header.members_action')"
      )
      
      icon-button.is-dark.is-rounded(
        v-if="canEdit",
        @click="$emit('startEdit')",
        icon="cog",
        :title="$t('comp.project.project_header.edit_action')"
      )
      
      icon-button.is-dark.is-rounded(
        v-if="isEditing",
        @click="$emit('stopEdit')",
        :title="$t('comp.project.project_header.close_action')"
      )
      
      icon-button.is-dark.is-rounded(
        v-if="!isProjectMember && currentUser",
        icon="user-plus",
        @click="$emit('join')",
        :disabled="inProgress",
        :title="$t('comp.project.project_header.join_action')"
      )
      
      icon-button.is-dark.is-rounded(
        v-if="isProjectMember && !isOwner",
        icon="user-times",
        @click="$emit('leave')",
        :disabled="inProgress",
        :title="$t('comp.project.project_header.leave_action')"
      )
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'
import IconButton from '@/components/utils/IconButton'
import { mapGetters } from 'vuex'

/* Emitted Events

@editMembers () -> when the user triggered member editing
@startEdit ()   -> when the user triggered info editing
@stopEdit()     -> when the user want to cancel editing
@join ()        -> when a user wants to join the project
@leave ()       -> when a user wants to leave the project

*/

export default {
  mixins: [ ProjectPropMixin ],
  components: { IconButton },
  props: {
    inProgress: { type: Boolean, required: true },
    isEditing: { type: Boolean, required: true },
    readonly: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters([ 'currentUser' ]),
    projectIcon () {
      return this.project.privacy === 'public' ? 'unlock' : 'lock'
    },
    canEdit () {
      return this.isOwner && !this.isEditing
    }
  }
}
</script>

<style lang="sass">
.project-header
  min-height: 40px
  
  +desktop
    .icon-item
      display: inline-block
      width: 0.8em
  
  .membership
    text-transform: lowercase
</style>
