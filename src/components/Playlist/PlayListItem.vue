<template>
    <li class="playlist__item">
        <router-link :to="{name: 'userPlaylist', params: { uid: 1, playlistID: this.playlist.id }}">
            {{ playlist.title }}
            <span class="playlist__meta">
                {{ numOfRegions }} tracks &mdash; {{ sumOfRegionsLengthInSeconds | readableSeconds }}
            </span>
        </router-link>
    </li>
</template>

<script>
    export default {
        props: ['playlist'],
        computed: {
            sumOfRegionsLengthInSeconds() {
                return this.playlist.regions.reduce((s, region) => s + region.length, 0);
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

<style>
    .playlist__item {
        font-size: 1em;
        font-weight: 700;
        margin: 0 1em;
        border-bottom: 1px solid #CCC;
        line-height: 1.68em;
    }
        .playlist__item:hover {
            transition: background-color 50ms ease-out 50ms;
            background: #CCC;
            cursor: pointer;
        }

        .playlist__item > a {
            color: #333;
            width: 100%;
            transition: color .2s;
            display: inline-block;
            padding: .42em;
        }

    .playlist__meta {
        text-transform: capitalize;
        font-size: .72em;
        display: block;
    }
</style>