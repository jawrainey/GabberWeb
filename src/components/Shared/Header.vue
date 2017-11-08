<template>
    <header class="header">
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <strong>RegionPlaylists</strong>
                    </p>
                </div>
            </div>
            <div class="level-right">
                <p class="level-item has-text-centered">
                    <router-link to="/">Home</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link to="/">About</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link to="/">Projects</router-link>
                </p>
                <p class="level-item has-text-centered">
                    <router-link to="/">Profile</router-link>
                </p>
            </div>
        </nav>
    </header>
</template>

<style>
    .level-item {
        margin: 1em;
        font-size: 1.1em;
    }
    .header {
        border-bottom: 1px solid gold;
    }
</style>