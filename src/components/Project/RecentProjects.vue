<template lang="pug">
.recent-projects
    h5.subtitle.is-5 Recent Projects
    ul
        li Project A
        li Project B
        li Project C
</template>

<script>
export default {
    name: 'recent-projects'
}
</script>

<style lang="sass" scoped>

@import "~sass/shared"

.recent-projects
    ul
        margin 0
        li
            margin 0
</style>
