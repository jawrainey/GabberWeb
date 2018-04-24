<template lang="pug">
simple-layout
  section.hero.is-dark
    .hero-body
      .container
        h1.title About
        h2.subtitle How Gabber conversations are captured and used
  section.section
    .columns
      .column.has-text-centered
        h2.title.is-spaced.has-text-primary
          img(src="/static/img/about_capture.png" width="165" height="165")
        h3.subtitle.is-4.has-text-white Record Conversations
        p Anyone can create a project that represents topics that a community should use to structure conversations. Projects created through the website appear in the mobile application. Project topics are used to structure and tag the audio conversation as it is being recorded on the mobile device.

      .column.has-text-centered
        h2.title.is-spaced.has-text-primary
          img(src="/static/img/about_structure.png" width="165" height="165")
        h3.subtitle.is-4.has-text-white Structured Representation
        p The tagged recording and who participated in the conversation are associated with the project and uploaded to the website. Participants of the conversation are notified to review consent for the recording; the recording belongs to them and they decide who can view it and how it is used.

      .column.has-text-centered
        h2.title.is-spaced.has-text-primary
          img(src="/static/img/about_discuss.png" width="165" height="165")
        h3.subtitle.is-4.has-text-white Collaboratively Discuss
        p Project members can listen and annotate the audio conversations directly and create comments on the media to form discussions with other members. These discussions are associated with regions of the audio and used to provide context for representation.
</template>

<script>
import SimpleLayout from '@/layouts/SimpleLayout'
export default {
  components: { SimpleLayout }
}
</script>
