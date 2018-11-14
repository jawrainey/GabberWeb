<template lang="pug">
simple-layout
  main.padding.set-bg
    .columns.with-padding.is-centered.set-bg
      .column.is-desktop.is-two-thirds
        .title.is-2.is-size-3-mobile.has-text-weight-semibold
          | {{ $t('view.base.about.campaign.title') }}
        hr
        p.has-text-justified(v-html="$t('view.base.about.campaign.tagline')")
        img(:src="instructions")

        a(v-html="$t('view.base.about.campaign.ic.title')", id="#InnovationCorrespondent").title.is-3.is-size-4-mobile.has-text-weight-semibold
        .innovation-correspondent
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic.content_2')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic.content_3')")

        a(id="#Support").subtitle.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_1.title') }}
        .one-on-one
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_1.content_1')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_1.content_2')")

        a(id="#WhatsApp").subtitle.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_2.title') }}
        p.has-text-justified(v-html="$t('view.base.about.campaign.ic_2.content')")

        a(id="#RecordingInterviews").subtitle.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_3.title') }}
        .recording-interviews
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_3.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_3.content_2')")
          ol.tf-instructions
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_1')")
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_2')")
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_3')")
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_4')")
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_5')")
            li(v-html="$t('view.base.about.campaign.ic_3.content_li_6')")

        a(id="#TFProcess").subtitle.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_4.title') }}
          .video-container
            iframe(src='https://www.youtube.com/embed/XTCTzBb4Ih4', frameborder='0', allowfullscreen='')

        a(id="#InterviewQuestions").title.is-4.is-size-5-mobile.has-text-weight-semibold.m-top.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.title') }}
        .iq
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.content_2')")

        a(id="#InterviewQuestions-1").title.is-5.is-size-6-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.iq_1.title') }}
        .iq-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_1.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_1.content_2')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_1.content_3')")

        a(id="#InterviewQuestions-2").title.is-5.is-size-6-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.iq_2.title') }}
        .iq-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_2.content_1')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_2.content_2')")

        a(id="#InterviewQuestions-3").title.is-5.is-size-6-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.iq_3.title') }}
        .iq-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_3.content_1')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_3.content_2')")

        a(id="#InterviewQuestions-4").title.is-5.is-size-6-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.iq_4.title') }}
        .iq-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_4.content_1')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_4.content_2')")

        a(id="#InterviewQuestions-5").title.is-5.is-size-6-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_interview_questions.iq_5.title') }}
        .iq-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_5.content_1')")
          p.content.is-small.is-italic(v-html="$t('view.base.about.campaign.ic_interview_questions.iq_5.content_2')")

        a(id="#InterviewTips").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ic_6.title') }}
        .tips
          p.has-text-justified(v-html="$t('view.base.about.campaign.ic_6.content')")
          ol.tf-instructions
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_1')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_2')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_3')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_4')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_5')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_6')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_7')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_8')")
            li(v-html="$t('view.base.about.campaign.ic_6.instructions.content_li_9')")

        a(v-html="$t('view.base.about.campaign.ra.title')", id="#RA").title.is-3.is-size-4-mobile.has-text-weight-semibold
        .ra
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra.content_2')")

        a(id="#RA-Analysis").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ra_1.title') }}
        .ra-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra_1.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra_1.content_2')")

        a(id="#RA-ThoughtPieces").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ra_2.title') }}
        .ra-2
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra_2.content_1')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra_2.content_2')")
          p.has-text-justified(v-html="$t('view.base.about.campaign.ra_2.content_3')")

        a(v-html="$t('view.base.about.campaign.ca.title')", id="#CA").title.is-3.is-size-4-mobile.has-text-weight-semibold
        .ca
          p.has-text-justified(v-html="$t('view.base.about.campaign.ca.content')")

        a(id="#CA-Feedback").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ca_1.title') }}
        .ca-1
          p.has-text-justified(v-html="$t('view.base.about.campaign.ca_1.content')")

        a(id="#CA-Producing").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.ca_2.title') }}
        .ca-2
          p.has-text-justified(v-html="$t('view.base.about.campaign.ca_2.content')")

        a(id="#TY").title.is-3.is-size-4-mobile.has-text-weight-semibold
          | {{ $t('view.base.about.campaign.thanks.title') }}
        .ca-3
          p.has-text-justified {{ $t('view.base.about.campaign.thanks.content') }}

        a(id="#TY-Certificate").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.certification.title') }}
        .ca-4
          p.has-text-justified {{ $t('view.base.about.campaign.certification.content') }}

        a(id="#TY-Reference").title.is-4.is-size-5-mobile.has-text-weight-semibold.has-text-left
          | {{ $t('view.base.about.campaign.reference.title') }}
        .reference
          p.has-text-justified {{ $t('view.base.about.campaign.reference.content') }}
          ol.tf-instructions.has-text-left
            li {{ $t('view.base.about.campaign.reference.options.first') }}
            li {{ $t('view.base.about.campaign.reference.options.second') }}

        hr
        .columns.set-bg
          .column
            a.button.is-large.is-outlined.action(href="mailto:innovation.team@ifrc.org")
              | {{ $t('view.base.about.content.contact.action') }}
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'

export default {
  components: { SimpleLayout },
  computed: {
    instructions () { return `/static/img/talkfutures/overview-${this.$i18n.locale}.jpg` }
  }
}
</script>

<style lang="sass" scoped>
.with-padding
  padding: 1em
  margin: 0
+desktop
  p
    padding: 0 3.2em

  .tf-instructions
    width: 90%
    padding: 0 0 1em 8em
    text-align: left

p
  margin-bottom: 1.6em

a
  color: white
  display: block
  margin-top: 1em

.non
  color: #ED4E56
  margin: 0
  display: inline

.m-top
  padding-top: 1em


.click-to-show
  cursor: pointer
.video-container
  position: relative
  width: 420px
  height: 234px
  overflow: hidden
  margin: 1em auto
  padding: 0 1em !important
.video-container iframe, object, embed
  position: absolute
  top: 0
  left: 0
  width: 420px
  height: 234px
.no-bottom
  padding-bottom: 0
  margin-bottom: 0
.padding
  padding: 2em 0 0 0
.set-bg
  background-color: #1F2424
.branding
  max-height: 200px
  max-width: 100%
  margin: 0 auto

.column
  text-align: center

.logo
  width: 144px
  height: 144px

.strapline
  font-size: 22px
  padding: 1em

.column-icon
  margin-bottom: 2rem

+mobile
  .video-container, .video-container iframe, object, embed
    width: 320px
    height: 180px
  .side-padding
    padding: 0 1.6em

  .action
    width: 100%
    border-radius: 3px
    font-size: 0.85em
</style>
