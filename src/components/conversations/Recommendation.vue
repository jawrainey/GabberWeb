<template lang="pug">
a.recommendation.box(:href="url")
  .columns.no-bottom
    .column.is-narrow.no-padding-bottom.is-hidden-mobile
      img.project-logo(:src="session.image")
    .columns.is-text-overflow
      .column.has-text-left.is-clipped
        .columns.no-bottom.is-vertical-aligned.has-text-center-mobile
          .column.no-padding-bottom
            h3.project-title.is-size-4.has-text-weight-bold {{ sessionTitle }}
        p.is-size-6.subtitle.is-text-overflow.right-pad.is-italic.has-padding-left-right-mobile {{ societies }}
  .level.is-mobile
    .level-left.is-size-7
      .level-item.is-2
        .icon: fa(icon="comment")
        span {{ session.comments }} {{$t('view.project.session_detail.annotations_title')}}
      .level-item.is-2
        .icon: fa(icon="users")
        span {{ session.participants }} {{$t('comp.session.session_info_sidebar.members_label')}}
      .level-item.is-2
        .icon: fa(icon="globe")
        span {{ session.lang }}
</template>

<script>
import DataMixin from '@/mixins/Data'

export default {
  mixins: [ DataMixin ],
  props: { session: { type: Object, required: true } },
  computed: {
    sessionTitle () {
      let lang = this.$store.getters.currentLocale !== undefined ? this.$store.getters.currentLocale.code : 'en'
      return this.session.content.find(i => i.lang === lang).title
    },
    url () { return `${window.location.origin}/themes/${this.session.pid}/conversations/${this.session.id}` },
    societies () { return this.societiesForSessionAsString(this.session) }
  }
}
</script>

<style scoped lang="sass">

+mobile
  .has-text-center-mobile
    text-align: center
  .has-padding-left-right-mobile
    padding: 0 2em

.recommendation:hover
  border: 0 !important

.right-pad
  padding-right: 1em

.is-text-overflow
  flex: 1
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.box
  margin-bottom: .75em !important

.project-title
  padding-top: .25em
.project-logo
  max-width: 55px
  max-height: 55px

.no-padding-bottom
  padding-bottom: 0
.no-bottom
  margin-bottom: 0

.recommendation
  -webkit-transition: width 2s
  padding: .5em !important
</style>
