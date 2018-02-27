<template>
    <div class="container">
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
    input[type="checkbox"] { margin-right: .8rem; }

    .control {
        overflow: hidden;
        white-space: nowrap;
    }
    .control:not(:last-child) {
        padding-bottom: .42rem;
    }

    .checkbox {
        position: relative;
        top: -0.19rem;
        cursor: pointer;
    }
    .checkbox:before {
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        content: "";
        position: absolute;
        left: 0;
        z-index: 1;
        width: 1rem;
        height: 1rem;
        border: 2px solid #CCC;
    }
    .checkbox:checked:before {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        height: .5rem;
        border-color: #009688;
        border-top-style: none;
        border-right-style: none;
    }
    .checkbox:after {
        content: "";
        position: absolute;
        top: -0.125rem;
        left: 0;
        width: 1.1rem;
        height: 1.1rem;
        background: #fff;
        cursor: pointer;
    }
</style>