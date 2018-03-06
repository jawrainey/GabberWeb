<template lang="pug">
layout
  section.section
    .container
      h1.title How it works
      h2.subtitle Here's all the informtion you need about Gabber.
  section.hero
    .hero-body
      .container
        .columns
          .column.has-text-centered
            h2.title.is-spaced.has-text-primary
              fa(:icon="['far', 'user']", size="2x")
            h3.subtitle.is-4.has-text-white Find a friend
            p Do you know someone with personal experiences of a topic you are interested in understanding and discussing with others?
          .column.has-text-centered
            h2.title.is-spaced.has-text-primary
              fa(:icon="['far', 'comments']", size="2x")
            h3.subtitle.is-4.has-text-white Record an interview
            p Download Gabber and record a set of interviews with others about aspects of a topic you have experiences with.
          .column.has-text-centered
            h2.title.is-spaced.has-text-primary
              fa(:icon="['far', 'edit']", size="2x")
            h3.subtitle.is-4.has-text-white Collaboratively annotate
            p Find your project, select the interview session, and discuss and annotate pieces of the audio interview using a novel interface
  section.section
    .container
      p Gabber is an ongoing exploratory research project that aims to understand the value of technologies for supporting the collection of speech data (interviews from Gabber), and interaction, consumption and collaborative interpretation of this data (using this website).
</template>

<script>
import Layout from '@/layouts/DefaultLayout'
export default {
  components: { Layout }
}
</script>
