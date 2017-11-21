export const utilsMixin = {
  methods: {
    readableSeconds: function (value) {
      let date = new Date(null)
      date.setSeconds(value)
      return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, '$1')
    }
  }
}
