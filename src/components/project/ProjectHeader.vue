<template lang="pug">
.level.is-mobile.project-header
  .level-left
    .level-item
      fa(:icon="projectIcon", size="2x")
    
    .level-item.title
      h4.is-4 {{project.title}}
        span(v-if="membershipType") &ndash; {{ membershipType }}
  
  .level-right
    .level-item(v-if="canEdit")
      icon-button.is-dark.is-rounded(@click="$emit('startEdit')", icon="cog")
        | Edit
    
    .level-item(v-if="!isProjectMember")
      icon-button.is-dark.is-rounded(icon="user-plus", @click="$emit('join')", :disabled="inProgress")
        | Join
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
      return this.project.privacy === 'public' ? 'users' : 'lock'
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
</style>
