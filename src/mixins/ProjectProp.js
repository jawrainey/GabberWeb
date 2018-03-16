export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      // TODO: remove this
      return this.$store.getters.currentUser
    },
    currentUserId () {
      return this.$store.getters.currentUserId
    },
    isOwner () {
      return this.project.creator.user_id === this.currentUserId ||
        (this.project.members || []).some(m => m.user_id === this.currentUserId && m.role === 'admin')
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
      if (this.isOwner) return 'Owner'
      let membership = this.currentMembership
      return membership.role === 'admin' ? 'Admin' : 'Member'
    }
  }
}
