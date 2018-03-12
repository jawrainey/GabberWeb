
export function mergeIntoById (target, set) {
  set.forEach(model => {
    let index = target.findIndex(s => s.id === model.id)
    if (index !== -1) target[index] = model
    else target.push(model)
  })
}
