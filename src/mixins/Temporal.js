/*
 * A mixin for components that want to format temporal data (dates / times)
 */

import { format as formatDate } from 'date-fns'

export default {
  methods: { formatDuration, formatDateLong, formatDateTime }
}

// Format a duration – e.g. "01:32"
export function formatDuration (seconds) {
  seconds = Math.max(0, seconds)

  let mins = Math.floor(seconds / 60)
  let secs = Math.floor(seconds - (mins * 60))
  return `${pad(mins, 2)}:${pad(secs, 2)}`
}

// Format a date – e.g. "5:32am, 15th March 2018"
export function formatDateLong (date) {
  return formatDate(date, 'DD/MM/YY')
}

export function formatDateTime (datetime, format) {
  return formatDate(datetime, format)
}

// Pad a string with `n` preceeding zeros
export function pad (number, width, padding = '0') {
  let string = String(number)
  return string.length >= width
    ? string
    : new Array(width - string.length + 1).join(padding) + string
}
