const randomizer = 49

export default {
  methods: {
    colorFromId (id) {
      let hue = (id * randomizer) % 360
      return `hsl(${hue}, 42%, 50%)`
    }
  }
}
