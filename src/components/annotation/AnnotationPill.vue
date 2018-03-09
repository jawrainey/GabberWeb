<template lang="pug">
.box.is-pill.is-info
  .level
    .level-left
      .level-item
        div
          p.is-size-4
            name-bubble.is-size-5(
              :name="annotation.creator.name",
              :color-id="annotation.creator.id",
              padded
            )
            span {{ annotation.creator.name }}
          p.is-size-5 {{ annotation.content }}
</template>

<script>
import NameBubble from '@/components/utils/NameBubble'

export default {
  components: { NameBubble },
  props: {
    annotation: { type: Object, required: true }
  }
}
</script>

<style lang="css">
</style>
