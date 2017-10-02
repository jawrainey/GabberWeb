<template>
    <li class="playlist__item">
        <h4 @click="toggle">{{ playlist.name }}</h4>
        <div v-if="isActive">
            {{ playlist.totalTime }} - {{ playlist.numberOfRegions }}
        </div>
    </li>
</template>

<script>
    export default {
        props: ['playlist'],
        data: () => ({ isActive: false }),
        methods: { toggle () { this.isActive = !this.isActive; } }
    }
</script>