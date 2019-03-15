<template lang="pug">
section.coming-soon.is-vertical-aligned
  .columns.is-centered
    .column.is-half
      p.has-text-centered
        img.branding(src="/static/img/about/capturing.png")
      .message.is-medium
        .message-header
          p Coming soon!
        .message-body
          p Gabber lets you structure and record audio conversations then directly annotate and discuss their content with others.
</template>

<script>
export default {
}
</script>

<style lang="sass">
.coming-soon
  min-height: 100vh
  // display: flex
  
  .branding
    max-width: 360px
    margin: 0 auto
  
</style>
