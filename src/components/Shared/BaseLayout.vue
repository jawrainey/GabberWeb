<template lang="pug">

    main.columns
        aside.column.is-desktop
            slot(name="navigation-sidebar")
        section.column.is-three-fifths-desktop
            slot(name="main")
        aside.column.is-desktop
            slot(name="meta-sidebar")

</template>

<style lang="stylus" scoped>

@import '~stylus/shared'

.columns
    flex-wrap wrap
    align-items stretch

</style>
