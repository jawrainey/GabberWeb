<template>
    <div class="container">
        <main class="columns">
            <aside class="column is-3">
                <slot name="sidebar"></slot>
            </aside>
            <section class="column is-9">
                <slot name="main"></slot>
            </section>
        </main>
    </div>
</template>