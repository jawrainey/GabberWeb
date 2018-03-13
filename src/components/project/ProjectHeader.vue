<template lang="pug">
.level.is-mobile.project-header
  .level-left
    .level-item.icon-item
      fa(v-if="projectIcon", :icon="projectIcon")
    
    .level-item.title
      h4.is-4 {{project.title}}
        span.membership(v-if="membershipType") {{ membershipType }}
  
  .level-right
    .level-item.is-marginless(v-if="canEdit")
      icon-button.is-dark.is-rounded(
        @click="$emit('startEdit')",
        icon="cog",
        title="Edit"
      )
    
    .level-item.is-marginless(v-if="!isProjectMember")
      icon-button.is-dark.is-rounded(
        icon="user-plus",
        @click="$emit('join')",
        :disabled="inProgress",
        title="Join"
      )
</template>

<script>
import ProjectPropMixin from '@/mixins/ProjectProp'
import IconButton from '@/components/utils/IconButton'

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
