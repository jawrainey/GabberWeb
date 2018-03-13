<template lang="pug">
.level.is-mobile.project-header
  .level-left
    .level-item.icon-item
      fa(v-if="projectIcon", :icon="projectIcon")
    
    .level-item.title
      h4.is-4 {{project.title}}
        span.membership(v-if="membershipType") {{ membershipType }}
  
  .level-right
    .level-item(v-if="canEdit")
      icon-button.is-dark.is-rounded(
        @click="$emit('editMembers')",
        icon="users",
        title="Members"
      )
    
    .level-item.is-marginless(v-if="canEdit")
      icon-button.is-dark.is-rounded(
        @click="$emit('startEdit')",
        icon="cog",
        title="Edit"
      )
    
    .level-item.is-marginless(v-if="isEditing")
      icon-button.is-dark.is-rounded(
        @click="$emit('stopEdit')",
        title="Close"
      )
    
    .level-item.is-marginless(v-if="!isProjectMember")
      icon-button.is-dark.is-rounded(
        icon="user-plus",
        @click="$emit('join')",
        :disabled="inProgress",
        title="Join"
      )
    
    .level-item.is-marginless(v-if="isProjectMember && !isOwner")
      icon-button.is-dark.is-rounded(
        icon="user-times",
        @click="$emit('leave')",
        :disabled="inProgress",
        title="Leave"
      )
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'
import IconButton from '@/components/utils/IconButton'

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
    isEditing: { type: Boolean, required: true }
  },
  computed: {
    projectIcon () {
      return this.project.privacy === 'public' ? '' : 'lock'
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
  
  .icon-item
    width: 1rem
  
  .membership
    padding-left: 0.5em
    font-size: 0.6em
    color: $grey-light
    text-transform: lowercase
</style>
