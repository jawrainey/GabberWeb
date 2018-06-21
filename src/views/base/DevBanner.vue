<template lang="pug">
  .container.is-fullhd
    .notification.is-warning.is-radiusless.has-text-centered
      h1.is-size-4.has-text-danger: b ⚠️ WARNING: DEVELOPMENT WEBSITE ⚠️
      p.is-italic.has-text-white-bis
        | This website is used for testing during the development of Gabber and should not be used.
        br
        | The live website is available at &nbsp;
        b: a(href="https://gabber.audio")
          | https://gabber.audio
</template>

<script>
export default {}
</script>

<style lang="sass">
</style>
