<template>
    <div>
        <main-header class="container"></main-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import MainHeader from './components/Shared/Header.vue'

    export default {
        components: {
            MainHeader
        }
    }
</script>

<style>
    body { margin: 0; }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin: 10px;
    }
</style>