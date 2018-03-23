<template lang="pug">
.project-members
  message.is-danger(v-model="apiErrors", clearable)
  message.is-success(title="Success", v-model="confirmations", decay)
  .columns
    .column
      h3.subtitle Project Members
      .field.has-addons(v-for="member, index in membersWithoutCreator")
        .control
          .button.is-static {{ index + 1 }}.
        .control.is-expanded
          input.input(:value="memberInfo(member)", readonly)
        .control
          button.button.is-danger(@click="removeMember(member)", :disabled="apiInProgress")
            .icon: fa(icon="user-times")
      p.is-size-5.has-text-grey-lighter(
        v-if="membersWithoutCreator.length === 0"
      ) No members yet, why not add some?
    .column
      h3.subtitle Add Member
      template(v-if="newMember")
        .field
          label.label Full Name
          .control
            input.input(
              type="text",
              v-model="newMember.fullname",
              placeholder="e.g. Kevin Smith"
            )
        .field
          .control
            label.label Email
            input.input(
              type="text",
              v-model="newMember.email",
              placeholder="e.g. kevin@gmail.com"
            )
        .field.is-grouped.is-grouped-centered
          .control
            button.button.is-danger(@click="newMember = null") Cancel
          .control
            button.button.is-success(@click="addMember", :disabled="!canCreateMember") Add
      template(v-else)
        .buttons.is-centered
          button.button.is-primary.is-rounded(@click="startNewMember")
            .icon: fa(icon="user-plus")
            span Add Member
</template>

<script>
import { ADD_MEMBER_TO_PROJECT, REMOVE_MEMBER_FROM_PROJECT } from '@/const/mutations'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import Message from '@/components/utils/Message'

export default {
  mixins: [ ApiWorkerMixin ],
  components: { Message },
  props: {
    project: { type: Object, required: true }
  },
  data: () => ({
    newMember: null,
    confirmations: []
  }),
  computed: {
    membersWithoutCreator () {
      return this.project.members.filter(m => m.user_id !== this.project.creator.user_id)
    },
    canCreateMember () {
      return !this.apiInProgress &&
        this.newMember &&
        this.newMember.fullname !== '' &&
        this.newMember.email !== ''
    }
  },
  methods: {
    startNewMember () {
      this.newMember = {
        fullname: '',
        email: ''
      }
    },
    memberInfo (member) {
      return `${member.fullname}`
    },
    async addMember () {
      if (this.apiInProgress) return
      this.startApiWork()
      
      let { meta, data } = await this.$api.inviteToProject(
        this.project.id, this.newMember.fullname, this.newMember.email
      )
      
      if (meta.success) {
        this.$store.commit(ADD_MEMBER_TO_PROJECT, {
          projectId: this.project.id,
          member: data
        })
        this.confirmations.push(`${this.newMember.fullname} was added`)
        this.newMember = null
      }
      
      this.endApiWork(meta)
    },
    async removeMember (member) {
      let msg = 'Are you sure you want to remove this member?'
      if (this.apiInProgress || !confirm(msg)) return
      this.startApiWork()
      
      console.log(member)
      
      let { meta } = await this.$api.removeFromProject(
        this.project.id, member.id
      )
      
      if (meta.success) {
        this.$store.commit(REMOVE_MEMBER_FROM_PROJECT, {
          projectId: this.project.id,
          memberId: member.id
        })
        this.confirmations.push(`${member.fullname} was removed`)
      }
      
      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass">
</style>
