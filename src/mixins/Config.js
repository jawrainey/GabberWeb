
export function getConfig (key) {
  const config = window.CONFIG || {}
  return config[key] !== undefined
    ? config[key]
    : process.env[key]
}

export default {
  methods: { getConfig }
}
