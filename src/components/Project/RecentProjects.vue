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

<style lang="stylus" scoped>

@import '~stylus/shared'

.recent-projects
    ul
        margin 0
        li
            margin 0
</style>
