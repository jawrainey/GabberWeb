<template>
    <header class="header">
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <strong>G</strong>
                    </p>
                </div>
            </div>
            <div class="level-right navigation">
                <p class="level-item has-text-centered">
                    <router-link :to="{name: 'home'}">Home</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link :to="{name: 'about'}">About</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link :to="{name: 'Projects'}">Projects</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link :to="{name: 'login'}" v-if="!isLoggedIn">Login</router-link>
                    <a @click="logout" v-else>Logout</a>
                </p>
            </div>
        </nav>
    </header>
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

<style>
    .level {
        height: 64px;
    }
    .header {
        border-bottom: 1px solid gold;
    }

    .navigation p {
        height: 64px;
        line-height: 64px;
    }

    .navigation p a {
        color: #000000;
        transition: background-color .3s;
        font-size: 1rem;
        display: block;
        padding: 0 15px;
        cursor: pointer;
    }

    .navigation p a:hover {
        background-color: rgba(0,0,0,0.1);
    }
</style>