import moment from 'moment-mini'

export default {
  methods: { formatDuration }
}

export function formatDuration (seconds) {
  seconds = Math.max(0, seconds)
  
  let mins = Math.floor(seconds / 60)
  let secs = Math.floor(seconds - (mins * 60))
  return `${pad(mins, 2)}:${pad(secs, 2)}`
}

export function formatDateLong (date) {
  return moment(date).format('h:mma, do MMM YY')
}

export function pad (number, width, padding = '0') {
  let string = String(number)
  return string.length >= width
    ? string
    : new Array(width - string.length + 1).join(padding) + string
}
