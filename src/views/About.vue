<template lang="pug">
main
    section.hero.is-medium#main-hero
        .hero-body
            .container.has-text-centered
                h1.title About Gabber
                h2.subtitle Gabber description here...

    section.section
        .container
            .columns
                .column.has-text-centered
                    .section
                        h3.title.is-3 Find a friend
                        p Do you know someone with personal experiences of a topic you are interested in understanding and discussing with others?
                .column.has-text-centered
                    .section
                        h3.title.is-3 Record an interview
                        p Download Gabber and record a set of interviews with others about aspects of a topic you have experiences with.
                .column.has-text-centered
                    .section
                        h3.title.is-3 Collaboratively annotate
                        p Find your project, select the interview session, and discuss and annotate pieces of the audio interview using a novel interface.

    section.section
        .container
            .columns
                .column.is-half
                    .box
                        p Gabber is an ongoing exploratory research project that aims to understand the value of technologies for supporting the collection of speech data (interviews from Gabber), and interaction, consumption and collaborative interpretation of this data (using this website).
                .column.is-half
                    .box
                        p For more information about this work please contact us.
</template>

<style lang="stylus" scoped>

@import "~stylus/shared"

#main-hero
    background-color $grey-darker

.box
    background-color $grey-darker
    color $color-white
</style>
