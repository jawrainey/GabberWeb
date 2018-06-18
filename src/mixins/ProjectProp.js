/*
 * A mixin for components that have a project as a prop with computed properties
 */

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentUserId () {
      return this.$store.getters.currentUserId
    },
    isOwner () {
      return this.project.creator.user_id === this.currentUserId ||
        (this.project.members || []).some(m => m.user_id === this.currentUserId && m.role === 'administrator')
    },
    currentMembership () {
      return this.project.members.find(m => m.user_id === this.currentUserId)
    },
    isProjectMember () {
      if (!this.currentUserId) return false
      if (this.isOwner) return true
      return !!this.currentMembership
    },
    membershipType () {
      if (!this.isProjectMember) return null
      if (this.isOwner) return this.$t('misc.project_membership.owner')
      let membership = this.currentMembership
      return membership.role === 'administrator'
        ? this.$t('misc.project_membership.admin')
        : this.$t('misc.project_membership.member')
    }
  }
}
