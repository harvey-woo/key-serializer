/** @ignore */
const r = /(?=(?:\[|\.))/
export type PublicKey = Exclude<PropertyKey, symbol>
const keySerializer = {
  parse(str: string): PublicKey[] {
    return str.split(r)
      .filter(item => item.trim())
      .map(item => item[0] === '.' ? item.substr(1) : (item[0] === '[' ? + item.substr(1, item.length - 2) : item))
  },
  stringify(arr: PublicKey[]): string {
    return arr.reduce((memo, item, i) =>
      memo += typeof item === 'number' ? `[${item}]` : i === 0 ? item : `.${item}`
    , '') as string
  },
  query(target: any, keys?: string | PublicKey[] | null) {
    if (keys == null || keys === '') {
      return { target, key: undefined, value: target }
    }
    if (typeof keys === 'string') {
      keys = this.parse(keys) as PublicKey[]
    } else {
      keys = keys.slice() as PublicKey[]
    }
    let value = target
    let key: PublicKey | undefined
    while (keys.length) {
      target = value
      key = keys.shift()!
      // this line may throw when target is undefined, and i do not need handle
      value = target[key]
    }
    return { target, key, value }
  },
  get(target: object, keys: string | PublicKey[]): any {
    return this.query(target, keys).value
  },
}
  
export default keySerializer