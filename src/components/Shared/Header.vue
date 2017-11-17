<template>
    <header class="header">
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <strong></strong>
                    </p>
                </div>
            </div>
            <div class="level-right navigation">
                <p class="level-item has-text-centered">
                    <a href="/">Home</a>
                </p>
                <p class="level-item has-text-centered">
                    <a href="/about">About</a>
                </p>
                <p class="level-item has-text-centered">
                    <a href="/projects">Projects</a>
                </p>
                <p class="level-item has-text-centered">
                    <a href="/logout">Logout</a>
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