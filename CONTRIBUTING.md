# Contribution Guide

A rough guide for keeping a consistent project style

## Style Guides

### JavaScript

All JavaScript must adhere to the [JavaScript Standard Style](https://standardjs.com/), it isn't officially endorsed by Ecmascript someone just called it that. This style is set up with [Eslint](https://eslint.org/) so it should be easy to follow.

### Vue

Vue components should be organised like so:

```html
<template lang="pug">
</template>

<script>
</script>

<style lang="sass">
</style>
```

Component definitions should define configuration in a static > instance order, with the static things first. Here is an example order

```js
export default {
  mixins: [ ],
  components: { },
  props: { },         // An explicit definition is preferred rather than an array
  data: () => ({ }),  // Using the arrow-function shorthand where possible
  computed: { },
  watch: { },         // Try to avoid using watches, $route.params.____ is ok
  mounted () { },     // The lifecycle hooks around here, earliest first
  methods () { }      // Then your custom methods
}
```

## Commit Messages

* Use the past tense ("Added feature" not "Add feature")
* Use the imperative mood ("Moved cursor to..." not "Moves cursor to...")
* Use the first line (72 letters) as a general description then bullet changes on subsequent lines with an `*`
  * Unless you change something _really_ small
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

> This is a simplified version of [Atom's Contribution Guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md)
