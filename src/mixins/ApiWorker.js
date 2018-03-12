export default {
  data: () => ({
    apiErrors: [],
    apiInProgress: false
  }),
  methods: {
    mergeMetaBlocks (...blocks) {
      return blocks.reduce((sum, meta) => {
        sum.success = sum.success && meta.success
        sum.messages = sum.messages.concat(meta.messages)
      }, { success: true, messages: [] })
      // let messages = []
      // let success = true
      // blocks.forEach(meta => {
      //   success = success && meta
      //   messages = messages.concat(meta.messages)
      // })
      // return { success, messages }
    },
    startApiWork () {
      this.apiInProgress = true
      this.errors = []
    },
    endApiWork (meta, defaultError = null) {
      this.apiInProgress = false
      this.errors = meta.messages.length === 0
        ? meta.messages
        : [ defaultError || 'Something went wrong' ]
    }
  }
}
