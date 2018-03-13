export default {
  data: () => ({
    apiErrors: [],
    apiInProgress: false
  }),
  methods: {
    mergeMetaBlocks (...blocks) {
      const initialMeta = { success: true, messages: [] }
      return blocks.reduce((sum, meta) => {
        sum.success = sum.success && meta.success
        sum.messages = sum.messages.concat(meta.messages)
        return sum
      }, initialMeta)
    },
    startApiWork () {
      this.apiInProgress = true
      this.apiErrors = []
    },
    endApiWork (meta, defaultError = null) {
      this.apiInProgress = false
      if (!meta.success) {
        this.apiErrors = meta.messages.length === 0
          ? [ defaultError || 'Something went wrong' ]
          : meta.messages
      }
    }
  }
}
