<template>
    <li class="playlist__item">
        <router-link :to="{name: 'userPlaylist', params: { uid: 1, playlistID: this.playlist.id }}">
            {{ playlist.title }}
            <span class="playlist__meta">
                {{ numOfRegions }} tracks &mdash; {{ readableSeconds(sumOfRegionsLengthInSeconds) }}
            </span>
        </router-link>
    </li>
</template>

<script>
import {utilsMixin} from '../../mixins/index'

export default {
  props: ['playlist'],
  mixins: [utilsMixin],
  computed: {
    sumOfRegionsLengthInSeconds () {
      return this.playlist.regions.reduce((s, region) => s + region.length, 0)
    },
    numOfRegions () {
      return this.playlist.regions.length
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
