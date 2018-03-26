/*
 * Utility functions that the mutations share
 */

import Vue from 'vue'

/** Merge an array (set) into another (target) by comparion each element.id */
export function mergeIntoById (target, set) {
  set.forEach(model => {
    let index = target.findIndex(s => s.id === model.id)
    if (index !== -1) Vue.set(target, index, model)
    else target.push(model)
  })
}

/** Find an element with an matching id */
export function findById (set, id) {
  return set.find(item => item.id === id)
}
