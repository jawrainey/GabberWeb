<template lang="pug">
.project-members
  message.is-danger(v-model="apiErrors", clearable)
  message.is-success(title="Success", v-model="confirmations", decay)
  .columns
    .column
      h3.subtitle {{$t('comp.project.project_members.members_title')}} ({{ localMembers.length }})
      .field.has-addons(v-for="member, index in localMembers")
        .control
          .button.is-static {{ index + 1 }}.
        .control.is-expanded
          input.input(:value="memberInfo(member)", readonly)
        .control
          span.select
            select(v-model="member.role", @change="memberChanged(member)")
              option(v-for="role in roles", :value="role") {{ role }}
        .control(v-if="member.changed")
          button.button.is-success(@click="editMember(member)")
            .icon: fa(icon="check")
        .control(v-if="member.changed")
          button.button.is-danger(@click="editMemberCancel(member)")
            .icon: fa(icon="times")
        .control
          button.button.is-danger(@click="removeMember(member)", :disabled="apiInProgress")
            .icon: fa(icon="user-times")
      p.is-size-5.has-text-grey-lighter(
        v-if="localMembers.length === 0"
      ) {{$t('comp.project.project_members.no_members')}}
    .column
      h3.subtitle {{$t('comp.project.project_members.add_title')}}
      template(v-if="newMember")
        .field
          label.label {{$t('comp.project.project_members.name_field.label')}}
          input.input(
            autofocus,
            type="text",
            v-model.trim="newMember.fullname",
            :placeholder="$t('comp.project.project_members.name_field.placeholder')"
          )
        .field
          label.label {{$t('comp.project.project_members.email_field.label')}}
          input.input(
            type="text",
            v-model.trim="newMember.email",
            :placeholder="$t('comp.project.project_members.email_field.placeholder')"
          )
        .field
          label.label {{$t('comp.project.project_members.role_title')}}
          label(v-for="role in roles")
            input(type="radio", v-model="newMember.role", :value="role")
            span.has-text-grey-lighter.has-text-weight-bold.extra-padding {{ role }}
            br
            .help.is-italic {{$t(`comp.project.project_members.options.${role}`)}}
        hr
        .field.is-grouped.is-grouped-centered
          .control
            button.button.is-danger(@click="newMember = null")
              | {{$t('comp.project.project_members.cancel_action')}}
          .control
            button.button.is-success(@click="addMember", :disabled="!canCreateMember")
              | {{$t('comp.project.project_members.submit_action')}}
      template(v-else)
        .buttons.is-centered
          button.button.is-primary.is-rounded(@click="startNewMember")
            .icon: fa(icon="user-plus")
            span {{$t('comp.project.project_members.start_action')}}
</template>

<script>
import { ADD_MEMBER_TO_PROJECT, REMOVE_MEMBER_FROM_PROJECT, EDIT_MEMBER_ON_PROJECT } from '@/const/mutations'
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
    confirmations: [],
    localMembers: [],
    roles: ['participant', 'researcher', 'administrator']
  }),
  created () {
    this.copyMembers()
  },
  computed: {
    canCreateMember () {
      return !this.apiInProgress &&
        this.newMember &&
        this.newMember.fullname !== '' &&
        this.newMember.email !== '' &&
        this.newMember.role !== ''
    }
  },
  methods: {
    copyMembers () {
      // Deep-copy as we need the sub-object of the property (i.e. project.members)
      // We must copy as we will update the item and this change may not be saved, for example
      // if the role is changed from A->B and then the component is closed, then once it reopened
      // the item that was changed would be changed in the local DOM, but if a hard-refresh is used
      // then this is not the case
      let existingMembers = JSON.parse(JSON.stringify(this.project.members))
      this.localMembers = existingMembers.filter(m => m.user_id !== this.project.creator.user_id)
      this.localMembers.forEach(m => {
        // Has the role changed from initial default state?
        // As it could change and not been saved (A->B->A) we must store the default state.
        m.default = m.role
        m.changed = false
      })
    },
    memberChanged (member) {
      member.changed = member.role !== member.default
    },
    startNewMember () {
      this.newMember = {
        fullname: '',
        email: '',
        role: 'participant'
      }
    },
    memberInfo (member) {
      return `${member.fullname}`
    },
    async addMember () {
      if (this.apiInProgress) return
      this.startApiWork()

      let { meta, data } = await this.$api.inviteToProject(
        this.project.id, this.newMember.fullname, this.newMember.email, this.newMember.role
      )
      
      if (meta.success) {
        this.$store.commit(ADD_MEMBER_TO_PROJECT, {
          projectId: this.project.id,
          member: data
        })
        this.confirmations.push(
          this.$t('comp.project.project_members.was_added', {
            name: this.newMember.fullname
          })
        )
        this.newMember = null
      }
      // We want to update this one item, and reset all others...
      this.copyMembers()
      this.endApiWork(meta)
    },
    async editMember (member) {
      if (this.apiInProgress) return
      this.startApiWork()

      let { meta, data } = await this.$api.EditMembership(
        this.project.id, member.id, member.role
      )

      if (meta.success) {
        this.$store.commit(EDIT_MEMBER_ON_PROJECT, {
          projectId: this.project.id,
          member: data
        })

        this.confirmations.push(
          this.$t('comp.project.project_members.edit_success', {
            fullname: member.fullname,
            old_role: member.default,
            new_role: member.role
          })
        )
        this.localMembers.find(m => m.user_id === member.user_id).changed = false

        // Given this method only updates one method, if the user saves the edit for one then
        // we must revert the changes from the others and notify the user these did not change
        let others = []
        this.localMembers.forEach(m => {
          if (member.user_id !== m.user_id && m.changed) {
            m.role = m.default
            m.changed = false
            others.push(m.fullname)
          }
        })

        if (others.length > 0) {
          others.forEach(name => this.confirmations.push(
            this.$t('comp.project.project_members.others_changed', {name: name}))
          )
        }
      }
      this.copyMembers()
      this.endApiWork(meta)
    },
    editMemberCancel (member) {
      let found = this.localMembers.find(m => m.user_id === member.user_id)
      found.role = member.default
      found.changed = false
    },
    async removeMember (member) {
      let msg = this.$t('comp.project.project_members.delete_confirm')
      if (this.apiInProgress || !confirm(msg)) return
      this.startApiWork()

      let { meta } = await this.$api.removeFromProject(
        this.project.id, member.id
      )

      if (meta.success) {
        this.$store.commit(REMOVE_MEMBER_FROM_PROJECT, {
          projectId: this.project.id,
          memberId: member.id
        })
        this.confirmations.push(
          this.$t('comp.project.project_members.was_removed', {
            name: member.fullname
          })
        )
        this.copyMembers()
      }

      this.endApiWork(meta)
    }
  }
}
</script>

<style lang="sass">
  .extra-padding
    padding-left: 6px
</style>
