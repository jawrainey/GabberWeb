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
    isOwner () {
      if (!this.currentUser) return false
      return this.project.creator.id === this.currentUser.id
    },
    isProjectMember () {
      if (!this.currentUser) return false
      return this.isOwner || this.project.members.some(member =>
        member.id === this.currentUser.id
      )
    },
    membershipType () {
      if (!this.isProjectMember) return null
      if (this.isOwner) return 'Owner'
      let membership = this.project.members.some(m => m.user === this.currentUser)
      return membership.role === 'admin' ? 'Admin' : 'User'
    }
  }
}
