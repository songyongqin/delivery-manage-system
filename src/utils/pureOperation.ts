
interface UpdateFn {
  (target: any[], index: number, value: any): any[]
}

const update: UpdateFn = (target, index, value) => {
  return [
    ...target.slice(0, index),
    value,
    ...target.slice(index + 1, target.length)
  ]

}

interface RemoveFn {
  (target: any[], index: number): any[]
}

const remove: RemoveFn = (target, index) => {
  return [
    ...target.slice(0, index),
    ...target.slice(index + 1)
  ]
}


export default {
  update,
  remove
}