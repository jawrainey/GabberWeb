<template>
    <li class="playlist__item">
        <h4 @click="toggle">{{ playlist.title }}</h4>
        <div v-if="isActive">
            {{ sumOfRegionsLengthInSeconds | readableSeconds }} - {{ numOfRegions }}
        </div>
    </li>
</template>

<script>
    export default {
        props: ['playlist'],
        data: () => ({ isActive: false }),
        methods: { toggle () { this.isActive = !this.isActive; } },
        computed: {
            sumOfRegionsLengthInSeconds() {
                return this.playlist.regions.reduce((s, v) => s + v.region.length, 0);
            },
            numOfRegions() {
                return this.playlist.regions.length;
            }
        },
        filters: {
            // TODO: this is also in Region.vue so refactor it out
            readableSeconds: function (value) {
                let date = new Date(null);
                date.setSeconds(value);
                return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
            }
        }
    }
</script>