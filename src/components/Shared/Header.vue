<template lang="pug">
    header.header
        nav.level
            .level-left
                .level-item.has-text-centered
                    router-link#site-logo(v-bind:to="{ name: 'home' }") G
            .level-right#navigation
                //- p.level-item.has-text-centered
                    router-link(v-bind:to="{ name: 'home' }") Home
                //- p.level-item.has-text-centered
                    router-link(v-bind:to="{ name: 'about' }") About
                //- p.level-item.has-text-centered
                    router-link(v-bind:to="{ name: 'Projects' }") Projects
                p.level-item.has-text-centered
                    router-link(v-bind:to="{ name: 'login' }" v-if="!isLoggedIn") Login
                    a(@click="logout" v-else) Logout
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('LOGOUT_USER')
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.IS_LOGGED_IN
      }
    }
  }
</script>

<style lang="sass">
@import "~sass/shared"

.level
    height 64px

.header
    // border-bottom $header-border-bottom 1px solid

    #site-logo
        color $white
        font-size 2.8rem
        font-weight bold
        height 64px
        line-height 64px
        width 64px

    #navigation p
        height 64px
        line-height 64px
        a
            color $white
            cursor pointer
            display block
            font-size 1rem
            padding 0 15px
            transition background-color .3s
            &:hover
                background-color rgba(0,0,0,0.1)
</style>
