export function insert (arr, index, elem) {
  if (index > arr.length - 1) {
    const lackedItem = index - arr.length
    return [...arr, ...Array(lackedItem).fill(), elem]
  } else {
    return [...arr.slice(0, index), elem, ...arr.slice(index)]
  }
}

export function replace (arr, index, elem) {
  if (index > arr.length - 1) {
    const lackedItem = index - arr.length
    return [...arr, ...Array(lackedItem).fill(), elem]
  } else {
    return [...arr.slice(0, index), elem, ...arr.slice(index + 1)]
  }
}
