<template lang="pug">
main
    .container
        section.section.is-large
            .columns
                .column.is-one-third
                    img(src="https://gabber.audio/static/img/screen.gif")
                .column.is-two-thirds
                    section.section.is-medium
                        h1.title.is-1 Your voice matters
                        h2.subtitle.is-2 Record, publish, and collaboratively annotate audio interviews with Gabber
                        router-link.button.is-success.is-large.is-rounded(v-bind:to="{ name: 'Projects' }") Explore Projects
</template>