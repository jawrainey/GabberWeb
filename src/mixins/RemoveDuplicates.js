/*
 * A mixin for components to remove duplicates from an array with an optional predicate
 */

export const defaultPredicate = (a, b) => a === b

/**
 * Remove duplicates from an array
 * @param  {array<T>} array       The array to remove duplicates from
 * @param  {function} [predicate] A predicate to find equal entries
 * @return {array<T>}
 */
export function removeDuplicates (array, predicate = defaultPredicate) {
  return array.filter((elemA, index) =>
    index === array.findIndex(elemB => predicate(elemA, elemB))
  )
}

export default {
  methods: { removeDuplicates }
}
